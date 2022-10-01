import React, {FC} from 'react'
import { TaskObjectType } from '../../../store/scram-reducer'
import Task from './Task'


interface TaskWrapperType {
  tasks: Array<TaskObjectType>
  columnID: string
}

const TaskWrapper: FC<TaskWrapperType> = React.memo(
  ({ tasks, columnID }) => {
    return (
      <>
        {
          tasks.map((task: TaskObjectType, index: number) => {
            return (
              <Task
                key={task.id}
                content={task.content}
                id={task.id}
                index={index}
                isContentEdit={task.isContentEdit}
                columnID={columnID}
                taskData={task.taskDate}
                taskTodo={task.taskTodo}
                isFire={task.isFire}
              />
            )
          })
        }
      </>
    )
  }, (prevProps, nextProps) => {
    if (prevProps.tasks === nextProps.tasks) {
      return true
    }
    return false
  }
)

export default TaskWrapper