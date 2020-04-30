let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const bkgd1 = document.getElementById('background-1');
const bkgd2 = document.getElementById('background-2');
let control = 1;

function timer(seconds){
    //clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() =>{
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //check if we should stop it
        if (secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        //display it
        displayTimeLeft(secondsLeft);
        bkgd1.className = `gradient-${control}`;
        bkgd2.className = `gradient-${control + 1}`;
        if(bkgd1.style.opacity === '1') bkgd1.style.opacity = '0';
        if(bkgd2.style.opacity === '0') bkgd2.style.opacity = '1';
        control++;
        if(control === 10) control = 1;
    }, 1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0':''}${minutes}:${remainderSeconds < 10 ? '0': ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hours = end.getHours();
    const adjustedHours = hours > 12 ? hours - 12 : hours;
    const minutes = end.getMinutes();
    
    endTime.textContent = `Be back at ${adjustedHours < 10 ? '0':''}${adjustedHours}:${minutes < 10 ? '0': ''}${minutes}`;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})