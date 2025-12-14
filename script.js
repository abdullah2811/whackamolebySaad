let cursor = document.querySelector('.cursor');
let holes = [...document.querySelectorAll('.hole')];
let score = 0;
let scoreEl = document.querySelector('.score');
let sound = document.querySelector('.soundeffect');

run = () =>{

    timer = null;
    let i = Math.floor(Math.random() * holes.length);
    let hole = holes[i];

    let img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'assets/mole.png';
    
    img.addEventListener('click', () => {
        score++;
        scoreEl.textContent = `Score: ${score}`; 
        sound.currentTime = 0;
        sound.play();
        img.src = 'assets/mole-whacked.png';
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
