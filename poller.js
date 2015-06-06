var lib = require('amqp-worker');
var Client = lib.Client;
var Worker = lib.Worker;
var utf8 = require('utf8');

// create instance of Client for a connection
var client = new Client(

    // AMQP URL to connect to, same as url parameter on amqplib connect
    'amqp://test:test@10.211.55.5?frameMax=0',

    // options to send on connect, same as socketOptions on amqplib connect
    {
        heartbeat: 10
    }
);

// create instance of Worker for channel and consume
var worker1 = new Worker(
    // queue name
    'error',

    // message handler
    // msg will be the same object passed to message callback on amqplib Channel#consume
    function(msg, callback) {
        try {
            var result = msg.content.toString();

            // the message is ack'ed on success
            // second parameter is optional for logging
            callback(null, result);
        } catch(err) {

            // the message is nack'ed on error
            callback(err);
        }
    },

    // worker options
    {
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
);

// complete event when message handler callback is called
worker1.on('complete', function(data) {
    process.stdout.write('.');
});

// create instance of Worker for channel and consume
var worker2 = new Worker(
    // queue name
    'audit',

    // message handler
    // msg will be the same object passed to message callback on amqplib Channel#consume
    function(msg, callback) {
        try {
            var result = msg.content.toString();

            // the message is ack'ed on success
            // second parameter is optional for logging
            callback(null, result);
        } catch(err) {

            // the message is nack'ed on error
            callback(err);
        }
    },

    // worker options
    {
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
        count: 5,

        // requeue on nack
        requeue: true
    }
);

// complete event when message handler callback is called
worker2.on('complete', function(data) {
    process.stdout.write('E');
});

// you can add multiple workers to a client
client.addWorker(worker1);
client.addWorker(worker2);

// connect starts the connection and starts the queue workers
client.connect(function(err) {
    if (err) {
        console.log(err);
        return process.exit(1);
    }
    console.log('client connected to server');
});
