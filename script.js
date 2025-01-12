let workTimeMinutes = 1;
let breakTimeMinutes = 1;
let timeLeft = workTimeMinutes * 60;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkTime ? workTimeMinutes * 60 : breakTimeMinutes * 60;
    updateDisplay();
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workTimeMinutes * 60 : breakTimeMinutes * 60;
    modeText.textContent = isWorkTime ? 'WORK TIME' : 'BREAK TIME';
    
    // Update mode display styling
    const modeDiv = document.querySelector('.mode');
    if (isWorkTime) {
        modeDiv.classList.remove('break-mode');
        modeDiv.classList.add('work-mode');
    } else {
        modeDiv.classList.remove('work-mode');
        modeDiv.classList.add('break-mode');
    }
    
    // Change background color based on mode
    document.body.style.backgroundColor = isWorkTime ? '#426dbc' : '#498858';
    
    updateDisplay();
}

function setWorkTime(minutes) {
    workTimeMinutes = minutes;
    if (isWorkTime) {
        timeLeft = workTimeMinutes * 60;
        updateDisplay();
    }
}

function setBreakTime(minutes) {
    breakTimeMinutes = minutes;
    if (!isWorkTime) {
        timeLeft = breakTimeMinutes * 60;
        updateDisplay();
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize display
updateDisplay();

// Add initial class when page loads
document.querySelector('.mode').classList.add('work-mode'); 