import React from 'react'
import useDarkMode from './useDarkMode/useDarkmode'
import {BsSun} from 'react-icons/bs'
import {BsMoonStars} from 'react-icons/bs'

const DarkModeToggler = () => {

  const [isDarkMode, DarkModeToggler] = useDarkMode()

  return (
    <div>
      <button 
        onClick={DarkModeToggler} 
        className='relative w-[60px] h-[30px] bg-slate-200 rounded-full  flex items-center dark:bg-slate-700'
      >
        <div className='w-[25px] h-[25px] rounded-full transition-all bg-indigo-500 
          absolute top-1/2 left-[3px] -translate-y-1/2 dark:left-auto dark:right-[3px] flex items-center justify-center text-white'>
          {
          !isDarkMode ? 
            <><BsSun/></>
            :
            <><BsMoonStars/></>
          }
        </div>
      </button>
    </div>
  )
}

export default DarkModeToggler