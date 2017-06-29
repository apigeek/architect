var pkg = require("../../package");
var assert = require("assert");
var ApiGeek = require("meta4qa"), _ = ApiGeek._, cli = ApiGeek.cli, Dialect = ApiGeek.Dialect, Runtime = ApiGeek.Runtime, Engine = ApiGeek.Engine, helps = ApiGeek.helpers;

var util = require("util");
var helper = require("./helper");

// local (runtime) logging

var debug = require("debug")("apigeek:daemon:run");

// remote (results) logging

module.exports = function(apigeek) {
    assert(apigeek, "Missing ApiGeek");
    assert(apigeek.dialect, "Missing ApiGeek Dialect");
    assert(apigeek.config, "Missing ApiGeek Config");
    assert(apigeek.logger, "Missing ApiGeek Logger");
    var handler = {};
    debug("Features from: %s", apigeek.config.featuresPath);

    var logger = apigeek.logger;

    handler.get = function(req, res, next) {
        assert(req.params, "Missing Request Parameters");
        assert(apigeek.config.featuresPath, "Missing featuresPath");

        var featureName = req.params[0];
        assert(featureName, "Missing feature ID");
        var featuresDir = apigeek.config.featuresPath+"/"+featureName;

        var correlationId = req.query.correlationId || helps.vars.sanitize(featureName)+"_"+ _.now();

        // execution-specific config
        var config = { reporter: "simple", featuresPath: helper.toFeatureFile(featuresDir) };

        debug("Feature @ %s --> %s", config.featuresPath, correlationId);

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
                logger.error(util.format("FATAL RUN: [%s] %s", featuresDir, e));
                res.sendStatus(500, { code: featureName, error: e } );
            }
        }

    }

    handler.post = function(req, res, next) {

        var config = { name: pkg.name+"_"+ _.now(), vars: {} }

        // allow query parameters to over-ride defaults
        _.each(req.query, function(v,k) {
            helps.vars.set(config, k, v);
        });

        var engine = new Engine(config);

        var rawFeature = req.body.feature;
        var userConfig = req.body.config;

        debug("POST: %j\n%j", rawFeature, req.headers);

        Dialect.converts.feature(rawFeature, function(err, feature) {
            var scope = _.extend({}, Dialect.defaults, userConfig, config);
            debug("Feature: %j -> %j", feature, scope);

            new Feature(apigeek.dialect, feature, scope ).feature(engine.suite);
            try {
                var results = engine.run(function (results) {
                    res.json( { results: results, feature: feature } );
                });

                debug("results: %j", results);

            } catch (e) {
                console.log("%j", e);
                logger.error(util.format("FEATURE BROKEN: [%s] %s", req.body.feature, e));
                throw e;
//            res.sendStatus(500);
            }
        });


    }

    return handler;
}
