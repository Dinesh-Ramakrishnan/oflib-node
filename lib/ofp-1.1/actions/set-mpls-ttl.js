/*
 * Author: Zoltán Lajos Kis <zoltan.lajos.kis@ericsson.com>
 */

"use strict";

(function() {

var util = require('util');
var ofp = require('../ofp.js');
var packet = require('../../packet.js');

var offsets = ofp.offsets.ofp_action_mpls_ttl;

module.exports = {
            "unpack" : function(buffer, offset) {
                    var action = {
                            "header" : {"type" : 'OFPAT_SET_MPLS_TTL'},
                            "body" : {}
                        };

                    var len = buffer.readUInt16BE(offset + offsets.len, true);

                    if (len != ofp.sizes.ofp_action_mpls_ttl) {
                        return {
                            "error" : {
                                "desc" : util.format('%s action at offset %d has invalid length (%d).', action.header.type, offset, len),
                                "type" : 'OFPET_BAD_ACTION', "code" : 'OFPBAC_BAD_LEN'
                            }
                        }
                    }

                    action.body.mpls_ttl = buffer.readUInt8(offset + offsets.mpls_ttl, true);

                    return {
                        "action" : action,
                        "offset" : offset + len
                    }
            },

            "pack" : function(action, buffer, offset) {
                    if (buffer.length < offset + ofp.sizes.ofp_action_mpls_ttl) {
                        return {
                            error : { desc : util.format('%s action at offset %d does not fit the buffer.', action.header.type, offset)}
                        }
                    }
                    buffer.writeUInt16BE(ofp.ofp_action_type.OFPAT_SET_MPLS_TTL, offset + offsets.type, true);
                    buffer.writeUInt16BE(ofp.sizes.ofp_action_mpls_tc, offset + offsets.len, true);
                    buffer.writeUInt8(action.body.mpls_ttl, offset + offsets.mpls_ttl, true);
                    buffer.fill(0, offset + offsets.pad, offset + offsets.pad + 3);

                    return {
                        offset : offset + ofp.sizes.ofp_action_mpls_tc
                    }
            }

}

})();
