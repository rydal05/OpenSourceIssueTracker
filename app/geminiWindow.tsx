
export default function GeminiWindow({geminiResult}: {geminiResult: string}){

    return (
        <div className="border-1 rounded-3xl p-3 mx-3 grow my-5 flex flex-col">
          <p className="grow p-3 mx-3">
            {geminiResult}
          </p>

          <div className="flex flex-row">
            <input className="mb-3 mx-3 border-1 p-3 rounded-lg grow" placeholder="Talk to Gemini"/>
            <button className="ps-2 pe-10 pb-4 text-3xl cursor-pointer">➡️</button>
          </div>
        </div>
    );
}