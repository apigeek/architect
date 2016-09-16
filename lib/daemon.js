#!/usr/bin/env node

/**
 * ApiGeek: Architect
 *
 * API-based Micro-Service
 *
 * (c) Lee Curtis 2016 (c) Troven 2009-2015. Apache Licensed.
 *
 */

var _ = require("underscore");
var ApiGeek = require("apigeek-dialect"), cli = ApiGeek.cli, Runtime = ApiGeek.Runtime;
var debug = require("debug")("apigeek:daemon");
var log = require("debug")("apigeek:daemon:log");
var assert = require('assert');

var logger = require('winston');
var logsene = require('winston-logsene');

var express = require('express');
var pkg = require("../package");

var RunFeatureHandler = require("./daemon/RunFeatureHandler");
var StatusIconHandler = require("./daemon/StatusIconHandler");
var ParseFeatureHandler = require("./daemon/ParseFeatureHandler");
var AsBuiltHandler = require("./daemon/AsBuiltHandler");

// setup CLI
cli.option("--listen <port>", "Server port to listen on (default: 1337)");
cli.version(pkg.version);

// initialize Runtime
var apigeek = new Runtime(cli);
assert(apigeek, "Failed to instantiate ApiGeek");
assert(apigeek.config, "Missing config");

apigeek.config.name = pkg.name+"s";

// configure remote logging

if (apigeek.config.logsene) {
    logger.add(logsene, _.extend({ssl: 'true', source: pkg.name }, apigeek.config.logsene) );
    debug("Logsene Activated");
}

// Load Dialects

_.each(pkg.dependencies, function(ver, dep) {
    if (dep.indexOf("dialect-")>=0) {
        debug("install: "+dep+" @ "+ver);
        apigeek.dialect.learn(require(dep),dep);
    }
});

// Initalise WebAPI

const PORT = cli.listen || process.env.PORT || 1337;
var app = express();

app.use(function(req, res,next) {
    res.header("X-Powered-By", pkg.name);
    next();
})

// set up the express routes
app.get("/favicon.ico", function(req, res, next) { res.sendFile("favicon.png", { root: __dirname+"/../docs" }) })
app.get("/feature/:feature", new RunFeatureHandler(apigeek) );
app.get("/parse/:feature", new ParseFeatureHandler(apigeek) );
app.get("/status/:feature", new StatusIconHandler(apigeek) );

var asbuilt = apigeek.config.blueprint.to;
if (asbuilt) {
    app.use("/asbuilt/",express.static(asbuilt));
}

// start listening
app.listen(PORT, function() { console.log('%s listening on port %s', pkg.name, PORT)});
// auto-install dependent dialects - needed in top-level project to resolve external projects

