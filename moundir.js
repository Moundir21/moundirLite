const {JSDOM} = require("jsdom");
const fs = require("fs");
const port =3000;
const express = require("express");
var app = express();
app.get("/", async function(req,res){

    var xml= fs.readFileSync("./public/library","utf8");
const dom = new JSDOM(xml, { contentType: 'text/xml' });
     var doc = dom.window.document;
    

}).listen(port);