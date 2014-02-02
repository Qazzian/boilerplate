require(['specs/appconfig.test','specs/app.test'],function(){

    beforeEach(function() {
        var matchers = {
            toBeAFunction: function(object) {
                return object && getClass.call(object) == '[object Function]';
            }
        };

        this.addMatchers(matchers);
    });

    window.__karma__.start();
});