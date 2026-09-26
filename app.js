const countElement = document.getElementById('count');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');
const resetButton = document.getElementById('reset');
const undoButton = document.getElementById('undo');

let count = 0;
let history = [];
const MIN = 0;
const MAX = 100;

// Helper function to update display and save
function updateCount(newCount) {
    if (newCount < MIN) newCount = MIN;
    if (newCount > MAX) newCount = MAX;
    count = newCount;
    countElement.textContent = count;
    localStorage.setItem('count', count);
    localStorage.setItem('history', JSON.stringify(history));
}

// Increment
incrementButton.addEventListener('click', () => {
    history.push(count);
    updateCount(count + 1);
});

// Decrement
decrementButton.addEventListener('click', () => {
    history.push(count);
    updateCount(count - 1);
});

// Reset
resetButton.addEventListener('click', () => {
    history.push(count);
    updateCount(0);
});

// Undo
undoButton.addEventListener('click', () => {
    if (history.length > 0) {
        const previousCount = history.pop();
        count = previousCount;
        countElement.textContent = count;
        localStorage.setItem('count', count);
        localStorage.setItem('history', JSON.stringify(history));
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === '+') {
        history.push(count);
        updateCount(count + 1);
    }
    if (e.key === 'ArrowDown' || e.key === '-') {
        history.push(count);
        updateCount(count - 1);
    }
    if (e.key === '0') {
        history.push(count);
        updateCount(0);
    }
});

// Load on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedCount = localStorage.getItem('count');
    const savedHistory = localStorage.getItem('history');
    if (savedCount !== null) {
        count = parseInt(savedCount);
        countElement.textContent = count;
    }
    if (savedHistory !== null) {
        history = JSON.parse(savedHistory);
    }
});
// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const isDarkMode = localStorage.getItem('darkMode') === 'true';

if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark);
});