/**
 * Main application routes
 */
'use strict';
var errors = require('./components/errors');
module.exports = function (app) {    
    app.use('/auth', require('./auth'));    
    <% _.forEach(modules, function (module, i) { %>
    app.use('/api/<%= module %>', require('./api/<%= module %>')); 
    <% }); %>
    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);
    // All other routes should redirect to the index.html
    app.route('/*').get(function (req, res) {
        res.render('error', {
            message: 'Not found',
            error: {},
            stack: {}
        });
    });
};