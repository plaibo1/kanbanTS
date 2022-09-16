import{ FC, ReactNode } from 'react'


interface ContainerLayoutType {
  children: ReactNode
}

export const ContainerLayout:FC<ContainerLayoutType> = ({children}) => {
  return (
    <div className='px-4 py-10 mx-auto dark:bg-slate-800'>
      {children}
    </div>
  )
}
