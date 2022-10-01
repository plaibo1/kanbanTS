import {FC} from 'react'
import { useAppDispatch } from '../../../../hook'
import { addTaskScram } from '../../../../store/scram-reducer'


interface AddTaskBtnType {
  columnID: string
}

const AddTaskBtn:FC<AddTaskBtnType> = ({columnID}) => {

  const dispatch = useAppDispatch()

  const addTask = (columnID:string) => {
    dispatch(addTaskScram({columnID}))
  }

  return (
    <div className='w-full flex justify-center'>
      <button
        className='hover:bg-indigo-500 hover:text-white rounded-lg w-[95%] py-2 px-3 my-3 dark:text-white text-left text-sm'
        onClick={() => { addTask(columnID) }}
      >
        + New
      </button>
    </div>
  )
}

export default AddTaskBtn