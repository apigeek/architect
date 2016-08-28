var pkg = require("../../package");
var assert = require("assert");
var debug = require("debug")("apigeek:daemon");
var _ = require("underscore");
var Dialect = require("apigeek-dialect");

module.exports = function(apigeek) {
    assert(apigeek, "Missing ApiGeek");
    assert(apigeek.dialect, "Missing ApiGeek Dialect");
    assert(apigeek.config, "Missing ApiGeek Config");

    return function(req, res, next) {
        assert(req.params, "Missing Request Parameters");

        var featureName = req.params.feature;
        var featuresDir = "./features/"+featureName;
        debug("Features: %s @ %s", featureName, featuresDir);

        // execution-specific config
        var config = { debug: false,
            reporter: "simple",
            featuresPath: featuresDir+".feature",
            config: featuresDir+"/affirm.json"
        };

        debug("features from: %s", config.featuresPath);

        // allow query parameters to over-ride defaults
        _.each(req.query, function(v,k) {
            Dialect.helpers.vars.set(config, k, v);
        });

        var use_detail = req.query.detail?true:false;

        // start the tests

        apigeek.execute(config, function(results) {
            debug("results: %j", results.stats);

            if (!use_detail) {
                delete results.tests;
                delete results.passes;
                delete results.failures;
                delete results.prending;
                if (results.stats.failures) results.errors = true;
            }

            res.header("X-Powered-By", pkg.name);
            res.json( results );

        })
    }
}