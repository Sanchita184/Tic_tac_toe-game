//to access different html elements id or class
let boxes = document.querySelectorAll(".box"); 

//button access
let resetBtn = document.querySelector(".reset"); 
let newGameBtn = document.querySelector("#new-btn");
let startBtn = document.querySelector("#start-btn");

//msg-div access
let msgContainer1 = document.querySelector(".msg-container1");
let msgContainer2 = document.querySelector(".msg-container2");
let msg1 = document.querySelector("#msg-1");
let msg2 = document.querySelector("#msg-2");

let turnO = true;  //indivitual player turns- O
let count = 0;     //variable to count no. of filled boxes

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

// box selections for both player using loop, telling where to marks O or X

boxes.forEach((box) => {
      
    box.addEventListener("click", () => {
        if (turnO) {
        box.innerHTML ="<font color='#00BBF9'>O</font>";
        turnO=false;
    }
    else {
        box.innerHTML ="<font color='#772D8B'>X</font>";
        turnO=true;
    }
    box.disabled=true;
    count++;

    //if false is returned through checkResult(), match draw!

    let matchWinner = checkResult();

    if(count===9 && !matchWinner) {
        matchDraw();
        count=0;
    }
    });
});

//deactivate boxes after any player wins/draw.

const disabledBox = () => {
    for(let box of boxes) {
        box.disabled=true;
    }
};

//activate again

const enabledBox = () => {
    for(let box of boxes) {
        box.disabled =false;
        box.innerText = "";
    }
};

//to print on screen (html)
//winner of the match

const showWinner =(Winner) => {
    msg1.innerText=`Congratulations! Winner is ${Winner}!`;
    msgContainer1.classList.remove("hide");
    disabledBox();
}

//match draw

const matchDraw = () => {
    console.log("match draw!!");
    msg2.innerText="Match Draw!!!";
    msgContainer2.classList.remove("hide");
    disabledBox();
}

//reset game

const resetGame = () => {
    count=0;
    turnO = true;
    enabledBox();
    msgContainer1.classList.add("hide");   //hide new game button again
    msgContainer2.classList.add("hide");   //hide start-again game button again
}

//Back to initial stage with event handelers

newGameBtn.addEventListener("click", resetGame);
startBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

//identifying the valid patterns to win.

const checkResult = () => {
    for(let pattern of winPatterns) {

        let posVal1= boxes[pattern[0]].innerText;  //trying to map the winning patterns 
        let posVal2= boxes[pattern[1]].innerText;  //with the box values.
        let posVal3= boxes[pattern[2]].innerText;

        if(posVal1 !="" && posVal2!="" && posVal3!="") {  //if no position is empty
            if(posVal1===posVal2 && posVal2===posVal3) {  //if the 3 boxes match
                console.log("WINNER",posVal1);
                showWinner(posVal1);
                return  true;
            }           
        }

    }
};
