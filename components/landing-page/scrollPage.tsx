"use client";

import {useRef} from "react";
import {motion, useScroll, useTransform, useSpring} from "motion/react";

export function ScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Apply smooth transforms
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.01], [30, 0]), {
    stiffness: 60,
    damping: 50,
  });

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.01], [100, 0]),
    {
      stiffness: 50,
      damping: 50,
    }
  );

  const opacity = useSpring(useTransform(scrollYProgress, [0, 0], [0, 1]), {
    stiffness: 50,
    damping: 10,
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.95, 1]), {
    stiffness: 50,
    damping: 50,
  });

  return (
    <div
      ref={containerRef}
      className="h-auto sm:h-screen w-full flex flex-col items-center [perspective:1200px] [transform-style:preserve-3d]"
    >
      <motion.div
        style={{
          rotateX,
          y: translateY,
          opacity,
          scale,
          willChange: "transform, opacity",
        }}
        className="h-auto sm:h-auto w-[90%] max-w-[400px] aspect-[9/16] sm:aspect-auto sm:max-w-[1000px] rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden bg-white/70"
      >
        <div className="bg-neutral-900 p-2">
          <div className="bg-neutral-100 rounded-[12px] overflow-hidden">
            <div className="hidden sm:inline">
              <img
                src="https://ik.imagekit.io/mrityunjay/Screenshot%202025-07-30%20114911.png?updatedAt=1753857136729"
                alt="Scroll Effect Showcase"
                className="h-full w-full object-contain rounded-lg"
                width={1920}
                height={1080}
              />
            </div>
            <div className="inline sm:hidden">
              <img
                src="https://ik.imagekit.io/mrityunjay/Screenshot%202025-07-30%20194646.png?updatedAt=1753885052735"
                alt="Scroll Effect"
                className=""
                width={1080}
                height={2160}
              />
            </div>
          </div>
        </div>
      </motion.div>
      <h1 className="text-3xl sm:text-5xl font-bold text-center text-neutral-800 pt-5">
        Your <span className="text-sky-400 font-light">Memory Dashboard</span>
      </h1>
    </div>
  );
}
