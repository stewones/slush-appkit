'use strict';
/**
 * <%= endpointNameStartCase %>s Index Routes
 */

var express = require('express');
var controller = require('./<%= endpointNameLower %>.controller');
var router = express.Router();
//var auth = require('../../auth/auth.service');

//list
router.get('/', controller.index);
//create
router.post('/', controller.create);
//status
router.delete('/deactivate/:id', controller.deactivate);
router.patch('/reactivate/:id', controller.reactivate);
//get
router.get('/:id', controller.view);
//update
router.put('/:id', controller.update);
//delete
//router.delete('/:id', controller.destroy);

module.exports = router;