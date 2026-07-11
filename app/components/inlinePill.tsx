
export default function InlinePill({text}: {text: string}) {
    return <div className="w-fit px-3 py-1 me-2 border-accent-light border-1 rounded-3xl">
        {text}
    </div>
}