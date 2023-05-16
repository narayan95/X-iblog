// import { listid } from "./secrets.js";
// import { apikey } from "./secrets.js";
const express= require('express');
const https=require('https');
const bodyParser= require('body-parser');
const request= require('request');
//const { url } = require('inspector');
const app= express();
const port=5000;
const apikey="7e117d6ae55e3f028cf5d59cac8641bd-us13";
const listid="f1b16b7162";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
// ..PORT= ;
app.listen(process.env.PORT || port,()=>
{
console.log("Server is running on port "+port)}
);
app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/index.html");
});
app.post("/",(req,res)=>
{
    // const firstName=req.body.fname;
    // const lastName=req.body.lname;
    const emailid=req.body.email;
    const data={
         members:[
            {
                email_address: emailid,
                status: "subscribed"
                // merge_fields:
                // {
                //     FNAME: firstName,
                //     LNAME: lastName
                // }
            }
         ]
    };
    
    const jsonData= JSON.stringify(data);
    const url= "https://us13.api.mailchimp.com/3.0/lists/"+listid;
    const options={
        method:"POST",
        auth:"sriansh:"+ apikey
    }
     const request=https.request(url,options,function(response)
    {
        response.on("data",function(data)
        {
            console.log(response.statusCode);
            if(response.statusCode===200)
            res.sendFile(__dirname+"/success.html");
            else
            res.sendFile(__dirname+"/failure.html");

            /* `console.log(JSON.parse(data));` is parsing the data received from the Mailchimp API
            response and logging it to the console. The `JSON.parse()` method is used to convert the
            JSON string into a JavaScript object. This allows the data to be easily accessed and
            manipulated in the code. */
            // console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure",(req,res)=>
{
    // res.sendFile(__dirname+"/signup.html");
    res.redirect("/");
})

// api key
// f58e1495f17de079940adb47351820eb-us13
//list or audience id
// f1b16b7162