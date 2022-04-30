 var mongoClient = require("mongodb").MongoClient
 var express = require("express")
 var http = require("http")
 var app = express()
 app.use(express.json())
 
 mongoClient.connect("mongodb://localhost:27017",(err,client)=>{
     if(err)
     console.log("error in connection"+err)
     else{
         console.log("connection established successfully")
         db = client.db("empdb")
     }
 })
 
 app.get("/emps",(req,res)=> {
    db.collection("emp").find().toArray((err,items)=>{
            res.json(items)
            res.end()
        })
 })
  
 app.post("/addemp",(req,res)=>{
      db.collection('emp').insertOne(req.body)    
      res.end()  
  })

  
  app.put("/updateemp/:id",(req,res)=>{
      var id = parseInt(req.params.id)
      console.log(id)
    //   sal = parseInt(req.body.salary)  
    //   console.log(sal)
      db.collection("emp").update({"_id":id},{$set:{salary:req.body.salary}})

      res.end()
  })

  app.delete("/deleteemp/:id",(req,res)=>{
    var id = parseInt(req.params.id)
    db.collection("emp").deleteOne({"_id":id})
    res.end()

  })
 
  app.get("/index.html",(req,res)=>{
      res.sendFile("./mongojs.html",{"root":__dirname})
  })
  app.get("/emps/:id",(req,res)=> {
    var id = parseInt(req.params.id)
    db.collection("emp").find({"_id":id}).toArray((err,items)=>{
            res.json(items)
            res.end()
        })
 })

  app.listen(2000,()=>{
      console.log("server started")
  })                                    