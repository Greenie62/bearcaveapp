const express=require("express");
const exphbs=require("express-handlebars");
const bodyParser=require("body-parser");
const mongoose=require('mongoose')
const routes=require('./routes/routes')


const app=express();
const PORT=process.env.PORT || 3000


app.engine("handlebars",exphbs({defaultLayout:"main"}))
app.set("view engine","handlebars");


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static("public"))

mongoose.connect("mongodb://localhost/bearcavedb")

app.use(routes)


app.listen(PORT,()=>console.log(`Logged onto port ${PORT}`))