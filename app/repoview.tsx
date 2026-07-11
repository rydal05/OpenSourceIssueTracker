import { useEffect, useMemo, useState } from "react";
import { Repository } from "./page";
import InlinePill from "./components/inlinePill";
import { getRepoVerbose } from "./ghquery";

export interface DetailedRepo {
    id: string,
    totalIssuesCount: number,
    recentIssues: Array<Issue>,
}

export interface Issue {
    id: string,
    title: string,
    number: number,
    url: string,
    createdAt: number
}

const placeholderIssue: Issue = {
    id: "Loaddin..",
    title: "loadding",
    number: -1,
    url: "google.com",
    createdAt: -1
}

const placeholder: DetailedRepo = {
    id: "Loading...",
    totalIssuesCount: -1,
    recentIssues: [placeholderIssue],
}

export default function RepoView({ curRepo }: { curRepo: Repository }) {
    const [activeSection, setActiveSection] = useState<string | null>("Issues");
    const [repoDetails, setRepoDetails] = useState(placeholder);
    
    useEffect(() => {
        if(curRepo.id != "")
            getRepoVerbose(curRepo.id).then((res) => setRepoDetails(res));
    }, [repoDetails, setRepoDetails, curRepo])

    const openSection = (section: string) => {
        setActiveSection(section)
    };

    return (
        <div className="my-8 text-lg w-5xl">
            <a href={curRepo.url} target="_blank" rel="noopener noreferrer" className="text-5xl font-semibold">
                {curRepo.nameWithOwner}
            </a>
            <h2 className="mb-2 mt-1 italic" >{curRepo.description}</h2>

            <div className="flex flex-row flex-wrap gap-y-2 py-2">
                {curRepo.languages.nodes.map((l) => 
                    <InlinePill text={l.name} key={l.name}/>
                )}
            </div>

            <div className="flex flex-row flex-wrap gap-y-2">
                {curRepo.repositoryTopics.nodes.map((t) => 
                    <InlinePill text={t.topic.name} key={t.topic.name}/>
                )}
            </div>

            <div className="flex flex-row justify-between pt-6 text-slate-500 border-b-1 border-slate-300 pb-1 mb-6">
                <button className="cursor-pointer" onClick={() => openSection("Issues")}>View Issues ⏷</button>
                <button onClick={() => openSection("PRs")}>View PRs ⏷</button>
                <button onClick={() => openSection("Codebase")}>View Codebase ⏷</button>
            </div>

            {activeSection === "Issues" && (
                <div className="grid grid-cols-3 gap-6">
                    {repoDetails.recentIssues.map((issue) => 
                        <div key={issue.number} className="border-1 rounded-md px-5 py-2">
                            <h3 className="">{issue.title}</h3>
                        </div>
                    )}
                </div>
            )}

            {activeSection === "PRs" && (
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