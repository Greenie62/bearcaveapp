const axios=require("axios")
const db=require('../models')

module.exports={
    nytimes:function(req,resp){
        console.log(req.params.topic)
        console.log("got the message!")
        var params=Object.assign(
            {},
            {"api-key":"9b3adf57854f4a19b7b5782cdd6e427a"},
            {"q":req.params.topic}
        )
        console.log(params)
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        axios.get(url,{params})
        .then(res=>{
            resp.json(res.data.response.docs)
            console.log(res.data.response.docs)})
    },

    getitems:function(req,res){
           db.Item.find()
           .then(dbItems=>(
               res.json(dbItems)
           ))
    },

    iteminfo:function(req,res){
        db.Item.findOne({"_id":req.params.id})
        .then(itemInfo=>res.send(itemInfo))
    },

    buyitem:function(req,res){
        console.log(req.params.itemname)
        console.log(req.params.username)
        var itemId=""
        var personId=""
        var itemCost=""
        db.Item.findOneAndUpdate({"name":req.params.itemname},{$inc:{"quantity":-1}})
        .then(dbUpdate=>{
            itemCost=dbUpdate.price;
            console.log("Id: " +dbUpdate._id)
            itemId=dbUpdate._id;
            console.log("Item was decremented")
            db.User.findOneAndUpdate({"username":req.params.username},{$inc:{"balance":-itemCost}})
            .then(dbUser=>{
                personId=dbUser._id
                console.log("Account has properly deducted from")
                console.log("Person id:" + personId)
                console.log("Item id: " + itemId)
                db.BoughtItem.create({"itemId":itemId,"buyerId":personId})
                .then(dbItemBought=>console.log("bought item created/stored"))
            })
        })
    },

    getallmembers:function(req,res){
        db.User.find()
        .then(dbUsers=>{
            console.log(dbUsers)
            res.send(dbUsers)
        })
    },

    getmessages:function(req,res){
        console.log(req.params.currentuser)
        db.Message.find({"recipient":req.params.currentuser})
        .then(dbmessages=>{
            res.send(dbmessages)
            console.log(dbmessages)
            console.log("here they are")})
        .catch(()=>console.log("404 error,no messages for this user"))
    },

    deletemessage:function(req,res){
        console.log(req.params.id)
        db.Message.deleteOne({"_id":req.params.id})
        .then(()=>console.log("Message has been deleted"))
        .catch(err=>console.log(err))
    }

  
}