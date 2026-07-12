export default function Intro({setRawSearch}: 
    {setRawSearch: React.Dispatch<React.SetStateAction<string>>}) {

    return (
        <div className="z-10 flex py-10 px-10 flex-col text-3xl absolute w-md bg-white border-1 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <label className="pb-3 pt-4">What level of programming skill would you say you're at?</label>
            <input className="border-1 my-3 rounded-lg px-2" type="text" placeholder="e.g., Intermediate"></input>

            <label className="pb-2 pt-4">What programming languages, frameworks, or areas are of interest to you?</label>
            <input className="border-1 my-3 rounded-lg px-2" type="text"></input> 

            <button className="pt-2">Submit</button>
        </div>
 )   
}