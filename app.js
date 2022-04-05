//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const path=require("path");
const app=express();
const https=require("https");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");
})
app.post("/",function(req,res){
  const FirstName=req.body.Fname;
  const LastName=req.body.Lname;
  const Email=req.body.email;
  const data={
    members:[
      {
        email_address:Email,
        status:"subscribed",
        merge_fields:{
          FNAME:FirstName,
          LNAME:LastName
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us14.api.mailchimp.com/3.0/lists/5d86a198f2";
  const options={
    method:"POST",
    auth:"shankar12:bfeafb01605007bedc965d9f302b4445-us14"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode==200){
      res.sendfile(__dirname + "/success.html");
    }else {
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT||3000,function(){
  console.log("app is running on 3000 port");
});


//api key
// bfeafb01605007bedc965d9f302b4445-us14

//audience id
// 5d86a198f2.
