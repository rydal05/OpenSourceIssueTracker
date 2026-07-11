'use client'

import { useState } from "react";
import RepoView from "./repoview";
import Sidebar from "./sidebar";

{/* name, desc, open issues, PRs, tags, topics, language */}
export interface Repository {
  owner: string,
  name: string,
  desc: string,
  totalIssues: number,
  totalPRs: number,
  tags: Array<string>,
  topics: Array<string>,
  languages: Array<string>,
  archived: boolean
  stars: number,
}

const defaultRepo: Repository = {
  name: "Loading...",
  desc: "Loading...",
  totalIssues: -1,
  totalPRs: -1,
  stars: -1,
  tags: [],
  topics: [],
  languages: [],
  archived: false,
  owner: "NIL"
};

export default function Home() {
  // make it a useMemo?
  let repoList: Array<Repository> = [];

  const [curRepo, setCurRepo] = useState(defaultRepo);

  // call github api here to fill repos array
  
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      {/* sidebar */}
      <Sidebar setCurRepo={setCurRepo} repoList={repoList}/>

      {/* project view */}
      <RepoView curRepo={curRepo}/>
    </div>
  );
}
