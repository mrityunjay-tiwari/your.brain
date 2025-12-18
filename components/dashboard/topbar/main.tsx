"use client";

import {Menu, X} from "lucide-react";
import {AddContent} from "./addContent";
import {SearchBox} from "./searchbox";
import {ShareBtn} from "./sharebtn";
import {ModeToggle} from "./theme-toggle";
import {useState} from "react";
import {cn} from "@/lib/utils";

interface DashboardNavbarProps {
  userId: string;
}

export default function DashboardNavbar({userId}: DashboardNavbarProps) {
  const [menuState, setMenuState] = useState(false);

  return (
    <nav
      data-state={menuState && "active"}
      className="inset-x-0 top-0 z-20 px-2"
    >
      <div className="grid grid-rows-[auto_1fr] shrink-0">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          {/* Left (can add logo / title later) */}
          <div />

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuState(!menuState)}
            aria-label={menuState ? "Close Menu" : "Open Menu"}
            className="relative z-30 block lg:hidden"
          >
            <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 size-6 duration-200" />
            <X className="absolute inset-0 -rotate-180 scale-0 opacity-0 in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 size-6 duration-200" />
          </button>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ShareBtn userId={userId} />
            <AddContent />
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden",
            "row-start-2 z-20",
            "bg-background/40 backdrop-blur-xl border rounded-xl p-4",
            
            "hidden in-data-[state=active]:block"
          )}
        >
          <div className="flex flex-col gap-2">
            <ShareBtn userId={userId} />
            <AddContent />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
