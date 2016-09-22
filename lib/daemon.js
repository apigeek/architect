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


var express = require('express');
var pkg = require("../package");

var FeatureHandler = require("./controllers/FeatureHandler");
var StatusIconHandler = require("./controllers/StatusIconHandler");
var ParseFeatureHandler = require("./controllers/ParseFeatureHandler");
var bodyParser = require('body-parser')

// setup CLI
cli.option("--listen <port>", "Server port to listen on (default: 1337)");
cli.version(pkg.version);

// initialize Runtime
var apigeek = new Runtime(cli);
assert(apigeek, "Failed to instantiate ApiGeek");
assert(apigeek.config, "Missing config");

apigeek.config.name = pkg.name+"s";

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

app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res,next) {
    res.header("X-Powered-By", pkg.name);
    next();
})

var features = new FeatureHandler(apigeek);
// set up the express routes
app.get("/favicon.ico", function(req, res, next) { res.sendFile("favicon.png", { root: __dirname+"/../docs" }) })
app.get("/feature/:feature", features.get );
app.post("/feature", features.post );
app.get("/parse/:feature", new ParseFeatureHandler(apigeek) );
app.get("/status/:feature.png", new StatusIconHandler(apigeek) );

// static as-built assets

var asbuilt = apigeek.config.blueprint.to;
if (asbuilt) {
    app.use("/asbuilt/",express.static(asbuilt));
}

app.use("/docs/",express.static(ApiGeek.docs));

// start listening
app.listen(PORT, function() { console.log('%s listening on port %s', pkg.name, PORT)});
// auto-install dependent dialects - needed in top-level project to resolve external projects

