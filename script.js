let timeLeft;
let timerId = null;
let isWorkMode = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workLabel = document.getElementById('work');
const breakLabel = document.getElementById('break');
const toggleButton = document.getElementById('toggle');

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
                alert(isWorkMode ? 'Work session completed! Take a break!' : 'Break is over! Back to work!');
                switchMode(isWorkMode ? 'break' : 'work');
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? 1 * 60 : .5 * 60;
    updateDisplay();
}

function switchMode(mode) {
    isWorkMode = mode === 'work';
    workLabel.classList.toggle('active', isWorkMode);
    breakLabel.classList.toggle('active', !isWorkMode);
    document.body.style.backgroundColor = isWorkMode ? '#406bb6' : '#559e68';
    resetTimer();
}

// Initialize
timeLeft = 1 * 60;
updateDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', () => switchMode(isWorkMode ? 'break' : 'work'));

// Update the element references
const workButton = document.getElementById('work');
const breakButton = document.getElementById('break');

// Remove old event listeners and add new one
// workButton.addEventListener('click', () => switchMode('work'));
// breakButton.addEventListener('click', () => switchMode('break')); 