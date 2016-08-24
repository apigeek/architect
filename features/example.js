var assert = require('assert');
var debug = require('debug')('dialect:example');

module.exports = function(learn, config) {

    learn.given(["I am an example"], function(done) {
        assert(this.example, "Not an example - use @example before feature")
        debug("You are an ApiGeek !!")
        log("We are ApiGeeks !!")
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

