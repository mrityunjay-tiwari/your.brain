"use client";

import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {signOut} from "@/utils/auth";
import {ChevronUp, User2} from "lucide-react";
import {LogOutDialog} from "./logout";
import {Children, Suspense} from "react";
import Image from "next/image";

interface FooterClientProps {
  user: string;
  image: string;
  children?: React.ReactNode;
}
export default function FooterClient(props: FooterClientProps) {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Image src={props.image}  alt="logo" width={25} height={25} className="object-cover rounded-full" /> {props.user} 
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              
              <DropdownMenuItem onSelect={(e) => {
                e.preventDefault()
              }}><LogOutDialog /></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
