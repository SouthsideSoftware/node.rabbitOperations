/*jshint -W097 */
'use strict';

var RabbitConnectionStringBuilder = {
   build: function(connectionOptions){
        var host = 'localhost';
        var credentials = '';
        var vhost = '';
        var frameMax = '?frameMax=0';

        if (connectionOptions !== undefined) {
            if (connectionOptions.user !== undefined && connectionOptions.password !== undefined) {
                credentials = connectionOptions.user + ':' + connectionOptions.password + '@';
            }
            if (connectionOptions.frameMax !== undefined){
                frameMax = '?frameMax=' + connectionOptions.frameMax;
            }
            if (connectionOptions.vhost !== undefined) {
                vhost = '/' + connectionOptions.vhost;
            }
            if (connectionOptions.host !== undefined) {
                host = connectionOptions.host;
            }
        }
        return 'amqp://' + credentials + host + vhost + frameMax;
    }
};

module.exports = RabbitConnectionStringBuilder;
