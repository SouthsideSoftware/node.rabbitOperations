'use strict';

var lib = require('amqp-worker');
var Client = lib.Client;
var Worker = lib.Worker;
var ConnectionStringBuilder = require('../rabbitConnectionStringBuilder.js');

var defaultPollerOptions = {
    host: "10.211.55.15",
    user: "test",
    password: "test",
    frameMax: 0,
    vhost: "test",
    "errorQueue": "error",
    "auditQueue": "error"
}

var processMessage = function(msg, callback, type) {
    try {
        var result = msg.content.toString();
        type === 'audit' ? process.stdout.write('.') : process.stdout.write('E');
        // the message is ack'ed on success
        // second parameter is optional for logging
        callback(null, result);
    } catch(err) {

        process.stdout.write('X');
        // the message is nack'ed on error
        callback(err);
    }
};

var workerOptions = {
    // queue options, same as options on amqplib Channel#assertQueue
    queue: {
        durable: true
    },

    // consumer options, same as options on amqplib Channel#consume
    consumer: {

        // if noAck is true, messages won't be ack/nack'ed upon completion
        noAck: false
    },

    // prefetch count
    count: 10,

    // requeue on nack
    requeue: true
}

var connectionString = new ConnectionStringBuilder().build(defaultPollerOptions);

// create instance of Client for a connection
var client = new Client(

    // AMQP URL to connect to, same as url parameter on amqplib connect
    connectionString,

    // options to send on connect, same as socketOptions on amqplib connect
    {
        heartbeat: 10
    }
);

// create instance of Worker for channel and consume
var errorWorker = new Worker(
    // queue name
    'error',

    // message handler
    // msg will be the same object passed to message callback on amqplib Channel#consume
    function(msg, callback) {
        processMessage(msg, callback, 'error');
    },

    workerOptions
);

// create instance of Worker for channel and consume
var auditWorker = new Worker(
    // queue name
    'audit',

    // message handler
    // msg will be the same object passed to message callback on amqplib Channel#consume
    function(msg, callback) {
        processMessage(msg, callback, 'audit');
    },

    workerOptions
);

// you can add multiple workers to a client
client.addWorker(errorWorker);
client.addWorker(auditWorker);

// connect starts the connection and starts the queue workers
client.connect(function(err) {
    if (err) {
        console.log('*************')
        console.log(err);
        console.log('*************')
        return process.exit(1);
    }
    process.stdout.write('** CONNECTED **')
});
