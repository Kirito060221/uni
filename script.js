let score = 0;
let timeLeft = 30;
let gameInterval;

// ゲーム開始ボタンの処理
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startGame);

// スコア表示のテキスト
let scoreText = document.getElementById("score");

// 残り時間表示のテキスト
let timeLeftText = document.getElementById("time");

let holes = document.querySelectorAll(".hole");

function startGame() {
    // スコアと残り時間の初期化
    score = 0;
    timeLeft = 30;

    // スコアと残り時間の表示
    scoreText.textContent = score;
    timeLeftText.textContent = timeLeft;

    // タイマースタート
    startTimer();

    // もぐらを生成
    spawnMole();
}

function startTimer() {
    // タイマーのリセット
    clearInterval(gameInterval);

    // ゲーム中はボタンを押せないように
    startButton.disabled = true;

    // タイマースタート
    gameInterval = setInterval(() => {
        // 残り時間の更新
        timeLeft--;
        timeLeftText.textContent = timeLeft;

        // タイムアップ時の処理
        if (timeLeft <= 0) {
            clearInterval(gameInterval);

            // 結果の表示
            alert("ゲーム終了！最終スコア: " + score);

            // ボタンを押せないように
            startButton.disabled = false;
        }
    }, 1000);   // 1秒（1000ミリ秒）ごとに実行
}

// もぐらをランダムに出現させる
function spawnMole() {
    // もぐらを表示する穴を決定
    let randomHole = holes[Math.floor(Math.random() * holes.length)];
    
    // もぐらを作成
    let mole = document.createElement("div");
    mole.classList.add("mole");

    // もぐらが叩かれたときの処理
    mole.addEventListener("click", () => {
        // 自身を削除
        mole.remove(); 

        // スコアの更新
        score++;
        scoreText.textContent = score;
    });

    // もぐらを表示
    randomHole.appendChild(mole);

    // 時間が経ったらもぐらは隠れる
    setTimeout(() => {
        mole.remove();
        if (timeLeft > 0) {
            spawnMole();
        }
    }, 800);    // もぐらが顔を出す時間は0.8秒（800ミリ秒）
}