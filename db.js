const port =3000;
const exress = require("express");
const {MongoClient} = require("mongodb");

var uri = "mongodb://localhost:27017";
   var client = new MongoClient(uri);
   var app= express();
   app.get("/",function(req,res){
       async function run() {
        await client.connect();
       res.write(" <h1>The connection succefully ");
       var db = client.db("ISIL");
       var users = db.collection("users");
       var values = [
          { lastname:"Moundir", supervisitor:"benkati"},
          { lastname:"Karim", supervisitor:"Badache"},
          { lastname:"Amar", supervisitor:"ramoul"},
          { lastname:"Osama", supervisitor:"benwadnine"},
          { lastname:"Raid", supervisitor:"boumorza"},
          { lastname:"Aymen", supervisitor:"benoudina"},
          { lastname:"Samira", supervisitor:"larom"},
          { lastname:"hlima", supervisitor:"lamari"},
          { lastname:"salma", supervisitor:"ouianas"},
          { lastname:"sawsan", supervisitor:"chaniki"},
          { lastname:"chorok", supervisitor:"serayoud"},
          { lastname:"tawas", supervisitor:"boukaloui"},
          { lastname:"sarida", supervisitor:"majmaji"},
          { lastname:"lamin", supervisitor:"lraib"}
       ]
       await users.insertMany(values);
       res.write("<h1>The insert succefully ");
       var data = await users.find().toArray();
       res.write(`<h1>   the lenght the data is : ${data.length} \n        The customers Menu :`);
       for(var i=0;i<values.lenght;i++){
        res.write(`The Name : ${data[i].lastname}  / The Supervisitor : ${ data[i].supervisitor}`);
         }
      }
run();
   }).listen(port);
