import {
    closestCorners,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import { ComponentProps, useCallback, useState } from "react"
import Column from "./Column"
import Task from "./Task"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import Input from "./Input"

export default function App() {
    const [tasks, setTasks] = useState<ComponentProps<typeof Task>[]>([])

    const addTask = (title: string) => {
        setTasks((tasks) => [
            ...tasks,
            {
                id: tasks.length + 1,
                title,
            },
        ])
    }

    const getTaskPos = useCallback(
        (id: number) => {
            return tasks.findIndex((task) => task.id === id)
        },
        [tasks]
    )

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event

            if (over?.id === null || active.id === over?.id) return
            setTasks((tasks) => {
                const original_pos = getTaskPos(active.id as number)
                const new_pos = getTaskPos(over?.id as number)

                return arrayMove(tasks, original_pos, new_pos)
            })
        },
        [getTaskPos]
    )

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )
    return (
        <div className="w-full h-full flex flex-col items-center gap-12 mt-3">
            <h1 className="text-3xl font-black">My Tasks ✅</h1>

            <DndContext
                onDragEnd={handleDragEnd}
                collisionDetection={closestCorners}
                sensors={sensors}
            >
                <Input onSubmit={addTask} />
                <Column tasks={tasks} />
            </DndContext>
        </div>
    )
}
