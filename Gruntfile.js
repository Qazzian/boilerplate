module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    targetDir: 'src/app/libraries',
                    layout: 'byComponent',
                    cleanBowerDir: true
                }
            }
        },

        clean: {
            app: {
                src: ['target/app/*']
            },
            appcss: {
                src: ['target/app/resources/css/*']
            },
            api: {
                src: ['target/api/*']
            }
        },


        less: {
            dev: {
                options: {
                    strictImports:true,
                    paths:['src/app/resources/less/']
                },
                files: {
                    'target/app/resources/css/application.thin.css': [
                        'src/app/libraries/html5-boilerplate/css/main.css',
                        'src/app/libraries/html5-boilerplate/css/normalize.css',
                        'src/app/resources/less/thinclient.less'
                    ],
                    'target/app/resources/css/application.rich.css': [
                        'src/app/libraries/html5-boilerplate/css/main.css',
                        'src/app/libraries/html5-boilerplate/css/normalize.css',
                        'src/app/resources/less/richclient.less'
                    ]
                }
            },
            stage: {
                options: {
                    strictImports:true,
                    report:'gzip',
                    cleancss: true,
                    paths:['src/app/resources/less/']
                },
                files: {
                    'target/app/resources/css/application.thin.min.css': [
                        'src/app/libraries/html5-boilerplate/css/main.css',
                        'src/app/libraries/html5-boilerplate/css/normalize.css',
                        'src/app/resources/less/thinclient.less'
                    ],
                    'target/app/resources/css/application.rich.min.css': [
                        'src/app/libraries/html5-boilerplate/css/main.css',
                        'src/app/libraries/html5-boilerplate/css/normalize.css',
                        'src/app/resources/less/richclient.less'
                    ]
                }
            }
        },

