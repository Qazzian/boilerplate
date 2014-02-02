define(['underscore'],
    function (_) {

        var configValues = {};

        var configuration = {
            get:function(key){

                return configValues[key];
            },
            set:function(key,val){

                configValues[key] = val;
                return this;
            }
        };

        return configuration;
    });