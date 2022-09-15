import{ FC } from 'react'

export const ContainerLayout:FC<any> = ({children}) => {
  return (
    <div className='px-4 py-10 mx-auto dark:bg-slate-800'>
      {children}
    </div>
  )
}