//        concat: {
//            'target/app/<%= pkg.name %>.js': ['target/app/vendor.js', 'target/app/app.js']
//        },

        copy: {
            devapp: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/app/resources/img',
                        src: ['**'],
                        dest: 'target/app/resources/img'
                    },
                    {
                        expand: true,
                        cwd: 'src/app',
                        src: ['*.html'],
                        dest: 'target/app/'
                    },
                    {
                        expand: true,
                        cwd: 'src/app/libraries/bootstrap/fonts',
                        src: ['**'],
                        dest: 'target/app/resources/fonts'
                    }
                ]
            },
            devapi: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/api/application/',
                        src: ['**'],
                        dest: 'target/api/'
                    }
                ]
            },
            stageapp: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/app/resources/img',
                        src: ['**'],
                        dest: 'target/app/resources/img'
                    },
                    {
                        expand: true,
                        cwd: 'src/app',
                        src: ['*.html'],
                        dest: 'target/app/'
                    },
                    {
                        expand: true,
                        cwd: 'src/app/libraries/bootstrap/fonts',
                        src: ['**'],
                        dest: 'target/app/resources/fonts'
                    }
                ]
            },
            stageapi: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/api/application/',
                        src: ['**'],
                        dest: 'target/api/'
                    }
                ]
            },
        },

        // Javascript minification for files
        // which are outside the scope of the RequireJS plugin
        uglify: {
            dev: {
                options: {
                    mangle: false,
                    compress: false,
                    preserveComments: true,
                    verbose: true
                },
                files: [
                    {
                        src: 'src/app/libraries/r.js/js/require.js',
                        dest: 'target/app/js/require.js'
                    },
                    {
                        src: 'src/app/js/bootloader/config.js',
                        dest: 'target/app/js/config.js'
                    },
                    {
                        'target/app/js/boot.js': ['src/app/js/bootloader/bootloader.dev.config.js','src/app/js/bootloader/bootloader.js']
                    }
                ]
            },
            stage: {
                options: {
                    compress: true,
                    verbose: true
                },
                files: [
                    {
                        src: 'src/app/libraries/r.js/js/require.js',
                        dest: 'target/app/js/require.js'
                    },
                    {
                        src: 'src/app/js/bootloader/config.js',
                        dest: 'target/app/js/config.js'
                    },
                    {
                        'target/app/js/boot.js': ['src/app/js/bootloader/bootloader.config.js','src/app/js/bootloader/bootloader.js']
                    }
                ]
            }
        },

        // for changes to the front-end code
        watch: {
            scripts: {
                files: ['src/app/js/application/**/*.js', 'src/app/js/application/**/*.json', 'src/app/js/application/templates/*.html', 'src/app/js/application/templates/**/*.html'],
                tasks: ['clean:app', 'build:devapp']
            },
            apiscripts: {
                files: ['src/api/applcation/**/*.js'],
                tasks: ['clean:api', 'build:devapi']
            },
            less: {
                files: ['src/app/resources/less/*.less'],
                tasks: ['clean:appcss','less:dev']
            },
            /***
             * Test driver development - keep running tests as we develop
             **/
            tdd: {
                files: ['src/app/js/application/**/*.js'],
                tasks: ['clean:app', 'build:devapp','requirejs:specs','jshint', 'karma:tdd:run','jasmine_node']
            },
            nginx: {
                files: ['nginx/nginx.conf'],
                tasks: ['nginx:restart']
            }
        },

        // for changes to the node code
        // If you change the Node port remember to change the port
        // in the nginx.conf for the proxypass
        nodemon: {
            dev: {
                script: 'target/api/app.js',
                options: {
                    nodeArgs: ['--debug'],
                    watch: ['target/api', 'target/api/**'],
                    env: {
                        PORT: '3300',
                        NODE_ENV: 'development'
                    }
                }
            },
            stage: {
                script: 'target/api/app.js',
                options: {
                    env: {
                        PORT: '3300',
                        NODE_ENV: 'staging'
                    }
                }
            }
        },

        nginx: {
            options: {
                config: 'nginx/nginx.conf',
                prefix: '.'
            }
        },


        // mongod server launcher
        shell: {
            mongo: {
                command: 'mongod',
                options: {
                    async: true
                }
            },
            nginxstop: {
                command: 'nginx -s stop',
                options: {
                    async: false,
                    // ignore error when ngins isn't running
                    // this isn't elegant, but its what I found that worked :/
                    failOnError: false
                }
            }
        },

        concurrent: {
            dev: {
                tasks: ['nodemon:dev', 'shell:mongo', 'nginx:start'],
                options: {
                    limit: 10,
                    logConcurrentOutput: true
                }
            },
            devwatch: {
                tasks: ['nodemon:dev', 'shell:mongo', 'nginx:start','watch:scripts','watch:apiscripts','watch:less','watch:test','watch:nginx'],
                options: {
                    limit: 10,
                    logConcurrentOutput: true
                }
            },
            tdd: {
                tasks: ['nodemon:dev', 'shell:mongo', 'nginx:start','watch:tdd'],
                options: {
                    logConcurrentOutput: true
                }
            } ,
            stage: {
                tasks: ['nodemon:dev', 'shell:mongo', 'nginx:start'],
                options: {
                    limit: 10,
                    logConcurrentOutput: true
                }
            }
        },

        requirejs: {
            /*DEV ENV*/
            thinClient: {
                options: {
                    baseUrl: "src/app/js/application",
                    wrap: true,
                    // Don't use almond if your project needs to load modules dynamically
                    name: "../../libraries/almond/js/almond",
                    preserveLicenseComments: true,
                    optimize: "none",
                    mainConfigFile: "src/app/js/bootloader/config.js",
                    include: ["init.thinclient"],
                    out: "target/app/js/init.thin.js",

                    pragmasOnSave: {
                        //removes Handlebars.Parser code (used to compile template strings) set
                        //it to `false` if you need to parse template strings even after build
                        excludeHbsParser : true,
                        // kills the entire plugin set once it's built.
                        excludeHbs: true,
                        // removes i18n precompiler, handlebars and json2
                        excludeAfterBuild: true
                    },

                    locale: "en_us",

                    // options object which is passed to Handlebars compiler
                    hbs : {
                        templateExtension: "html",
                        helperDirectory: "templates/helpers/",
                        i18nDirectory: "templates/i18n/",

                        compileOptions: {}
                    }
                }
            },
            richClient: {
                options: {
                    baseUrl: "src/app/js/application",
                    wrap: true,
                    // Cannot use almond since it does not currently appear to support requireJS's config-map
                    name: "../../libraries/almond/js/almond",
                    preserveLicenseComments: true,
                    optimize: "none",
                    mainConfigFile: "src/app/js/bootloader/config.js",
                    include: ["init.richclient"],
                    out: "target/app/js/init.rich.js"
                }
            },
            /*STAGING ENV*/
            minThinClient: {
                options: {
                    baseUrl: "src/app/js/application",
                    wrap: true,
                    // Don't use almond if your project needs to load modules dynamically
                    name: "../../libraries/almond/js/almond",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    optimizeCss: "standard",
                    mainConfigFile: "src/app/js/bootloader/config.js",
                    include: ["init.thinclient"],
                    out: "target/app/js/init.thin.min.js",

                    pragmasOnSave: {
                        //removes Handlebars.Parser code (used to compile template strings) set
                        //it to `false` if you need to parse template strings even after build
                        excludeHbsParser : true,
                        // kills the entire plugin set once it's built.
                        excludeHbs: true,
                        // removes i18n precompiler, handlebars and json2
                        excludeAfterBuild: true
                    },

                    locale: "en_us",

                    // options object which is passed to Handlebars compiler
                    hbs : {
                        templateExtension: "html",
                        helperDirectory: "templates/helpers/",
                        i18nDirectory: "templates/i18n/",

                        compileOptions: {}
                    }
                }
            },
            minRichClient: {
                options: {
                    baseUrl: "src/app/js/application",
                    wrap: true,
                    // Cannot use almond since it does not currently appear to support requireJS's config-map
                    name: "../../libraries/almond/js/almond",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    mainConfigFile: "src/app/js/bootloader/config.js",
                    include: ["init.richclient"],
                    out: "target/app/js/init.rich.min.js"
                }
            } ,
            specs: {
                options: {
                    baseUrl: "src/app/js/application",
                    wrap: true,
                    name: "../../libraries/almond/js/almond",
                    preserveLicenseComments: true,
                    optimize: "none",
                    mainConfigFile: "src/app/js/bootloader/config.js",
                    include: ["../../test/test.launcher.js"],
                    out: "target/test/tests.js"
                }
            }
        },

        /**
         * Convert Node packages into RequireJS packages.
         * This allows us to use Jasmin to test the API code along side
         * the APP code
         * */
