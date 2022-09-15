import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type TodoType = {
  id: string
  text: string
  completed: boolean
  editable: boolean
}

type InitialStateType = {
  todos: Array<TodoType>
}


const initialState: InitialStateType = {
  todos: [
    // {id: 'asdwad32', text: 'Do something for 1 hour', completed: false , editable: false},
    // {id: '1234', text: 'Do something for 2 hour', completed: false , editable: false},
    // {id: '12343', text: 'Do something for 3 hour', completed: false , editable: false},
    // {id: '12341', text: 'Do something for 4 hour', completed: false , editable: false},
    // {id: '12345', text: 'Do something for 5 hour', completed: false , editable: false},
  ]
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {

    setTodos(state, action:PayloadAction<Array<TodoType>>) {
      state.todos = action.payload
    },

    addTodo(state, action: PayloadAction<{text:string}>) {

      const todo = {
        id: new Date().toISOString(),
        text: action.payload.text,
        completed: false,
        editable: false
      }

      state.todos.push(todo)

    },

    toggleComplete(state, action:PayloadAction<{id: string}>) {
      const toggleTodo = state.todos.find(todo => todo.id === action.payload.id)
      if (toggleTodo) {
        toggleTodo.completed = !toggleTodo.completed;
      }
    },

    removeTodo(state, action:PayloadAction<{id: string}>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    },

    toggleIsEdit(state, action:PayloadAction<{id: string}>) {
      const toggleTodo = state.todos.find(todo => todo.id === action.payload.id)

      if (toggleTodo) {
        toggleTodo.editable = !toggleTodo.editable;
      }
    },

    editTodo(state, action:PayloadAction<{id:string, text:string}>) {
      state.todos.forEach(todo => {
        if (todo.id === action.payload.id) todo.text = action.payload.text
      })
    }

  }
})

export const {setTodos, addTodo, removeTodo, toggleComplete, editTodo, toggleIsEdit} = todoSlice.actions;

export type toddReducerActionsTypes = typeof todoSlice.actions;



export default todoSlice.reducer; 