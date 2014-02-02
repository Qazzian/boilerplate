// Include Desktop Specific JavaScript files here (or inside of your Desktop Controller, or differentiate based off App.mobile === false)
require(["app", "jquery", "backbone", "marionette", "jquerymobile",'appConfig', "routers/crud",'views/thinHeaderView', 'views/footerView',"backbone.validateAll"],
    function (App, $, backbone,marionette,jqm,config,CRUDsAppRouter,headerView,footerView) {

        // Prevents all anchor click handling
        $.mobile.linkBindingEnabled = false;
        // Disabling this will prevent jQuery Mobile from handling hash changes
        $.mobile.hashListeningEnabled = false;

        config.set('App.headerView',headerView);
        config.set('App.footerView',footerView);

        App.appRouter = CRUDsAppRouter;
        App.start();
    });