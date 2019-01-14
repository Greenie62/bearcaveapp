// tool-time sound effects
var rightsound=new Audio("assets/arr-arr.mp3")
var wrongsound=new Audio('assets/ughh.mp3')

// sign-in modal
var signinmodal=document.getElementById("signinmodal")
signinmodal.style.display='none'

//pawcontainer
var pawcontainer=document.getElementById("pawcontainer")

//currentUser Name
var bearUser=""

pawcontainer.addEventListener("click",findPaw)


function findPaw(e){
    if(e.target.classList.contains('rightpaw')){
        rightsound.play()
        //switches body to a class that gives image background
        document.body.className="bearbackground"
        // renders input modal, takes the pawcontainer away
        signinmodal.style.display='block'
        signinmodal.style.backgroundColor='tan'
        pawcontainer.style.display='none'
     
    }
    else{
        wrongsound.play()
    }
}

var signInBtn=document.getElementsByTagName("button")[0]

signInBtn.addEventListener("click",signIn)

function signIn(e){
    e.preventDefault();

     bearUser=Object.assign(
        {},
        {username:document.getElementById("username").value},
        {password:document.getElementById("password").value},
    )

    //store currentuser into sessionstorage so available for buy function and grab
    //current users name, send as additional url parameter on the buyBtn
    // <!-- Least...thats the goal!! -->
    sessionStorage.setItem("currentUser",bearUser.username)

    var xhr=new XMLHttpRequest();

    xhr.open("POST",'/signin',true)

    xhr.setRequestHeader("Content-Type","application/json")

    xhr.send(JSON.stringify(bearUser))

    window.location.pathname=`/bearcave/${bearUser.username}`
}





