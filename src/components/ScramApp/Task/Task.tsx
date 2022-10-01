import {FC, useState} from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { BiCheck, BiCog, BiEdit, BiTrash } from 'react-icons/bi'
import { RiCloseFill } from 'react-icons/ri'
import { HiFire } from 'react-icons/hi'
import { BiTime } from 'react-icons/bi'
import { AiOutlineCalendar } from 'react-icons/ai'

import { useAppDispatch } from '../../../hook'
import { editTaskScram, removeTaskScram, setTaskSettingsEditScram, TaskObjectType, TaskTodoType, toggleEditTaskScram } from '../../../store/scram-reducer'


interface TaskType {
  content:  TaskObjectType['content']
  id: TaskObjectType['id']
  isContentEdit: TaskObjectType['isContentEdit']
  taskData: TaskObjectType['taskDate']
  taskTodo: TaskObjectType['taskTodo']
  isFire: TaskObjectType['isFire']

  index: number
  columnID: string
}

const Task:FC<TaskType> = ({content, id, index, isContentEdit, columnID, taskData, taskTodo, isFire}) => {
  const dispatch = useAppDispatch()

  const toggleEditTask = (taskID:string) => {
    dispatch(toggleEditTaskScram(taskID))
  }

  const editTask = (taskID:string, content:string) => {
    dispatch(editTaskScram({taskID, content}))
    dispatch(toggleEditTaskScram(taskID))
  }

  const removeTask = (taskID:string, columnID:string) => {
    dispatch(removeTaskScram({taskID, columnID}))
  }

  const setTaskSettingsEdit = (taskID:string) => {
    dispatch(setTaskSettingsEditScram(taskID))
  }

  const [taskContent, setTaskContent] = useState('')

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          className='py-1'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={`${!snapshot.isDragging ? 'shadow-none' : 'shadow-xl scale-105'}
              transition group
             text-slate-600 dark:text-slate-100 rounded-md relative text-left p-3 bg-gray-50 dark:bg-slate-500`}>

            {
              isContentEdit ?  
              <div className='flex justify-between'>
                <input className='w-[80%] bg-transparent border-b outline-none text-lg' 
                  onChange={(e) => setTaskContent(e.target.value)}
                  value={taskContent}
                  autoFocus
                />

                {
                  taskContent.length !== 0 &&
                  <button
                    onClick={() => editTask(id, taskContent)} 
                    className='ml-2 px-2 bg-indigo-500 rounded-md shadow-md'
                  >
                    <BiCheck />
                </button>
                }

                <button
                  onClick={() => toggleEditTask(id)} 
                  className='ml-2 px-2 bg-red-500 rounded-md shadow-md'
                >
                  <RiCloseFill />
                </button>
              </div>
              :
              <div className='flex justify-between items-center'>

                <div className='text-2xl font-bold w-full'>
                  <div className='border-b mb-3 pb-2 text-slate-800 dark:text-slate-50 dark:border-b-slate-400 flex items-center'>
                    {content}
                    {isFire && <HiFire className='ml-3 -mb-1 text-[#ff4c4c]' />}
                  </div>
                  
                  <div className='flex justify-between'>
                    <span className='text-xs font-semibold'>
                      <div className='flex items-center'><BiTime className='mr-1'/>{taskData.dateTime}</div>
                      <div className='flex items-center'><AiOutlineCalendar className='mr-1' />{taskData.dateDMY}</div>
                    </span>
                  </div>
                </div>

                {/* edit task input */}
                <span className='flex flex-col h-full justify-between' >
                  <button 
                    className='ml-2 mb-[2px] opacity-0 group-hover:opacity-100 transition
                      hover:bg-indigo-500 hover:text-white p-[6px] rounded-md'
                    onClick={() => toggleEditTask(id)}
                  >
                    <BiEdit />
                  </button>

                  <button 
                    className='ml-2 mb-[2px] opacity-0 group-hover:opacity-100 transition
                      hover:bg-indigo-500 hover:text-white p-[6px] rounded-md'
                    onClick={() => setTaskSettingsEdit(id)}
                  >
                    <BiCog />
                  </button>

                  <button 
                    className='ml-2 opacity-0 group-hover:opacity-100 transition 
                      hover:bg-indigo-500 hover:text-white p-[6px] rounded-md'
                    onClick={() => removeTask(id, columnID)}
                  >
                    <BiTrash />
                  </button>
                </span>

              </div>
            }

          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Task