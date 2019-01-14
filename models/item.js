const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const itemmodel=new Schema({
    name:String,
    price:Number,
    quantity:Number,
    description:String,
    image:String,
    seller:String,

})

const Item=mongoose.model("Item",itemmodel)

module.exports=Item;