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
    <div className='relative w-full sm:w-[80%]'>
      <div className='mb-6 pr-[10px]'>
        <form 
          onSubmit={(e) => e.preventDefault()}
          className='relative flex p-3 shadow-md dar:shadow-xl rounded-md dark:bg-slate-600'
        >
          <input 
            type="text"
            placeholder='type here'
            value={todoText} 
            onChange={(e) => setTodoText(e.target.value)}
            className='w-full py-1 pl-1 bg-transparent border-b outline-none dark:text-slate-100'
          />
          <button 
            className='bg-indigo-500 ml-2 rounded-md min-w-[65px] text-slate-50 hover:bg-indigo-400' 
            onClick={() => addingTodoFoo(todoText)}
          >
            + add
          </button>
        </form>
      </div>
      
      <div className='customTodoScroll'>
        <AnimatePresence>
          {
            todosList.map((todo:any) => {
              return (
                <motion.div 
                  key={todo.id} 
                  className='flex justify-between items-center px-3 py-2 my-2 bg-slate-100 dark:bg-slate-600 rounded-md'
                  initial={{translateY: -10}}
                  animate={{translateY: 0}}
                  exit={{translateX: -50, opacity: 0}}
                >
                  <div>
                    <input 
                      type="checkbox" 
                      className='mr-2 accent-indigo-500'
                      checked={todo.isCompleted} 
                      onChange={() => toggleIsCompleted(todo.id)}
                    />
                    <span 
                      className={`${todo.isCompleted && 'line-through'} font-semibold dark:text-slate-200`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <button onClick={() => (removeTodo(todo.id))}><BiTrash className='text-red-400'/></button>
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