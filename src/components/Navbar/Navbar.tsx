import React from 'react'
import DarkModeToggler from '../DarkmodeToggler/DarkModeToggler'

const Navbar:React.FC = () => {
  return (
    <nav className='mx-auto flex justify-between p-5 border-b'>
      <div className='text-black'>Logo .</div>
      <DarkModeToggler />
    </nav>
  )
}

export default Navbar