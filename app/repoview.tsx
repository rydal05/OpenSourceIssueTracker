import { useState } from "react";
import { Repository } from "./page";

export default function RepoView({curRepo} : {curRepo: Repository}) {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    
    const openSection = (section: string) => {
        setActiveSection(section)
    };
    
    return (
        <div>
            <h1>{curRepo.nameWithOwner}</h1>
            <h2>{curRepo.description}</h2>
            <a href={curRepo.url} target="_blank" rel="noopener noreferrer">Repo link</a>
            
            <button onClick={() => openSection("Issues")}>View Issues</button>
            <button onClick={() => openSection("PRs")}>View PRs</button>
            <button onClick={() => openSection("Readme")}>View Readme</button>
            <button onClick={() => openSection("Codebase")}>View Codebase</button>


        </div>
    );
}