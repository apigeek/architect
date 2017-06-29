#!/usr/bin/env node

/**
 * ApiGeek: Architect
 *
 * API-based Micro-Service
 *
 * (c) Lee Curtis 2016 (c) Troven 2009-2015. Apache Licensed.
 *
 */

var ApiGeek = require("meta4qa"), _ = ApiGeek._, cli = ApiGeek.cli, Runtime = ApiGeek.Runtime, helps = ApiGeek.helpers;
var debug = require("debug")("apigeek:daemon");
var log = require("debug")("apigeek:daemon:log");
var assert = require('assert');


var express = require('express');
var exphbs  = require('express-handlebars');

var pkg = require("../package");

var self = this;
var FeatureHandler = require("./controllers/Feature");
var StatusIconHandler = require("./controllers/StatusIcon");
var ParserTransformer = require("./controllers/ParserTransformer");
var AsBuiltFeatureHandler = require("./controllers/AsBuilt");
var bodyParser = require('body-parser');

// setup CLI
cli.option("--listen <port>", "Server port to listen on (default: 1337)");
cli.option("--build", "Execute ./features before starting server");
cli.version(pkg.version);

// initialize Runtime
cli.paths = _.extend({ features: "./features" }, pkg.directories, cli.paths);

var Sandbox = function(cli) {
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

    return apigeek;
}


// Configure

// daemon-specific configure
var configFile = helps.files.path(process.cwd(), "apigeeks.json");

var config = helps.files.config(configFile, cli);
debug("config:  %s -> %j", configFile, config.paths);

config.featuresPath = config.paths.features || config.featuresPath || "./features";


// Initalise WebAPI

this.start = function() {
    const PORT = config.listen || process.env.PORT || 1337;
    var app = express();

    var apigeek = new Sandbox(config);

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

    var apigeek = new Sandbox(config);

    var parser = new ParserTransformer(apigeek);
    _.each(apigeek.config.paths, function(path, key) {
        if (helps.files.exists(path)) {

            var route = "/exhibit/"+key+"/*";
            debug("\t%s", route);

            app.get(route, parser.parser("exhibit", path) );
            route = "/api/"+key+"/*";
            app.get(route, parser.parser("defaults", path) );
        }
    });

    app.get("/knows/ace", parser.knows_ace() );

    app.get("/status/*.png", new StatusIconHandler(apigeek) );

// static as-built assets

    var asBuilt = new AsBuiltFeatureHandler(apigeek);
    var to = apigeek.config.paths.target, from = apigeek.config.paths.blueprint;

    if (to) {
        app.use("/asbuilt/*.md",asBuilt.render(to, "md"));
        app.use("/asbuilt/",asBuilt.static(to));
    }


    var docs = apigeek.config.paths.docs || helps.files.path(__dirname, "../docs");

    var layoutDir = apigeek.config.paths.views || helps.files.path(__dirname, "../docs/views");
    debug("layout from: %s",layoutDir);

    app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: false, layoutsDir: layoutDir }));
    app.set('view engine', '.hbs');
    app.set('views', layoutDir);

    if (docs) {
        debug("render /docs/ from: %s",docs)
        app.use("/docs/*.md", asBuilt.render(docs, "md"));
        app.use("/docs/*", asBuilt.static(docs));
    }

    var ui_docs = apigeek.config.paths.ui;
    if (ui_docs) {
        debug("UI /ui/ from: %s", ui_docs)
        app.get("/ui/*", asBuilt.static(ui_docs));
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
