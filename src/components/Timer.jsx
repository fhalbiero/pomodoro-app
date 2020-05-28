import React from 'react';
import { IoIosPlay, IoIosPause, IoIosRefresh} from 'react-icons/io';


export default function Timer() {

    return (
        <div className="timer">
            <div className="controls">
                <input id="duration" value="3" />
                <div>
                    <button id="start" className="control-button"><IoIosPlay className="icon"/></button>
                    <button id="pause" className="control-button"><IoIosPause className="icon"/></button>
                    <button id="refresh" className="control-button"><IoIosRefresh className="icon"/></button>
                </div>
            </div>
            <svg className="dial">
            <circle
                fill="transparent"
                stroke="rgba(13, 238, 200, 0.6)"
                stroke-width="8"
                r="90"
                cx="100"
                cy="100"
                transform="rotate(-90 100 100)"
            />
            </svg>
        </div>);
    
}

/**class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.intervalId = setInterval(this.tick, 50 );
    }

    pause = () => {
        clearInterval(this.intervalId);
    }

    tick = () => {

        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
            return;
        }

        //call set timeRemaining and call 
        //get timeRemaining to pass as parameter subtracting 1
        this.timeRemaining = this.timeRemaining - 0.050;
        if (this.onTick) {
            this.onTick(this.timeRemaining);    
        }
    }

    get timeRemaining() {
        //console.log('call get timeRemaining ');
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        //console.log('call set timeRemaining ',time);
        this.durationInput.value = time.toFixed(2);
    }
}



const durationInput = document.querySelector('#duration');
const startButton   = document.querySelector('#start');
const pauseButton   = document.querySelector('#pause');
const circle = document.querySelector("circle");

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);


let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration) {
        duration = totalDuration;
    },
    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset', 
            perimeter * timeRemaining / duration - perimeter
        );
    },
    onComplete() {
        console.log('Timer is completed');
    }
});*/