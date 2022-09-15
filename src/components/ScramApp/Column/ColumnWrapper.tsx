import React, {FC} from 'react'
import { ColumnObjectType, initialStateScramAppType } from '../../../store/scram-reducer';
import Column from './Column';

interface ColumnWrapperType {
  column: ColumnObjectType
  taskMap: initialStateScramAppType['tasks']
  columnIndex: number
}

const ColumnWrapper:FC<ColumnWrapperType> = React.memo(
  ({column, taskMap, columnIndex}) => {

    const tasks = column.taskIds.map((taskId:string) => taskMap[taskId]);

    return <Column tasks={tasks} column={column} columnIndex={columnIndex}/>
  }
)

export default ColumnWrapper
