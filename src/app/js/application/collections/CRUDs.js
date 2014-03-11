define(["jquery", "backbone", "models/CRUD"],
    function ($, Backbone, Model) {
        // Creates a new Backbone Collection class object
        var Collection = Backbone.Collection.extend({
            url: '//api.Qazzian.com/crudable?raw=true',
            // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
            model: Model,
            fetch: function (options) {
                this.add(new Model({
                    name: {
                        first: "gidi",
                        last: "morris"
                    },
                    comments: "Dumbass"
                }));
                this.add(new Model({
                    name: {
                        first: "lev",
                        last: "morris"
                    },
                    comments: "young"
                }));
                this.add(new Model({
                    name: {
                        first: "Ariella",
                        last: "morris"
                    },
                    comments: "Coooooooookie!!!"
                }));
                this.add(new Model({
                    name: {
                        first: "Dina",
                        last: "Chakk"
                    },
                    comments:"Hamooooood!"
                }));

                options.success.call(this);
            }
        });

        return Collection;
    });