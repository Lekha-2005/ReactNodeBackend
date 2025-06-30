const express=require("express");

const users=require("./sample.json");
const cors=require("cors");
const fs=require("fs");

const app=express();
app.use(express.json());
const port=3241;

app.get("/", (req, res) => {
    res.send("Backend is running successfully 👋");
  });
  

app.use(
    cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PATCH","DELETE"],
    })
);


//display all user
app.get("/users",(req,res)=>{
    return res.json(users);
});


//delete
app.delete("/users/:id",(req,res)=>{
    let id=Number(req.params.id);
    let filteredusers =users.filter((user)=>user.id !== id);
    fs.writeFile("./sample.json",JSON.stringify(filteredusers),(err,data)=>{
        return res.json(filteredusers);
    });
    });


app.post("/users",(req,res)=>{
    let{name,age,city}=req.body;
    let id=Date.now();
    if(!name || !age || !city){
    return  res.status(400).send({message : "All fields required"});
    }

    users.push({id,name,age,city});

    fs.writeFile("./sample.json",JSON.stringify(users),(err,data)=>{
        return res.json({message:"User Detail Added !"});
    });
});

app.patch("/users/:id",(req,res)=>{
    let id=Number(req.params.id);
    let {name,age,city} = req.body;
    if(!name || !age || !city){
        res.status(400).send({message : "All fields required"});
    }

    let index=users.findIndex((user) => user.id == id);
    users.splice(index,1,{...req.body});
    
    fs.writeFile("./sample.json",JSON.stringify(users),(err,data)=>{
        return res.json({message:"User updated !"});
    });
});

app.listen(port,(err)=>
    {
    console.log(`App is running in ${port}`);
    });
    
