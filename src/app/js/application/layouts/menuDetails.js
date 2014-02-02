define(['jquery', 'underscore','backbone', 'marionette','hbs!templates/layouts/menuDetails'],
    function ($, _, Backbone, Marionette, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.Layout.extend({
            template: template,
            className:"layout-menu-details",
            regions: {
                menu: ".menu",
                content: ".content"
            }
        });
    });