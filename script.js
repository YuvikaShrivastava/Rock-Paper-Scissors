let player_1 = 0;
let player_2 = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const player1_Score = document.querySelector("#player1score");
const player2_Score = document.querySelector("#player2score");

let player1choice = null;
let player2choice = null;

const micIcon = document.getElementById("micIcon");
const errorMsg = document.getElementById("errorMsg");

// 🔊 Add a short mic beep sound
const micBeep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");

const drawGame = () => {
    msg.innerText = "It's a tie!";
    msg.style.backgroundColor = "#372f50";
};

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
};

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
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        if (!player1choice) {
            player1choice = choice.getAttribute("id");
            const options = ["rock", "paper", "scissors"];
            player2choice = options[Math.floor(Math.random() * 3)];
            playGame();
            player1choice = null;
            player2choice = null;
        }
    });
});

// 🎤 Speech Recognition for Player 1
const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

function startVoiceGame() {
    micBeep.play(); // 🔊 play sound
    recognition.start();
    micIcon.style.visibility = "visible";
    micIcon.classList.add("pulse");
    errorMsg.style.display = "none";
}

recognition.onresult = (event) => {
    console.log("Heard:", spoken);
    micIcon.style.visibility = "hidden";
    micIcon.classList.remove("pulse");
    const spoken = event.results[0][0].transcript.toLowerCase().trim();
    if (["rock", "paper", "scissors"].includes(spoken)) {
        player1choice = spoken;
        const options = ["rock", "paper", "scissors"];
        player2choice = options[Math.floor(Math.random() * 3)];
        playGame();
        player1choice = null;
        player2choice = null;
    } else {
        errorMsg.innerText = `Couldn't hear you properly. Try saying rock, paper, or scissors.`;
        errorMsg.style.display = "block";
    }
};

recognition.onerror = () => {
    micIcon.style.visibility = "hidden";
    micIcon.classList.remove("pulse");
    errorMsg.innerText = `Couldn't hear you. Please try again.`;
    errorMsg.style.display = "block";
};
