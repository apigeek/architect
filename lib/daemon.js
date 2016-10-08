#!/usr/bin/env node

/**
 * ApiGeek: Architect
 *
 * API-based Micro-Service
 *
 * (c) Lee Curtis 2016 (c) Troven 2009-2015. Apache Licensed.
 *
 */

var _ = require("underscore");
var ApiGeek = require("apigeek-dialect"), cli = ApiGeek.cli, Runtime = ApiGeek.Runtime, helps = ApiGeek.helpers;
var debug = require("debug")("apigeek:daemon");
var log = require("debug")("apigeek:daemon:log");
var assert = require('assert');


var express = require('express');
var exphbs  = require('express-handlebars');

var pkg = require("../package");

var self = this;
var FeatureHandler = require("./controllers/Feature");
var StatusIconHandler = require("./controllers/StatusIcon");
var ParseFeatureHandler = require("./controllers/ParseFeature");
var AsBuiltFeatureHandler = require("./controllers/AsBuilt");
var bodyParser = require('body-parser')

// setup CLI
cli.option("--listen <port>", "Server port to listen on (default: 1337)");
cli.option("--build", "Execute ./features before starting server");
cli.version(pkg.version);

// initialize Runtime
var apigeek = new Runtime(cli);
assert(apigeek, "Failed to instantiate ApiGeek");
assert(apigeek.config, "Missing config");

apigeek.config.name = pkg.name+"s";

// Load Dialects

_.each(pkg.dependencies, function(ver, dep) {
    if (dep.indexOf("dialect-")>=0) {
        debug("install: "+dep+" @ "+ver);
        apigeek.dialect.learn(require(dep),dep);
    }
});

// Initalise WebAPI

this.start = function() {
    const PORT = cli.listen || process.env.PORT || 1337;
    var app = express();

    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(function(req, res,next) {
        res.header("X-Powered-By", pkg.name);
        next();
    })


// set up the express routes
    app.get("/favicon.ico", function(req, res, next) { res.sendFile("favicon.png", { root: __dirname+"/../docs" }) })

    var features = new FeatureHandler(apigeek);
    app.get("/feature/*", features.get );
    app.post("/feature", features.post );

    var parser = new ParseFeatureHandler(apigeek);
    app.get("/parse/*", parser.get );

    app.get("/status/*.png", new StatusIconHandler(apigeek) );

// static as-built assets

    var asBuilt = new AsBuiltFeatureHandler(apigeek);
    var blueprint = apigeek.config.blueprint;

    if (blueprint) {
        assert (blueprint.to, "Missing {{blueprint.to}}");

        app.use("/asbuilt/*.md",asBuilt.render(blueprint.to, "md"));
        app.use("/asbuilt/",asBuilt.static(blueprint.to));
    }


    var docs = apigeek.config.paths.docs || helps.files.path(__dirname, "../docs");

    var layoutDir = apigeek.config.paths.views || helps.files.path(docs, "views");
    debug("layout from: %s",layoutDir);

    app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: false, layoutsDir: layoutDir }));
    app.set('view engine', '.hbs');
    app.set('views', layoutDir);

    if (docs) {
        debug("render /docs/ from: %s",docs)
        app.use("/docs/*.md", asBuilt.render(docs, "md"));
        app.use("/docs/*", asBuilt.static(docs));
    }


// start listening
    app.listen(PORT, function() { console.log('%s listening on port %s', pkg.name, PORT)});
// auto-install dependent dialects - needed in top-level project to resolve external projects

}

if (cli.build) {
    debug("building features");
    apigeek.execute({}, function() {
        debug("features built");
        self.start();
    });
} else {
    this.start();
}
