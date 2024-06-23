const express = require("express")
const parser = require("body-parser")
const {TodoParser, CompletedParser} = require("./types");
const Todo = require("./db");
const app = express();

app.use(parser.json())

app.post("/todo", async (req, res)=>{
    const payload = TodoParser.safeParse(req.body)
    if(!payload.success){
        res.status(400).json({message:"incorrect request body for todo"})
        return;
    }
    //persist in db
    const data = payload.data;
    
    const response = await Todo.create({
        title:data.title,
        description:data.description,
        completed:false
    });
    res.json({message:"todo created", id:response._id})
})

app.get("/todos", async (req, res)=>{
    const todos = await Todo.find({})
    res.status(200).json({todos})
})

app.put("/completed", async (req, res)=>{
    const paylaod = CompletedParser.safeParse(req.body)
    if(!paylaod.success){
        res.status(400).json({message:"incorrect request body to mark completed"})
        return;
    }

    const todo = await Todo.findOne({_id:paylaod.id})
    if(todo){
        await Todo.updateOne({
            _id:paylaod.id
        }, {
            completed:true
        })
        res.json({message:"marked completed successfully"})
    }else{
        res.status(400).json({message:"no todo found with given id"})
    }
})


app.listen(3000, ()=>{
    console.log("App is started on port 3000")
})