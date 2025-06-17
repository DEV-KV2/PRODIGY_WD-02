class Stopwatch {
    constructor() {
        this.time = 0;
        this.interval = null;
        this.running = false;
        this.lapCount = 0;
        
        // Get DOM elements
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.millisecondsDisplay = document.getElementById('milliseconds');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapList = document.getElementById('lapList');
        
        // Bind event listeners
        this.bindEvents();
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.addLap());
    }
    
    start() {
        if (!this.running) {
            this.interval = setInterval(() => {
                this.time += 10;
                this.updateDisplay();
            }, 10);
            
            this.running = true;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.lapBtn.disabled = false;
        }
    }
    
    pause() {
        if (this.running) {
            clearInterval(this.interval);
            this.running = false;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            this.lapBtn.disabled = true;
        }
    }
    
    reset() {
        clearInterval(this.interval);
        this.time = 0;
        this.running = false;
        this.lapCount = 0;
        
        this.updateDisplay();
        this.clearLaps();
        
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.lapBtn.disabled = true;
    }
    
    addLap() {
        if (this.running) {
            this.lapCount++;
            const lapTime = this.formatTime(this.time);
            const lapItem = this.createLapItem(this.lapCount, lapTime);
            this.lapList.insertBefore(lapItem, this.lapList.firstChild);
        }
    }
    
    updateDisplay() {
        const time = this.formatTime(this.time);
        this.minutesDisplay.textContent = time.minutes;
        this.secondsDisplay.textContent = time.seconds;
        this.millisecondsDisplay.textContent = time.milliseconds;
    }
    
    formatTime(time) {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        
        return {
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0'),
            milliseconds: milliseconds.toString().padStart(2, '0')
        };
    }
    
    createLapItem(lapNumber, lapTime) {
        const li = document.createElement('li');
        li.className = 'lap-item';
        li.innerHTML = `
            <span class="lap-number">Lap ${lapNumber}</span>
            <span class="lap-time">${lapTime.minutes}:${lapTime.seconds}:${lapTime.milliseconds}</span>
        `;
        return li;
    }
    
    clearLaps() {
        this.lapList.innerHTML = '';
    }
}

// Initialize the stopwatch when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Stopwatch();
});
