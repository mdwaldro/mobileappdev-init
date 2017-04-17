/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */

requirejs.config(
{
  baseUrl: 'js',

  // Path mappings for the logical module names
  paths:
//injector:mainReleasePaths

  {
    'knockout': 'libs/knockout/knockout-3.4.0.debug',
    'jquery': 'libs/jquery/jquery-3.1.0',
    'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0',
    'promise': 'libs/es6-promise/es6-promise',
    'hammerjs': 'libs/hammer/hammer-2.0.8',
    'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
    'ojs': 'libs/oj/v2.3.0/debug',
    'ojL10n': 'libs/oj/v2.3.0/ojL10n',
    'ojtranslations': 'libs/oj/v2.3.0/resources',
    'text': 'libs/require/text',
    'signals': 'libs/js-signals/signals',
    'customElements': 'libs/webcomponents/CustomElements',
    'proj4': 'libs/proj4js/dist/proj4-src',
    'css': 'libs/require-css/css',
    'mcs': 'mcs/mcs',
    'mbe':'mcs/mbe'
  }
  
//endinjector
  ,
  // Shim configurations for modules that do not expose AMD
  shim:
  {
    'jquery':
    {
      exports: ['jQuery', '$']
    }
  }
}
);

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', 'appController', 'mbe', 'mcs', 'ojs/ojknockout',
  'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojbutton'],
  function (oj, ko, app, mbe, mcs) { // this callback gets executed when all required modules are loaded

    function MainViewModel() {
      var self = this;
      self.router = app.router;
      self.navDataSource = app.navDataSource;
      self.navChangeHandler = app.navChangeHandler;
      self.toggleDrawer = app.toggleDrawer;

      // Sample user data
      self.userName = ko.observable("James");

      mbe.authenticate('logistics', 'Cl0udUs3r',function(statusCode, data){
        console.log(statusCode, data);
      }, 
      function(statusCode, data){
        console.log(statusCode, data);
      });

      // mbe.invokeCustomCodeJSONRequest("MobileTwitterMicroservice/MyMobileTwitterResource" , "GET" , null, function(statusCode, data){
      //   console.log(statusCode, data);
      // }, 
      // function(statusCode, data){
      //   console.log(statusCode, data);
      // });  

    }

    $(function() {
      
      function init() {
        oj.Router.sync().then(
          function () {
            // Bind your ViewModel for the content of the whole page body.
            ko.applyBindings(new MainViewModel(), document.getElementById('globalBody'));
            // Adjust the content top and bottom margins after the header bindings have been applied.
            app.adjustContentPadding();
          },
          function (error) {
            oj.Logger.error('Error in root start: ' + error.message);
          }
        );
      }

      // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready 
      // event before executing any code that might interact with Cordova APIs or plugins.
      if ($(document.body).hasClass('oj-hybrid')) {
        document.addEventListener("deviceready", init);
      } else {
        init();
      }

    });

  }
);
