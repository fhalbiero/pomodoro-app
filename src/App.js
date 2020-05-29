import React from 'react';
import './App.css';
import beepStart from './resources/start.mp3';
import beepFinish from './resources/finish.mp3';

import Timer from './components/Timer';
import Todo from './components/Todo';


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      minutes: 0,
      seconds: 0,
      intervalId: undefined,
      stoped: true,
      rest: false,
      pomodoroTime: 25,
      restTime: 5,
      bgColor: {
        backgroundColor: '#abf7ea'
      },
      todos: [],
      description: ''
    }
  }

  soundStart = new Audio(beepStart);
  soundFinish = new Audio(beepFinish);

  componentDidMount() {
    this.setTime(this.state.pomodoroTime);
  }

  addTodo = () => {
    const { todos, description } = this.state;

    if (todos.length >= 4) {
      alert("You can add only 4 todos per time!");
      return;
    }
    this.setState({todos : [...todos, description], description: ''});
  }

  handleChange = (e) => {
      this.setState({description: e.target.value});
  }

  start = () => {
    if (this.state.todos.length === 0) {
      alert("please, insert a new task.");
      return;
    }

    if (this.state.stoped) {
      const id = setInterval(this.decrement, 1000);
      this.setState({intervalId: id, stoped: false,  bgColor : { backgroundColor: '#bff862'}});
      this.soundStart.play();
    }
    
  }

  deleteTodo = (id) => {
    const { todos } = this.state;
    const newTodos = todos.filter((todo, index) => index !== id);
    this.setState({todos: newTodos});
  }

  decrement = () => {
    const { minutes, seconds, rest, restTime, todos } = this.state;

    if (seconds === 0) {
      if (minutes === 0) {
        if (rest) {
          this.reset();
          this.deleteTodo(0);
          if (todos.length > 1) {
            this.start();
          }
        } else {
          this.setTime(restTime);
          this.setState({rest: true, bgColor : { backgroundColor: '#02C39A'}});
          this.soundFinish.play();
        }
        
      } else {
        this.setState({seconds: 59, minutes: minutes - 1});
      }
    } else {
      this.setState({seconds: seconds - 1})
    }
  }

  stop = () => {
    clearInterval(this.state.intervalId);
    this.setState({stoped: true, bgColor : { backgroundColor: '#abf7ea'}});
    this.soundFinish.play();
  }

  reset = () => {
    this.stop();
    this.setTime(this.state.pomodoroTime);
    this.setState({rest: false});
  }

  setTime = (minutes) => {
    this.setState({minutes, seconds: 0});
  }

  changeDuration = (e) => {
    const pomodoroTime =  e.target.value;
    const restTime = (pomodoroTime === 25) ? 5 : 15;
    this.setState({pomodoroTime, restTime, minutes: pomodoroTime });
  }


  render() {

    const { minutes, seconds, bgColor, todos, description } = this.state;

    return (
      <div className="app">
        <div className='header'>
          <span>POMODORO APP</span>
          <select onChange={this.changeDuration}>
            <option value='25'>25 Minutes - 5 rest</option>
            <option value='45'>45 Minutes - 15 rest</option>
          </select>
        </div>

        <Timer totalDuration={45}/>
        

        <div className="todo-list">
          <div className="todo-list__header">
            <input
              type="text"
              className="input-todo" 
              autoFocus
              onChange={this.handleChange}
              placeholder='Describe your tasks here...'
              value={description}
            />
            <button onClick={this.addTodo}>Add</button>
          </div>

          <div>
          { (todos.length > 0) ?
                todos.map((todo, index) => {
                    return (
                        <Todo 
                         key={index}
                         todo={todo} 
                         deleteTodo={this.deleteTodo.bind(this, index)} 
                        />
                    )
                })
                :
                <div className="msg">No tasks here yet...</div>
            }
          </div>

       </div>

        <div className="pomodoro">
            <div className="timer" style={bgColor}>
              <span>{(minutes < 10) ? '0' + minutes : minutes}</span>
              <span>:</span>
              <span>{(seconds < 10) ? '0' + seconds : seconds}</span>
            </div>
            <div className="buttons">
              <button onClick={this.start}>Start</button>
              <button onClick={this.stop}>Stop</button>
              <button onClick={this.reset}>Reset</button> 
            </div>
           
        </div>
        
      </div>
    );
  }
  
}

export default App;
