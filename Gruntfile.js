module.exports = function(grunt) {
    grunt.initConfig({
        licensechecker: {
            options: {
                warn: true,
                outFile: null,
                acceptable: [ 'MIT', 'MIT/X11', 'BSD', 'ISC', 'Apache2.0' ]
            }
        },
    });

    grunt.loadNpmTasks('grunt-licensechecker');
    grunt.registerTask('default', ['licensechecker']);
}

