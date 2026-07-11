'use client'

import { useEffect, useState } from "react";
import RepoView from "./repoview";
import Sidebar from "./sidebar";
import { getPopularRepos } from "./ghquery";

{/* name, desc, open issues, PRs, tags, topics, language */}
export interface Repository {
  owner: string,
  nameWithOwner: string,
  desc: string,
  url: string,
  totalIssues: number,
  totalPRs: number,
  tags: Array<string>,
  topics: Array<string>,
  languages: Array<string>,
  archived: boolean
  stars: number,
  repositoryTopics: Array<string>
}

const defaultRepo: Repository = {
  nameWithOwner: "Loading...",
  desc: "Loading...",
  url: "google.com",
  totalIssues: -1,
  totalPRs: -1,
  stars: -1,
  tags: [],
  topics: [],
  languages: [],
  archived: false,
  owner: "NIL",
  repositoryTopics: []
};

export default function Home() {
  // make it a useMemo?
  const [repoList, setRepoList] = useState([]);

  const [curRepo, setCurRepo] = useState(defaultRepo);

  // call github api here to fill repos array
  useEffect(() => {
    getPopularRepos().then((res) => {
      console.log(res);
      setRepoList(res);
      setCurRepo(res[0]);
    });
  }, [setRepoList, setCurRepo])
  
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      {/* sidebar */}
      <Sidebar setCurRepo={setCurRepo} repoList={repoList}/>

      {/* project view */}
      <RepoView curRepo={curRepo}/>
    </div>
  );
}
