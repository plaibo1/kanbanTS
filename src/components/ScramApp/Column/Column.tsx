import {FC} from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { ColumnObjectType, TaskObjectType } from '../../../store/scram-reducer'
import { StrictModeDroppable } from '../StrictModeDroppable'
import TaskWrapper from '../Task/TaskWrapper'


import AddTaskBtn from './ColumnButtons/AddTaskBtn'
import ColumnTitle from './ColumnTitle'
import ColumnSettings from './ColumnSettings'


interface ColumnType {
  column: ColumnObjectType
  tasks: Array<TaskObjectType>
  columnIndex: number
}

const Column:FC <ColumnType> = ({ column, tasks, columnIndex }) => {

  return (
    <Draggable draggableId={column.id} index={columnIndex}>
    {
      ((provided) => (
        <div
          className='bg-white dark:bg-slate-700 min-w-[320px] sm:min-w-[350px] xl:min-w-[400px]
            mx-3 inline-block rounded-xl relative shadow-sm'
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
  
          {/* ===== column header ===== */}
          <div 
            className='text-slate-800 dark:text-slate-50 text-left text-lg leading-7 flex justify-between items-center
              font-semibold mb-3 py-3 pl-3 border-b dark:border-slate-600' 
            {...provided.dragHandleProps}
          >
            
            <ColumnTitle column={column} />

            {/* column header right side */}
            <ColumnSettings column={column} />

          </div>

  
          <StrictModeDroppable droppableId={column.id} type='task'>
  
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef} {...provided.droppableProps}
                className={`py-3 w-full min-h-[150px] flex flex-col justify-between rounded-xl
                ${snapshot.isDraggingOver && 'bg-indigo-100 dark:bg-slate-600'}`}
              >
                <div className='mx-3'>
                  <TaskWrapper tasks={tasks} columnID={column.id}/>

                  {provided.placeholder}
                </div>
              </div>
            )}
  
          </StrictModeDroppable>

          <AddTaskBtn columnID={column.id} />

        </div>
        ))
    }
    </Draggable>
  )
}

export default Column