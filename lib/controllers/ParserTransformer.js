var pkg = require("../../package");
var assert = require("assert");
var _ = require("underscore");
var Dialect = require("apigeek-dialect"), helps = Dialect.helpers;
var util = require("util");
var helper = require("./helper");

// local (runtime) logging

var debug = require("debug")("apigeek:daemon:audit");

module.exports = function(apigeek, transforms) {

    assert(apigeek, "Missing ApiGeek");
    assert(apigeek.dialect, "Missing ApiGeek Dialect");
    assert(apigeek.config, "Missing ApiGeek Config");
    assert(apigeek.logger, "Missing ApiGeek Logger");

    var logger = apigeek.logger;
    var controller = {};
    transforms = _.extend({
        defaults: function(v,k,l) {

        },
        exhibit: function(v,k,l) {
            v.label = v.title;
            v.type = "feature";
            delete v.title;
            return v;
        }
    },transforms);

    controller.parser = function(type, path, options) {
        assert(type, "Missing type");
        assert(path, "Missing path: "+path);
        var transformer = transforms[type]
        assert(transformer, "Missing transformer: "+type);

        return function(req, res, next) {
            assert(req.params, "Missing Request Parameters");

            var config = _.extend({}, apigeek.config, options, { reporter: "simple" });

            // execution-specific config
            var featureName = req.params[0] || "";
            var featuresFile = path+"/"+featureName;

            debug("%s API: %s", type, featuresFile);

            // allow query parameters to over-ride defaults
            _.each(req.query, function(v,k) {
                helps.vars.set(config, k, v);
            });

            // run the features
            try {
                var audit = apigeek.dialect.audit(featuresFile);
                _.map(audit, transformer);
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
    }

    return controller;
}