import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BiTime } from 'react-icons/bi'
import { HiFire } from 'react-icons/hi'
import { MdClose } from 'react-icons/md'
import { useAppDispatch } from '../../../hook'
import {addTaskTodoScram, editableTaskType, offIsShowEditableTaskScram, removeTaskTodoScram, setFireScram, setTaskSettingsEditScram, toggleTaskTodoCompletedScram} from '../../../store/scram-reducer'
import TodoApp from '../../TodoApp/TodoApp'



const EditableTask: FC<{ editableTask: editableTaskType }> = ({ editableTask }) => {

  const dispatch = useAppDispatch()

  const setFire = (taskID: string, isFire:boolean) => {
    dispatch(setFireScram({taskID, isFire}))
    dispatch(setTaskSettingsEditScram(taskID))
  }

  const addTaskTodo = (taskID:string, text:string) => {
    dispatch(addTaskTodoScram({taskID, text}))
    dispatch(setTaskSettingsEditScram(taskID))
  }

  const toggleTaskTodoCompleted = (taskID: string, taskTodoID: string) => {
    dispatch(toggleTaskTodoCompletedScram({taskID, taskTodoID}))
    dispatch(setTaskSettingsEditScram(taskID))
  }

  const removeTodo = (taskID: string, taskTodoID: string) => {
    dispatch(removeTaskTodoScram({taskID, taskTodoID}))
    dispatch(setTaskSettingsEditScram(taskID))
  }

  const closeEditableTask = () => {
    dispatch(offIsShowEditableTaskScram())
  }
  

  return (
    <AnimatePresence>
      {
        editableTask.isShow &&
        <motion.div 
          className='w-full h-screen fixed top-0 left-0 z-[9999] backdrop-blur-sm' 
          onClick={closeEditableTask}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}

            className='w-[93%] sm:w-[600px] min-h-[520px] absolute left-1/2 top-1/2
              bg-white dark:bg-slate-700 px-5 py-8 sm:p-10 rounded-lg shadow-md dark:shadow-lg'

            initial={{translateY: '-100%', translateX: '-50%'}}
            animate={{translateY: '-50%'}}
            exit={{translateY: '-100%', translateX: '-50%'}}
          >
            <div>
              <div className='text-base font-semibold text-slate-300'>Task name</div>
              <div className='flex items-center'>
                <span className='text-slate-700 text-4xl font-bold dark:text-slate-100'>
                  {editableTask.task.content}
                </span>
                <label 
                  className={`w-[45px] h-[25px] rounded-xl border-2 ml-4 -mb-3 flex items-center relative
                  cursor-pointer hover:bg-indigo-500 hover:border-indigo-500 transition
                  ${editableTask.task.isFire ? 'border-[#ff4c4c]' : 'border-slate-300 '} `}
                >
                  <HiFire className={`
                    ${editableTask.task.isFire ? 'text-[#ff4c4c] left-[22px]' : 'text-slate-300 left-1'}
                    absolute transition-all`
                  } />
                  <input
                    type="checkbox"
                    onChange={(e) => setFire(
                      (editableTask.task.id),
                      e.target.checked
                    )}
                    checked={editableTask.task.isFire}
                    className='hidden'
                  />
                </label>
              </div>
            </div>

            <span className='text-xs font-semibold flex mt-3 dark:text-slate-400 mb-7'>
              <div className='flex items-center'><BiTime className='mr-1' />{editableTask.task.taskDate.dateTime}</div>
              <div className='flex items-center ml-3'><AiOutlineCalendar className='mr-1' />{editableTask.task.taskDate.dateDMY}</div>
            </span>

            <div className='text-base font-semibold mb-3 text-slate-300'>Todo</div>

            <TodoApp
              todosList={editableTask.task.taskTodo}
              addTodo={(text: string) => addTaskTodo(editableTask.task.id, text)}
              toggleIsCompleted={(taskTodoID: string) => toggleTaskTodoCompleted(editableTask.task.id, taskTodoID)}
              removeTodo={(todoID: string) => removeTodo(editableTask.task.id, todoID)}
            />

            <button 
              onClick={closeEditableTask}
              className='bg-indigo-500 w-[27px] h-[27px] flex 
                rounded-md text-white absolute top-2 right-2
                hover:bg-indigo-400'
            >
              <MdClose className='m-auto p-0' />
            </button>

          </motion.div>
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default EditableTask