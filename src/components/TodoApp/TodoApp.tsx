import { FC } from 'react'
import Input from './Input/Input'
import TodosList from './TodosList/TodosList'


const TodoApp:FC = () => {
  return (
    <div>
        <div className='w-[400px] mx-auto'>
          <Input />
        </div>

        <div className='w-[400px] mx-auto'>
          <TodosList />
        </div>
    </div>
  )
}

export default TodoApp