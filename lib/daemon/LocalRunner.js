var pkg = require("../../package");
var debug = require("debug")("architect:daemon");

module.exports = function(apigeek) {
    assert(apigeek, "Missing ApiGeek");
    assert(apigeek.engine, "Missing ApiGeek Engine");
    assert(apigeek.dialect, "Missing ApiGeek Dialect");
    assert(apigeek.config, "Missing ApiGeek Config");

    return function(req, res, next) {
        assert(req.params, "Missing Request Parameters");

        var suiteName = req.params.suite;
        var testSuiteDir = __dirname+"/../testsuite/"+suiteName;
        debug("TestSuite: %s @ %s", suiteName, testSuiteDir);

        // bootstrap the config
        var config = { debug: false, reporter: "json",
            features: testSuiteDir+"/features/",
            config: testSuiteDir+"/affirm.json"
        };

        debug("features from: %s", apigeek.config.featuresPath);

        // allow query parameters to over-ride defaults
        _.each(req.query, function(v,k) {
            apigeek.helpers.vars.set(apigeek.config, k, v);
        });

        var use_detail = req.query.detail?true:false;

        // load the tests
        apigeek.dialect.load(config.featuresPath, apigeek.engine.features);

        // start the tests

        apigeek.engine.run(function(results) {
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