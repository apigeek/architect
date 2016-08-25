#!/usr/bin/env node

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

apigeek.config.name = pkg.name;
apigeek.execute();
