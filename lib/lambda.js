'use strict';

var _ = require("underscore");
var fs = require('fs');
var AWS = require('aws-sdk');

var pkg = require("../package");
var _ = require("underscore");
var ApiGeek = require("apigeek-dialect"), cli = ApiGeek.cli, Runtime = ApiGeek.Runtime;
var debug = require("debug")("apigeek:lambda");

exports.handler = function(event, context, done) {

    debug("Lambda: %j -> %j -> %s", event, context, typeof done);

    var startup = function(err, data) {

        if (err) {
            debug(err, err.stack);
            callback(err);
            return;
        }

        debug("Context: %j", context);

        var apigeek = new Runtime(context);
        apigeek.config.name = pkg.name+"-lambda";

//        var decryptedScret = data['Plaintext'].toString();

        // learn packaged dialects

        _.each(pkg.dependencies, function(ver, dep) {
            if (dep.indexOf("dialect-")>=0) {
                debug("install: "+dep+" @ "+ver);
                apigeek.dialect.learn(require(dep),dep);
            }
        });

        // execute

        apigeek.config.name = pkg.name;
        apigeek.execute(context, done);

//        debug(decryptedScret);
    };
    //
    //var kms = new AWS.KMS({region:'eu-west-1'});
    //
    //var secretPath = './encrypted-secret';
    //var encryptedSecret = fs.readFileSync(secretPath);
    //
    //var params = { CiphertextBlob: encryptedSecret };

    //kms.decrypt(params, startup);

    startup();

};