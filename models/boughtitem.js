const mongoose=require("mongoose")

const Schema=mongoose.Schema;

const boughtitemschema=new Schema({
    itemId:{
        type:Schema.Types.ObjectId,
        ref:"Item"
    },
     buyerId:{
         type:Schema.Types.ObjectId,
         ref:"User"
     }
})

const BoughtItem=mongoose.model("BoughtItem", boughtitemschema)

module.exports=BoughtItem;