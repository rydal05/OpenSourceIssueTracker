'use client'

import { useEffect, useMemo, useState } from "react";
import RepoView from "./repoview";
import Sidebar from "./sidebar";
import { getPopularRepos } from "./ghquery";
import GitHubMarkDown from "./markdownviewer"
{/* name, desc, open issues, PRs, tags, topics, language */}
export interface Repository {
  id: string,
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
  },
  defaultBranchRef: {
    name: string
  },
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
  id: "",
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
  },
  defaultBranchRef: {
    name: "main"
  },
};

export default function Home() {
  const [repoList, setRepoList] = useState([defaultRepo]);
  const [curRepo, setCurRepo] = useState(defaultRepo);
  const [rawSearch, setRawSearch] = useState("");

  // call github api here to fill repos array
  useEffect(() => {
    getPopularRepos().then((res) => {
      setRepoList(res);
      setCurRepo(res[0]);
    });
  }, [setRepoList, setCurRepo]);


  const searchFilter = (repo: Repository) => {

    // for all of the search terms,
    for (const term of searchTerms) {
      let good = false;

      // if the search term is included in the repo's languages,
      for(const node of repo.languages.nodes) {
        if(node.name.includes(term)){
          // the term is valid, move on to next term
          good = true;
          break;
        }
      }
      if (good) continue;

      // if the term is included in the repo's topics,
      for(const t of repo.repositoryTopics.nodes) {
        if(t.topic.name.includes(term)){
          // the term is valid, move on to next term
          good = true;
          break;
        }
      }
      if (good) continue;

      // if any term is invalid, remove repo from list
      return false;
    }

    return true;
  }

  const searchTerms = useMemo(() => rawSearch.split(" "), [rawSearch]);

  const filteredRepos = useMemo(() => repoList.filter(searchFilter), [repoList, searchTerms]);
  
  return (
    <div className="flex flex-row flex-1 bg-zinc-50 font-sans dark:bg-black">
      {/* sidebar */}
      <Sidebar setCurRepo={setCurRepo} repoList={filteredRepos}/>

      <div className="mx-5">
        <div className="">
          <input 
              placeholder="Search:" 
              className="mt-8 px-2 py-1 w-md rounded-lg border-1"
              onChange={e => setRawSearch(e.target.value)}
          />
        </div>

        {/* project view */}
        <RepoView curRepo={curRepo}/>        
      </div>
      <GitHubMarkDown curRepo={curRepo}/>
    </div>
  );
}
