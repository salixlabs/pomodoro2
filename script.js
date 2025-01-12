let workTimeMinutes = .5;
let breakTimeMinutes = .25;
let timeLeft = workTimeMinutes * 60;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const modeToggle = document.getElementById('mode-checkbox');
const workStatus = document.getElementById('work-status');
const breakStatus = document.getElementById('break-status');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    const mode = isWorkTime ? 'Work' : 'Break';
    document.title = `${minutes}:${seconds.toString().padStart(2, '0')} ${mode} - Pomodoro`;
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
    
    // Sync checkbox with current mode
    modeToggle.checked = !isWorkTime;
    
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
modeToggle.addEventListener('change', () => {
    if (timerId === null) {
        switchMode();
    } else {
        // If timer is running, revert the toggle
        modeToggle.checked = isWorkTime ? false : true;
    }
});

// Initialize display
updateDisplay();

// Add initial class when page loads
document.querySelector('.mode').classList.add('work-mode');

// Add this after the other initializations
workStatus.classList.add('active'); // Initialize work status as active 

// Make sure checkbox starts unchecked (work mode)
modeToggle.checked = false; 