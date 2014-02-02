var config = require("../../application/config");

describe("API Config", function () {
    it("should have a configuration for the Development environment", function () {
        expect(config.environment('development')).not.toBeNull();
    });
    it("should have a configuration for the Staging environment", function () {
        expect(config.environment('staging')).not.toBeNull();
    });
    it("should have a configuration for the Production environment", function () {
        expect(config.environment('production')).not.toBeNull();
    });
    it("should throw an error for non existant environments", function () {
        expect(function(){
            config.environment('deployed');
        }).toThrow();
    });
});   