/*
 * Author: Zoltán Lajos Kis <zoltan.lajos.kis@ericsson.com>
 */

"use strict";

var msg1 = require('../oflib-1.1/messages/flow-mod.js');
var msg2 = require('../oflib-1.1/messages/group-mod.js');
var msg3 = require('../oflib-1.1/messages/table-mod.js');

module.exports.bufferLength = msg1.bin.length + msg2.bin.length + msg3.bin.length;

module.exports.stream = [
    {
        data :   new Buffer([].concat(msg1.bin).concat(msg2.bin).concat(msg3.bin)),
        result : [ {message: msg1.obj}, {message: msg2.obj}, {message: msg3.obj} ]
    }
];
