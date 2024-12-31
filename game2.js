let player_1 = 0;
let player_2 = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const player1_Score = document.querySelector("#player1score");
const player2_Score = document.querySelector("#player2score");

let player1choice = null;
let player2choice = null;

const drawGame = () => {
    msg.innerText = "It's a tie!";
    msg.style.backgroundColor = "#372f50";
}

const showWinner = (userWin) => {
    if (userWin) {
        player_1++;
        player1_Score.innerText = player_1;
        msg.innerText = `Player 1 wins! ${player1choice} beats ${player2choice}`;
        msg.style.backgroundColor = "#7871b8";
    } else {
        player_2++;
        player2_Score.innerText = player_2;
        msg.innerText = `Player 2 wins! ${player2choice} beats ${player1choice}`;
        msg.style.backgroundColor = "#d14479";
    }
}

const playGame = () => {
    //console.log("Player 1 turn", player1choice);
    //console.log("Player 2 turn", player2choice);

    if (player1choice === player2choice) {
        drawGame();
    } else {
        let userWin = true;
        if (player1choice === "rock") {
            userWin = player2choice === "paper" ? false : true;
        } else if (player1choice === "paper") {
            userWin = player2choice === "scissors" ? false : true;
        } else {
            userWin = player2choice === "rock" ? false : true;
        }
        showWinner(userWin);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        if (!player1choice) {
            player1choice = choice.getAttribute("id");
            console.log(`Player 1 chose: ${player1choice}`);
            msg.innerText = "Player 2's turn to choose";
            msg.style.backgroundColor = "#372f50";
        } else if (!player2choice) {
            player2choice = choice.getAttribute("id");
            console.log(`Player 2 chose: ${player2choice}`);
            playGame();
            //reset choice for next
            player1choice = null;
            player2choice = null;
        }
    });
});