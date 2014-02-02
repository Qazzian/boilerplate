define(['backbone', 'marionette', 'jquery', 'jquerymobile', 'hbs!templates/thinHeader'],
    function (Backbone, Marionette, $, jqm, template) {
        return Backbone.Marionette.ItemView.extend({
            template: template,
            initialize: function() {

            },
            onRender: function() {
                this.$el.navbar();
            }
        });
    });