/*jshint -W097 */
'use strict';

var ConnectionStringBuilder = require('../rabbitMQ/rabbitConnectionStringBuilder.js');
var amqp = require('amqplib');
var when = require('when');
var retry = require('retry');
var timeUtillities = require('../util/time.js');

function MessageSender(options, cli){
    this.options = options;
    this.cli = cli;
    this.timer = undefined;
    this.channel = undefined;
    this.retryOptions = {
        retries: 10000,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: timeUtillities.minutesToMilliseconds(5),
        randomize: false
    };
}

MessageSender.prototype.openConnection = function(){
    var self = this;
    var connectionString = ConnectionStringBuilder.build(this.options);
    return amqp.connect(connectionString).then(function(conn) {
        conn.on('error', function(err){
            console.log('Connection error ' + err);
            conn.close();
        });
        return when(conn.createChannel().then(function(ch) {
            ch.on('error', function(err){
                console.log('Channel error ' + err);
            });

            var ok = ch.checkQueue(self.options.exchange);

            return ok.then(function(queueInfo) {
                self.channel = ch;
            });
        })).catch(function() {
            console.log('closing connection');
            conn.close();
        });
    });
};

MessageSender.prototype.startSending = function(){
    var self = this;
    this.timer = setInterval(function(){
        var msg = 'Hello World!';
        try {
            self.channel.sendToQueue(self.options.exchange, new Buffer(msg));
        } catch(err) {
            console.log('send failed.  Will retry.  Error is ' + err);
            self.stopSending();
            self.sendWithRetry();
        }
    }, 60000/self.options.messagesPerMinute);
}

MessageSender.prototype.stopSending = function(){
    if (this.timer !== undefined){
        clearInterval(this.timer);
    }
};

MessageSender.prototype.sendWithRetry = function() {
    var self = this;
    var operation = retry.operation(this.retryOptions);
    operation.attempt(function (currentAttempt) {
        try {
            self.openConnection().then(function () {
                self.startSending();
            }).catch(function (err) {
                self.stopSending();
                if (operation.retry(err)) {
                    var delay = Math.min(self.retryOptions.minTimeout * Math.pow(self.retryOptions.factor, currentAttempt), self.retryOptions.maxTimeout) / 1000;
                    console.log('in retry ' + currentAttempt + ' of ' + self.retryOptions.retries + ' with timeout ' + delay + 's because of error ' + err);
                    return;
                }
            });
        } catch (err) {
            console.log('Error when attempting retry ' + err)
            throw err;
        }
    });
};

module.exports = MessageSender;