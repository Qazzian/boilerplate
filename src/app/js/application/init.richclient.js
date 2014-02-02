// Include Desktop Specific JavaScript files here (or inside of your Desktop Controller, or differentiate based off App.mobile === false)
require(["app",   "jquery", "backbone", "marionette",'appConfig',"routers/crud",'views/richHeaderView','views/footerView', "bootstrap", "backbone.validateAll"],
    function (App, $, backbone,marionette,config,CRUDsAppRouter,headerView,footerView) {

        config.set('App.headerView',headerView);
        config.set('App.footerView',footerView);

        App.appRouter = new CRUDsAppRouter();
        App.start();
    });