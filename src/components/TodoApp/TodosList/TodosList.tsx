import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hook'
import { removeTodo, toggleComplete, editTodo, toggleIsEdit, TodoType, setTodos } from '../../../store/todo-reducer'



// @ts-ignore
import TodosListItem from './TodosListItem.tsx'
import { DragDropContext } from 'react-beautiful-dnd'
import { StrictModeDroppable } from '../../ScramApp/StrictModeDroppable'



const TodosList:FC = () => {

  const todosList = useAppSelector( state => state.todoPage.todos )
  const dispatch = useAppDispatch()
  
  const [editableText, setEditableText] = useState('')

  const deleteThisTodo = (id:string) => {
    dispatch(removeTodo({id}))
  }

  const activeEditMode = (text: string, id: string) => {
    dispatch(toggleIsEdit({id}))
    setEditableText(text)
  } 

  const saveTodo = (id:string, text:string) => {
    dispatch(editTodo({id, text}))
    dispatch(toggleIsEdit({id}))
  }

  const onDragEnd = (result: any) => {

    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId
      && destination.index === source.index) return

    const items = Array.from(todosList)
    const [reorderedItem] = items.splice(source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    dispatch(setTodos(items))
  }

  return (
    <div className='w-full mt-5'>
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId={'column-2'}>
          {(provided, snapshot) => (
            <div 
              className={`min-h-[400px] rounded-2xl py-1  ${!snapshot.isDraggingOver ? '' : 'bg-red-400'}`} 
              ref={provided.innerRef} 
              {...provided.droppableProps}
            >

              {
                todosList.map((todo: TodoType, index:number) => {

                  return (
                    <TodosListItem
                      key={todo.id}

                      todo={todo}
                      index={index}

                      deleteThisTodo={deleteThisTodo}
                      toggleComplete={toggleComplete}
                      toggleIsEdit={toggleIsEdit}
                      activeEditMode={activeEditMode}
                      editableText={editableText}
                      setEditableText={setEditableText}
                      saveTodo={saveTodo}
                    />
                  )

                })
              }

              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  )
}

export default TodosList