//alert("UPDATE: Now you can subscribe to X-iblog Newsletter for latest updates");
const express= require('express');
const https=require('https');
var bodyParser= require('body-parser');
const request= require('request');
//const { url } = require('inspector');
const app= express();
const port=3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
// ..PORT= ;
app.listen(process.env.PORT || port,()=>
console.log("Server is running on port "+port)
);
app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/index.html");
})
app.post("/newsletter",(req,res)=>
{
    // var firstName=req.body.fname;
    // var lastName=req.body.lname;
    var email=req.body.email;
    var data={
         members:[
            {
                email_address: email,
                status: "subscribed",
                // merge_fields:
                // {
                //     FNAME: firstName,
                //     LNAME: lastName
                // }
            }
         ]
    };
    var jsonData= JSON.stringify(data);
    const url= "https://us13.api.mailchimp.com/3.0/lists/f1b16b7162";
    const options={
        method:"POST",
        auth:"sriansh:f58e1495f17de079940adb47351820eb-us13"
    }
     const request=https.request(url,options,function(response)
    {
        response.on("data",function(data)
        {
            // console.log(response.statusCode);
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