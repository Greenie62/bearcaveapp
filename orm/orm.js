const db=require('../models')

module.exports={

    signIn:function({username:username,password:password}){
        var usernames=[];
        db.User.find().then(dbUsers=>{
           
            dbUsers.forEach(user=>(
                usernames.push(user.username)
            ))
        
            if(usernames.indexOf(username) === -1){
                console.log("hey, we got a new user!")
                db.User.create({username:username,password:password}).then(dbUser=>{
                    console.log(dbUser.username + ' has been added')
                })
            }
            else{
                console.log("this an old bear!!")
            }
        })
        },

        updateInfo:function(username,info){
           db.User.updateOne({
                "username":username},{$set:info
                    
                
            }).then(dbUser=>console.log("dbUser has been updated")) 
        },

        getCurrentUser:function(username,cb){
            var fullUserSpecs=""
            var soldItemNames=[];
            var itemIds=[];
            var personObject={}
            var hasItems=false;
            var finalToggle=false;
            var counter=0;
            console.log("now i got you in here you cunt!")
            db.User.findOne({"username":username})
            .then(dbUser=>{

                db.BoughtItem.find({"buyerId":dbUser._id})
                .then(dbBoughtItems=>{
                    console.log(dbBoughtItems.length)
                if(dbBoughtItems.length === 0){
                    console.log("condition hit!")
                    cb(dbUser)}
                    var boughtItemNames=[];
                    dbBoughtItems.forEach(itemId=>{
                          db.Item.find({"_id":itemId.itemId})
                          .then(dbItemNames=>{
                              boughtItemNames.push(dbItemNames[0].name)
                                 counter++;
                              if(counter === dbBoughtItems.length){
                                  hasItems=true;
                                  console.log(boughtItemNames)
                                  console.log("fired at the toggle!")
                                //  console.log(itemNames)
                              }
                          
                       
              
           if(hasItems){
                personObject=Object.assign(
                    {},
                {name:dbUser.name},
                {lastname:dbUser.lastname},
                {occupation:dbUser.occupation},
                {username:dbUser.username},
                {age:dbUser.age},
                {email:dbUser.email},
                {address:dbUser.address},
                {username:dbUser.username},
                {balance:dbUser.balance},
                {solditems:dbUser.solditems},
                {boughtitems:boughtItemNames}
                )
                
               
                console.log(personObject)
            
            
              
                
             if(personObject.solditems.length === 0){
                 console.log("No sold items from this user")
                 cb(personObject)
             }
            
             
             else{
                 console.log("We got itemnames to iterate thru")
               personObject.solditems.forEach(item=>{
                    db.Item.findOne({"_id":item}).then(dbItem=>{
                         console.log("we down here now")
                        soldItemNames.push(dbItem.name)
                        console.log(soldItemNames)
                        console.log(soldItemNames.length)
                        if(soldItemNames.length === personObject.solditems.length){
                            console.log("we got our shit, now lets toggle outta this madness!");
                             finalToggle=true;
                        }
                       
                        if(finalToggle){
                            console.log("Got all the items")
                            fullUserSpecs=Object.assign(
                                {},
                     {name:personObject.name},
                     {lastname:personObject.lastname},
                     {occupation:personObject.occupation},
                     {username:personObject.username},
                     {age:personObject.age},
                     {email:personObject.email},
                     {address:personObject.address},
                     {username:personObject.username},
                     {balance:personObject.balance},
                     {boughtitems:personObject.boughtitems},
                     {itemssold:soldItemNames}
                 )
                 cb(fullUserSpecs) 
                        }
                    
                        else{
                            console.log('run it again!')
                        }
             
                    
                    })
                })
                          
                      
                        
                    
                
                }
                
            }
            })
                 
    }) 
              
       
                })   
            }) 
              
        },

        addItem:function(item,username,cb){
            db.Item.create(item).then(dbItem=>{
                db.User.findOneAndUpdate({"username":username},{$push:{"solditems":dbItem._id}})
                .then(()=>{console.log("nice job")})
            })
        }

  

        
    
  

}