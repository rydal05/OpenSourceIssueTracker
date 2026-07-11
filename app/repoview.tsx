import { useEffect, useMemo, useState } from "react";
import { Repository } from "./page";
import InlinePill from "./components/inlinePill";
import { getRepoVerbose } from "./ghquery";

export interface Issue {
    id: number,
    name: string,
    description: string,
    stars: number,
    url: string,
    totalIssuesCount: number,
    recentIssues: Array<IssueNode>,
    hasNextIssuesPage: boolean,
    issuesCursor: string
}

export interface IssueNode {
    id: number,
    title: string,
    number: number,
    url: string,
    createdAt: number
}

export default function RepoView({ curRepo }: { curRepo: Repository }) {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    
    const repoDetails = useMemo(() => {
        if(curRepo.id != "")
            getRepoVerbose(curRepo.id);
    }, [curRepo])

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

            <div className="flex flex-row justify-between pt-6 text-slate-500 border-b-1 border-slate-300 pb-1">
                <button className="cursor-pointer" onClick={() => openSection("Issues")}>View Issues ⏷</button>
                <button onClick={() => openSection("PRs")}>View PRs ⏷</button>
                <button onClick={() => openSection("Codebase")}>View Codebase ⏷</button>
            </div>

            {activeSection === "Issues" && (
                <div className="section">
                    {}
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