// button-triggered modals(default setting=display:none)

var updateinfomodal=document.getElementById("updateinfomodal")
updateinfomodal.style.display='none'
var personalinfomodal=document.getElementById("personalinfomodal")
personalinfomodal.style.display='none'
var nytimesmodal=document.getElementById("nytimesmodal");
nytimesmodal.style.display='none'
var sellitemmodal=document.getElementById("sellitemmodal");
sellitemmodal.style.display='none'
var buyitemmodal=document.getElementById("buyitemmodal");
buyitemmodal.style.display='none'
var iteminfomodal=document.querySelector("#iteminfomodal");
iteminfomodal.style.backgroundColor='lemonchiffon';
iteminfomodal.style.display='none';
var messageModal=document.getElementById("messageModal")
messageModal.style.display='none'
var yourMessageModal=document.getElementById("yourmessagesmodal");
yourMessageModal.style.display='none'



//sounds
var rightsound=new Audio("../assets/arr-arr.mp3")
var wrongsound=new Audio('../assets/ughh.mp3')

// buttons
var updateinfoBtn=document.getElementsByClassName("btn-success")[0]
var enterinfoBtn=document.getElementsByClassName("btn-success")[1]
var personalinfoBtn=document.getElementsByClassName("btn bg-light")[0]
var nytimesBtn=document.getElementsByClassName("btn-warning")[0]
var sellitemBtn=document.getElementsByClassName("btn-info")[0]
var postItemBtn=document.getElementsByClassName("postitem")[0]
var buyItemBtn=document.getElementsByClassName("btn-danger")[0]
var sendMessageBtn=document.getElementsByClassName("btn btn-secondary")[0]
var yourMessagesBtn=document.getElementsByClassName("btn btn-primary")[0]
var deleteMemberBtn=document.getElementsByClassName("deletemember")[0]

//delete member function in updateresumemodal

deleteMemberBtn.addEventListener("click",function(e){
    e.preventDefault();
    var currentUser=sessionStorage.getItem("currentUser")
    console.log(currentUser)

    var xhr=new XMLHttpRequestUpload();

    xhr.open("DELETE",`/deletemember/${currentUser}`,true)

    xhr.send()
})

//updateinfomodal display activated
updateinfoBtn.addEventListener('click',function(){
    updateinfomodal.style.display='block'
updateinfomodal.style.backgroundColor='lemonchiffon'
})

//personalinfo modal display on(ajax call for currentuser info)
personalinfoBtn.addEventListener("click",function(e){
    console.log("hey asshole!")
    e.preventDefault();
    personalinfomodal.style.display='block'
    personalinfomodal.style.backgroundColor='lightblue'
     
    var xhr=new XMLHttpRequest();

    xhr.open("GET","/getuserinfo",true)

    xhr.onreadystatechange=function(){
        if(xhr.status === 200 && xhr.readyState === 4){
            console.log("nice")
            console.log(typeof(this.responseText))
           
            document.getElementById('name').innerHTML=JSON.parse(this.responseText).name
            document.getElementById('lastname').innerHTML=JSON.parse(this.responseText).lastname
            document.getElementById('age').innerHTML=JSON.parse(this.responseText).age
            document.getElementById('email').innerHTML=JSON.parse(this.responseText).email
            document.getElementById('occupation').innerHTML=JSON.parse(this.responseText).occupation
            document.getElementById('address').innerHTML=JSON.parse(this.responseText).address
            document.getElementById('balance').innerHTML=JSON.parse(this.responseText).balance
            document.getElementById('itemssold').innerHTML=JSON.parse(this.responseText).itemssold
            var boughtItemsNoRepeats=[];
            JSON.parse(this.responseText).boughtitems.forEach(item=>{
                if(boughtItemsNoRepeats.indexOf(item) === -1){
                    boughtItemsNoRepeats.push(item)
                }
                document.getElementById('itemsbought').innerHTML=boughtItemsNoRepeats
            })
           
            
        }
    }

    xhr.send()
    
    
})

//closing modals
personalinfomodal.addEventListener("click",function(e){
    if(e.target.classList.contains("closeit")){
        personalinfomodal.style.display='none'
        wrongsound.play()
        location.reload()
    }
})

updateinfomodal.addEventListener("click",function(e){
    if(e.target.classList.contains("closeit")){
        updateinfomodal.style.display='none'
        location.reload()
    }
})

nytimesmodal.addEventListener("click",function(e){
    if(e.target.classList.contains("closeit")){
        nytimesmodal.style.display='none'
        location.reload()
    }
})

sellitemmodal.addEventListener("click",function(e){
    if(e.target.classList.contains("closeit")){
        sellitemmodal.style.display='none'
        location.reload()
    }
})

buyitemmodal.addEventListener("click",function(e){
    if(e.target.classList.contains("closeit")){
        buyitemmodal.style.display='none'
        location.reload()
    }
})

messageModal.addEventListener("click",function(e){
    if(e.target.classList.contains("closeit")){
        messageModal.style.display='none'
        location.reload()
    }
})

