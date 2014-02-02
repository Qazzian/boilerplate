define(['app', 'backbone', 'marionette','appConfig', 'collections/CRUDs','models/CRUD', 'layouts/menuDetails', 'views/cruds/crudsView',  'views/cruds/crudDetailsView'],
    function (App, Backbone, Marionette,config, CRUDsCollection, CRUDmodel,menuDetailsLayout, CrudsView, CrudDetailsView) {
        return Backbone.Marionette.Controller.extend({
            initialize:function (options) {
                // get views from config
                var HeaderView = config.get('App.headerView');
                var FooterView = config.get('App.footerView');

                // add them to page
                App.headerRegion.show(new HeaderView ());
                App.footerRegion.show(new FooterView());
            },
            index:function () {
                var data = new CRUDsCollection();

                var layout = new menuDetailsLayout();
                App.mainRegion.show(layout);

                var crudsView = new CrudsView({
                    collection : data
                });
                var crudDetailsView = new CrudDetailsView({
                });
                crudDetailsView.listenTo(crudsView, "itemSelected",crudDetailsView.applyModel);

                layout.menu.show(crudsView);
                layout.content.show(crudDetailsView);


            },
            getById:function () {
                App.mainRegion.show(new CrudDetailsView());
            }
        });
    });