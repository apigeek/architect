var assert = require("assert");
var util = require("util");

module.exports = {

    toFeatureFile: function(path) {
        if (path.indexOf(".feature")>0) {
            return path;
        }
        return path+".feature";
    },

    handleError: function(e, res, msg, logger) {
        assert(e, "Missing Error");
        assert(res, "Missing response");
        msg = msg || "";

        if (e.code == "ENOENT") {
            res.sendStatus(404);
        } else {
            logger && logger.error(util.format("FATAL %s: %s", msg, e));
            res.sendStatus(500);
        }
    }
}