'use strict';

var _ = require("underscore");
var fs = require('fs');
var AWS = require('aws-sdk');

var pkg = require("../package");
var _ = require("underscore");
var apigeek = require("apigeek-dialect"), cli = apigeek.cli;
var debug = require("debug")("apigeek:architect");

exports.handler = function(event, context, done) {

    var kms = new AWS.KMS({region:'eu-west-1'});

    var secretPath = './encrypted-secret';
    var encryptedSecret = fs.readFileSync(secretPath);

    var params = { CiphertextBlob: encryptedSecret };

    kms.decrypt(params, function(err, data) {

        if (err) {
            debug(err, err.stack);
            callback(err);
            return;
        }

        var decryptedScret = data['Plaintext'].toString();

        // learn packaged dialects

        _.each(pkg.dependencies, function(ver, dep) {
            if (dep.indexOf("dialect-")>=0) {
                debug("install: "+dep+" @ "+ver);
                apigeek.dialect.learn(require(dep),dep);
            }
        });

        // execute

        apigeek.config.name = pkg.name;
        apigeek.execute();

        debug(decryptedScret);
        done(null, event.key1);
    });
};