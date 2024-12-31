import { Plus } from "lucide-react"
import { useCallback, useState } from "react"

type Props = {
    onSubmit: (value: string) => void
}
export default function Input({ onSubmit }: Props) {
    const [input, setInput] = useState<string>("")
    const handleSubmit = useCallback(() => {
        if (!input) return
        onSubmit(input)
        setInput("")
    }, [input, onSubmit])

    return (
        <div className="flex gap-3 w-full max-w-[500px]">
            <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Learn how to center a div"
                className="border-2 border-[#ddd] rounded-xl p-3 w-full"
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit()
                }}
            />
            <button
                onClick={handleSubmit}
                type="submit"
                className="border-none rounded-xl px-4 py-3 bg-[#2563eb] text-white"
            >
                <Plus />
            </button>
        </div>
    )
}
