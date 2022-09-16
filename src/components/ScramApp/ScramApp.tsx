import { FC } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../hook';
import { initialStateScramAppType, setScram } from '../../store/scram-reducer';
import AddColumnBtn from './AddColumnBtn/AddColumnBtn';
import ColumnWrapper from './Column/ColumnWrapper';
import { StrictModeDroppable } from './StrictModeDroppable';


const ScramApp: FC = () => {

  const initialData = useAppSelector(state => state.scramApp)
  const dispatch = useAppDispatch()

  const setInitialData = (state: initialStateScramAppType) => {
    dispatch(setScram(state))
  }


  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId
      && destination.index === source.index) return


    if (type === 'column') {
      const newColumnOrder = Array.from(initialData.columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...initialData,
        columnOrder: newColumnOrder
      }

      setInitialData(newState)
      return
    }


    // ============ dnd inside column logic ============ //
    const startColumn = initialData.columns[source.droppableId]
    const finishColumn = initialData.columns[destination.droppableId]

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds)

      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds
      }

      const newState = {
        ...initialData,
        columns: {
          ...initialData.columns,
          [newColumn.id]: newColumn
        }
      }

      setInitialData(newState)

      return
    }


    // ====== Moving from one list to another ======== //
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...initialData,
      columns: {
        ...initialData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setInitialData(newState);
  }


  return (
    <div className='mt-[100px]'>

      <AddColumnBtn />

      <DragDropContext onDragEnd={onDragEnd}>

        {/* === drop area for column === */}
        <StrictModeDroppable droppableId='columnsDroppableArea' direction='horizontal' type='column'>

          {(provided) => {

            console.log(provided.placeholder)

            return (
              <div
                className='scramScroll'
                ref={provided.innerRef} {...provided.droppableProps}
              >
                {
                  initialData.columnOrder.map((columnId: string, columnIndex: number) => {
                    const column = initialData.columns[columnId]

                    return <ColumnWrapper key={column.id} column={column} taskMap={initialData.tasks} columnIndex={columnIndex} />
                  })
                }

                <div>
                  <div className='bg-slate-100 dark:bg-slate-800 dark:shadow-2xl rounded-xl w-[94%] mx-auto shadow-sm overflow-hidden'>
                    <div className='w-full bg-slate-200 dark:bg-inherit dark:border-b-slate-900 dark:border-b h-12 -mb-12'></div>
                    {provided.placeholder}
                  </div>
                </div>
              </div>
            )
          }}

        </StrictModeDroppable>

      </DragDropContext>
    </div>
  )
}

export default ScramApp








