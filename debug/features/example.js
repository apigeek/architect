var assert = require('assert');
var request = require('request');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var debug = require('debug')('dialect:example');

module.exports = function(learn, config) {
    assert(learn, "missing learn");
    assert(config, "missing config");

    learn.given(["I am an example"], function(done) {
        assert(this.example, "Not an example - use @example before feature")
        debug("You are an Apigeek !!")
        done && done();
    });

    debug("understands I am an example");

    return {
        annotations: function(dialect, annotations, scope, actor) {
            if (annotations.example) {
                scope.example = true;
                debug("An Example"+(actor&&actor.title?": "+actor.title:scope.name || ""));
            }
        }
    }
}

