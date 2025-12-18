"use client";

import {Button} from "@/components/ui/button";
import {Menu, X} from "lucide-react";
import {ShareBtn} from "./sharebtn";
import {AddContent} from "./addContent";
import {ModeToggle} from "./theme-toggle";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";
import {SidebarTrigger} from "@/components/ui/sidebar";
import { SearchBox } from "./searchbox";

interface DashboardNavbarProps {
  userId: string;
}
export const HeroHeader = ({userId}: DashboardNavbarProps) => {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className="rounded-md bg-white dark:bg-inherit">
      <nav
        data-state={menuState && "active"}
        className=""
      >
        <div
          className={cn(
            "min-w-fulltransition-all duration-300 flex justify-between",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="flex w-full items-center justify-between gap-6 lg:gap-0 pt-4 pb-3 pr-2">
            <div className="flex w-full justify-between sm:flex-col">
              <SidebarTrigger />
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 cursor-pointer p-2.5 lg:hidden flex flex-row"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="bg-background/40 backdrop-blur-sm in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <SearchBox />
                <ShareBtn userId={userId} />
                <AddContent />
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
