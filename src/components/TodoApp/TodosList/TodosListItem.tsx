import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { AiOutlineEdit } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { RiSaveLine } from 'react-icons/ri'

import { useAppDispatch } from '../../../hook'
import { toddReducerActionsTypes, TodoType } from '../../../store/todo-reducer'


type TodosListItemType = {
  todo: TodoType
  index: number

  toggleComplete: toddReducerActionsTypes['toggleComplete']
  removeTodo: toddReducerActionsTypes['removeTodo']
  toggleIsEdit: toddReducerActionsTypes['toggleIsEdit']
  editTodo: toddReducerActionsTypes['editTodo']

  deleteThisTodo: (id:string) => void
  activeEditMode: (text: string, id: string) => void
  editableText: string
  setEditableText: (str:string) => void
  saveTodo: (id:string, text:string) => void
}


const TodosListItem: FC<TodosListItemType> = ({ todo,
  toggleComplete, activeEditMode, editableText, setEditableText,
  saveTodo, toggleIsEdit, deleteThisTodo, index }) => {

  const dispatch = useAppDispatch()

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps} 
          className='py-1'
        >
          <div
            className='rounded-md p-3 shadow-md flex justify-between items-center dark:bg-slate-700 mx-2'
          >

            <span className='flex items-center w-full'>
              <input
                type='checkbox'
                checked={todo.completed}
                className='min-w-[16px] h-4 appearance-none checked:bg-indigo-300 
                  border-2 border-indigo-500 mr-2 rounded-[4px] active:scale-90 cursor-pointer'
                onChange={() => dispatch(toggleComplete({ id: todo.id }))}
              />

              <div
                className='dark:text-white min-w-[70%] text-left'
                onDoubleClick={() => activeEditMode(todo.text, todo.id)}
              >
                {
                  !todo.editable ?
                    <span className={`${todo.completed && 'line-through'}`}>{todo.text}</span>
                    :
                    <>
                      <input
                        className='dark:bg-slate-700 border-b mr-3'
                        placeholder='edit here'
                        value={editableText}
                        onChange={(e: any) => setEditableText(e.target.value)}
                      />
                    </>
                }
              </div>
            </span>

            <span className='flex items-center'>
              {
                todo.editable ?
                  <>
                    {
                      editableText.trim().length !== 0 && todo.text !== editableText &&
                      <button
                        className='bg-green-200 mr-2 p-2 rounded-md hover:bg-green-300'
                        onClick={() => saveTodo(todo.id, editableText)}
                      >
                        <RiSaveLine />
                      </button>
                    }

                    <button
                      className='bg-red-200 mr-2 p-2 rounded-md hover:bg-red-400'
                      onClick={() => dispatch(toggleIsEdit({ id: todo.id }))}
                    >
                      <IoMdClose />
                    </button>
                  </>

                  :

                  <button
                    onClick={() => activeEditMode(todo.text, todo.id)}
                    className='mr-2 p-2 rounded-md dark:text-white'>
                    <AiOutlineEdit />
                  </button>
              }

              <button
                onClick={() => deleteThisTodo(todo.id)}
                className='p-2 rounded-md text-red-400'>
                <BsTrash />
              </button>

            </span>

          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TodosListItem