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
            return v;
        },
        exhibit: function(v,k,l) {
            v.label = v.title;
            v.type = "feature";
            delete v.title;
            return v;
        },
        knows2ace: function(v,k,l) {
            return { name: v, value: v, score: 10, meta: "dialect-phrase"}
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
                helper.handleError(e, res, "AUDIT", logger);
            }

        }
    }

    controller.knows_ace = function() {

        return function(req, res, next) {
debug("knows params: %j", req.query);
            var prefix = req.query.prefix || "";
            var regex = new RegExp(prefix+"*", "i");

            try {
                debug("knows_ace");
                var knows = apigeek.dialect.knows();
                debug("knows: %j", _.keys(knows) );

                var auto_complete = [];
                _.each(knows.given, function(phrase) {
                    if (regex.test(phrase))
                        auto_complete.push({ name: phrase, value: phrase, score: 10, meta: "given" });
                })
                _.each(knows.when, function(phrase) {
                    if (regex.test(phrase))
                    auto_complete.push({ name: phrase, value: phrase, score: 10, meta: "when" });
                })
                _.each(knows.then, function(phrase) {
                    if (regex.test(phrase))
                    auto_complete.push({ name: phrase, value: phrase, score: 10, meta: "then" });
                })

                res.json( auto_complete );
            } catch (e) {
                helper.handleError(e, res, "KNOWS", logger);
            }

        }
    }

    return controller;
}