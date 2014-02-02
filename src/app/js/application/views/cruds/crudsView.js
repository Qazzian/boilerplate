define(['jquery', 'underscore','backbone', 'marionette','views/cruds/crudItemView'],
    function ($, _, Backbone, Marionette, ItemView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CollectionView.extend({
            itemView:ItemView,
            tagName:"ul",
            className:"nav nav-pills nav-stacked",

            onAfterItemAdded: function(itemView){
                this.listenTo(itemView,"activated",this.onChildActivated);
            },

            onItemRemoved: function(itemView){
                itemView.off("activated",this.onChildActivated);
            },

            onChildActivated:function(itemView){
                this.children.each(function(childView){
                    if(childView != itemView && childView.isActive()) {
                        childView.isActive(false,true);
                    }
                });
                this.trigger("itemSelected",itemView.model);
            },

            onRender: function () {
                this.$el.addClass('loading');

                this.on("collection:rendered", this.onRendered);

                if(this.collection) {
                    this.collection.fetch({
                        contentType: "application/json",
                        success: _.bind(function () {
                            this.$el.removeClass('loading');
                        },this)
                    });
                }
            },
            onRendered: function(){

                // make sure to activate the first item if none are active already
                var active=null;
                this.children.each(function(child){
                    if(!active) {
                        active = child;
                    }
                    if(child.isActive()) {
                        active = child;
                    }
                });

                active.isActive(true);
            }
        });
    });