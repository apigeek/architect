var pkg = require("../../package");
var assert = require("assert");
var _ = require("underscore");
var Dialect = require("apigeek-dialect"), helps = Dialect.helpers;
var API_Dialect = require("apigeek-dialect-webapi");
var util = require("util");

// local (runtime) logging

var debug = require("debug")("apigeek:daemon:run");

// remote (results) logging

var logger = require('winston');

module.exports = function(apigeek) {

    assert(apigeek, "Missing ApiGeek");
    assert(apigeek.dialect, "Missing ApiGeek Dialect");
    assert(apigeek.config, "Missing ApiGeek Config");
    var handler = {};

    handler.get = function(req, res, next) {
        assert(req.params, "Missing Request Parameters");
        assert(req.params.feature, "Missing Feature Parameter");
        assert(apigeek.config.featuresPath, "Missing featuresPath");

        var featureName = helps.vars.sanitize(req.params.feature);
        assert(featureName, "Missing feature ID");
        var featuresDir = apigeek.config.featuresPath+"/"+featureName;

        var correlationId = req.query.correlationId || helps.vars.sanitize(featureName+"_"+ _.now());

        // execution-specific config
        var config = { reporter: "simple", featuresPath: featuresDir+".feature" };

        debug("Feature @ %s", config.featuresPath);

        // allow query parameters to over-ride defaults
        _.each(req.query, function(v,k) {
            helps.vars.set(config, k, v);
        });

        var use_detail = req.query.simple?false:true;

        // run the features

        try {

            apigeek.execute(config, function(results) {
                results.errors = (results.stats.failures)?true:false;
                results.correlationId = correlationId;

                // external logging
                var summary = util.format("[%s] %s @ %s (Tests: %s - Passes: %s - Fails: %s)", featureName, results.title, correlationId, results.stats.tests, results.stats.passes, results.stats.failures);
                results.errors ? logger.error(summary, results) : logger.info(summary, results);

                // clean-up
                delete results.tests; // redundant

                if (!use_detail) {
                    delete results.passes;
                    delete results.failures;
                    delete results.pending;
                }

                res.json( results );

            })

        } catch (e) {
            if (e.code == "ENOENT") {
                res.sendStatus(404);
            } else {
                logger.error(util.format("FATAL RUN: [%s] %s", featureName, e));
                res.sendStatus(500);
            }
        }

    }

    handler.post = function(req, res, next) {

        var config = { name: pkg.name+"_"+ _.now()}

        // allow query parameters to over-ride defaults
        _.each(req.query, function(v,k) {
            helps.vars.set(config, k, v);
        });

        var feature = req.body.feature;
        // execute ...
        debug("POST: %j\n%j", feature, req.headers);

        try {
            var engine = apigeek.engine(config, feature);
            engine.run(function (results, feature) {
                res.json( { results: results, feature: feature } );
            });
        } catch (e) {
            console.log("%j", e);
            logger.error(util.format("FEATURE BROKEN: [%s] %s", req.body.feature, e));
            throw e;
//            res.sendStatus(500);
        }

    }

    return handler;
}