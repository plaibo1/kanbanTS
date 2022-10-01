import { AnimatePresence, motion } from 'framer-motion'
import {FC, useState} from 'react'
import { BiTrash } from 'react-icons/bi'

interface TodoListTodoType {
  id: string,
  text: string,
  isCompleted: boolean
}

interface TodoAppType  {
  todosList: Array<TodoListTodoType>
  addTodo: (text:string) => void
  toggleIsCompleted: (todoID: string) => void
  removeTodo: (todoID: string) => void
}

const TodoApp:FC<TodoAppType> = ({todosList, addTodo, toggleIsCompleted, removeTodo}) => {

  const [todoText, setTodoText] = useState('')

  const addingTodoFoo = (text:string) => {
    if (text.trim().length === 0) return

    addTodo(text.trim())
    setTodoText('')
  }

  return (
    <div className='relative w-[80%]'>
      <div className='mb-5'>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text"  value={todoText} onChange={(e) => setTodoText(e.target.value)} />
          <button className='p-3 bg-indigo-500' onClick={() => addingTodoFoo(todoText)}>go</button>
        </form>
      </div>
      <div>
        <AnimatePresence>
          {
            todosList.map((todo:any) => {
              return (
                <motion.div 
                  key={todo.id} 
                  className='flex justify-between items-center'
                  initial={{translateY: -10}}
                  animate={{translateY: 0}}
                  exit={{translateX: -50, opacity: 0}}
                >
                  <div>
                    <input 
                      type="checkbox" 
                      className='mr-2'
                      checked={todo.isCompleted} 
                      onChange={() => toggleIsCompleted(todo.id)}
                    />
                    <span className={`${todo.isCompleted && 'line-through'}`}>{todo.text}</span>
                  </div>
                  <button onClick={() => (removeTodo(todo.id))}><BiTrash /></button>
                </motion.div>
              )
            })
          }
        </AnimatePresence>
      </div>
    </div>
  )
}

export default TodoApp