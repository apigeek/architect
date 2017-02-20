#!/usr/bin/env node

/**
 * ApiGeek: Architect
 *
 * Command Line launcher
 *
 * (c) Lee Curtis 2016 (c) Apigee 2016. Apache Licensed.
 *
 */

var pkg = require("../package");
var _ = require("underscore");
var meta4qa = require("meta4qa"), cli = meta4qa.cli, Runtime = meta4qa.Runtime, helps = meta4qa.helpers;
var debug = require("debug")("apigeek");
var assert = require('assert');

// setup the CLI options

cli.version(pkg.name+" v"+pkg.version);

cli.option("--reporter <reporter>", "Mocha reporter [spec|simple|tap|xunit|nyan|progress]");
cli.option("--example", "create some examples in ./features");

cli.command('*').description("[.feature file]").action(function (featureFile) {
    cli.features = featureFile;
    debug("Explicit features from: %s", cli.features);
    if (arguments.length>2) {
        console.log("Only one .feature file allowed on the command line");
        process.exit(1);
    }
});

assert(cli.parse, "Not CLI");

// configure from environment, files, home
var config = false;
try {
    cli.features = "./features";
    config = meta4qa.configure(cli, cli.config || "apigeek.json");
    if (!config) {
        cli.help();
        return;
    }
} catch(e) {
    console.log("Configuration error: %s", e);
    process.exit(1);
    return;
}

// extend config from local package

config.paths = _.extend({}, pkg.directories, config.paths);
config.name = pkg.name;
config.reporter = config.reporter || "spec";

// initialize Runtime

var apigeek = new Runtime(config);

// install dialects - needed in top-level project to resolve external projects

_.each(pkg.dependencies, function(ver, dep) {
    if (dep.indexOf(meta4qa.pkg.name+"-")>=0) {
        debug("%s install: %s @ %s",pkg.name, dep, ver);
        apigeek.dialect.learn(require(dep),dep);
    }
});

// inject prefixed ENV variables into config
helps.vars.env(cli.envPrefix || "APIGEEK_", process.env, config);

if (apigeek.commands(cli)) {
    return;
}

apigeek.execute();
