var assert = require("assert");

module.exports = {

    toFeatureFile: function(path) {
        if (path.indexOf(".feature")>0) {
            return path;
        }
        return path+".feature";
    }
}