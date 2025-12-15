"use client";

import {
  ArrowLeftCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  GitBranch,
  GitBranchIcon,
  GitBranchPlus,
  Home,
  Inbox,
  LucideGitBranch,
  Notebook,
  Plus,
  Search,
  Settings,
  Twitter,
  User2,
  Youtube,
  YoutubeIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {DropdownMenu} from "@/components/ui/dropdown-menu";
import {Footer} from "./footer-sidebar";
import {Suspense} from "react";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "YouTube",
    url: "#",
    icon: YoutubeIcon,
  },
  {
    title: "Twitter",
    url: "#",
    icon: Twitter,
  },
  {
    title: "Medium",
    url: "#",
    icon: Notebook,
  },
];

const projects = [
  {
    title: "Project 1",
    url: "/#",
    icon: LucideGitBranch,
  },
  {
    title: "Project 2",
    url: "/#",
    icon: LucideGitBranch,
  },
];

export function AppSidebar({children}: {children?: React.ReactNode}) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuButton className="h-auto -my-2">
                <Image
                  src={
                    "https://ik.imagekit.io/mrityunjay/your_brain__3_-removebg-preview.png?updatedAt=1763637324508"
                  }
                  alt=""
                  width={125}
                  height={50}
                  className="block dark:hidden"
                />
                <Image
                  src="https://ik.imagekit.io/mrityunjay/1k_+-removebg-preview.png"
                  alt="logo-dark"
                  width={150}
                  height={50}
                  className="hidden dark:block"
                />
              </SidebarMenuButton>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "hover:bg-blue-200 transition-colors px-2 py-1 rounded-lg", // default
                        pathname === item.url &&
                          "bg-blue-700 text-white hover:bg-blue-600"
                      )}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn({
                        "bg-red-800/90 text-white hover:bg-blue-200 ":
                          pathname === item.url,
                      })}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Link href={"/create"}>
              <span className="flex gap-1 items-center font-medium">
                <Plus className="size-5 font-light" /> Create Project
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
      {children}
      {/* <Footer>

        </Footer> */}
    </Sidebar>
  );
}
