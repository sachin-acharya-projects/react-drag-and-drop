import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { CSSProperties } from "react"

type TaskProps = {
    id: number
    title: string
}

export default function Task({ id, title }: TaskProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id })
    const style: CSSProperties = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="task bg-white rounded-md shadow-custom-black w-full p-5 flex items-center justify-start gap-5 touch-none"
            style={style}
        >
            <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                className="h-5 w-5 cursor-pointer"
            />
            {title}
        </div>
    )
}
