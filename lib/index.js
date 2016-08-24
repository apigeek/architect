#!/usr/bin/env node

var pkg = require("../package");
var _ = require("lodash");
var apigeek = require("apigeek-dialect"), cli = apigeek.cli;
var debug = require("debug")("apigeek:architect");

cli.version(pkg.version);

apigeek.init();

// auto-install dependent dialects

_.each(pkg.dependencies, function(ver, dep) {

    if (dep.indexOf("dialect-")>1) {
        debug("install: "+dep+" @ "+ver);
        apigeek.dialect.learn(require(dep),dep);
    }
})

apigeek.config.name = pkg.name;
// execute the CLI
apigeek.execute();
