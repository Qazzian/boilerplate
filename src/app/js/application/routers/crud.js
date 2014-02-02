define(['backbone', 'marionette','controllers/crud'], function(Backbone, Marionette,Controller) {
   var Router = Backbone.Marionette.AppRouter.extend({
       appRoutes: {
           "": "index",
           "/": "index"
       },
       initialize:function(){
           this.controller = new Controller();
       }

   });

    return Router;
});