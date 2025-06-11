import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {AddTodo, addTodo} from '../features/Todo/todoSlice'

function AddTodo () {

    const [input, setInput] = useState('')
    const dispatch = useDispatch();

    const addTodoHandler= (e)=>{
         e.preventDefault();
         dispatch(addTodo(input))
         setInput('')
    }

     return (
        <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
            <input 
              type='text'
              className="bg-grey-800 rounded border border-grey-700 focus:border-indigo-500 
               focus:ring-2 focus-ring-indigo-900 text-base outline-none text-grey-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
               placeholder='Enter ToDo..'
               value={input}
               onChange={(e)=> setInput(e.target.value)}
               />
        </form>
     )
}