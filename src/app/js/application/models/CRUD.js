define(["jquery", "backbone"],
    function($, Backbone) {
        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({

            // Model Constructor
            initialize: function() {

            },

            // Default values for all of the Model attributes
            defaults: {
                name :{
                    first : "",
                    last: ""
                },
                comments : ""
            },


            // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {
                var errors = false;
                if(typeof attrs.name != 'object') {
                    errors = errors || {};
                    errors.name = "Invalid name format";
                } else if((typeof attrs.name.first != 'string' || attrs.name.first.length === 0) || (typeof attrs.name.last != 'string' || attrs.name.last.length === 0)) {
                    errors = errors || {};
                    errors.name = "Both first and last names must be specified.";
                }
                if(typeof attrs.comments != 'string' || attrs.comments.length === 0) {
                    errors = errors || {};
                    error.comments = "Invalid Quote format";
                }
                if(errors){
                    return errors;
                }
            }

        });

        // Returns the Model class
        return Model;

    }

);