import { useState } from "react";
import { Repository } from "./page";

export default function RepoView({ curRepo }: { curRepo: Repository }) {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    console.log(curRepo.repositoryTopics);

    const openSection = (section: string) => {
        setActiveSection(section)
    };

    return (
        <div className="mx-5 my-15 text-lg max-w-5xl">
            <a href={curRepo.url} target="_blank" rel="noopener noreferrer" className="text-5xl font-semibold">
                {curRepo.nameWithOwner}
            </a>
            <h2 className="mb-2 mt-1 italic" >{curRepo.description}</h2>

            <div className="flex flex-row flex-wrap gap-y-2">
                {curRepo.repositoryTopics.nodes.map((t) => {
                    return <div className="w-fit px-3 py-1 me-2 border-accent-light border-1 rounded-3xl" key={t.topic.name}>
                        {t.topic.name}
                    </div>
                })}
            </div>

            <div className="flex flex-row justify-between pt-6 text-slate-500 border-b-1 border-slate-300 pb-1">
                <button onClick={() => openSection("Issues")}>View Issues ⏷</button>
                <button onClick={() => openSection("PRs")}>View PRs ⏷</button>
                <button onClick={() => openSection("Readme")}>View Readme ⏷</button>
                <button onClick={() => openSection("Codebase")}>View Codebase ⏷</button>
            </div>

            {activeSection === "Issues" && (
                <div className="section">

                </div>
            )}

            {activeSection === "PRs" && (
                <div className="section">

                </div>
            )}

            {activeSection === "Readme" && (
                <div className="section">

                </div>
            )}

            {activeSection === "Codebase" && (
                <div className="section">

                </div>
            )}


        </div>
    );
}