import { FC } from 'react'
import { useAppDispatch } from '../../../hook'
import { addColumnScram } from '../../../store/scram-reducer'

const AddColumnBtn:FC = () => {

  const dispatch = useAppDispatch()

  const addColumn = (title: string) => {
    dispatch(addColumnScram(title))
  }

  return (
    <div className='mb-7 ml-3'>
      <button
        onClick={() => addColumn('new column')}
        className='bg-indigo-500 text-white py-1 px-3 text-sm rounded-md active:scale-95'
      >
        + column
      </button>
    </div>
  )
}

export default AddColumnBtn