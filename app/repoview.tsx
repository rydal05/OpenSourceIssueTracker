import { useEffect, useMemo, useState } from "react";
import { Repository } from "./page";
import InlinePill from "./components/inlinePill";
import { getRepoVerbose } from "./ghquery";
import { title } from "process";

export interface DetailedRepo {
    id: string,
    totalIssuesCount: number,
    recentIssues: Array<Issue>,
    totalPRsCount: number,
    recentPRs: Array<PR>
}

export interface Issue {
    id: string,
    title: string,
    number: number,
    url: string,
    createdAt: string
}

export interface PR {
    id: string,
    title: string,
    number: number,
    url: string,
    createdAt: string
}

const placeholderIssue: Issue = {
    id: "Loading..",
    title: "Loading...",
    number: -1,
    url: "google.com",
    createdAt: ""
}

const placeholderPR: PR = {
    id: "Loading..",
    title: "Loading...",
    number: -1,
    url: "google.com",
    createdAt: ""
}

const placeholder: DetailedRepo = {
    id: "Loading...",
    totalIssuesCount: -1,
    totalPRsCount: -1,
    recentIssues: [placeholderIssue],
    recentPRs: [placeholderPR],
}

export default function RepoView({ curRepo }: { curRepo: Repository }) {
    const [activeSection, setActiveSection] = useState<string | null>("Issues");
    const [repoDetails, setRepoDetails] = useState(placeholder);

    useEffect(() => {
        setRepoDetails(placeholder);
        if (curRepo.id != "")
            getRepoVerbose(curRepo.id).then((res) => setRepoDetails(res));
    }, [setRepoDetails, curRepo])

    const openSection = (section: string) => {
        setActiveSection(section)
    };

    return (
        <div className="my-8 text-lg w-5xl">
            <p className="text-5xl font-semibold">
                {curRepo.nameWithOwner}
            </p>
            <h2 className="mb-2 mt-1 italic" >{curRepo.description}</h2>

            <div className="flex flex-row flex-wrap gap-y-2 py-2">
                {curRepo.languages.nodes.map((l) =>
                    <InlinePill text={l.name} key={l.name} />
                )}
            </div>

            <div className="flex flex-row flex-wrap gap-y-2">
                {curRepo.repositoryTopics.nodes.map((t) =>
                    <InlinePill text={t.topic.name} key={t.topic.name} />
                )}
            </div>

            <div className="flex flex-row justify-between pt-6 text-slate-500 border-b-1 border-slate-300 pb-1 mb-6">
                <button className="cursor-pointer" onClick={() => openSection("Issues")}>View Issues ⏷</button>
                <button className="cursor-pointer" onClick={() => openSection("PRs")}>View PRs ⏷</button>
                <a href={curRepo.url}>View Codebase 🔗</a>
            </div>

            {activeSection === "Issues" && (
                <div className="grid grid-cols-3 gap-6 overflow-scroll h-200">
                    {repoDetails.recentIssues.map((issue) => {
                        const createdDate = new Date(issue.createdAt);
                        return (<a key={issue.number} href={issue.url} className="border-1 rounded-md px-5 py-2">
                            <h3 className="">{issue.title}</h3>
                            <div className="pt-2 pb-1">
                                <InlinePill text={`${createdDate.getFullYear()}-${createdDate.getMonth()}-${createdDate.getDate()}`} />
                            </div>
                        </a>)
                    })}
                </div>
            )}

            {activeSection === "PRs" && (
                <div className="grid grid-cols-3 gap-6 overflow-scroll h-200">
                    {repoDetails.recentPRs.map((pr) => {
                        const createdDate = new Date(pr.createdAt);
                        return (<a key={pr.number} href={pr.url} className="border-1 rounded-md px-5 py-2">
                            <h3 className="">{pr.title}</h3>
                            <div className="pt-2 pb-1">
                                <InlinePill text={`${createdDate.getFullYear()}-${createdDate.getMonth()}-${createdDate.getDate()}`} />
                            </div>
                        </a>)
                    })}
                </div>
            )}

            {activeSection === "Codebase" && (
                <div className="section">

                </div>
            )}


        </div>
    );
}