#!/usr/bin/env node

var pkg = require("../package");
var apigeek = require("apigeek-dialect");
// var express = require("express");

// dynamically register declared dialects

_.each(pkg.dependencies, function(dep) {
    if (dep.indexOf("-dialect-")>0) {
        apigeek.register("apigeek-dialect-blueprint");
    }
})

console.log("dependencies: %j", dependencies);

// execute the CLI
apigeek.cli.execute({name: pkg.name});