yourMessageModal.addEventListener("click",function(e){
    if(e.target.classList.contains('closeit')){
        yourMessageModal.style.display='none'
        location.reload()
    }
})


//opening modals thru respective buttons

sellitemBtn.addEventListener("click",function(){
    sellitemmodal.style.backgroundColor='lemonchiffon'
    sellitemmodal.style.color='teal'
    sellitemmodal.style.display='block'
    rightsound.play()
})

nytimesBtn.addEventListener("click",function(){
    nytimesmodal.style.backgroundColor='#ebebeb'
    nytimesmodal.style.display='block'

})

var nytimesinput=document.getElementById("nytimestopic")
var searchTopicBtn=document.getElementsByClassName("searchtopic")[0]
var articlelist=document.getElementById("articlelist")
searchTopicBtn.addEventListener("click",searchNYT)

function searchNYT(e){
    e.preventDefault();
    console.log(e.target.value)
    var topic=nytimesinput.value
    //clear DOM for new article search-return
    articlelist.innerHTML=""
    
    var topicObject={
        topic:topic
    }

    var xhr=new XMLHttpRequest();

    xhr.open("GET",`/nytimes/${topic}`,true)

    xhr.onreadystatechange=function(){
        if(this.status === 200 && this.readyState === 4){
            console.log(JSON.stringify(this.responseText))
            JSON.parse(this.responseText).forEach(r=>{
                console.log(r.web_url)
                console.log(r.snippet)
                var li=document.createElement("li")
                var listlink=document.createElement("a")
                listlink.setAttribute("target","_blank")
                listlink.setAttribute("href",r.web_url);
                listlink.appendChild(document.createTextNode(r.snippet))
                li.appendChild(listlink)
                li.className="list-group-item"
articlelist.appendChild(li)
//a little flair touch of 'waiting for data' memo(not perfect, but effective enough)
setTimeout(function(){
    document.getElementById("waitingwindow").innerHTML=''
},500)
            })
         
        }
        else{document.getElementById("waitingwindow").innerHTML='waiting for response'
            console.log("waiting for data")}
    }

    xhr.send()
}


postItemBtn.addEventListener("click",postNewItem)

//postItem function

function postNewItem(e){
    e.preventDefault();
    console.log("hey!!!")
    var newItem=Object.assign(
        {},
        {name:document.querySelector("input[name='itemname']").value},
        {price:document.querySelector("input[name='price']").value},
        {quantity:document.querySelector("input[name='quantity']").value},
        {image:document.querySelector("input[name='image']").value},
        {description:document.querySelector("input[name='description']").value},
    )
    console.log(newItem)

    var xhr=new XMLHttpRequest();

    xhr.open("POST",'/postitem',true)

    xhr.setRequestHeader("Content-Type","application/json")

    xhr.send(JSON.stringify(newItem))
}

//buyitems function, makes request to get all items. renders in list with span btns
// WHY??? when I close out, but reopen and then go thru and buy something, the function
// fires x2, x3, etc?? :(
//Besides that, seems to work fine (deducts, quantity/price sensibily)
buyItemBtn.addEventListener("click",getItems)

function getItems(e){
//declare a variable to hold itemname so we can pass it down to buyBtn function
// and use it in url request specifiying what item to decrement on.
var itemName=""

//hopefully, retrieve our current username from sessionstorage

var currentUser=sessionStorage.getItem("currentUser")

console.log("CurrentUser: " + currentUser)

//assign itemlist a variable, toggle buyitemsmodal on, make request for all items
//render them thru a forEach iterator

    var itemList=document.getElementById("itemlist")
    e.preventDefault();
    buyitemmodal.style.display='block';
    itemList.innerHTML=""
    var xhr=new XMLHttpRequest();

    xhr.open("GET","/getitems",true)

    xhr.onload=function(){
        if(this.status === 200){
            console.log('this fired!')
            console.log(this.responseText)
            JSON.parse(this.responseText).forEach(item=>{
                var li=document.createElement("li")
                li.appendChild(document.createTextNode(item.name))
                var buySpan=document.createElement("span");
                buySpan.className="badge badge-success float-right mr-2 infoButton"
                buySpan.appendChild(document.createTextNode("get_info"))
                buySpan.setAttribute("id",item._id)
                li.appendChild(buySpan)
                itemList.appendChild(li)



               
    })
// buyBtn function(within timeline of rendered list items??? a vulnerability to overall build; optimize with HBS placeholders..esp since its HBs view!!)
var itemInfoBtns=document.querySelectorAll(".infoButton");


itemInfoBtns.forEach(itemInfoBtn=>(
itemInfoBtn.addEventListener("click",function(e){
iteminfomodal.style.display='block'
e.preventDefault();
console.log(e.target.getAttribute("id"))

// using ID to make request to itemsDB to get back specific data
// to render into modal
var xhrr=new XMLHttpRequest();

      xhrr.open("GET",`/iteminfo/${e.target.getAttribute("id")}`,true)

      xhrr.onreadystatechange=function(){
          if(this.status === 200 && this.readyState === 4){
              console.log(this.responseText)
              itemName=JSON.parse(this.responseText).name
              document.getElementById("iteminfoname").innerHTML=JSON.parse(this.responseText).name;
              document.getElementById("iteminfoprice").innerHTML=JSON.parse(this.responseText).price;
              document.getElementById("iteminfoquantity").innerHTML=JSON.parse(this.responseText).quantity;
              document.getElementById("iteminfodescription").innerHTML=JSON.parse(this.responseText).description;
          }
      }



      xhrr.send()
            })
        ))
//close iteminfomodal (still within)
        iteminfomodal.addEventListener("click",function(e){
            if(e.target.classList.contains("closeit")){
                iteminfomodal.style.display='none'
            }
        })
        }
    }

    xhr.send()

    var buyBtn=document.getElementById("buyItem");
    buyBtn.addEventListener("click",function(e){
        e.preventDefault();
        alert("hey,it works!")
       
        console.log("ItemName: " + itemName)
        var xhrrr=new XMLHttpRequest();

        xhrrr.open("GET",`/buyitem/${itemName}/${currentUser}`,true)

        xhrrr.onload=function(){
            if(xhrrr.status === 200){
                console.log("item was bought")
            }
        }

        xhrrr.send()
        location.reload()
    })

    
}

