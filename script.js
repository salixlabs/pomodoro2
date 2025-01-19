let workTimeMinutes = 25;
let breakTimeMinutes = 5;
let timeLeft = workTimeMinutes * 60;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeToggle = document.getElementById('mode-checkbox');
const modeMessage = document.querySelector('.mode-message');
const addTimeButton = document.getElementById('add-time');
const focusTaskDisplay = document.querySelector('.focus-task');
const focusModal = document.getElementById('focus-modal');
const focusInput = document.getElementById('focus-input');
const focusSubmit = document.getElementById('focus-submit');
console.log('Focus submit button:', focusSubmit);
addTimeButton.className = 'work-mode';  // Set initial style immediately
addTimeButton.style.color = '#426dbc';  // Set initial color immediately
addTimeButton.style.borderColor = '#426dbc';  // Set initial border color immediately
modeMessage.style.color = '#426dbc';  // Set initial color immediately after getting the element

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    const mode = isWorkTime ? 'Work' : 'Break';
    document.title = `${minutes}:${seconds.toString().padStart(2, '0')} ${mode} - Pomodoro`;
}

function startTimer() {
    if (timerId === null && pauseButton.textContent !== 'Resume') {  // Only ask for focus if not resuming
        if (isWorkTime) {
            focusModal.style.display = 'flex';
            focusInput.focus();
            return;
        }
        startTimerCountdown();
    }
}

function startTimerCountdown() {
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

function pauseTimer() {
    if (timerId !== null) {  // If timer is running
        clearInterval(timerId);
        timerId = null;
        pauseButton.textContent = 'Resume';
    } else {  // If timer is paused
        startTimerCountdown();  // Resume without asking for focus
        pauseButton.textContent = 'Pause';
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkTime ? workTimeMinutes * 60 : breakTimeMinutes * 60;
    focusTaskDisplay.textContent = '';  // Clear focus task on reset
    pauseButton.textContent = 'Pause';  // Reset pause button text
    updateDisplay();
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workTimeMinutes * 60 : breakTimeMinutes * 60;
    
    // Clear focus task when switching to break mode
    if (!isWorkTime) {
        focusTaskDisplay.textContent = '';
    }
    
    // Reset pause button state
    pauseButton.textContent = 'Pause';
    
    // Sync checkbox with current mode
    modeToggle.checked = !isWorkTime;
    
    // Change background color based on mode
    document.body.style.backgroundColor = isWorkTime ? '#426dbc' : '#498858';
    
    // Update mode message
    modeMessage.textContent = isWorkTime ? 'Work Mode - Focus!' : 'Break Time';
    modeMessage.style.color = isWorkTime ? '#426dbc' : '#498858';
    
    // Update add time button styling
    addTimeButton.className = isWorkTime ? 'work-mode' : 'break-mode';
    addTimeButton.style.color = isWorkTime ? '#426dbc' : '#498858';
    addTimeButton.style.borderColor = isWorkTime ? '#426dbc' : '#498858';
    
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

function addFiveMinutes() {
    timeLeft += 5 * 60; // Add 5 minutes in seconds
    updateDisplay();
}

function handleFocusSubmit() {
    console.log('Modal submit clicked');
    const task = focusInput.value.trim();
    if (task) {
        focusTaskDisplay.textContent = `Focus: ${task}`;
    }
    console.log('Closing modal');
    focusModal.style.display = 'none';
    focusInput.value = '';
    startTimerCountdown();
}

function setupModalListeners() {
    focusSubmit.addEventListener('click', handleFocusSubmit);
    
    focusInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleFocusSubmit();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && focusModal.style.display === 'flex') {
            focusModal.style.display = 'none';
            startTimerCountdown();
        }
    });
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
addTimeButton.addEventListener('click', addFiveMinutes);

// Initialize display
updateDisplay();

// Make sure checkbox starts unchecked (work mode)
modeToggle.checked = false; 

// Initialize button style
addTimeButton.className = 'work-mode'; 

// Call setupModalListeners after all DOM elements are initialized
setupModalListeners();
