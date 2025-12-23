import {Footer} from "@/components/dashboard/sidebar/footer-sidebar";
import {AppSidebar} from "@/components/dashboard/sidebar/sidebar";
import { AddContent } from "@/components/dashboard/topbar/addContent";
import {SearchBox} from "@/components/dashboard/topbar/searchbox";
import { ShareBtn } from "@/components/dashboard/topbar/sharebtn";
import { ModeToggle } from "@/components/dashboard/topbar/theme-toggle";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {ReactNode} from "react";
import userExists from "../actions/getUser";
import DashboardNavbar from "@/components/dashboard/topbar/main";
import { HeroHeader } from "@/components/dashboard/topbar/topbar";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { getProjectBrainCardsByProjectId, getProjectsByUserId, getWebsiteCategoryTypes } from "../actions/content";

// export default function Layout({children}: {children: ReactNode}) {
//   return (
//     <div className="flex w-screen h-screen gap-1 bg-muted p-0.5 overflow-y-hidden">
//       <SidebarProvider>
//         <div className="h-full shrink-0 w-auto rounded-md mr-1">
//           <AppSidebar>
//             <Footer />{" "}
//           </AppSidebar>
//         </div>
//         <div className="flex flex-1 flex-col gap-0.5 max-w-full h-screen">
//         {/* <SidebarInset className="flex flex-col gap-0.5"> */}
//           <div className="py-4 bg-white dark:bg-inherit rounded-md flex justify-between items-center pr-2 overflow-none">
//             <SidebarTrigger />{" "}
//             <div className="flex items-center gap-2 shrink-0">
//               <SearchBox /> <ShareBtn /> 
//               <AddContent /> <ModeToggle />
//             </div>
//           </div>

//           <div className="min-w-0 flex-1 bg-white dark:bg-inherit rounded-md p-2 overflow-auto">
//             {children}
//           </div>
//           {/* </SidebarInset> */}
//         </div> 
//       </SidebarProvider>
//     </div>
//   );
// }

const data = {
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: "P",
      // isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: "P",
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: "P",
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: "P",
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export default async function Layout({ children }: { children: ReactNode }) {
  const userInfo = await userExists();
  const userId = userInfo?.user?.id;

  if (!userId) {
    return <div>Please log in to view your dashboard.</div>;
  }

  const userProjects = await getProjectsByUserId(userId)
  userProjects.projects.map(async(project) => {
    console.log(`${project.id} : ${project.projectsname}`);    
  })

  const websiteArray = await getWebsiteCategoryTypes(userId);

  const websiteItems = websiteArray.map((category) => ({
  title: category.displayName,
  url: `/${category.key}`, // 🔥 routing source of truth
}));

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen gap-1 bg-muted p-0.5 overflow-hidden">

        {/* Sidebar */}
        <div className="shrink-0">
          <AppSidebar items={websiteItems} projectItems={data.navMain}>
            <Footer />
          </AppSidebar>
        </div>

        {/* Main Section */}
        <div className="flex flex-1 min-w-0 flex-col gap-0.5">

          {/* Top Bar */}
          {/* <div className="flex w-full min-w-0 items-center justify-between rounded-md bg-white dark:bg-inherit py-4 pr-2 "> */}
            {/* <SidebarTrigger /> */}

            {/* <div className="flex items-center gap-2 shrink-0 z-30"> */}
              {/* <SearchBox /> */}
              {/* <ShareBtn userId={userId} />
              <AddContent />
              <ModeToggle /> */}
              {/* <DashboardNavbar userId={userId} /> */}
            {/* </div> */}
          {/* </div> */}
                <HeroHeader userId={userId} />
          {/* Page Content */}
          <div className="flex-1 w-full min-w-0 overflow-x-auto overflow-y-scroll rounded-md bg-white dark:bg-inherit p-2 thin-scrollbar">
            {children}
          </div>

        </div>
      </div>
    </SidebarProvider>
  );
}
