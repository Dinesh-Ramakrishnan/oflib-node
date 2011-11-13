/*
 * Author: Zoltán Lajos Kis <zoltan.lajos.kis@ericsson.com>
 */

"use strict";

(function() {

var util = require('util');
var Int64 = require('node-int64');

var ofp = require('../ofp.js');

var offsets = ofp.offsets.ofp_bucket_counter;

module.exports = {
            "unpack" : function(buffer, offset) {
                    var bucketCounter = {};

                    if (buffer.length < ofp.sizes.ofp_bucket_counter) {
                        return {
                            "error" : {
                                "desc" : util.format('bucket-counter at offset %d has invalid length (%d).', offset, len)
                            }
                        }
                    }

                    bucketCounter.packet_count = new Int64(buffer.readUInt32BE(offset + offsets.packet_count, true),
                                                         buffer.readUInt32BE(offset + offsets.packet_count + 4, true));

                    bucketCounter.byte_count = new Int64(buffer.readUInt32BE(offset + offsets.byte_count, true),
                                                         buffer.readUInt32BE(offset + offsets.byte_count + 4, true));

                    return {
                        "bucket-counter" : bucketCounter,
                        "offset" : offset + ofp.sizes.ofp_bucket_counter
                    };
            }

}

})();
