SolidFoundation
===============

A starter project for a full JS stack end to end.<br/>
It isn't unique, there are many like it, but this one is mine with my choice of components.<br/>
If you want to build a project which is Javascript end to end, with integrated TDD workflows and proper seperation of Backend and front end - this might be the foundation for you.<br/>
I've seen many projects like this before but they never took into account the importance of seperating your front end code from the Node.js server entirely - which allows you to reduce your server costs by placing static assets on a CDN and improves your application's modularity.<br/>
This is my approach, I hope it proves useful to others.

### The stack
SolidFoundation is intended to provide a full stack - end to end to allow me to get to past the setup stage quickly and straight to developing a client's application.

####The stack includes:
1. A front end application built in **Backbone.js** with **Marionette.js** with dependencies on **jQuery, Twitter Bootstrap** and a few smaller libs.
2. A back end application built in **Node.js** with **Express.js** to provide a **RESTful API** for the backbone application and as a starting point for any offline tasks we need.
3. An **integrated testing environment** which tests the API code using Node.js and the Backbone application in a headless browser.
4. A **Test Driven Development** environment that reloads the code and tests it as you develop it. This allows us to get immediate feedback when code breaks.
5. Using **nginx** as a reverse proxy for the Node.js application we separate the API and Backbone applications completely under seperate sub domains- the API is at api.solidfoundation.com and the Backbone app is at app.solidfoundation.com. This means we will have no problem placing the front end app on a CDN later and only have to worry about hosting our REST api without having to develop anything else.
6. An integrated workflow and build environment using **Grunt.js** to provide many options when developing (see the Workflow section below.
7. Data storage is provided using **MongoDB** and **Mongoose** in the Node.js application

### Prerequisites
1. Node (brew install node )
2. MongoDB ( brew install mongodb )
3. Bower ( npm install -g bower )
4. Grunt ( npm install -g grunt-cli )

### Installation
(This assumes you wish to start a new application and not make changes to SolidFoundation itself).

* Clone the repo to your computer and then disconnect from the main remote Git repo
```bash
    git remote remove
```
* Create a new repo in github and add it as the remote for this new repo and push and update key in package.json
```bash
    git remote add [[APP_REPO]]
    git push origin
```
* run npm install to download all the modules
```bash
    npm install
```
* Find & replace any references to SolidFoundation which are placeholders for your application's name. They appear in the nginx.conf, bower.json, config.js files
* Add the API and APP domains (by default: api.solidfoundation.com, app.solidfoundation.com though you should have changed that in #4 above) to your /etc/hosts pointing back to 127.0.0.1
* Develop to your heart's content

### Workflow - development

Using Grunt.js there are 7 different workflows you can use for different things.

##### Server:build
To rebuild the code (which in turn is placed in the "target" folder) and then start the nginx, Mongo and Node servers.
Once it is running all you have to do is turn your browser to app.solidfoundation.com.
Note that depending on how you setuo your nginx installation you may have to use sudo as it stops and starts nginx.
```bash
   grunt server:build
```

##### Server
Start the nginx, Mongo and Node servers based on the source which is already in the target folder.
Once it is running all you have to do is turn your browser to app.solidfoundation.com.
```bash
   grunt server
```

##### Server:Dev
Rebuild the code, start the nginx, Mongo and Node servers and turn on the watches.
This is the ideal workflow for development - whener you save your code the build will run again and redeploy to your target folder allowing you to simply refresh the browser and use the new code.
It will update both the Front and Back end as you develop.
Once it is running all you have to do is turn your browser to app.solidfoundation.com.
```bash
   grunt server:dev
```

##### Server:TDD
Works like the Server:Dev workflow only in addition to rebuilding the active servers as you make changes the workflow will also run your tests - giving you immediate notification of code which breaks while your developing it.
If you do proper TDD/BDD and write your tests before writing the code then during development of new features this can really save your ass.
I know, it can be slightly annoying when developing new features, but when working on maintenance you will find this indespensible.
```bash
   grunt server:tdd
```

##### Server:Stage
Works like the Server:Build but builds the code in "staging" mode, which means the code is minified and prepared the way it woud be for production deployments.
```bash
   grunt server:stage
```

### Workflow - testing

##### Test
Run all the tests.
Using the current build in the "target" folder, this workflow will run jshint to make sure the code's quality is up to scratch, Node.js for the API tests and PhantomJS (using Karma) for the front end tests.
```bash
   grunt test
```

##### Test:clean
Run all the testsm like "grunt test", but do so on a fresh build.
```bash
   grunt test:clean
```

### Workflow - internals

##### Make
Run Bower package manager to see if any new versions of the libraries are available.
```bash
   grunt make
```

##### Clean
Clean the target folders removing the built code
```bash
   grunt clean
```

### File Structure

+ nginx - All the files for hosting the API and APP under separate domains through nginx
+ src - The source code, duh.
+  |_ api - The node.js REST api
+  |____ application - the source of the node.js REST application itself
+  |____ test- test specs for the Node app
+  |_ app - the source of front end Backbone appliation
+  |____ js / libraries / resources- The Backbone app and it's dependancies
+  |____ test - test configurations and specs for the front end app
+  |_ commons - Javascript components shared by both API and APP. This allos us to maintain a single, shared, code base for the entire application. End to end.
+ target - where code is placed when grunt "builds" it in preperation for serving in a dev environment or deployment
- .gitignore
- bower.json - config for the frontend package manager
- Gruntfile.js - the grunt configuration which manages all our workflows
- package.json - the configuration for the Node package manager


### Open Issues
1. There is a problem with the CORS implementation. Something to do with headers no being passed to the Express.js code properly.
For now a stub has been placed in the CRUDables collection on the front end to allow the demo to work, but the code in the API and the APP work perfectly, the problem is in the bridge throught the nginx.
