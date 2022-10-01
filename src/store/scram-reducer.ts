import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskTodoType {
  id: string
  text: string
  isCompleted: boolean
}


export interface TaskObjectType {
  id: string
  content: string
  isContentEdit: boolean
  taskDate: {dateDMY: string, dateTime:string}
  taskTodo: Array<TaskTodoType>
  isTaskSettingsEdit: boolean
  isFire: boolean
}


export interface TaskType {
  [key: string] : TaskObjectType
}

export interface ColumnObjectType {
  id: string
  title:string
  taskIds: Array<string>
  isTitleEdit: boolean
}

export interface ColumnType {
  [key: string]: ColumnObjectType
}

export interface editableTaskType {
  task: TaskObjectType
  isShow: boolean
}

export interface initialStateScramAppType {
  tasks: TaskType
  columns: ColumnType
  columnOrder: Array<string>
  editableTask: editableTaskType
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

  editableTask: {
    task: {
      id: '', 
      content: '', 
      isContentEdit: false,
      taskDate: {dateDMY: '', dateTime: ''},
      taskTodo: [{id: '', text: '', isCompleted: false}],
      isFire: false,
      isTaskSettingsEdit: false
    }, 
    isShow: false 
  }

};

const scramSlice = createSlice({
  name: 'scram',
  initialState,
  reducers: {

    setScram(state, action:PayloadAction<initialStateScramAppType>) {
      return state = {...state, ...action.payload}
    },

    addTaskScram(state, action:PayloadAction<{columnID:string}>) {
      const id = 'taskID-' + new Date().toISOString()

      const dateNow = new Date().toISOString().split('T')

      const dateDMY = dateNow[0].split('-').join('.') // dd/mm/yy
      const dateTime = dateNow[1].slice(0, 5); // time hh/mm

      state.tasks[id] = {
        id, 
        content: 'new task', 
        isContentEdit: true,
        isTaskSettingsEdit: false, 
        taskDate: {dateDMY, dateTime},
        taskTodo: [],
        isFire: false
      }

      state.columns[action.payload.columnID].taskIds.push(id)
    },

    toggleEditTaskScram(state, action:PayloadAction<string>) {
      state.tasks[action.payload].isContentEdit = !state.tasks[action.payload].isContentEdit
    },

    editTaskScram(state, action:PayloadAction<{taskID:string, content: string}>) {
      state.tasks[action.payload.taskID].content = action.payload.content 
    },

    removeTaskScram(state, action:PayloadAction<{columnID:string, taskID: string}>) {
      const indexOfColumn = state.columns[action.payload.columnID].taskIds.indexOf(action.payload.taskID)
      state.columns[action.payload.columnID].taskIds.splice(indexOfColumn, 1)

      delete state.tasks[action.payload.taskID]
    },

    addColumnScram(state, action:PayloadAction<string>) {
      const id = 'columnID-' + new Date().toISOString()
      state.columns[id] = {
        id,
        title: action.payload,
        taskIds: [],
        isTitleEdit: true,
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
    
    setTaskSettingsEditScram(state, action:PayloadAction<string>) {
      state.editableTask.isShow = true

      const task = {...state.tasks[action.payload]}
      state.editableTask.task = task
    }, 

    setFireScram(state, action:PayloadAction<{taskID:string, isFire:boolean}>) {
      state.tasks[action.payload.taskID].isFire = action.payload.isFire
      setTaskSettingsEditScram(action.payload.taskID)
    },

    addTaskTodoScram(state, action:PayloadAction<{taskID: string, text:string}>) {
      const id = 'taskTodoID-' + new Date().toISOString()
      state.tasks[action.payload.taskID].taskTodo.push(
        {
          id,
          text: action.payload.text,
          isCompleted: false
        }
      )
    },

    toggleTaskTodoCompletedScram(state, action:PayloadAction<{taskID: string, taskTodoID: string}>) {
      state.tasks[action.payload.taskID].taskTodo.forEach(item => {
        if (item.id === action.payload.taskTodoID) {
          item.isCompleted = !item.isCompleted
        }
      })
    },

    removeTaskTodoScram(state, action:PayloadAction<{taskID: string, taskTodoID: string}>) {
      state.tasks[action.payload.taskID].taskTodo.forEach((todo:TaskTodoType, index) => {
        if (todo.id === action.payload.taskTodoID) 
          state.tasks[action.payload.taskID].taskTodo.splice(index, 1)
      })
    },

    offIsShowEditableTaskScram(state) {
      state.editableTask.isShow = false
    }

  }
})

export const {setScram, addTaskScram, addColumnScram, removeColumnScram, 
    saveColumnNameScramApp, startEditColumnNameScramApp, toggleEditTaskScram, 
    editTaskScram, removeTaskScram, setTaskSettingsEditScram, setFireScram, addTaskTodoScram,
    toggleTaskTodoCompletedScram, removeTaskTodoScram, offIsShowEditableTaskScram} = scramSlice.actions;

export type scramReducerActionsTypes = typeof scramSlice.actions;



export default scramSlice.reducer; 