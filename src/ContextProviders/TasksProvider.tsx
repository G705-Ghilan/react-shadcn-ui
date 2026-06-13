import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface TodoTaskItem {
    id: string
    name: string
    isCompleted: boolean
}

export type TaskAction =
    | { type: 'new-task', taskName: string }
    | { type: 'edit-task', taskId: string, task: TodoTaskItem }
    | { type: 'delete-task', taskId: string }


function tasksReducer(tasks: TodoTaskItem[], action: TaskAction): TodoTaskItem[] {
    switch (action.type) {
        case 'new-task': {
            return [...tasks, { id: crypto.randomUUID(), name: action.taskName, isCompleted: false }]
        }
        case "edit-task": {
            return tasks.map(task =>
                task.id === action.taskId ? { ...task, ...action.task } : task
            )
        }
        case "delete-task": {
            return tasks.filter(task => task.id !== action.taskId)
        }
    }
}

const TasksContext = createContext<TodoTaskItem[] | null>(null);
const TasksDispatchContext = createContext<React.Dispatch<TaskAction> | null>(null);



const defaultTodos: TodoTaskItem[] = [
    {
        id: crypto.randomUUID() ,
        name: "Learning ReactJS TSX syntax",
        isCompleted: true
    },
    {
        id: crypto.randomUUID(),
        name: "Learning ReactJS State management",
        isCompleted: true
    },
    {
        id: crypto.randomUUID(),
        name: "Deal with some apis and handle response on react js ui",
        isCompleted: true
    },
    {
        id: crypto.randomUUID(),
        name: "Learn handling api responses (TanStack Query)",
        isCompleted: true
    },
    {
        id: crypto.randomUUID(),
        name: "Learn Advanced state management",
        isCompleted: false
    },
    {
        id: crypto.randomUUID(),
        name: "Practice ReactJS more and more...",
        isCompleted: false
    },
]

export function TasksProvider({ children }: { children: ReactNode }) {
    let [tasks, dispatch] = useReducer(tasksReducer, defaultTodos)
    return <TasksContext value={tasks}>
        <TasksDispatchContext value={dispatch}>
            {children}
        </TasksDispatchContext>
    </TasksContext>
}



export function useTasks() {
    const context = useContext(TasksContext);
    return context!;
}

export function useTasksDispatch() {
    const context = useContext(TasksDispatchContext);
    return context!;
}
