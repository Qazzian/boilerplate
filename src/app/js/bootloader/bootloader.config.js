(function (window, document, undefined) {

    window._boilerplate = window._boilerplate || {};

    window._boilerplate.config = {
        thin: [
            // basic style - load first so we have a loader image ASAP
            {type: 'css', args: ["resources/css/application.thin.min.css"]},
            // require.js
            {type: 'js', args: ["js/require.js", {"data-main": "js/config.js"}, true]},
            // initial r.js optimized file
            {type: 'js', args: ["js/init.thin.min.js"]}
        ],
        rich: [
            // basic style - load first so we have a loader image ASAP
            {type: 'css', args: ["resources/css/application.rich.min.css"]},
            // require.js
            {type: 'js', args: ["js/require.js", {"data-main": "js/config.js"}, true]},
            // initial r.js optimized file
            {type: 'js', args: ["js/init.rich.min.js"]}
        ]
    };

})(window, document);