import React, {FC} from 'react'
import { Draggable } from 'react-beautiful-dnd'

interface TaskType {
  content:  string
  id: string
  index: number
}

const Task:FC<TaskType> = ({content, id, index}) => {
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
              transition
             text-slate-600 dark:text-slate-100 rounded-md relative text-left p-3 bg-gray-50 dark:bg-slate-500`}>

            {content}
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Task