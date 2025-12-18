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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {DropdownMenu} from "@/components/ui/dropdown-menu";
import {Footer} from "./footer-sidebar";
import {Suspense, useState} from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {createNewProject} from "@/app/actions/content";
import userExists from "@/app/actions/getUser";
import {NavMain} from "@/components/sidebar-check/nav-main";
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

import {ChevronRight, type LucideIcon} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Menu items.
const onlyitem = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
];

const items = [
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



export const addTitleFormSchema = z.object({
  title: z
    .string()
    .min(1, "Bug title must be at least 1 characters.")
    .max(200, "Bug title must be at most 200 characters."),
});

interface ProjectItemsProps {
    title: string;
    url: string;
    icon?: string;
    
    items?: {
      title: string;
      url: string;
    }[];
  };

export function AppSidebar({
  projectItems,
  children,
}: {
  children: React.ReactNode;
  projectItems: ProjectItemsProps[]
}) {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  const pathname = usePathname();

  const form = useForm<z.infer<typeof addTitleFormSchema>>({
    resolver: zodResolver(addTitleFormSchema),
    defaultValues: {
      title: "",
    },
  });

  // Create New Project
  const onSubmit = async (data: z.infer<typeof addTitleFormSchema>) => {
    console.log("Creating new project...");
    const toastId = toast.loading("Creating new project...");
    try {
      const user = await userExists();
      if (!user) {
        toast.error("User does not exist. Please log in.", {id: toastId});
        return;
      }
      const userId = user.user?.id;
      if (!userId) {
        toast.error("User ID not found. Please log in.", {id: toastId});
        return;
      }
      await createNewProject({
        title: data.title,
        userId: userId, // Replace with actual user ID
      });
      toast.success(`${data.title} created successfully!`, {
        id: toastId,
        duration: 2000,
      });
      setIsCreateProjectOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.", {id: toastId});
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        {/* <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuButton className="h-auto -my-2"> */}
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
        {/* </SidebarMenuButton>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu> */}
      </SidebarHeader>

      <SidebarContent className="thin-scrollbar">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {onlyitem.map((item) => (
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
          <SidebarGroupLabel>Application Category</SidebarGroupLabel>
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

        {/* <SidebarGroup>
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
        </SidebarGroup> */}

        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarMenu>
            {projectItems.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                // defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-2.5">
                    <SidebarGroupLabel>Project Brains</SidebarGroupLabel>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                    <SidebarSeparator />
                    <SidebarGroupLabel>ProjectNote</SidebarGroupLabel>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Create Project Button */}
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <div
              onClick={() => setIsCreateProjectOpen(true)}
              className="hover:cursor-pointer"
            >
              <span className="flex gap-1 items-center font-medium">
                <Plus className="size-5 font-light" /> Create Project
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>

      {/* Create New Project Dialog */}
      <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-rhf-demo-title"
                      className="font-normal"
                    >
                      Title
                    </FieldLabel>
                    <Input
                      {...field}
                      // id="form-rhf-demo-title"
                      // aria-invalid={fieldState.invalid}
                      placeholder="Put project title here"
                      // autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="flex gap-5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button type="submit" form="form-rhf-demo">
                  Submit
                </Button>
              </div>
            </FieldGroup>
          </form>
          {/* <DialogFooter>
            <Button
              type="submit"
              size={"sm"}
              className="hover:cursor-pointer text-white bg-red-400 hover:bg-red-900 hover:scale-105"
            >
              Yes, Delete
            </Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>

      <SidebarFooter>{children}</SidebarFooter>
      {/* <Footer>

        </Footer> */}
    </Sidebar>
  );
}
