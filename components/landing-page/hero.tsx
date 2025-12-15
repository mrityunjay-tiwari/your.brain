import React from "react";
import Link from "next/link";
import {ArrowBigRight, ArrowRight, ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {TextEffect} from "@/components/motion-primitives/text-effect";
import {AnimatedGroup} from "@/components/motion-primitives/animated-group";
import {HeroHeader} from "./navbar";
import {Variants} from "motion/react";
import {BackgroundRippleEffect} from "../acceternity/background-ripple-effect";
import {Ubuntu} from "next/font/google";
import {cn} from "@/lib/utils";

const transitionVariants: {item: Variants} = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

const ubuntu = Ubuntu({
  variable: "--font-shadow",
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
});

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden z-20">
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden contain-strict lg:block"
        >
          {/* <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
              <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
              <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" /> */}
        </div>
        <section>
          <div className="relative pt-24 md:pt-36">
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 1,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className="mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-20 lg:top-32"
            >
              <Image
                src="https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120"
                alt="background"
                className="hidden size-full dark:block"
                width="3276"
                height="4095"
              />
            </AnimatedGroup>

            <BackgroundRippleEffect />
            {/* <div
                  aria-hidden
                  className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
                /> */}
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    href="#link"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm flex gap-2 items-center justify-center">
                      <div className="relative w-3 h-3 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-in z-10 absolute justify-self-center"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-300 animate-[ping_1.5s_ease-in-out_infinite] absolute justify-self-center"></div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        Introducing Chat on Your Contents
                      </div>
                    </span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedGroup>

                <div className="flex">
                  <TextEffect
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="h1"
                    className={cn(
                      `ml-auto mt-8 max-w-4xl text-neutral-900/80 text-4xl md:font-thin md:text-7xl lg:mt-16 xl:text-[5rem], ${ubuntu.className}`
                    )}
                  >
                    {`Your `}
                  </TextEffect>
                  <TextEffect
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="h1"
                    className={cn(
                      `mr-auto mt-8 max-w-4xl text-blue-800/80 text-4xl md:font-medium md:text-7xl lg:mt-16 xl:text-[5rem], ${ubuntu.className}`
                    )}
                  >
                    Second Brain
                  </TextEffect>
                </div>

                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-gray-800/60 text-2xl"
                >
                  {`Custom Save what you need to revisit!`}
                </TextEffect>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="text-nowrap mx-auto mt-1 max-w-2xl text-gray-800/60 text-xl"
                >
                  {`"Smart way to save and retrive, what you may forget otherwise."`}
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div
                    key={1}
                    className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                  >
                    <Button
                      asChild
                      size="lg"
                      variant="define"
                      className=" px-10 py-5 text-base bg-blue-900 rounded-xl shadow-[0_25px_40px_-10px_rgba(0,0,0,1),0_0_40px_-5px_rgba(0,0,0,0)]"
                    >
                      <Link href="/signin">
                        <span className="text-nowrap flex items-center justify-center gap-1">
                          Try Now <ArrowRight />
                        </span>
                      </Link>
                    </Button>
                  </div>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="mask-b-from-55% relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div className="flex justify-center items-center inset-shadow-2xl ring-background dark:inset-shadow-white/15 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/50 ring-1">
                  {/* <Image
                    className="bg-background aspect-auto relative hidden rounded-2xl dark:block"
                    src="https://ik.imagekit.io/mrityunjay/Screenshot%202025-07-30%20114911.png?updatedAt=1753857136729"
                    alt="app screen"
                    width="0"
                    height="0"
                  /> */}
                  <Image
                    className="z-2 border aspect-auto relative rounded-2xl border dark:hidden shadow-xl"
                    src="https://ik.imagekit.io/mrityunjay/Screenshot%202025-07-30%20114911.png?updatedAt=1753857136729"
                    alt="app screen"
                    width="1150"
                    height="2"
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
        <section className="bg-background pb-16 pt-16 md:pb-32 inline md:hidden">
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
              ...transitionVariants,
            }}
            className="mt-12"
          >
            <div
              aria-hidden
              className="bg-radial from-primary/50 dark:from-primary/25 relative mx-auto mt-32 max-w-2xl to-transparent to-55% text-left"
            >
              <div className="bg-background border-border/50 absolute inset-0 mx-auto w-80 -translate-x-3 -translate-y-12 rounded-[2rem] border p-2 [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:-translate-x-6">
                <div className="relative h-96 overflow-hidden rounded-[1.5rem] border p-2 pb-12 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] before:opacity-50"></div>
              </div>
              <div className="bg-muted dark:bg-background/50 border-border/50 mx-auto w-80 translate-x-4 rounded-[2rem] border p-2 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:translate-x-8">
                <div className="bg-background space-y-2 overflow-hidden rounded-[1.5rem] border p-2 shadow-xl dark:bg-white/5 dark:shadow-black dark:backdrop-blur-3xl">
                  <Image
                    className="bg-background aspect-auto relative rounded-2xl"
                    src="https://ik.imagekit.io/mrityunjay/Screenshot%202025-07-30%20114911.png?updatedAt=1753857136729"
                    alt="app screen"
                    width="5000"
                    height="2"
                  />
                  <div className="bg-muted rounded-[1rem] p-4 pb-16 dark:bg-white/5"></div>
                </div>
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:opacity-5"></div>
            </div>
          </AnimatedGroup>
        </section>
      </main>
    </>
  );
}
