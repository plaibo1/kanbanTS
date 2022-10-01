import {FC} from 'react'
import { useAppDispatch } from '../../../hook'
import { ColumnObjectType, removeColumnScram } from '../../../store/scram-reducer'

import { BsTrash } from 'react-icons/bs'
import {MdOutlineDragIndicator} from 'react-icons/md'


interface ColumnSettingsType {
  column: ColumnObjectType
}


const ColumnSettings:FC<ColumnSettingsType> = ({column}) => {  

  const dispatch = useAppDispatch()

  const removeColumn = (columnID: string) => {
    dispatch(removeColumnScram(columnID))
  }

  return (
    <span className='flex items-center'>
      <button onClick={() => removeColumn(column.id)}>
        <BsTrash className='text-base' />
      </button>

      <MdOutlineDragIndicator className='mr-2 dark:text-white' />
    </span>
  )
}

export default ColumnSettings