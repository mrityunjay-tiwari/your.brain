"use client";
import Link from "next/link";
import {Button} from "../ui/button";
import {
  ArrowRight,
  ArrowUpFromLine,
  Brain,
  Github,
  GithubIcon,
  Notebook,
} from "lucide-react";

export function NavBar() {
  return (
    <div className="flex items-center justify-between w-full pr-2 sm:w-5/6 h-auto">
      <div className="hover:cursor-pointer">
        <Brain />
      </div>
      <div className="flex gap-[10px] sm:gap-5 items-center">
        <Link
          href={"https://github.com/mrityunjay-tiwari/your-brain"}
          target="_blank"
        >
          {" "}
          <div className="hover:scale-110 transition-all">
            <img
              className="w-6 h-6 sm:w-7 sm:h-7"
              src="https://ik.imagekit.io/mrityunjay/github-142-svgrepo-com.svg?updatedAt=1752137737186"
            />
          </div>{" "}
        </Link>
        <div className="gap-5 hidden sm:flex">
          <Button>
            LogIn <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

import {Menu, X} from "lucide-react";
import React from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";

const menuItems = [
  {name: "Features", href: "#link"},
  {name: "Solution", href: "#link"},
  {name: "Pricing", href: "#link"},
  {name: "About", href: "#link"},
];

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Image
                  alt="logo"
                  src={
                    "https://ik.imagekit.io/mrityunjay/your_brain__3_-removebg-preview.png"
                  }
                  width={100}
                  height={50}
                />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            {/* <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div> */}

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className={cn(
                    "rounded-full shadow-xs border-0 bg-white/40",
                    isScrolled && "lg:hidden"
                  )}
                >
                  <Link href="https://github.com/mrityunjay-tiwari/your.brain">
                    <span>
                      <GithubIcon />
                    </span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant={"outline"}
                  size="lg"
                  className={cn(
                    "rounded-full border-0 shadow-xs bg-white/40",
                    isScrolled && "lg:hidden"
                  )}
                >
                  <Link href="/signin">
                    <span>Sign Up</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant={"outline"}
                  size="lg"
                  className={cn(
                    isScrolled
                      ? "rounded-full lg:inline-flex"
                      : "rounded-full hidden"
                  )}
                >
                  <Link href="/signin">
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
