let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const increaseWorkButton = document.querySelector('#work-increase');
const decreaseWorkButton = document.querySelector('#work-decrease');
const increaseBreakButton = document.querySelector('#break-increase');
const decreaseBreakButton = document.querySelector('#break-decrease');
//default values
let seconds = 1500;
let secondsLeft;
let isPaused = true;
let status = 'work';
let workTimeMinutes = 25;
let breakTimeMinutes = 5;

 function timer(seconds) {
     clearInterval(countdown);
     const now = Date.now();
     const then = now + seconds * 1000;
     displayTimeLeft(seconds);
     displayEndTime(then);

     countdown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
     }, 1000);
 }

 function displayTimeLeft(seconds) {
     const minutes = Math.floor(seconds / 60);
     const remainderSeconds = Math.floor(seconds % 60);
     const display = `${minutes}:${remainderSeconds < 10 ? '0': ''}${
         remainderSeconds}`;
         document.title = display;
     timerDisplay.textContent = display;
 }

 function displayEndTime(timestamp) {
     const end = new Date(timestamp);
     const hour = end.getHours();
     const minutes = end.getMinutes();
     const message = (status === 'work'? 'Take a break at' : 'Be back at');

     endTime.textContent = `${message} ${hour > 12? hour-12: hour}:${
        minutes < 10? '0': ''}${minutes}`;
 }

 function setTimer() {
    if(event.srcElement.localName === 'button'){
        seconds = parseInt(this.dataset.time);
    }
    clearInterval(countdown);
    endTime.textContent = '';
    displayTimeLeft(seconds);
    isPaused = true;
    secondsLeft = undefined;
 }

 function startTimer() {
     if(!isPaused) return;

     if(isPaused && secondsLeft === undefined){
        timer(seconds);
        isPaused = !isPaused;
     }else{
         timer(secondsLeft);
         isPaused = !isPaused;
     }

 }

 function pauseTimer() {
    isPaused = true;
    clearInterval(countdown);

 }

 function changeWorkTime(action) {
    const workTimeLabel = document.querySelector('#work-time').innerText;
    const workTime = document.querySelector('#work-time').dataset.time
    const workTimeString = workTimeMinutes.toString();
    let updatedTimeSeconds;

    if(action === 'increase') {
        updatedTimeSeconds = parseInt(workTime) + 60;
        workTimeMinutes += 1;
    }else if(action === 'decrease' && workTimeMinutes > 0){
        updatedTimeSeconds = parseInt(workTime) - 60;
        workTimeMinutes -= 1;
    }else {return;}
    const updatedWorkTimeString = workTimeMinutes.toString();
    document.querySelector('#work-time').innerText = workTimeLabel.replace(workTimeString, updatedWorkTimeString);
    status = 'work';
    seconds = updatedTimeSeconds;
    document.querySelector('#work-time').dataset.time = updatedTimeSeconds;
 }

 function changeWorkTime(action) {
    const breakTimeLabel = document.querySelector('#break-time').innerText;
    const breakTime = document.querySelector('#break-time').dataset.time
    const breakTimeString = breakTimeMinutes.toString();
    let updatedTimeSeconds;

    if(action === 'increase') {
        updatedTimeSeconds = parseInt(breakTime) + 60;
        breakTimeMinutes += 1;
    }else if(action === 'decrease' && breakTimeMinutes > 0){
        updatedTimeSeconds = parseInt(breakTime) - 60;
        breakTimeMinutes -= 1;
    }else {return;}
    const updatedBreakTimeString = breakTimeMinutes.toString();
    document.querySelector('#break-time').innerText = breakTimeLabel.replace(breakTimeString, updatedBreakTimeString);
    status = 'break';
    seconds = updatedTimeSeconds;
    document.querySelector('#break-time').dataset.time = updatedTimeSeconds;
 }

 buttons.forEach(button => button.addEventListener('click', setTimer) );
 document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    if(!isNaN(mins)){
        isPaused = false;
        timer(mins * 60);
    }
    this.reset();
 });

pauseButton.addEventListener('click', pauseTimer);
startButton.addEventListener('click', startTimer);

increaseWorkButton.addEventListener('click', () => {
    changeWorkTime('increase');
    setTimer();   
});

decreaseWorkButton.addEventListener('click', () => {
    changeWorkTime('decrease');
    setTimer();   
});

increaseBreakButton.addEventListener('click', () => {
    changeWorkTime('increase');
    setTimer();   
});

decreaseBreakButton.addEventListener('click', () => {
    changeWorkTime('decrease');
    setTimer();   
});