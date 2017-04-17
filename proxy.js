/* global __dirname */

var express = require('express');
var httpProxy = require('express-http-proxy');
var proxyConfig = require('./proxy-config.json');

var apiForwardingUrl = proxyConfig.apiServer;

var server = express();
server.set('port', proxyConfig.port);
server.use(express.static(__dirname + '/src'));
server.use('/css/libs/oj/v2.0.0/common', express.static(__dirname+'/src/css/libs/common'));
server.use('/css/libs/oj', express.static(__dirname+'/hybrid/merges/'+ proxyConfig.platform + '/css/libs/oj'));

//var apiProxy = httpProxy.createProxyServer({secure: false});

console.log('Forwarding API requests to ' + apiForwardingUrl);

server.all('/mobile/*', httpProxy(apiForwardingUrl, {
    forwardPath: function(req, res) {
      return require('url').parse(req.url).path;
    }
}));
server.listen(server.get('port'), function() {
    console.log('Express server listening on port ' + server.get('port'));
});
