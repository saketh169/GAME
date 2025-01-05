// UPDATED LOGIC

let userscore=0;
let compscore=0;

let resetFlag = false;

let choices=document.querySelectorAll(".choices");
let user=document.querySelector("#user");
let comp=document.querySelector("#comp");
let msg=document.querySelector("#message");

function getComp(){
   let options=["Snake","Water","Gun"];
   let idx=Math.floor(Math.random()*3);
   return options[idx];

}

function resetGame() {
    userscore = 0;
    user.innerHTML = userscore;
    compscore = 0;
    comp.innerHTML = compscore;
    msg.innerHTML=` "START THE GAME" `;
    msg.style.opacity = 1;
    msg.style.backgroundColor = "aquamarine";
    resetFlag = false;
   
    }

function drawgame(){
    msg.innerHTML="Game is Draw";
    msg.style.backgroundColor = "yellow";
    
    if (userscore === 10 || compscore === 10) {
        msg.innerHTML = userscore == 10 ? "YOU WIN THE GAME" : "COMPUTER WINS THE GAME";
        msg.style.backgroundColor = "pink";
       
        resetFlag = true;
        setTimeout(() => {
            msg.innerHTML = "Click to Reset the game";
            msg.style.backgroundColor="orange";
        }, 1500);// function is passed as first argument  
        
    }  
}

function check_win(win,compchoice,userchoice){
   
    if(win){
      userscore++;
      user.innerHTML=userscore;
      msg.innerHTML=`Your ${userchoice} beats ${compchoice}`;
      msg.style.backgroundColor = "green";

    }else{
     compscore++;
     comp.innerHTML=compscore;
    msg.innerHTML=` ${compchoice} beats  Your ${userchoice}`;
    msg.style.backgroundColor="red";
    }

    if (userscore === 10 || compscore === 10) {
                msg.innerHTML = userscore == 10 ? "YOU WIN THE GAME " : "COMPUTER WINS THE GAME ";
        msg.style.backgroundColor = "pink";
        resetFlag = true;

        setTimeout(() => {
            msg.innerHTML = "Click to Reset the game";
            msg.style.backgroundColor="orange";
            checkMousePosition(); // Check mouse position and set opacity if needed
        }, 1500);  
    }
}

/*

event listener only fires when the mouse initially enters the element. If the message is updated to "Click to Reset the game" 
while the mouse is already inside the element, the mouseenter event will not be triggered again until the mouse leaves
 and re-enters the element.
 
 */
 msg.addEventListener("mouseenter", function () {
    checkMousePosition();
});

msg.addEventListener("mouseleave", function () {
    msg.style.opacity = 1;
});

function checkMousePosition() {
    if (msg.innerHTML === "Click to Reset the game") {
        msg.style.opacity = msg.matches(':hover') ? 0.7 : 1;
    }
}

function playgame(userchoice){

    if (resetFlag) {
        return; // Prevent further gameplay if the game has ended
    }

    let compchoice=getComp();
    
    if(compchoice===userchoice){
        drawgame();
    }else if(userchoice==="Snake"){
        // water , gun
      win=compchoice==="Water"?true:false;
    }else if(userchoice==="Water"){
        // Snake , gun
      win=compchoice==="Gun"?true:false;
    }else{
       // Snake , water
       win=compchoice==="Snake"?true:false; 
    }
    if(compchoice !=userchoice){
    check_win(win,compchoice,userchoice);}
}

choices.forEach((choice)=>{
choice.addEventListener("click",()=>{
    const userchoice=choice.getAttribute("id");
    playgame(userchoice);
});
});

msg.addEventListener("click", () => { //event  applies when you click when resetFlag becomes true when user/comp scores 10 
    if (resetFlag) {
        resetGame(); 
       
    }
});


