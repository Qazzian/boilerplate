(function(window,document, UA, undefined) {

    window._boilerplate = window._boilerplate || {};


    // The safest thing is always searching for a local script tag because on a malformed page you
    // may not have a HEAD (developers today are getting dumber and dumber)
    // but a script tag must be on the page... otherwise this code wouldn't be executing, would it?
    var injectionTag = document.getElementsByTagName("script")[0];

    /***
     * Insert an HTML element after another
     * @param referenceNode
     * @param newNode
     */
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    window._boilerplate.inject = {
            css: function(src, callback) {
                var styleTag = document.createElement("link");
                styleTag.type = "text/css";
                styleTag.rel = "stylesheet";
                styleTag.href = src;
                insertAfter(injectionTag,styleTag);
                injectionTag = styleTag;
                if(callback) {
                    callback();
                }
            },
            js: function(src,attrs, async, callback) {

                // attrs,async and callback are optional
                if(typeof attrs == 'function') {
                    callback = attrs;
                    attrs = false;
                    async = false;
                } else if(typeof attrs == 'boolean') {
                    callback = async;
                    async = attrs;
                    attrs = false;
                }
                if(typeof async == 'function') {
                    callback = async;
                    async = false;
                }


                var scriptTag = document.createElement("script");
                scriptTag.type = "text/javascript";
                if(typeof callback == 'function'){
                    if (scriptTag.readyState) {  // IE
                        scriptTag.onreadystatechange = function() {
                            if (scriptTag.readyState == "loaded" || scriptTag.readyState == "complete") {
                                scriptTag.onreadystatechange = null;
                                callback();
                            }
                        };
                    } else {  // Other Browsers
                        scriptTag.onload = function() {
                            callback();
                        };
                    }
                }

                if(typeof attrs == 'object') {
                    for(var attr in attrs) {
                        if(attrs.hasOwnProperty(attr)) {
                            scriptTag.setAttribute(attr,attrs[attr]);
                        }
                    }
                }

                if(async) {
                    scriptTag.async = true;
                }

                scriptTag.src = src;
                insertAfter(injectionTag,scriptTag);
                injectionTag = scriptTag;
            },
            require:function(scripts,callback){
                if(typeof scripts == "string") {
                    scripts = [scripts];
                }

                if(typeof require == 'function') {
                    if(typeof callback == 'function') {
                        require(scripts,callback);
                    } else {
                        require(scripts);
                    }
                }

            }
        };

    var configType = ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(UA)? 'thin' : 'rich');

    // check the config, load the files by order by passing the arguments from the config to the specified function
    if(window._boilerplate.config && window._boilerplate.config[configType] instanceof Array) {

        var filesToLoad = window._boilerplate.config[configType].splice(0,window._boilerplate.config[configType].length);
        /***
         * Inject all the files one after the next - like a ful blown loader would do
         * @param curr
         * @param files
         */
        var injectRecursively = function(curr,files){
            if(curr instanceof Array) {
                files = curr;
                curr = files.shift();
            }
            if(curr.type && typeof window._boilerplate.inject[curr.type] == 'function' && curr.args instanceof Array) {

                //add callback at end to call next file
                curr.args.push(function(){
                    if(files.length) {
                        injectRecursively(files.shift(),files);
                    }
                });

                window._boilerplate.inject[curr.type].apply(window,curr.args);
            }
        };

        injectRecursively(filesToLoad);
    }

})(window, document,navigator.userAgent || navigator.vendor || window.opera);