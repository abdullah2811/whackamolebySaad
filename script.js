let cursor = document.querySelector('.cursor');
let holes = [...document.querySelectorAll('.hole')];
let score = 0;
let scoreEl = document.querySelector('.score');
let sound = document.querySelector('.soundeffect');
let moles = ['mole1', 'mole2', 'mole3'];
let timeLeft = 40;
let timerValue = document.querySelector('.timer-value');
let gameRunning = false;
let gamePaused = false;
let gameTimer;
let gameOverOverlay = document.querySelector('.game-over-overlay');
let restartBtn = document.querySelector('.restart-btn');
let startBtn = document.querySelector('.start-btn');
let pauseBtn = document.querySelector('.pause-btn');

startTimer = () => {
    gameTimer = setInterval(() => {
        if(!gamePaused){
            timeLeft--;
            timerValue.textContent = timeLeft;
            
            if(timeLeft <= 10){
                timerValue.classList.add('warning');
            }
            
            if(timeLeft <= 0){
                endGame();
            }
        }
    }, 1000);
}

endGame = () => {
    gameRunning = false;
    clearInterval(gameTimer);
    
    // Remove all moles
    holes.forEach(hole => {
        if(hole.querySelector('.mole')){
            hole.removeChild(hole.querySelector('.mole'));
        }
    });
    
    // Show game over overlay
    document.getElementById('final-score').textContent = score;
    gameOverOverlay.classList.remove('hidden');
}

restartBtn.addEventListener('click', () => {
    score = 0;
    timeLeft = 40;
    gameRunning = true;
    gamePaused = false;
    scoreEl.textContent = `Score: ${score}`;
    timerValue.textContent = timeLeft;
    timerValue.classList.remove('warning');
    gameOverOverlay.classList.add('hidden');
    startBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    run();
    startTimer();
});

startBtn.addEventListener('click', () => {
    if(timeLeft > 0 && !gameRunning){
        gameRunning = true;
        gamePaused = false;
        startBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
        run();
        startTimer();
    }
});

pauseBtn.addEventListener('click', () => {
    gamePaused = !gamePaused;
    pauseBtn.textContent = gamePaused ? 'Resume' : 'Pause';
});

run = () =>{

    if(!gameRunning) return;

    timer = null;
    let i = Math.floor(Math.random() * holes.length);
    let hole = holes[i];
    
    let moleType = moles[Math.floor(Math.random() * moles.length)];

    let img = document.createElement('img');
    img.classList.add('mole');
    img.src = `assets/${moleType}.png`;
    
    img.addEventListener('click', () => {
        score++;
        scoreEl.textContent = `Score: ${score}`; 
        sound.currentTime = 0;
        sound.play();
        img.src = `assets/${moleType}-whacked.png`;
        clearTimeout(timer);
        setTimeout(() => {
            hole.removeChild(img);
            run();
        }, 500);
    }); 
    
    hole.appendChild(img); 

    timer = setTimeout(() => {
        hole.removeChild(img);
        run();
    }, 1500);
}
run();
window.addEventListener('mousemove', e => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

window.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});
