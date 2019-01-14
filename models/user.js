const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const usermodel=new Schema({
    username:String,
    password:String,
    name:String,
    lastname:String,
    email:String,
    address:String,
    age:String,
    married:Boolean,
    kids:Boolean,
    kidCount:Number,
    occupation:String,
    balance:Number,
    //so when user posts item. Item goes into DB, then assigned ItemID
    // is then pushed into the items array
    // So.. 1. Post new field into its DB 2. Take new fields ID and push into Array
    solditems:[
        {
        type:Schema.Types.ObjectId,
        ref:"Item"
    }
]

})

const User=mongoose.model("User",usermodel)

module.exports=User;