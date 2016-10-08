var assert = require("assert");
var _ = require("underscore");
var Dialect = require("apigeek-dialect"), helps = Dialect.helpers;
var util = require("util");
var helper = require("./helper");
var marked = require("marked");

var express = require('express');

var debug = require("debug")("apigeek:asbuilt");

// remote (results) logging

module.exports = function(apigeek) {

    assert(apigeek, "Missing ApiGeek");
    assert(apigeek.dialect, "Missing ApiGeek Dialect");
    assert(apigeek.config, "Missing ApiGeek Config");
    assert(apigeek.logger, "Missing ApiGeek Logger");

    var docs = apigeek.config.paths.docs;

    var api = {};
    var logger = apigeek.logger;

    var to_html = {};

    to_html.md = function (path, context) {
        assert(path, "Missing path");
        var md = helps.files.load(path);
        var html = marked (md);
        return html;
    };

    to_html.default = function(path, context) {
        assert(path, "Missing path");
        return helps.files.load(path);
    };


    api.static = function (rootDir) {
        debug("static from: "+rootDir);
        return express.static(rootDir);
    };

    api.render = function(rootDir, extn, view) {
        assert(rootDir, "Missing render root folder");
        assert(extn, "Missing render extn type");

        view = view || "main";
        debug("renders %s from: %s", view, rootDir);

        return function (req, res) {
            assert(req.params, "Missing path param");
            var file = req.params[0] || "index.html" ;

            var path = helps.files.path(rootDir, file+"."+extn);

            var context = {};
            var renderer = to_html[extn] || to_html.default;

            debug("rendered %s from: %s", extn, path);

            var body = renderer?renderer(path, context):html;

            res.render (view, {"body": body});
        }
    };

    return api;
};