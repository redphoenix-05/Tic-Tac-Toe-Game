let box = document.querySelectorAll(".box");
let reset_btn = document.querySelector(".reset-button");
let newGame_btn = document.querySelector(".new-game-button");
let winnerMessage = document.querySelector(".winner-message");

let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
let draw = document.querySelector(".draw");

let player1Score = 0;
let player2Score = 0;
let drawScore = 0;

let turnA = true;

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
    turnA = true;
    winnerMessage.style.display = "none";
    player1Score = 0;
    player2Score = 0;
    drawScore = 0;
    player1.innerText = `Player X: ${player1Score}`;
    player2.innerText = `Player O: ${player2Score}`;
    draw.innerText = `Draw: ${drawScore}`;
    enableBoxes();
}

const newGame = () => {
    turnA = true;
    winnerMessage.style.display = "none";
    player1.innerText = `Player X: ${player1Score}`;
    player2.innerText = `Player O: ${player2Score}`;
    draw.innerText = `Draw: ${drawScore}`;
    enableBoxes();
}

box.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked");
        if(turnA){
            box.innerText = "X";
            turnA = false;
        }
        else{
            box.innerText = "O";
            turnA = true;
        }
        box.disabled = true;

        checkWinner();
    })
})

const disableBoxes = () => {
    box.forEach((box) => {
        box.disabled = true;
    })
}

const enableBoxes = () => {
    box.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    })
}

const showWinner = () => {
    if(turnA){
        winnerMessage.innerText = "Player O wins!";
        player2Score++;
    }
    else{
        winnerMessage.innerText = "Player X wins!";
        player1Score++;
    }
    winnerMessage.style.display = "block";
    disableBoxes();
}

const checkWinner = () => {
    let winnerFound = false;
    for(let i = 0; i < winningCombination.length; i++){
        const [a, b, c] = winningCombination[i];
        if(box[a].innerText === box[b].innerText && box[a].innerText === box[c].innerText && box[a].innerText !== ""){
            showWinner();
            winnerFound = true;
            break;
        }
    }
    if (!winnerFound) {
        let allFilled = Array.from(box).every(b => b.innerText !== "");
        if (allFilled) {
            winnerMessage.innerText = "It's a draw!";
            winnerMessage.style.display = "block";
            drawScore++;
            disableBoxes();
        }
    }
}


newGame_btn.addEventListener("click", newGame);
reset_btn.addEventListener("click", resetGame);