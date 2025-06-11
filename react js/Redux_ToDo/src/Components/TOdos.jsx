import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/Todo/todoSlice";

function Todos () {
   const todos =  useSelector(state => state.todos)

   return (
     <>
      <div>ToDOs</div>
      {todos.map((todo)=>(
        <li key={todo.id}>
            {todo.text}
            <button 
              onChange={()=> dispatch(removeTodo(todo.id))}
            >Button</button>
        </li>
      ))}
     </>
   )
}