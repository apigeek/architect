#!/usr/bin/env node

/**
 * ApiGeek: Architect
 *
 * Command Line launcher
 *
 * (c) Lee Curtis 2016 (c) Troven 2009-2015. Apache Licensed.
 *
 */

var pkg = require("../package");
var _ = require("underscore");
var dialect = require("apigeek-dialect"), ApiGeek = dialect.ApiGeek, cli = dialect.cli;
var debug = require("debug")("apigeek:architect");
var assert = require('assert');

cli.version(pkg.version);

var apigeek = new ApiGeek(cli);
apigeek.config.name = pkg.name;

// auto-install dependent dialects - needed in top-level project to resolve external projects

_.each(pkg.dependencies, function(ver, dep) {
    if (dep.indexOf("dialect-")>=0) {
        debug("install: "+dep+" @ "+ver);
        apigeek.dialect.learn(require(dep),dep);
    }
});

if (apigeek.commands(cli)) {
    return;
}

apigeek.execute();
