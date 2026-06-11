import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTasks, useTasksDispatch, type TodoTaskItem } from "@/ContextProviders/TasksProvider";
import PageLayout from "@/custom_components/PageLayout";
import { Check, Edit2Icon, Info, Plus, Trash2Icon } from "lucide-react";
import { useState } from "react";



export function TodoPage() {
    let dispatch = useTasksDispatch()

    return <PageLayout title={"Todo"}>
        <div className="max-w-3xl  mx-auto">
            <TaskInput onSubmitTask={
                (value) => dispatch({
                    type: 'new-task',
                    taskName: value,
                })
            } />
            <TasksList />

        </div>
    </PageLayout>



}

function TasksList() {
    let tasks = useTasks()
    return <div className='mt-5 flex flex-col gap-3'>
        {
            tasks.length == 0 && <Empty className="gap-2">
                <EmptyMedia variant={'icon'} className='m-0'>
                    <Info></Info>
                </EmptyMedia>
                <EmptyTitle>No Todos Yet</EmptyTitle>
                <EmptyDescription>Write your first todo and hit the + button</EmptyDescription>

            </Empty>
        }
        {tasks.map((task) => (
            <TaskItem
                key={task.id}
                task={task}
            />
        ))}
    </div>
}

function TaskItem({ task }: { task: TodoTaskItem }) {
    let checkboxId = `checkbox-${task.id}`
    let [isEditing, setIsEditing] = useState(false)
    let [text, setText] = useState(task.name);
    let dispatch = useTasksDispatch()

    return <div className="border p-3 border-muted-foreground/35 rounded-md font-light" >
        <FieldGroup >
            <Field orientation="horizontal"
            >

                <Checkbox
                    id={checkboxId}
                    checked={task.isCompleted}
                    onCheckedChange={(value) => {
                        dispatch({
                            type: 'edit-task',
                            taskId: task.id,
                            task: { ...task, isCompleted: value === true }
                        })

                    }}
                ></Checkbox>

                {!isEditing && <FieldLabel
                    className={"font-light " + (task.isCompleted ? "text-muted-foreground transition-colors" : "")}
                    htmlFor={checkboxId}>
                    {task.name}
                </FieldLabel>}

                {isEditing && <form className='flex gap-3 w-full' onSubmit={(e) => {
                    e.preventDefault()
                    dispatch({
                        type: 'edit-task',
                        taskId: task.id,
                        task: { ...task, name: text }
                    })

                    setIsEditing(false)
                }}>
                    <Input value={text} onChange={(v) => setText(v.target.value)}></Input>
                    <Button variant="secondary" size="icon" type='submit'>
                        <Check className='opacity-80' />
                    </Button>
                </form>}
                {!isEditing && <Button variant="ghost" size="icon" onClick={() => {
                    setIsEditing(true)
                }}>
                    <Edit2Icon className='opacity-80' />
                </Button>}
                <Button variant="ghost" size="icon" onClick={() => {
                    dispatch({ type: 'delete-task', taskId: task.id })
                }}>
                    <Trash2Icon className='text-destructive'></Trash2Icon>
                </Button>
            </Field>
        </FieldGroup>
    </div>;
}

function TaskInput({ onSubmitTask }: { onSubmitTask: (taskName: string) => void }) {
    let [text, setText] = useState('')
    return <form className="flex flex-col sm:flex-row items-stretch gap-2" onSubmit={(e) => {
        e.preventDefault()
        if (text.length > 0) {
            onSubmitTask(text)
            setText('')
        }
    }} >
        <Input
            placeholder="Type new todo ..."
            className='py-5'
            value={text}
            onChange={(value) => setText(value.target.value)} />
        <Button type="submit" className="sm:h-auto sm:py-0" > <Plus></Plus><span>New Task</span></Button>
    </form >
}
