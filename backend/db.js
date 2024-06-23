const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.db_url)
.then(res => console.log("Successfully Connected to DB"))
.catch(err=> console.log(err))

const TodoSchema = new mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const Todo = mongoose.model("Todo", TodoSchema)

module.exports = Todo;