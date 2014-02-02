requirejs.config({
    /*****
     * THIS PART IS ONE-to-ONE COPY OF Require.js APP CONFIG
     */
    baseUrl:"./js/application",
    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    // probably a good idea to keep version numbers in the file names for updates checking
    paths:{
        // Core Libraries
        "jquery":"../../libraries/jquery/js/jquery",
        "jqueryui":"../../libraries/jquery.mobile/js/jqueryui",
        "jquerymobile":"../../libraries/jquery.mobile/js/jquery.mobile",
        "jquerycookie":"../../libraries/jquery.cookie/js/jquery.cookie",
        "underscore":"../../libraries/underscore/js/underscore",
        "backbone":"../../libraries/backbone/js/backbone",
        "marionette":"../../libraries/backbone.marionette/js/backbone.marionette",
        "handlebars":"../../libraries/require-handlebars-plugin/js/hbs/handlebars",
        "hbs":"../../libraries/require-handlebars-plugin/js/hbs",
        "i18nprecompile":"../../libraries/require-handlebars-plugin/js/hbs/i18nprecompile",
        "json2":"../../libraries/require-handlebars-plugin/js/hbs/json2",

        // Plugins
        "backbone.validateAll":"../../libraries/Backbone.validateAll/js/Backbone.validateAll",
        "bootstrap":"../../libraries/bootstrap/js/bootstrap",
        "text":"../../libraries/text/js/text"
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim:{
        // Twitter Bootstrap jQuery plugins
        "bootstrap":["jquery"],
        // jQueryUI
        "jqueryui":["jquery"],
        // jQuery mobile
        "jquerymobile":["jqueryui"],

        // jQuery cookie
        "jquerycookie":["jquery"],

        // Underscore
        "underscore":{
            // Exports the global window._ object
            "exports":"_"
        },
        // Backbone
        "backbone":{
            // Depends on underscore/lodash and jQuery
            "deps":["underscore", "jquery"],
            // Exports the global window.Backbone object
            "exports":"Backbone"
        },
        //Marionette
        "marionette":{
            "deps":["underscore", "backbone", "jquery"],
            "exports":"Marionette"
        },
        //Handlebars
        "handlebars":{
            "exports":"Handlebars"
        },
        // Backbone.validateAll plugin that depends on Backbone
        "backbone.validateAll":["backbone"],

        "jasmine": {
            // Exports the global 'window.jasmine' object
            "exports": "jasmine"
        },

        "jasmine-html": {
            "deps": ["jasmine"],
            "exports": "jasmine"
        }
    },
    // hbs config - must duplicate in Gruntfile.js Require build
    hbs: {
        templateExtension: "html",
        helperDirectory: "templates/helpers/",
        i18nDirectory: "templates/i18n/",

        compileOptions: {}        // options object which is passed to Handlebars compiler
    }
});