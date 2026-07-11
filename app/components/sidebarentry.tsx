
export default function SidebarEntry({title, func}: 
    {title: string, func?: Function}){
    return <button className="py-1 text-start" onClick={func ? func() : null}>
        {title}
    </button>;
}