SolidFoundation
===============

A starter project for a full JS stack end to end. It isn't unique, there are many like it, but this one is mine with my choice of components.


### Prerequisites
1. Node (brew install node )
2. MongoDB ( brew install mongodb )
3. Bower ( npm install -g bower )
4. Grunt ( npm install -g grunt-cli )

### Installation

1. Disconnect from the remote Git repo
```bash
    git remote remove
```
2. Create a new repo in github and add it as the remote for this new repo and push and update key in package.json
```bash
    git remote add [[APP_REPO]]
    git push origin
```
3. Find & replace the Application metadata placeholders app name & desc with your application name & desc in package.json
4. Find & replace any references to SolidFoundation which are placeholders for your application's name. They appear in the nginx.conf, bower.json, config.js files
5. Add the API and APP domains (by default: api.solidfoundation.com, app.solidfoundation.com though you should have changed that in #4 above) to your /etc/hosts pointing back to 127.0.0.1
 6.

### File Structure

+ nginx - All the files for hosting the API and APP under separate domains through nginx
+ src - The source code, duh.
+  |_ api - the source of the node.js REST api
+  |_ app - the source of front end Backbone appliation
+  |_ commons - Javascript components shared by both API and APP. This allos us to maintain a single, shared, code base for the entire application. End to end.
+  |_ test - The testing suites
- .gitignore
- bower.json - config for the frontend package manager
- Gruntfile.js - the grunt configuration which manages all our workflows
- package.json - the configuration for the Node package manager
