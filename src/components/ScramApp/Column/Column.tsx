import {FC} from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useAppDispatch } from '../../../hook'
import { addTaskScram, ColumnObjectType, initialStateScramAppType, TaskObjectType } from '../../../store/scram-reducer'
import { StrictModeDroppable } from '../StrictModeDroppable'
import TaskWrapper from '../Task/TaskWrapper'

import {MdOutlineDragIndicator} from 'react-icons/md'

interface ColumnType {
  column: ColumnObjectType
  tasks: Array<TaskObjectType>
  columnIndex: number
}

const Column:FC <ColumnType> = ({ column, tasks, columnIndex }) => {

  const dispatch = useAppDispatch()

  
  const addTask = (content:string, columnID:string) => {
    dispatch(addTaskScram({content, columnID}))
  }

  return (
    <Draggable draggableId={column.id} index={columnIndex}>
    {
      ((provided) => (
        <div
          className='bg-white dark:bg-slate-700 w-[400px] 
            min-w-[400px] mx-3 inline-block rounded-xl relative shadow-sm'
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
  
          <div 
            className='text-slate-800 dark:text-slate-50 text-left text-2xl leading-7 flex justify-between items-center
              font-semibold mb-3 py-3 pl-3 border-b dark:border-slate-600' 
            {...provided.dragHandleProps}
          >
            {column.title}
            <MdOutlineDragIndicator className='mr-2 dark:text-white' />
          </div>
  
          <StrictModeDroppable droppableId={column.id} type='task'>
  
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef} {...provided.droppableProps}
                className={`py-3 w-full min-h-[150px] flex flex-col justify-between rounded-xl
                ${snapshot.isDraggingOver && 'bg-indigo-100 dark:bg-slate-600'}`}
              >
                <div className='mx-3'>
                  <TaskWrapper tasks={tasks}/>

                  {provided.placeholder}
                </div>

              </div>
            )}
  
          </StrictModeDroppable>
  
          <div className='w-full flex justify-center'>
            <button 
              className='hover:bg-indigo-500 hover:text-white rounded-lg w-[95%] py-2 px-3 my-3 dark:text-white text-left text-sm' 
              onClick={() => {addTask('task content here', column.id)}}
            >
              + New
            </button>
          </div>

        </div>
        ))
    }
    </Draggable>
  )
}

export default Column