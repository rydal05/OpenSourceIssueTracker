import SidebarEntry from "./components/sidebarentry";
import { Repository } from "./page";

export default function Sidebar({repoList, setCurRepo}: 
        {repoList: Array<Repository>, setCurRepo: React.Dispatch<React.SetStateAction<Repository>>}) {
    return (
      <div className="flex-none w-sm text-lg items-center py-16 mx-2 px-5 bg-white dark:bg-black sm:items-start">
        <p style={{ fontSize: '28px', justifyContent: 'center', margin: '5px'}} >🖥️ Freeira</p>
        <div className="flex flex-col">
          <SidebarEntry title="👋 For You"/>
          <SidebarEntry title="⏰ Recent"/>
          <SidebarEntry title="⭐ Starred"/>

          <h4 className="pt-5 pb-2 font-semibold">Repositories: </h4>

          <div className="ps-2 flex flex-col overflow-scroll h-190">
            {repoList.map((repo) => 
              <SidebarEntry title={repo.nameWithOwner} key={repo.url} func={() => {setCurRepo(repo)}}/>
            )}
          </div>
        </div>
      </div>
    );
}