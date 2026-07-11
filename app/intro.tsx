export default function introduction()
{
    const userSkill = document.getElementById('skillLevel')?.nodeValue
    const userInterests = document.getElementById('interests')

    return (
        <div id="intro-form">
            <label>What level of programming skill would you say you're at?</label>
            <input type="text" id="skillLevel" placeholder="e.g., Intermediate"></input>

            <label>What programming languages, frameworks, or areas are of interest to you?</label>
            <input type="text" id="interests"></input> 

            <button id="submission">Submit</button>

            <div id="gemini-output">
                <p id="geminiResponse"></p>
            </div>
        </div>
 )   
}