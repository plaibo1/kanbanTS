import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface TaskObjectType {
  id: string 
  content: string
}

export interface TaskType {
  [key: string] : TaskObjectType
}

export interface ColumnObjectType {
  id: string, 
  title:string,  
  taskIds:Array<string>
  isTitleEdit: boolean
}

export interface ColumnType {
  [key: string]: ColumnObjectType
}

export interface initialStateScramAppType {
  tasks: TaskType
  columns: ColumnType
  columnOrder: Array<string>
}

const initialState:initialStateScramAppType = {
  tasks: {},

  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      isTitleEdit: false,
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'Doing',
      isTitleEdit: false,
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      isTitleEdit: false,
      taskIds: [],
    },
  },

  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],

};

const scramSlice = createSlice({
  name: 'scram',
  initialState,
  reducers: {

    setScram(state, action:PayloadAction<initialStateScramAppType>) {
      return state = {...state, ...action.payload}
    },

    addTaskScram(state, action:PayloadAction<{content: string, columnID:string}>) {
      const id = 'taskID-' + new Date().toISOString()
      state.tasks[id] = {id, content: action.payload.content}
      state.columns[action.payload.columnID].taskIds.push(id)
    },

    addColumnScram(state, action:PayloadAction<string>) {
      const id = 'columnID-' + new Date().toISOString()
      state.columns[id] = {
        id,
        title: action.payload,
        taskIds: [],
        isTitleEdit: false
      }
      state.columnOrder.push(id)
    },

    removeColumnScram(state, action:PayloadAction<string>) {
      const indexOfColumn = state.columnOrder.indexOf(action.payload)
      state.columnOrder.splice(indexOfColumn, 1)

      delete state.columns[action.payload]
    },

    startEditColumnNameScramApp(state, action:PayloadAction<string>) {
      state.columns[action.payload].isTitleEdit = !state.columns[action.payload].isTitleEdit
    },

    saveColumnNameScramApp(state, action:PayloadAction<{columnID:string, title:string}>) {
      state.columns[action.payload.columnID].title = action.payload.title
    },
    

  }
})

export const {setScram, addTaskScram, addColumnScram, removeColumnScram, saveColumnNameScramApp, startEditColumnNameScramApp} = scramSlice.actions;

export type scramReducerActionsTypes = typeof scramSlice.actions;



export default scramSlice.reducer; 