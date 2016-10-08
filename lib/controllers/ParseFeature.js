var pkg = require("../../package");
var assert = require("assert");
var _ = require("underscore");
var Dialect = require("apigeek-dialect"), helps = Dialect.helpers;
var util = require("util");
var helper = require("./helper");

// local (runtime) logging

var debug = require("debug")("apigeek:daemon:audit");

module.exports = function(apigeek) {

    assert(apigeek, "Missing ApiGeek");
    assert(apigeek.dialect, "Missing ApiGeek Dialect");
    assert(apigeek.config, "Missing ApiGeek Config");
    assert(apigeek.logger, "Missing ApiGeek Logger");

    var logger = apigeek.logger;
    var featuresPath = apigeek.config.paths.features || apigeek.config.featuresPath;
    debug("Parse from: %s", apigeek.config.paths.features);
    var controller = {};

    controller.get = function(req, res, next) {
        assert(req.params, "Missing Request Parameters");
        assert(featuresPath, "Missing featuresPath");

        var featureName = req.params[0] || "";
        var featuresFile = featuresPath+"/"+featureName;

        // execution-specific config
        var config = { reporter: "simple", featuresPath: featuresFile };

        debug("Parse Feature: %s", config.featuresPath);

        // allow query parameters to over-ride defaults
        _.each(req.query, function(v,k) {
            helps.vars.set(config, k, v);
        });

        // run the features

        try {
            var audit = apigeek.dialect.audit(featuresPath);
            res.json( { items: audit });
        } catch (e) {
            if (e.code == "ENOENT") {
console.log("Not Found: %j", e);
                res.sendStatus(404);
            } else {
                logger.error(util.format("FATAL AUDIT %s: %s", featureName, e));
                res.sendStatus(500);
            }
        }

    }

    return controller;
}