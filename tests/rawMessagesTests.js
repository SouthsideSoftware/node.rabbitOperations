"use strict";

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var RawMessage = require('../messageBus/common/rawMessage.js');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var path = require('path');

chai.use(chaiAsPromised);

describe('load', function(){
    it('should return an error when the file does not exist', function() {
            var rawMessage = new RawMessage();
            return rawMessage.load('foo').should.be.rejected;
        });

    it('should load the body from the file', function(done){
        var rawMessage = new RawMessage();
        var fileName = path.resolve(__dirname, '../testRig/messageTemplates/error.json');
        rawMessage.load(fileName).then(function(){
            rawMessage.body.should.equal('{"Ids":["afecc831-34d4-47ca-b43b-56eb90d4e3b6"]}');
            done();
        }).catch(function(err){
            done(err);
        });
    });
});
