
export default function SidebarEntry({title, func}: 
    {title: string, func?: Function}){
    return <button className="py-1 px-2 text-start hover:bg-slate-100 cursor-pointer rounded-md" onClick={func ? func() : null}>
        {title}
    </button>;
}