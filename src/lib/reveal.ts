import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Dir = "up" | "left" | "right" | "scale";

/**
 * Attaches an individual ScrollTrigger to each item so every card animates in
 * when it enters the viewport and reverses out when it leaves — in both scroll
 * directions. Returns a cleanup function.
 */
export function revealEach(
  items: HTMLElement[],
  dir: Dir = "up",
  stepDelay = 0.06,
) {
  const fromVars: Record<string, number> = { opacity: 0 };
  if (dir === "up") fromVars.y = 60;
  if (dir === "left") fromVars.x = -60;
  if (dir === "right") fromVars.x = 60;
  if (dir === "scale") {
    fromVars.y = 50;
    fromVars.scale = 0.94;
  }

  const tweens = items.map((el, i) =>
    gsap.fromTo(
      el,
      fromVars,
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: (i % 2) * stepDelay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "bottom 12%",
          // onEnter, onLeave, onEnterBack, onLeaveBack
          toggleActions: "play reverse play reverse",
        },
      },
    ),
  );

  return () => tweens.forEach((t) => t.scrollTrigger?.kill());
}
