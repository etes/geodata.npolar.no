/**
 * Module dependencies.
 */

var express = require('express');

var app = express();

// all environments
//app.use(express.favicon());
app.use(express.static("viewer"));
var port = process.argv[2];
if (!port){
  app.listen(8888);
  console.log("Listening on default port 8888");
} else{
  app.listen(port);
  console.log('Listening on port ' + port + '...');
}
