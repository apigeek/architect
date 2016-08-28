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
var assert = require('assert');

var express = require('express');
var pkg = require("../package");

var SimpleGetHandler = require("./daemon/SimpleGetHandler");

// setup CLI
cli.option("--listen <port>", "Server port to listen on (default: 9000)");
cli.version(pkg.version);

// initialize Runtime
var apigeek = new Runtime(cli);
assert(apigeek, "Failed to instantiate ApiGeek");
apigeek.config.name = pkg.name+"s";

// Load Dialects

_.each(pkg.dependencies, function(ver, dep) {
    if (dep.indexOf("dialect-")>=0) {
        debug("install: "+dep+" @ "+ver);
        apigeek.dialect.learn(require(dep),dep);
    }
});

// Initalise WebAPI

const PORT = cli.listen || process.env.PORT || 9000;
var app = express();

// set up the express routes
app.get("/favicon.ico", function(req, res, next) { res.sendStatus(200); })
app.get("/feature/:feature", new SimpleGetHandler(apigeek));

// start listening
app.listen(PORT, function() { debug('%s listening on port %s', pkg.name, PORT)});
// auto-install dependent dialects - needed in top-level project to resolve external projects

