const router=require("express").Router();
const path=require("path")
const db=require('../models')
const orm=require('../orm/orm.js')
const maincontroller=require('../controllers/maincontroller')



router.get('/',(req,res)=>{
    res.redirect("/bearentrance")
})

router.get('/bearentrance',(req,res)=>{
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

var currentUser=""
router.get('/bearcave/:username',(req,res)=>{
   currentUser=req.params.username
  res.render("index",{username:req.params.username})
})


router.post("/signin",(req,res)=>{
      orm.signIn(req.body)
}) 

router.post("/updateinfo",(req,res)=>{
    console.log(req.body)
    orm.updateInfo(currentUser, req.body)
    res.redirect(`/bearcave/${currentUser}`)
})

router.get('/getuserinfo',(req,res)=>{
    console.log("Hey dipshit, trigger!!")
    orm.getCurrentUser(currentUser,function(data){
        res.send(data)
    })
})

router.post("/postitem",(req,res)=>{
    console.log(typeof(req.body))
    console.log(req.body)
    orm.addItem(req.body,currentUser,function(data){
        console.log(data)
    })
    res.redirect(`/bearcave/${currentUser}`)
})

router.route("/getitems")
      .get(maincontroller.getitems)

router.route(`/iteminfo/:id`)
      .get(maincontroller.iteminfo)

router.route("/buyitem/:itemname/:username")
      .get(maincontroller.buyitem)


router.route("/nytimes/:topic")
      .get(maincontroller.nytimes)

router.route('/getallmembers')
      .get(maincontroller.getallmembers)

   
router.post('/postmessage',(req,res)=>{
    console.log(req.body)
    var messageObject=Object.assign(
        {},
        req.body,
        {"sender":currentUser}
    )
     db.Message.create(messageObject).then(()=>console.log("Message was sent/stored!"))
    res.redirect(`/bearcave/${currentUser}`)
})

router.route('/getmessages/:currentuser')
      .get(maincontroller.getmessages)

router.route('/deletemessage/:id')
      .delete(maincontroller.deletemessage)

router.delete("/deletemember/:member",(req,res)=>{
    db.User.deleteOne({"username":req.params.member})
    .then(()=>console.log("Member has been deleted!"))
})




     



module.exports=router;