import React, { Component } from 'react';
import { IoIosPlay, IoIosPause, IoIosRefresh } from 'react-icons/io';
import beepStart from '../resources/start.mp3';
import beepFinish from '../resources/finish.mp3';


export default class Timer extends Component {

    radius = 140;
    initialPerimeter = 280 * Math.PI;// (this.radius * 2 * Math.PI);
    speed = 50; //in miliseconds
    soundStart = new Audio(beepStart);
    soundFinish = new Audio(beepFinish);

    state = {
        duration: this.props.sectionTime,
        minutes: this.props.sectionTime,
        seconds: 0,
        intervalId: 0,
        timeRemaining: this.props.sectionTime * 60,
        perimeter: this.initialPerimeter,
        isStoped: true,
        isBreakTime: false
    }
    
    
    start = () => {
       /*  if (this.state.todos.length === 0) {
          alert("please, insert a new task.");
          return;
        } */ 
        if (this.state.isStoped) {
          const id = setInterval(this.decrement, this.speed);
          this.setState({
                intervalId: id, 
                isStoped: false,
                duration: this.props.sectionTime,
                minutes: this.props.sectionTime,
                seconds: 0,
                timeRemaining: this.props.sectionTime * 60
            });
          this.soundStart.play();
        }    
    }
    
    
    decrement = () => {
        const { minutes, seconds, isBreakTime, 
                perimeter, timeRemaining, duration } = this.state;

            console.log(timeRemaining, duration, perimeter);

        if (seconds === 0) {
          if (minutes === 0) {
            if (isBreakTime) {
              this.reset();
              /* this.deleteTodo(0);
              if (todos.length > 1) {
                this.start();
              } */
            } else {
                this.setState({
                    isBreakTime: true, 
                    seconds: 0, 
                    munutes: this.props.breakTime,
                    duration: this.props.breakTime,
                    timeRemaining: this.props.breakTime * 60
                })
                this.soundFinish.play();
            }
            
          } else {
              this.setState({seconds: 59, minutes: minutes - 1});
          }
        } else {
            this.setState({
                seconds: seconds - 1,
                timeRemaining: timeRemaining - 1,
                perimeter: perimeter * timeRemaining / duration - perimeter
            });
        }
    }
    
    stop = () => {
        clearInterval(this.state.intervalId);
        this.setState({isStoped: true});
        //muda cor
        this.soundFinish.play();
    }
    
    reset = () => {
        const { sectionTime, minutes } = this.state;
        this.stop();
        this.setState({
            secctionTime: sectionTime, 
            minutes: minutes - 1,
            secondes: 0,
            perimeter: this.initialPerimeter
        });
    }

   /*  const radius = 140;
    const initialPerimeter = (radius * 2 * Math.PI);
    const speed = 3000; //in miliseconds
    const soundStart = new Audio(beepStart);
    const soundFinish = new Audio(beepFinish);

    const [ duration, setDuration ] = useState(totalDuration);
    const [ intervalId, setIntervalId ] = useState(); 
    const [ timeRemaining, setTimeRemaining ] = useState(totalDuration);
    const [ perimeter, setPerimeter ] = useState( initialPerimeter );

    //time.toFixed(2)
    function onStart(totalDuration) {
        onPause();
        setDuration(totalDuration);
        setTimeRemaining(duration);
        onTick();
        const id = setInterval(onTick, speed );
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
        const remaining = timeRemaining - 1// (speed / 100);
        const per = perimeter * remaining / duration - perimeter;

        console.log(remaining, per);
        setTimeRemaining(remaining.toFixed(2));     
        setPerimeter(per);
    }

    function getTimeRemaining(e) {
        setTimeRemaining(parseFloat(e.target.value));
    }

    function onRefresh() {
        setDuration(totalDuration);
        setPerimeter(initialPerimeter);
    } */

    render() {

        const { minutes, seconds, perimeter } = this.state;
        
        return (
            <div className="timer">
                <div className="controls">
                    <input value={`${minutes}:${seconds}`} />
                    <div>
                        <button 
                            className="control-button"
                            onClick={this.start}>
                            <IoIosPlay className="icon"/>
                        </button>
                        <button 
                            className="control-button"
                            onClick={this.stop}>
                            <IoIosPause className="icon"/>
                        </button>
                        <button 
                            className="control-button"
                            onClick={this.reset}>
                            <IoIosRefresh className="icon"/>
                        </button>
                    </div>
                </div>
                <svg className="dial">
                <circle
                    fill="transparent"
                    stroke="rgba(13, 238, 200, 0.5)"
                    strokeWidth="8"
                    strokeDasharray={perimeter}
                    r={this.radius}
                    cx="50"
                    cy="150"
                    transform="rotate(-90 100 100)"
                />
                </svg>
            </div>);
    }  
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
        duration = totalDuration;
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