/* SendMessageBtn (Brings up modal, makes request for all members, renders
them into the datalist which puts them into the input box) */

var namelist=document.getElementById("namelist")

sendMessageBtn.addEventListener("click",function(e){
    e.preventDefault()
    console.log(e.target.className)
    messageModal.style.backgroundColor='lemonchiffon'
    messageModal.style.color='teal'
    messageModal.style.display='block'

    var xhr=new XMLHttpRequest()

    xhr.open("GET",'/getallmembers',true)

    xhr.onreadystatechange=function(){
        if(xhr.status === 200 && xhr.readyState === 4){
          //  console.log(xhr.responseText)
            JSON.parse(xhr.responseText).forEach(n=>{
                console.log(n.name)
                var optionName=document.createElement("option");
                optionName.setAttribute("value",n.username)
                optionName.setAttribute("key",n.username)
                namelist.appendChild(optionName)
            })
        }
    }

    xhr.send()


    var selectMemberBtn=document.querySelector(".selectmember")
    var emailbox=document.querySelector(".emailbox")
    emailbox.style.display='none'

    selectMemberBtn.addEventListener("click",function(e){
        e.preventDefault();
        console.log('hello there')
        var memberToEmail=document.querySelector("input[list='namelist'").value
        document.getElementById("recipient").innerHTML=memberToEmail;
        emailbox.style.display='block'

        //grab topic, body and recipient and put it into an object to
        // send to back-end
        var sendBtn=document.querySelector(".send_button");

        sendBtn.addEventListener("click",function(e){
            e.preventDefault()

            var topic=document.querySelector("input[name='topic']").value;
            var body=document.querySelector("textarea").value;
            var recipient=document.querySelector("#recipient").value;

            var messageObject=Object.assign(
                {},
                {topic},
                {body},
                {"recipient":memberToEmail}
            )

            console.log(messageObject)

            var xhrr=new XMLHttpRequest();

            xhrr.open("POST",'/postmessage',true);

            xhrr.setRequestHeader("Content-Type","application/json")

            xhrr.send(JSON.stringify(messageObject))
        })

    })
})

yourMessagesBtn.addEventListener("click",getMessages)


function getMessages(e){
    var currentUser=sessionStorage.getItem("currentUser")
    yourMessageModal.style.display='block'
    yourMessageModal.style.backgroundColor='lightgray'

    var xhr=new XMLHttpRequest();

    xhr.open("GET",`/getmessages/${currentUser}`,true)

    xhr.onreadystatechange=function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log(xhr.responseText)
            JSON.parse(xhr.responseText).forEach(message=>{
                var span=document.createElement("span");
                var deleteSpan=document.createElement('span');
                deleteSpan.className="badge badge-danger delete float-right mr-2"
                deleteSpan.setAttribute("id",message._id)
                deleteSpan.appendChild(document.createTextNode("delete"))
                var byContent= message.sender ? "From: " + message.sender + " " : "";
                span.appendChild(document.createTextNode(byContent))
                var liItem=document.createElement("li");
                liItem.className="list-group"
                var messageTopic=document.createElement("h4");
                
                messageTopic.appendChild(span)
                messageTopic.appendChild(deleteSpan)
                messageTopic.appendChild(document.createTextNode(message.topic))
                var p=document.createElement("p");
                p.appendChild(document.createTextNode(message.body))
                liItem.appendChild(messageTopic);
                liItem.appendChild(p);
                document.getElementById("messagelist").appendChild(liItem)

             
                })
                document.getElementById("messagelist").addEventListener("click",function(e){
                    if(e.target.classList.contains('delete')){
                        console.log(e.target.getAttribute("id"))

                        var xhrr=new XMLHttpRequest();

                        xhrr.open("DELETE",`/deletemessage/${e.target.getAttribute('id')}`,true)

                        xhrr.send()
                    }
                    location.reload()
            })
        }
    }

    xhr.send()
}


