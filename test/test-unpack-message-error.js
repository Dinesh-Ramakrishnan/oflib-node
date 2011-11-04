/*
 * Author: Zoltán Lajos Kis <zoltan.lajos.kis@ericsson.com>
 */

"use strict";

var assert = require('assert');
var util = require('util');
var testutil = require('./testutil.js');
var oflib = require('../lib/oflib.js');

(function() {
    console.log("1. ...");
    var bin = [0x02,                    // version = 2
               0x01,                    // type = 1
               0x00, 0x10,              // length = 16
               0x49, 0x96, 0x02, 0xd2,  // xid = 1234567890
               0x00, 0x02,              // error_type = 2
               0x00, 0x01,              // error_code = 1
               0xab, 0xbc, 0xcd, 0xde]; // data = "abbccdde"

    var json = {
            "message" : {"type" : 'OFPT_ERROR', "xid" : 1234567890,
                         "error_type" : 'OFPET_BAD_ACTION',
                         "error_code" : 'OFPBAC_BAD_LEN',
                         "data" : "abbccdde"},
            "offset" : 16
            };

    var res = oflib.unpackMessage(new Buffer(bin), 0);
    assert(testutil.jsonEqualsStrict(res, json), util.format('Expected %j,\n received %j', json, res));
    console.log("OK.");
}());

(function() {
    console.log("2. ...");
    var bin = [0x02,                    // version = 2
               0x01,                    // type = 1
               0x00, 0x0c,              // length = 12
               0x49, 0x96, 0x02, 0xd2,  // xid = 1234567890
               0x00, 0x05,              // error_type = 5
               0x00, 0x03];             // error_code = 3

    var json = {
            "message" : {"type" : 'OFPT_ERROR', "xid" : 1234567890,
                         "error_type" : 'OFPET_FLOW_MOD_FAILED',
                         "error_code" : 'OFPFMFC_OVERLAP'},
            "offset" : 12
            };

    var res = oflib.unpackMessage(new Buffer(bin), 0);
    assert(testutil.jsonEqualsStrict(res, json), util.format('Expected %j,\n received %j', json, res));
    console.log("OK.");
}());