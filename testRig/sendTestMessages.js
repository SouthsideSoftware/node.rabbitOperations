'use strict';

var amqp = require('amqplib');
var when = require('when');
var retry = require('retry');

var ConnectionStringBuilder = require('../rabbitConnectionStringBuilder.js');

var connectionOptions = {
    host: "services.local.com",
    user: "test",
    password: "test",
    frameMax: 0,
    vhost: "test",
    "errorQueue": "error",
    "auditQueue": "audit"
}

var connectionString = new ConnectionStringBuilder().build(connectionOptions);


function sendMessage(){
    return amqp.connect(connectionString).then(function(conn) {
        conn.on('error', function(err){
            console.log('Connection error ' + err)
        })
        return when(conn.createChannel().then(function(ch) {
            ch.on('error', function(err){
                console.log('Channel error ' + err);
            });
            console.log('trying...');
            var q = 'audit-x';
            var msg = 'Hello World!';

            var ok = ch.checkQueue(q);

            return ok.then(function(queueInfo) {
                console.log('queuInfo: ' + queueInfo);
                ch.sendToQueue(q, new Buffer(msg));
                console.log(" [x] Sent '%s'", msg);
                return ch.close();
            }).catch(function(e){
                console.log('Send error ' + e);
                throw e;
            });
        })).ensure(function() {
            console.log('closing connection')
            conn.close();
        });
    });
}

function minutesToMilliseconds(mins){
    return mins * 60 * 1000;
}

var secondsInMinute = 60;
var millisecondsInSecond = 1000;
var retryOptions = {
    retries: 10000,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: minutesToMilliseconds(5),
    randomize: false

};
var operation = retry.operation(retryOptions);
operation.attempt(function(currentAttempt){
    try {
        sendMessage().catch(function(err){
            if (operation.retry(err)){
                var delay = Math.min(retryOptions.minTimeout * Math.pow(retryOptions.factor, currentAttempt), retryOptions.maxTimeout) / 1000;
                console.log('in retry ' + currentAttempt + ' of ' + retryOptions.retries + ' with timeout ' + delay + 's because of error '+ err);
                return;
            }
        }).done(function(){
            console.log('done');
        });
    } catch (err){
        if (operation.retry(err)){
            return;
        }
    }
});