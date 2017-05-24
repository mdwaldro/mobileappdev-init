    var mcsConfig = {
       "logLevel": 2,
        "mobileBackends": {
            "JET_MCS_APPDEV": {
                "default": true,               
                  "baseUrl": typeof cordova === "object" ? "https://mcsdem051017-mcsdem051017.mobileenv.us2.oraclecloud.com:443" : "http://localhost:8000",
                "applicationKey": "9a9979d6-48d4-4d8a-b4d5-0b55f82d0b3a",
                "authorization": {
                    "basicAuth": {
                        "backendId": "022dc407-60fc-40da-8324-ff4e35a0c53e",
                        "anonymousToken": "TUNTREVNMDUxMDE3X01DU0RFTTA1MTAxN19NT0JJTEVfQU5PTllNT1VTX0FQUElEOlViZ2Nqb2R0aTB3NF9r"
                    },
                    "oAuth": {
                        "clientId": "c673a039-cac0-4678-acd6-7b0484042a34",
                        "clientSecret": "xHYXXYkaIGUIUhRkqKg8",
                        "tokenEndpoint": "https://mcsdem051017.identity.us.oraclecloud.com/oam/oauth2/tokens"
                    }
                }
            }
        }
    };


define(['jquery', 'mcs'], function ($, mcs) {
    //define MCS mobile backend connection details
    var mcs_config = {
        "logLevel": mcs.logLevelInfo,
        "mobileBackends": {
            "JET_MCS_APPDEV": {
                "default": true,
               "baseUrl": typeof cordova === "object" ? "https://mcsdem051017-mcsdem051017.mobileenv.us2.oraclecloud.com:443" : "http://localhost:8000",
                "applicationKey": "9a9979d6-48d4-4d8a-b4d5-0b55f82d0b3a",
                "authorization": {
                    "basicAuth": {
                        "backendId": "022dc407-60fc-40da-8324-ff4e35a0c53e",
                        "anonymousToken": "TUNTREVNMDUxMDE3X01DU0RFTTA1MTAxN19NT0JJTEVfQU5PTllNT1VTX0FQUElEOlViZ2Nqb2R0aTB3NF9r"
                    },
                    "oAuth": {
                        "clientId": "c673a039-cac0-4678-acd6-7b0484042a34",
                        "clientSecret": "xHYXXYkaIGUIUhRkqKg8",
                        "tokenEndpoint": "https://mcsdem051017.identity.us.oraclecloud.com/oam/oauth2/tokens"
                    }
                }
            }
        }
    };
 
    function MobileBackend() {
        var self = this;
        self.mobileBackend;
        //Always using the same collection in this example, called JETCollection. Can be dynamic if using multiple collections, but for example using one collection.
        var COLLECTION_NAME = "JETCollection";
        function init() {
            mcs.MobileBackendManager.setConfig(mcs_config);
            //MCS backend name for example is JETSample. 
            self.mobileBackend = mcs.MobileBackendManager.getMobileBackend('JET_MCS_APPDEV');
            self.mobileBackend.setAuthenticationType("basicAuth");            
        }
 
        //Handles the success and failure callbacks defined here
        //Not using anonymous login for this example but including here. 
        self.authAnonymous = function () {
            console.log("Authenticating anonymously");
            self.mobileBackend.Authorization.authenticateAnonymous(
                    function (response, data) {                        
                        console.log("Success authenticating against mobile backend");
                    },
                    function (statusCode, data) {
                        console.log("Failure authenticating against mobile backend");
                    }
            );
        };
 
        //This handles success and failure callbacks using parameters (unlike the authAnonymous example)
        self.authenticate = function (username, password, successCallback, failureCallback) {
            self.mobileBackend.Authorization.authenticate(username, password, successCallback, failureCallback);
        };
 
        //this handles success and failure callbacks using parameters
        self.logout = function (successCallback, failureCallback) {
            self.mobileBackend.Authorization.logout();
        };
 
        self.isAuthorized = function () {
            return self.mobileBackend.Authorization.isAuthorized;
        };
        
        self.uploadFile = function (filename, payload, mimetype, callback) {            
            self.getCollection().then(success);                        
             
            function success(collection) {                
                //create new Storage object and set its name and payload
                var obj = new mcs.StorageObject(collection);
                obj.setDisplayName(filename);
                obj.loadPayload(payload, mimetype);                
                return self.postObject(collection, obj).then(function (object) {                                        
                    callback(object);
                });
            }
        }
         
        //getCollection taken from official documentation example at site https://docs.oracle.com/cloud/latest/mobilecs_gs/MCSUA/GUID-7DF6C234-8DFE-4143-B138-FA4EB1EC9958.htm#MCSUA-GUID-7A62C080-C2C4-4014-9590-382152E33B24
        //modified to use JQuery deferred instead of $q as shown in documentaion
        self.getCollection = function () {
            var deferred = $.Deferred();
 
            //return a storage collection with the name assigned to the collection_id variable.
            self.mobileBackend.Storage.getCollection(COLLECTION_NAME, self.mobileBackend.Authorization.authorizedUserName, onGetCollectionSuccess, onGetCollectionFailed);
 
            return deferred.promise();
 
            function onGetCollectionSuccess(status, collection) {
                console.log("Collection id: " + collection.id + ", description: " + collection.description);
                deferred.resolve(collection);
            }
 
            function onGetCollectionFailed(statusCode, headers, data) {
                console.log(mcs.logLevelInfo, "Failed to download storage collection: " + statusCode);
                deferred.reject(statusCode);
            }
        };
 
        //postObject taken from official documentation example at site https://docs.oracle.com/cloud/latest/mobilecs_gs/MCSUA/GUID-7DF6C234-8DFE-4143-B138-FA4EB1EC9958.htm#MCSUA-GUID-7A62C080-C2C4-4014-9590-382152E33B24
        //modified to use JQuery deferred instead of $q as shown in documentaion
        self.postObject = function (collection, obj) {
            var deferred = $.Deferred();
 
            //post an object to the collection
            collection.postObject(obj, onPostObjectSuccess, onPostObjectFailed);
             
            return deferred.promise();
 
            function onPostObjectSuccess(status, object) {            
                console.log("Posted storage object, id: " + object.id);
                deferred.resolve(object.id);
            }
 
            function onPostObjectFailed(statusCode, headers, data) {
                console.log("Failed to post storage object: " + statusCode);
                deferred.reject(statusCode);
            }
        };

        self.invokeCustomCodeJSONRequest = function(Url, method, data, successCallback, failureCallback){
            self.mobileBackend.CustomCode.invokeCustomCodeJSONRequest(Url, method , data, successCallback, failureCallback);
        }
 
        init();
    }
 
    return new MobileBackend();
});