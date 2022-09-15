import React, {FC} from 'react'
import { TaskObjectType } from '../../../store/scram-reducer'
import Task from './Task'


interface TaskWrapperType {
  tasks: Array<TaskObjectType>
}

const TaskWrapper: FC<TaskWrapperType> = React.memo(
  ({ tasks }) => {
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