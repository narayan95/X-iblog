require('dotenv').config();
const apikey= process.env.API_KEY;
const express= require('express');
const https=require('https');
const bodyParser= require('body-parser');
const request= require('request');
const app= express();
const port=5000;
const listid=process.env.LIST_ID;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
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
    const emailid=req.body.email;
    const data={
         members:[
            {
                email_address: emailid,
                status: "subscribed"
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
    res.redirect("/");
})