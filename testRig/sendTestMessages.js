'use strict';


var cli = require('cli');
var merge = require('merge');
var MessageSender = require('./MessageSender.js');

var defaultOptions = {
    host: 'services.local.com',
    user: 'test',
    password: 'test',
    frameMax: 0,
    vhost: 'test',
    exchange: 'audit',
    messagesPerMinute: 60
};

cli.parse({
    host: ['h', 'RabbitMQ host', 'string', defaultOptions.host],
    user: ['u', 'RabbitMQ user', 'string', defaultOptions.user],
    password: ['p', 'RabbitMQ password', 'string', defaultOptions.password],
    vhost: ['v', 'RabbitMQ VHost', 'string', defaultOptions.vhost],
    exchange: ['q', 'Destination exchange that will receive messages', 'string', defaultOptions.exchange],
    template: ['t', 'Message template', 'string'],
    messagesPerMinute: ['m', 'Messages per minute', 'string', defaultOptions.messagesPerMinute]
});


cli.main(function(args, options) {
    var sender = new MessageSender(merge(defaultOptions, options), cli);
    cli.spinner('Sending message ' + (sender.options.template === null ? 'Hello World' : sender.options.template) + ' at rate ' + sender.options.messagesPerMinute + '/min ');
    sender.sendWithRetry();
});

