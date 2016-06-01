'use strict';
/**
 * <%= endpointNameStartCase %>s Controller
 */
var _ = require('lodash'),
    moment = require('moment'),
    <%= endpointNameStartCase %> = require('./<%= endpointNameLower %>.model'),
    handleError = function (res, err, status) {
        return res.status(status || 500).send(err);
    },
    _DELAY = (process.env.NODE_ENV != 'production') ? 500 : 0; //delay for req in dev mode

/**
 * Get a list
 */
exports.index = function (req, res) {
    <%= endpointNameStartCase %>.find({}, function (err, <%= endpointNameLower %>s) {
        if (err) return handleError(500, err);
        res.status(200).json(<%= endpointNameLower %>s);
    });
};

/**
 * Creates a new
 */
exports.create = function (req, res, next) {
    req.body.created = moment().format();
    User.create(req.body, function (err, <%= endpointNameLower %>) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(<%= endpointNameLower %>);
    });
};

/**
 * Get a single
 */
exports.view = function (req, res) {  
    <%= endpointNameStartCase %>.findOne({
        _id: req.params.findById
    })
        // .deepPopulate('')
        .exec(function (err, result) {
            if (err)
                return handleError(res, err);
            setTimeout(function () {
                return res.status(200).jsonp(result);
            }, _DELAY);
        });
}

/**
 * Update
 */
exports.update = function (req, res) {
    var body = req.body;
    body = _.pick(body, ['field1', 'field2']); //pick only selected fields from post to ensure database integrity

    body.updated = moment().format();

    <%= endpointNameStartCase %>.findById(req.params.id).exec(function (err, <%= endpointNameLower %>) {
        if (err) {
            return handleError(res, err);
        }
        if (!<%= endpointNameLower %>) {
            return res.status(404).json();
        }
        _.extend(<%= endpointNameLower %>, body); //updates object
        <%= endpointNameLower %>.save(function (err, <%= endpointNameLower %>) {
            if (err)
                return handleError(res, err);
            return res.status(200).json(<%= endpointNameLower %>);
        });
    });
}


/**
 * Delete
 */
exports.destroy = function (req, res) {
    <%= endpointNameStartCase %>.findByIdAndRemove(req.params.id, function (err, <%= endpointNameLower %>) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(204).json();
    })
}


/**
 * Deactivate
 */
exports.deactivate = function (req, res) {
    <%= endpointNameStartCase %>.findById(req.params.id).exec(function (err, <%= endpointNameLower %>) {
        if (err) {
            return handleError(res, err)
        }
        if (!<%= endpointNameLower %>) {
            return res.status(404).json()
        }
        _.extend(<%= endpointNameLower %>, { updated: moment().format(), active: false })

        <%= endpointNameLower %>.save(function (err, <%= endpointNameLower %>) {
            if (err)
                return handleError(res, err)
            return res.status(200).json(<%= endpointNameLower %>)
        })
    })
}


/**
 * Reactivate
 */
exports.reactivate = function (req, res) {
    <%= endpointNameStartCase %>.findById(req.params.id).exec(function (err, <%= endpointNameLower %>) {
        if (err) {
            return handleError(res, err);
        }
        if (!<%= endpointNameLower %>) {
            return res.status(404).json();
        }
        _.extend(<%= endpointNameLower %>, { updated: moment().format(), active: true });

        <%= endpointNameLower %>.save(function (err, <%= endpointNameLower %>) {
            if (err)
                return handleError(res, err);
            return res.status(200).json(<%= endpointNameLower %>);
        });
    });
}
