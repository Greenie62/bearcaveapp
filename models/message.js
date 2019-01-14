const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const messageschema=new Schema({
    topic:String,
    body:String,
    recipient:String,
    sender:String,
})

const Message=mongoose.model("Message",messageschema)

module.exports=Message