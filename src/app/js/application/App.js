define(['jquery', 'backbone', 'marionette', 'underscore', 'hbs/handlebars','utilities/userAgent'],
    function ($, Backbone, Marionette, _, Handlebars,userAgent) {

        var App = new Backbone.Marionette.Application();
        App.mobile = userAgent.isMobile();

        // Define the page regions into which the App injects views and layouts
        App.addRegions({
            headerRegion:"header",
            mainRegion:"#main",
            footerRegion:"footer"
        });

        App.addInitializer(function () {
            Backbone.history.start();
        });

        return App;
    });