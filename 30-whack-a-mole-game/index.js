const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const scoreList = JSON.parse(localStorage.getItem('scoreList')) || [];
const highscoreList = document.querySelector('.highscore-list');
const maxHighscore = document.querySelector('.max-highscore');
let maxScore = Math.max(...scoreList);
let lastHole;
let timeOut = false;
let score = 0;

function randomTime(min, max){
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes){
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if(lastHole === hole) return randomHole(holes);
    lastHole = hole;
    return hole;
}

function peep(){
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() =>{
        hole.classList.remove('up');
        if(!timeUp) peep();
    }, time);
}

function startGame(){
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => {
        timeUp = true
        scoreList.push(score);
        maxScore = Math.max(...scoreList);
        localStorage.setItem('scoreList', JSON.stringify(scoreList));
        populateList(scoreList, highscoreList);
    }, 10100);
}

function bonk(e){
    if(!e.isTrusted && timeUp) return;
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

function populateList(scoreList = [], highscoreList){
    highscoreList.innerHTML = scoreList .map((score, i)=>{
        return `
            <li>
                <label for="score${i}" style="display:block;width:80%">${score}</label>
            </li>
        `;
    }).join('');
    maxHighscore.textContent = `HIGHSCORE: ${maxScore}`;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
populateList(scoreList, highscoreList);