import React from 'react'
import DarkModeToggler from '../DarkmodeToggler/DarkModeToggler'

const Navbar:React.FC = () => {
  return (
    <nav className='mx-auto flex justify-between p-5 border-b dark:border-b-slate-700  rounded-br-2xl rounded-bl-2xl'>

      <div className='font-black flex items-center text-xl dark:text-white'>
        <span className='w-8 h-8 bg-indigo-500 flex justify-center items-center rounded-md text-white mr-1'>K</span>
        anbun.
      </div>
      
      <DarkModeToggler />

    </nav>
  )
}

export default Navbar