//        browserify: {
//            test: {
//                files: {
//                    'target/test/tests.js': [
//                        'src/test/specs/app/appConfig.test.js',
//                        'src/test/test.launcher.js'
//                    ]
//                },
//                options: {
//                    external: ['jquery', 'underscore', 'backbone', 'backbone.marionette']
//                }
//            }
//        },

        jshint: {
            files: ['Gruntfile.js', 'src/app/js/application/*.js','src/app/js/application/**/*.js', '!target/app/js/*.min.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: false,
                    module: true,
                    document: true
                }
            }
        },

        /***
         * Testing for the APP - in a headless browser
         * */
        karma: {
            options: {
                configFile: 'src/app/test/test.config.js'
            },
            /**
             * TDD testing
             * */
            tdd: {
                background: true,
                runnerPort: 9872
            },
            /**
             * Continuous Integration testing
             * */
            ci: {
                singleRun: true
            }
        },
        /***
         * Testing for the API - in Node
         */
        jasmine_node: {
            specFolders: ["src/api/test/specs"], // load only specs containing specNameMatcher
            projectRoot: "target/api",
            requirejs: false,
            forceExit: true,
            jUnit: {
                report: false,
                savePath : "target/test/reports/api/",
                useDotNotation: true,
                consolidate: true
            }
        }
    });

    grunt.registerTask('make', ['clean', 'bower']);

    grunt.registerTask('build', ['clean', 'build:devapi','build:devapp']);
    grunt.registerTask('build:devapi', ['copy:devapi']);
    grunt.registerTask('build:devapp', ['copy:devapp','less:dev','uglify:dev','requirejs:richClient', 'requirejs:thinClient']);

    grunt.registerTask('build:stage', ['clean','build:stageapi','build:stageapp','jshint']);
    grunt.registerTask('build:stageapi', ['copy:stageapi']);
    grunt.registerTask('build:stageapp', ['copy:stageapp','less:stage','uglify:stage','requirejs:minRichClient', 'requirejs:minThinClient']);

    /**
     * grunt server:run - run the server without rebuilding
     * */
    grunt.registerTask('server', ['shell:nginxstop', 'concurrent:dev']);
    /**
     * grunt server - rebuild the application and run the server
     * */
    grunt.registerTask('server:build', ['build','server']);
    /***
     * grunt server:dev - rebuild the application and run with a watch on files to rebuilt when changed
     */
    grunt.registerTask('server:dev', ['build:dev', 'shell:nginxstop', 'concurrent:devwatch']);

    /***
     * Test Driven Development - test as you code
     */
    grunt.registerTask('server:tdd', ['build:dev', 'shell:nginxstop','karma:tdd:start', 'concurrent:tdd']);

    /***
     * grunt server:stage - rebuild the application with minification like production and run
     */
    grunt.registerTask('server:stage', ['build:stage', 'shell:nginxstop', 'concurrent:stage']);

    /***
     * Run tests
     */
    grunt.registerTask('test', ['jshint','jasmine_node','karma:ci']);

    /***
     * Rebuild codebase and run tests
     */
    grunt.registerTask('test:clean', ['build','requirejs:specs','test']);
};
