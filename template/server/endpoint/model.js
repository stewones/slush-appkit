'use strict';
/**
 * <%= endpointNameStartCase %>s Model
 */
var _ = require('lodash');
var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var <%= endpointNameStartCase %>Schema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    active: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
}, {
        toJSON: {
            getters: true
        },
        toObject: {
            getters: true
        }
    });


var deepPopulate = require('mongoose-deep-populate');
<%= endpointNameStartCase %>Schema.plugin(deepPopulate);
module.exports = mongoose.model('<%= endpointNameStartCase %>', <%= endpointNameStartCase %>Schema);