#!/usr/bin/env node

/**
 * ApiGeek: Architect
 *
 * API-based Micro-Service
 *
 * (c) Lee Curtis 2016 (c) Troven 2009-2015. Apache Licensed.
 *
 */

var pkg = require("../package");
var _ = require("underscore");
var apigeek = require("apigeek-dialect"), cli = apigeek.cli;
var debug = require("debug")("apigeek:architect");

cli.version(pkg.version);

apigeek.init();

// auto-install dependent dialects - needed in top-level project to resolve external projects

_.each(pkg.dependencies, function(ver, dep) {
    if (dep.indexOf("dialect-")>=0) {
        debug("install: "+dep+" @ "+ver);
        apigeek.dialect.learn(require(dep),dep);
    }
});

// execute the CLI

apigeek.config.name = pkg.name+"s";
console.log("OOPS - the Web API is coming soon - it's nearly finished.")

// apigeek.execute();
