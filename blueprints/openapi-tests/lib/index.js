var pkg = require("../package");
var debug = require("debug")("apigeek-blueprint");
var assert = require("assert");

module.exports = {
    pkg: pkg
}

assert(pkg.name, "Missing Blueprint name");
debug("%s", pkg.description || pkg.name);