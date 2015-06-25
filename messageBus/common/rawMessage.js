/*jshint -W097 */
'use strict';

var fs = require('fs');
var when = require('when');

var RawMessage = function(){
    this.body = '';
    this.headers = {};
};

RawMessage.prototype.load = function(fileName){
    var self = this;
    return when.promise(function(resolve, reject, notify){
        var obj;
        fs.readFile(fileName, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                obj = JSON.parse(data);
                self.body = obj.body;
                self.headers = obj.headers;
                resolve()
            }
        });
    });
};

module.exports = RawMessage;
