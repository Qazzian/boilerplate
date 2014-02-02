(function (window, document, undefined) {

    window._solidfoundation = window._solidfoundation || {};

    window._solidfoundation.config = {
        thin: [
            // basic style - load first so we have a loader image ASAP
            {type: 'css', args: ["resources/css/application.thin.css"]},
            // require.js
            {type: 'js', args: ["js/require.js", {"data-main": "js/config.js"}, true]},
            // initial r.js optimized file
            {type: 'js', args: ["js/init.thin.js"]}
        ],
        rich: [
            // basic style - load first so we have a loader image ASAP
            {type: 'css', args: ["resources/css/application.rich.css"]},
            // require.js
            {type: 'js', args: ["js/require.js", {"data-main": "js/config.js"}, true]},
            // initial r.js optimized file
            {type: 'js', args: ["js/init.rich.js"]}
        ]
    };

})(window, document);