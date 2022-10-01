import { FC, useState } from 'react'
import { useAppDispatch } from '../../../hook'
import { ColumnObjectType, saveColumnNameScramApp, startEditColumnNameScramApp } from '../../../store/scram-reducer'

import { FiEdit2 } from 'react-icons/fi'
import { BiSave } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'

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

      <button className='ml-3 text-lg' onClick={() => startEditColumnName(column.id)}>
        {!column.isTitleEdit ? <FiEdit2 className='opacity-0 group-hover:opacity-100 transition' /> : <IoMdClose />}
      </button>

      {
        column.isTitleEdit && columnName.trim().length !== 0 &&
        <button
          className='text-sm ml-2 bg-indigo-500 px-2 text-white'
          onClick={() => saveColumnName(column.id, columnName)}
        >
          <BiSave />
        </button>
      }
    </span>
  )
}

export default ColumnTitle