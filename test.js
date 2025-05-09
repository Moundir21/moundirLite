const port = 3000;
const express = require("express");
var fs = require("fs");
var { MongoClient } = require("mongodb");
var app = express();
var uri = "mongodb://localhost:27017/";

app.get("/",async function(req,res){

  var client = new MongoClient(uri);
  await client.connect();  
   res.write("<h1> the Connection succefuly");
  var db = client.db("Moundir");
  var customers = db.collection("customers");
  var values = [
      { name: 'moundir',  address: 'Giza 71'},
      {name: 'moundir',   address: 'Al_Badrashen 4'},
      { name: 'Mohamed',  address: 'Apple st652'},
      {name: 'Ahmed',     address: 'ElSudeya 21'},
      { name: 'Abo_Ali',  address: 'Omar 345'},
      { name: 'Sandy',    address: 'Ocean blvd 2'},
      { name: 'Abo_saly', address: 'Green Grass 1'},
      { name: 'Fatma',    address: 'Sky st 331'},
      { name: 'Susan',    address: 'One way 98'},
      { name: 'Sameer',   address: 'Yellow Garden2'},
      { name: 'Ben',      address: 'Park Lane 38'},
      { name: 'Osman',    address: 'Central st 954'},
      { name: 'ghaled',   address: 'Main Road 989'},
      { name: 'Mahmoud',  address: 'Sideway 1633'}
      ];
  await customers.insertMany(values);
  var data  =  await customers.find().toArray();
  
  for(var i=0; i< values.length;i++){
    res.write(` \n <h1>Name is : ${data[i].name}  and  Address ${ data[i].address}`);
  }

}).listen(port);





