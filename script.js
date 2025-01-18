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
        msg.style.backgroundColor = "#6a61d7";
    } else {
        player_2++;
        player2_Score.innerText = player_2;
        msg.innerText = `Player 2 wins! ${player2choice} beats ${player1choice}`;
        msg.style.backgroundColor = "#d44c79";
    }
}

const playGame = () => {
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
            msg.innerText = "Player 2's turn to choose";
            msg.style.backgroundColor = "#372f50";
        } else if (!player2choice) {
            player2choice = choice.getAttribute("id");
            playGame();

              resetHighlight();
            choice.classList.add("selected");
            setTimeout(resetHighlight, 500); // Briefly highlight, then reset
        } else if (!player2choice) {
            player2choice = choice.getAttribute("id");
            playGame();
            
            //reset choice for next
            setTimeout(() => {
                player1choice = null;
                player2choice = null;
                msg.innerText = "Player 1's turn to choose";
                msg.style.backgroundColor = "#372f50";
            }, 2000);
        }
    });
});
