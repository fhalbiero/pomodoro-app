import React, { useState } from 'react';
import { IoIosPlay, IoIosPause, IoIosRefresh } from 'react-icons/io';


export default function Timer({totalDuration}) {

    const [ duration, setDuration ] = useState(totalDuration);
    const [ intervalId, setIntervalId ] = useState(); 
    const [ timeRemaining, setTimeRemaining ] = useState(totalDuration);

    const radius = 140;
    const initialPerimeter = radius * 2 * Math.PI;
    const [ perimeter, setPerimeter ] = useState( initialPerimeter );

    //time.toFixed(2)
    function onStart(totalDuration) {
        setDuration(totalDuration);
        onTick();
        const id = setInterval(onTick, 50 );
        setIntervalId(id)
    }

    function onComplete() {
        console.log('Timer is completed');
    }

    function onPause() {
        clearInterval(intervalId);
    }

    function onTick() {
        if (timeRemaining <= 0) {
            onPause();
            onComplete();
            return;
        }

        setTimeRemaining(timeRemaining - 0.050);     
        setPerimeter(perimeter * timeRemaining / duration - perimeter);
    }

    function getTimeRemaining(e) {
        return parseFloat(e.target.value);
    }

    function onRefresh() {
        setDuration(totalDuration);
        setPerimeter(initialPerimeter);
    }


    return (
        <div className="timer">
            <div className="controls">
                <input value={timeRemaining} onChange={getTimeRemaining} />
                <div>
                    <button 
                        className="control-button"
                        onClick={onStart}>
                        <IoIosPlay className="icon"/>
                    </button>
                    <button 
                        className="control-button"
                        onClick={onPause}>
                        <IoIosPause className="icon"/>
                    </button>
                    <button 
                        className="control-button"
                        onClick={onRefresh}>
                        <IoIosRefresh className="icon"/>
                    </button>
                </div>
            </div>
            <svg className="dial">
            <circle
                fill="transparent"
                stroke="rgba(13, 238, 200, 0.5)"
                stroke-width="8"
                stroke-dasharray={perimeter}
                r={radius}
                cx="50"
                cy="150"
                transform="rotate(-90 100 100)"
            />
            </svg>
        </div>);
    
}

/**class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        durationInput = durationInput;
        startButton = startButton;
        pauseButton = pauseButton;

        if (callbacks) {
            onStart = callbacks.onStart;
            onTick = callbacks.onTick;
            onComplete = callbacks.onComplete;
        }

        startButton.addEventListener('click', start);
        pauseButton.addEventListener('click', pause);
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