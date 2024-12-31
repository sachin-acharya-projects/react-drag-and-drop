import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import Task from "./Task"
import { ComponentProps } from "react"

type Props = {
    tasks: ComponentProps<typeof Task>[]
}
export default function Column({ tasks }: Props) {
    return (
        <div className="bg-[#f2f2f3] rounded-md p-4 w-[80%] max-w-[500px] flex flex-col gap-4">
            <SortableContext
                items={tasks}
                strategy={verticalListSortingStrategy}
            >
                {tasks.length ? (
                    tasks.map((task) => (
                        <Task id={task.id} title={task.title} key={task.id} />
                    ))
                ) : (
                    <h1 className="text-lg font-bold">You've got not tasks!</h1>
                )}
            </SortableContext>
        </div>
    )
}
