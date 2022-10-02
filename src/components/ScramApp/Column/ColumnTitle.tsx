import { FC, useState } from 'react'
import { useAppDispatch } from '../../../hook'
import { ColumnObjectType, saveColumnNameScramApp, startEditColumnNameScramApp } from '../../../store/scram-reducer'

import { FiEdit2 } from 'react-icons/fi'
import { BiSave } from 'react-icons/bi'
import { RiCloseFill } from 'react-icons/ri'

interface ColumnTitleType {
  column: ColumnObjectType
}

const ColumnTitle:FC<ColumnTitleType> = ({column}) => {

  const dispatch = useAppDispatch()

  const startEditColumnName = (columnID:string) => {
    dispatch(startEditColumnNameScramApp(columnID))
  }

  const saveColumnName = (columnID:string, columnName:string) => {
    dispatch(saveColumnNameScramApp({columnID, title:columnName}))
    dispatch(startEditColumnNameScramApp(columnID))
  }

  const [columnName, setColumnName] = useState('')

  return (
    <span className='flex items-center group-hover:opacity-100 group'>
      {
        !column.isTitleEdit ?
          <>{column.title}</>
          :
          <input
            type="text"
            placeholder='type column name'
            onChange={(e) => setColumnName(e.target.value)}
            value={columnName}
            className='w-[70%] border-b bg-transparent outline-none'
            autoFocus
            onKeyPress={(e) => {
              if (e.key === "Enter" && column.isTitleEdit && columnName.trim().length !== 0)
                saveColumnName(column.id, columnName)
            }}
          />
      }

      {
        column.isTitleEdit && columnName.trim().length !== 0 &&
        <button
          className='text-sm ml-3 bg-indigo-500 w-7 h-7 text-white rounded-md'
          onClick={() => saveColumnName(column.id, columnName)}
        >
          <BiSave className='m-auto' />
        </button>
      }

      <button className={`ml-2 w-7 h-7 flex rounded-md ${column.isTitleEdit && 'bg-red-500'}`} onClick={() => startEditColumnName(column.id)}>
        {
          !column.isTitleEdit ? 
            <FiEdit2 className='opacity-0 group-hover:opacity-100 transition m-auto' /> 
            : 
            <RiCloseFill className='m-auto text-white' />
        }
      </button>
    </span>
  )
}

export default ColumnTitle