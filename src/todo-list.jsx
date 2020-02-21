import React from 'react';
import Todo from './todo';


export default function TodoList({todos, deleteTodo}) {

    return (
        <div>
            { (todos.length > 0) ?
                todos.map((todo, index) => {
                    return (
                        <Todo 
                         key={index}
                         todo={todo} 
                         deleteTodo={deleteTodo} 
                        />
                    )
                })
                :
                "No todos here yet..."
            }
        </div>
     );
}
