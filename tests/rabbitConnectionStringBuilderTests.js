"use strict";

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var ConnectionStringBuilder = require('../rabbitConnectionStringBuilder.js');
var connectionStringBuilder = new ConnectionStringBuilder();
var should = require('chai').should();

describe('buildConnectionString()', function(){
    it('should return a basic localhost connection string when passed no options', function() {
            var connectionString = connectionStringBuilder.build();
            connectionString.should.equal('amqp://localhost?frameMax=0');
        });

    it('should return a basic localhost connection string when passed only user name', function() {
        var connectionString = connectionStringBuilder.build({user: "tom"});
        connectionString.should.equal('amqp://localhost?frameMax=0');
    });

    it('should return a basic localhost connection string when passed only password', function() {
        var connectionString = connectionStringBuilder.build({password: "tom"});
        connectionString.should.equal('amqp://localhost?frameMax=0');
    });

    it('should return localhost connection with credentials when user name and password set', function() {
        var connectionString = connectionStringBuilder.build({user: 'user', password: 'password'});
        connectionString.should.equal('amqp://user:password@localhost?frameMax=0');
    });

    it('should return connection string with specified frameMax', function() {
        var connectionString = connectionStringBuilder.build({frameMax: 32000});
        connectionString.endsWith('?frameMax=32000').should.equal(true);
    });

    it('should return connection string with specified vhost', function() {
        var connectionString = connectionStringBuilder.build({vhost: 'myHost'});
        connectionString.should.equal('amqp://localhost/myHost?frameMax=0');
    });

    it('should return connection string with specified host', function() {
        var connectionString = connectionStringBuilder.build({host: 'myHost'});
        connectionString.should.equal('amqp://myHost?frameMax=0');
    });

    it('should add all configured options to connection string', function() {
        var connectionString = connectionStringBuilder.build({host: 'myHost', user: 'user', password: 'password', vhost: 'vhost', frameMax: 11000});
        connectionString.should.equal('amqp://user:password@myHost/vhost?frameMax=11000');
    });
});
