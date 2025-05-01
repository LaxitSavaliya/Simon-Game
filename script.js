let gameSeq = [];
let userSeq = [];
let level = 0;
let started = false;
let isShowingSequence = false;  // New flag to track if sequence is being shown
let colors = ["red", "green", "yellow", "blue"];

// Create audio elements for button sound and game over sound
const buttonSound = new Audio('sound.mp3');
const gameOverSound = new Audio('game-over.mp3');

let stBtn = document.querySelector("button");
let h3 = document.createElement("h3");
document.querySelector("h1").appendChild(h3);

stBtn.addEventListener("click", function () {
    if (started == false) {
        started = true;
        stBtn.innerText = "Restart";
        levelUp();
    } else {
        // If game is already started, reset everything
        resetGame();
        started = true;
        stBtn.innerText = "Restart";
        levelUp();
    }
});

function levelUp() {
    level++;
    h3.innerHTML = "Level " + level;
    userSeq = [];
    isShowingSequence = true;  // Set flag to true when showing sequence
    
    // Generate and show sequence
    let randomNum = Math.floor(Math.random() * 4);
    let color = colors[randomNum];
    gameSeq.push(color);
    
    // Show the entire sequence
    let i = 0;
    let interval = setInterval(() => {
        if (i >= gameSeq.length) {
            clearInterval(interval);
            isShowingSequence = false;  // Set flag to false when sequence is done
            return;
        }
        let btnNum = colors.indexOf(gameSeq[i]) + 1;
        flashBtn(btnNum);
        i++;
    }, 800);
}

function flashBtn(num) {
    let btn = document.querySelector("#btn" + num);
    // Play sound and add flash class at the same time
    buttonSound.currentTime = 0;
    buttonSound.play();
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

// Add click handlers to all buttons
for (let i = 1; i <= 4; i++) {
    let btn = document.querySelector("#btn" + i);
    btn.addEventListener("click", handleClick);
}

function handleClick() {
    if (!started || isShowingSequence) return;  // Check if sequence is being shown
    
    let btn = this;
    let btnNum = parseInt(btn.id.replace("btn", ""));
    let color = colors[btnNum - 1];
    userSeq.push(color);
    
    flashBtn(btnNum);
    checkAns(userSeq.length - 1);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 600);
        }
    } else {
        h3.innerHTML = `Game Over! Press Start to Play Again<br>Score: ${level}`;
        document.body.style.backgroundColor = "red";
        // Play game over sound
        gameOverSound.currentTime = 0;
        gameOverSound.play();
        resetGame();
    }
}

function resetGame() {
    started = false;
    isShowingSequence = false;  // Reset the sequence flag
    gameSeq = [];
    userSeq = [];
    level = 0;
    stBtn.innerText = "Start Game";
}