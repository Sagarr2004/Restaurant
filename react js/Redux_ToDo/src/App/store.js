import {configureStore} from '@reactjs/toolkit';
import todoReducer from 'D:\Coding\react js\Redux_ToDo\src\features/todo/todoSlice'

export const store = configureStore({
    reducer : todoReducer
})
