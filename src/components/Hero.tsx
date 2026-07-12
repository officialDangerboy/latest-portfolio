import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import profileImg from "@/assets/profile.png";

import { TypeLines } from "./TypeLines";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Normalized pointer position (-0.5 .. 0.5), smoothed with springs.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Parallax layers move by different amounts for depth.
  const introX = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const introY = useTransform(sy, [-0.5, 0.5], [16, -16]);
  const profX = useTransform(sx, [-0.5, 0.5], [-38, 38]);
  const profY = useTransform(sy, [-0.5, 0.5], [-30, 30]);
  const rotX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-12"
      style={{ perspective: 1000 }}
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />

      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2"
      >
        {/* Left: intro */}
        <motion.div
          style={{ x: introX, y: introY }}
          className="text-center md:order-1 md:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 font-tech text-[10px] uppercase tracking-[0.3em] text-terminal-dim sm:text-xs"
          >
            [ offensive_security_specialist ]
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-mono text-5xl font-extrabold leading-none tracking-tight text-foreground sm:text-6xl md:text-7xl"
          >
            <span className="text-terminal text-glow">D4NG3R</span>
          </motion.h1>
          <div className="mt-6">
            <TypeLines />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
          >
            <a
              href="#ops"
              className="glow-border rounded px-5 py-2.5 text-sm text-terminal transition-transform duration-200 hover:scale-105"
            >
              ./view_ops
            </a>
            <a
              href="#transmissions"
              className="rounded border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:border-terminal hover:text-terminal"
            >
              read_transmissions
            </a>
          </motion.div>
        </motion.div>

        {/* Right: profile with cybernetic HUD frame + parallax tilt */}
        <div className="flex justify-center md:order-2" style={{ perspective: 800 }}>
          <motion.div
            style={{ x: profX, y: profY, rotateX: rotX, rotateY: rotY }}
            className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72 md:h-80 md:w-80"
          >
            {/* Outer technical ring: slow rotating dashes */}
            <div className="animate-spin-60 absolute inset-0 rounded-full border border-dashed border-terminal/20" />

            {/* Mid ring: segmented tracking with tick marks */}
            <div className="animate-spin-30-rev absolute inset-4 rounded-full border border-terminal/10">
              <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-terminal" />
              <div className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-terminal" />
              <div className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-terminal" />
              <div className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-terminal" />
            </div>

            {/* Inner focus ring: floating segments */}
            <div className="animate-spin-10 absolute inset-8 rounded-full border-2 border-transparent">
              <div className="absolute left-1/2 top-0 h-1 w-12 -translate-x-1/2 rounded-full bg-terminal shadow-[0_0_12px_var(--terminal)]" />
              <div className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-terminal shadow-[0_0_12px_var(--terminal)]" />
            </div>

            {/* Main profile container */}
            <div className="relative h-[68%] w-[68%] rounded-full bg-terminal/10 p-1 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-sm">
              <div className="h-full w-full overflow-hidden rounded-full border border-terminal/40 ring-4 ring-black/50">
                <img
                  src={profileImg}
                  alt="danger — hacker profile"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover contrast-125 brightness-90"
                />
              </div>

              {/* Scanning line overlay */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full opacity-20">
                <div className="animate-hud-scan h-1/2 w-full bg-gradient-to-b from-transparent to-terminal" />
              </div>

              {/* Floating orbiting node */}
              <div className="animate-spin-4 pointer-events-none absolute -inset-2">
                <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-terminal shadow-[0_0_10px_var(--terminal)]" />
              </div>
            </div>

            {/* Corner bracket accents */}
            <div className="absolute -left-1 -top-1 h-8 w-8 border-l-2 border-t-2 border-terminal/30 sm:-left-4 sm:-top-4" />
            <div className="absolute -bottom-1 -right-1 h-8 w-8 border-b-2 border-r-2 border-terminal/30 sm:-bottom-4 sm:-right-4" />
          </motion.div>
        </div>
      </motion.div>


      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 font-tech text-[10px] text-terminal-dim"
      >
        scroll ↓
      </motion.div>
    </section>
  );
}
