
const express=require('express');
const axios=require('axios');
const json2xls=require("json2xls");

const app=express();

app.use(json2xls.middleware)

const headers={ 
    headers: { "Accept-Encoding": "gzip,deflate,compress" } 
}

app.listen(5000,()=>{
    console.log("Port listened at 5000");
});

app.get("/codechef",(req,res)=>{

    axios.get("https://codechef.com/users/"+req.query.name,headers).then((result)=>{
        res.send(result.data);
    }).catch((err)=>{
        res.send(err.message);
    });

});

app.get("/codeCount",(req,res)=>{
    res.sendFile(__dirname+"/client.js")
})

app.get("/home",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/json",(req,res)=>{

    let arr=JSON.parse(req.query.arr);
    res.xls("report.xlsx",arr);
})