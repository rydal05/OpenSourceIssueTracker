import { Repository } from "./page";

export default function Sidebar({repoList, setCurRepo}: 
        {repoList: Array<Repository>, setCurRepo: React.Dispatch<React.SetStateAction<Repository>>}) {

    return (
      <main className="flex flex-1 w-sm flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        {repoList.map((repo) => {
          console.log(repo);
          console.log(repo.nameWithOwner);
          return <p key={repo.url}>{repo.nameWithOwner}</p>
        })}

      </main>
    );
}