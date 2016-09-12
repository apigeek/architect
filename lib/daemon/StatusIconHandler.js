var pkg = require("../../package");
var assert = require("assert");
var _ = require("underscore");
var Dialect = require("apigeek-dialect"), helps = Dialect.helpers;
var util = require("util");

// local (runtime) logging

var debug = require("debug")("apigeek:daemon:status");

// remote (results) logging

var logger = require('winston');
var logsene = require('winston-logsene');

module.exports = function(apigeek) {

    assert(apigeek, "Missing ApiGeek");
    assert(apigeek.dialect, "Missing ApiGeek Dialect");
    assert(apigeek.config, "Missing ApiGeek Config");

    return function(req, res, next) {
        assert(req.params, "Missing Request Parameters");
        assert(req.params.feature, "Missing Feature Parameter");
        assert(apigeek.config.featuresPath, "Missing featuresPath");

        var featureName = Dialect.helpers.vars.sanitize(req.params.feature);
        assert(featureName, "Missing feature ID");
        var featuresPath = apigeek.config.featuresPath+"/"+featureName;

        var sourceIP = helps.http.getClientAddress(req);
        var correlationId = req.query.correlationId || helps.vars.sanitize(pkg.name+"_"+featureName+"_"+sourceIP);

        // execution-specific config
        var config = { featuresPath: featuresPath+".feature", vars: { correlationId: correlationId } };

        // test the features
        try {

            apigeek.execute(config, function(results) {
                var errors = (results.stats.failures)?true:false;

                // external logging
                var summary = util.format("[%s] %s @ %s (Tests: %s - Passes: %s - Fails: %s)", featureName, results.title, correlationId, results.stats.tests, results.stats.passes, results.stats.failures);
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