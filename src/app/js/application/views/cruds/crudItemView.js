define(['jquery', 'hbs!templates/cruds/crudItemView', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            tagName:'li',
            template:template,
            events: {
                'click' : 'onClick'
            },
            initialize: function(){
                this.listenTo(this.model, "change", this.render );
            },
            onClick:function(e){
                this.isActive(true);
            },
            isActive:function(val,silent){
                if(typeof val == "boolean") {
                    if(val) {
                        this.$el.addClass('active');
                        if(!silent) {
                            this.trigger('activated',this);
                        }
                    } else {
                        this.$el.removeClass('active');
                        if(!silent) {
                            this.trigger('deactivated',this);
                        }
                    }
                }
                return this.$el.hasClass('active');
            }
        });
    });