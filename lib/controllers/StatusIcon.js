var pkg = require("../../package");
var assert = require("assert");
var _ = require("underscore");
var Dialect = require("apigeek-dialect"), helps = Dialect.helpers;
var util = require("util");
var helper = require("./helper");

// local (runtime) logging

var debug = require("debug")("apigeek:daemon:status");

// remote (results) logging
module.exports = function(apigeek) {

    assert(apigeek, "Missing ApiGeek");
    assert(apigeek.dialect, "Missing ApiGeek Dialect");
    assert(apigeek.config, "Missing ApiGeek Config");
    assert(apigeek.logger, "Missing ApiGeek Logger");

    var logger = apigeek.logger;
    debug("Status from: %s", apigeek.config.featuresPath);

    return function(req, res, next) {
        assert(req.params, "Missing Request Parameters");
        assert(apigeek.config.featuresPath, "Missing featuresPath");

        var featureName = req.params[0];
        assert(featureName, "Missing feature ID");
        var featuresPath = apigeek.config.featuresPath+"/"+featureName;

        // execution-specific config
        var config = { featuresPath: helper.toFeatureFile(featuresPath), vars: { } };

        // test the features
        try {

            apigeek.execute(config, function(results) {
                var errors = (results.stats.failures)?true:false;

                // external logging
                var summary = util.format("[%s] %s (Tests: %s - Passes: %s - Fails: %s)", featureName, results.title, results.stats.tests, results.stats.passes, results.stats.failures);
                results.errors ? logger.error(summary, results) : logger.info(summary, results);

                res.sendFile(errors?"fail.png":"pass.png", { root: __dirname+"/../../docs/"});
            })

        } catch (e) {
            if (e.code == "ENOENT") {
                res.sendStatus(404);
            } else res.send(e).sendStatus(500);
        }
    }
}