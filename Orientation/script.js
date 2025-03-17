let score = 0;
let timeLeft = 30;
let gameInterval;

// ゲーム開始ボタンの処理
document.getElementById("start-button").addEventListener("click", startGame);

function startGame() {
    score = 0;
    timeLeft = 30;
    document.getElementById("score").textContent = score;
    document.getElementById("time").textContent = timeLeft;

    gameInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            alert("ゲーム終了！最終スコア: " + score);
        }
    }, 1000);

    spawnMole();
}

// もぐらをランダムに出現させる
function spawnMole() {
    let holes = document.querySelectorAll(".hole");
    let randomHole = holes[Math.floor(Math.random() * holes.length)];
    
    let mole = document.createElement("div");
    mole.classList.add("mole");
    mole.addEventListener("click", () => {
        score++;
        document.getElementById("score").textContent = score;
        mole.remove();
    });

    randomHole.appendChild(mole);

    setTimeout(() => {
        mole.remove();
        if (timeLeft > 0) spawnMole(); 
    }, 800);
}
