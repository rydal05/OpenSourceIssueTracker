'use client'

import { useEffect, useState } from "react";
import RepoView from "./repoview";
import Sidebar from "./sidebar";
import { getPopularRepos } from "./ghquery";
import GitHubMarkDown from "./markdownviewer"
{/* name, desc, open issues, PRs, tags, topics, language */}
export interface Repository {
  owner: string,
  nameWithOwner: string,
  description: string,
  url: string,
  totalIssues: number,
  totalPRs: number,
  languages: {
    nodes: Array<Langauge>
  }
  archived: boolean
  stars: number,
  repositoryTopics: {
    nodes: Array<Topic>
  }
}

export interface Topic {
  topic: {
    name: string
  }
}

export interface Langauge {
  name: string
}

const defaultRepo: Repository = {
  nameWithOwner: "Loading...",
  description: "Loading...",
  url: "google.com",
  totalIssues: -1,
  totalPRs: -1,
  stars: -1,
  languages: {
    nodes: []
  },
  archived: false,
  owner: "NIL",
  repositoryTopics: {
    nodes: []
  }
};

export default function Home() {
  const [repoList, setRepoList] = useState([defaultRepo]);
  const [curRepo, setCurRepo] = useState(defaultRepo);

  // call github api here to fill repos array
  useEffect(() => {
    getPopularRepos().then((res) => {
      setRepoList(res);
      setCurRepo(res[0]);
    });
  }, [setRepoList, setCurRepo])
  
  return (
    <div className="flex flex-row flex-1 bg-zinc-50 font-sans dark:bg-black">
      {/* sidebar */}
      <Sidebar setCurRepo={setCurRepo} repoList={repoList}/>

      {/* project view */}
      <RepoView curRepo={curRepo}/>

      {/* markdown viewer on the side */}
      
    </div>
  );
}
