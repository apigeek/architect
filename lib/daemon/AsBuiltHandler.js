var pkg = require("../../package");
var assert = require("assert");
var _ = require("underscore");
var Dialect = require("apigeek-dialect"), helps = Dialect.helpers;
var util = require("util");

// local (runtime) logging

var debug = require("debug")("apigeek:daemon:status");

// remote (results) logging

var logger = require('winston');

module.exports = function(apigeek) {

    assert(apigeek, "Missing ApiGeek");
    assert(apigeek.dialect, "Missing ApiGeek Dialect");
    assert(apigeek.config, "Missing ApiGeek Config");

    return function(req, res, next) {
        assert(req.params, "Missing Request Parameters");
        assert(req.params.feature, "Missing Feature Parameter");
        assert(apigeek.config.blueprint, "Missing blueprint config");
    }
}