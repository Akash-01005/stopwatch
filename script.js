const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const milliSeconds = document.getElementById('milliseconds');

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');

const lapList = document.getElementById('lapList');

let min = 0;
let sec = 0;
let milliSec = 0;
let interval;

let startTimer = () => {
    interval = setInterval(updateTimer, 10);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
}

let stopTimer = () => {
    clearInterval(interval);
    addLapList();
    startBtn.disabled = false;
}

let  resetTimer = ()=> {
    resetData();
    clearInterval(interval);
    startBtn.disabled = false;
    resetBtn.disabled = false;
}

let pauseTimer = () => {
    clearInterval(interval);
    pauseBtn.disabled = true;
    startBtn.disabled = false;
}

let updateTimer = () => {
    milliSec++;
    if (milliSec === 100) { 
        milliSec = 0;
        sec++;
        if (sec === 60) {
            sec = 0;
            min++;
        }
    }
    displayTimer();
}

let displayTimer = () => {
    milliSeconds.textContent = padTime(milliSec);
    seconds.textContent = `${padTime(sec)} :`;
    minutes.textContent = `${padTime(min)} :`;
}

let padTime = (time) => {
    return time.toString().padStart(2, '0');
}

let resetData = () => {
    milliSec = 0;
    sec = 0;
    min = 0;
    displayTimer();
}

let addLapList = () => {
    const lapTime = `${padTime(min)} : ${padTime(sec)} : ${padTime(milliSec)}`;
    let li = document.createElement('li');
    li.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: ${lapTime}</span>`;
    lapList.appendChild(li);
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
stopBtn.addEventListener('click', stopTimer);
pauseBtn.addEventListener('click', pauseTimer);
