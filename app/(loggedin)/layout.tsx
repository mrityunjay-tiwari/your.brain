import {Footer} from "@/components/dashboard/sidebar/footer-sidebar";
import {AppSidebar} from "@/components/dashboard/sidebar/sidebar";
import { AddContent } from "@/components/dashboard/topbar/addContent";
import {SearchBox} from "@/components/dashboard/topbar/searchbox";
import { ShareBtn } from "@/components/dashboard/topbar/sharebtn";
import { ModeToggle } from "@/components/dashboard/topbar/theme-toggle";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {ReactNode} from "react";

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


export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen gap-1 bg-muted p-0.5 overflow-hidden">

        {/* Sidebar */}
        <div className="shrink-0">
          <AppSidebar>
            <Footer />
          </AppSidebar>
        </div>

        {/* Main Section */}
        <div className="flex flex-1 min-w-0 flex-col gap-0.5">

          {/* Top Bar */}
          <div className="flex w-full min-w-0 items-center justify-between rounded-md bg-white dark:bg-inherit py-4 pr-2 overflow-hidden">
            <SidebarTrigger />

            <div className="flex items-center gap-2 shrink-0">
              <SearchBox />
              <ShareBtn />
              <AddContent />
              <ModeToggle />
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 w-full min-w-0 overflow-x-auto overflow-y-scroll rounded-md bg-white dark:bg-inherit p-2 thin-scrollbar">
            {children}
          </div>

        </div>
      </div>
    </SidebarProvider>
  );
}
