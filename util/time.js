/*jshint -W097 */
'use strict';

var timeUtilities = {
    secondsInMinute: 60,
    millisecondsInSecond: 1000,
    minutesToMilliseconds: function(mins){
        return mins * this.secondsInMinute * this.millisecondsInSecond;
    }
};

module.exports = timeUtilities;
