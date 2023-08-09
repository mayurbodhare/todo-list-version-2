import React, { useState, useEffect } from 'react'
import {TiTickOutline, TiTick} from 'react-icons/ti'

export default function TodoList() {

  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState('');
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [selected, setSelected] = useState([]);
  

  const handleClickADD = (e) =>{
    e.stopPropagation();
    if(todo !== ''){
      setTodoList([ ...todoList,{
        id:Math.floor(Math.random()*1000000),
        name: todo,
        isComplete: false,
        isSelected: false
      }]);
    }
      setTodo('');
      setCount(count + 1);
  }

  const handleChange = (e) => {
    e.stopPropagation();
    setTodo(e.target.value);
  }

  const handleClickREMOVE = (e, id) => {
    
    const newTodoList = todoList.filter((todo) => (todo.id !== id));
    setTodoList(newTodoList);
    setCount(count - 1);
  }

  const handleClickDONE = (e, id) => {
    e.stopPropagation();
    const newTodoList = todoList.map((todo) => {
      if(todo.id === id){
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    
    setTodoList(newTodoList);
    const list = todoList.filter( todo => (todo.isComplete === true));
    setCompleted(completed => list.length);
    
  } 

  const handleClickUP = (e, index) => {
      if(index !== 0){
        const list = [...todoList];
        const temp = list[index];
        list[index] = list[index-1];
        list[index-1] = temp;
        setTodoList(list)
      }
  }

  
  const handleClickDOWN = (e, index) => {
    if(index !== count-1){
      const list = [...todoList];
      const temp = list[index];
      list[index] = list[index+1];
      list[index+1] = temp;
      setTodoList(list)
    }
  }

  const handleKeyPressENTER = (e) => {
    if(e.keyCode === 13){
      handleClickADD(e);
    }
  }
  
  const handleClickSELECT = (e, id) => {
    e.stopPropagation();
    const newTodoList = todoList.map((todo) => {
      if(todo.id === id){
        todo.isSelected = !todo.isSelected;
      }
      return todo;
    });
    
    setTodoList(newTodoList);
    const list = newTodoList.filter( todo => (todo.isSelected === true));
    setSelected([ ...list]);
  } 

  

  return (
    <div>
      <div className="container">
      <div className='title'>TODOLIST</div>
      <br />
      <div className='input'>
          <input onChange={handleChange} onKeyDown={handleKeyPressENTER} type="text" placeholder='Do something!!!' value={todo}/>
          <button onClick={handleClickADD}>Add Todo</button>
      </div>

      <div className="count">COMPLETED ITEMS: {completed} / {count}</div>

      <div className="list">
        {
          todoList.map( (todo, index) => (
            <div className="todo" key={todo.id}>
                <div className={todo.isSelected? 'todo-name selected' : 'todo-name'} aria-checked={todo.isComplete} onClick={(e) => handleClickSELECT(e, todo.id)}>{todo.name}
                  {
                    todo.isComplete ? <TiTick className='icon' onClick={(e) => handleClickDONE(e, todo.id)}/> : <TiTickOutline className='icon' onClick={(e) => handleClickDONE(e, todo.id)}/>
                  }                
                </div>
                <button className='up' onClick={(e) => handleClickUP(e, index)}>UP</button>
                <button className='down' onClick={(e) => handleClickDOWN(e, index)}>DOWN</button>
                <button className='delete' onClick={(e) => handleClickREMOVE(e, todo.id)}>X</button>
              </div>
          ))
        }
      </div>

      </div>
    </div>
  );
}
