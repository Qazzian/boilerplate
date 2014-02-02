var configuration = {
    development: {
        db: {
            server: "localhost/sfdev"
        }
    },
    staging: {

    },
    production: {

    }
};

var env = 'development';

module.exports = {
    environment: function (val) {
        if (val) {
            if(configuration.hasOwnProperty(val)){
                env = val;
            } else {
                throw new Error("No environment exists with name " + val);
            }
        }
        return configuration[env];
    },
    /* props */
    getDB: function () {
        return configuration[env]['db'];
    }
};
