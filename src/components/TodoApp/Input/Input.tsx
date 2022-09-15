import React, { useState } from 'react'
import { FC } from 'react'
import { useAppDispatch } from '../../../hook'
import { addTodo } from '../../../store/todo-reducer' 

const Input:FC = () => {

  const dispatch = useAppDispatch()

  const addNewTodo = (txt:string) => {
    if (txt.trim().length === 0) {

      setIsError(true)
      setTimeout(() => setIsError(false) , 2000)
      setInputText('')

      return false
    }

    dispatch(addTodo({text: txt}))
    setInputText('')
  }

  const [inputText, setInputText] = useState('');
  const [error, setIsError] = useState(false);

  return (
    <>
      <div className='mx-2'>
        <form className='flex bg-white 
          rounded-2xl shadow-lg w-full relative py-2 dark:bg-slate-700'>
          <input
            className='w-full p-4 ml-2 rounded-xl outline-none dark:bg-slate-700 dark:text-white'
            placeholder='type here'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            onClick={(e) => {
              e.preventDefault()
              addNewTodo(inputText)
            }}
            className='w-[200px] bg-indigo-500 text-white mr-3 rounded-xl'
          >
            add item
          </button>
        </form>
      </div>

      <div className='h-2 text-base text-red-500 ml-1 mt-1 text-left'>
        {error && <span>type something....</span>}
      </div>
    </>
  )
}

export default Input