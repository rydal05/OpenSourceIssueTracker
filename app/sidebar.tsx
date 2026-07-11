import SidebarEntry from "./components/sidebarentry";
import { Repository } from "./page";

export default function Sidebar({repoList, setCurRepo}: 
        {repoList: Array<Repository>, setCurRepo: React.Dispatch<React.SetStateAction<Repository>>}) {

    return (
      <div className="flex flex-1 w-sm text-lg flex-col items-center py-9 px-8 bg-white dark:bg-black sm:items-start">

        <SidebarEntry title="👋 For You"/>
        <SidebarEntry title="⏰ Recent"/>
        <SidebarEntry title="⭐ Starred"/>

        <h4 className="pt-5 pb-2">Repositories: </h4>
        <div className="ps-2">
          {repoList.map((repo) => 
            <SidebarEntry title={repo.nameWithOwner} key={repo.url}/>
          )}
        </div>
      </div>
    );
}