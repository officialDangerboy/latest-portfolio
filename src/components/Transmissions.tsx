import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionHeading } from "./Skills";
import { revealEach } from "@/lib/reveal";


const MESSAGES = [
  {
    tag: "to: every_admin",
    text: "Your firewall is a fence in a field with no gates on the sides. I don't climb it. I walk around it. Patch the humans before you patch the ports.",
  },
  {
    tag: "to: the_skeptics",
    text: "You called it 'unhackable'. That's not a security posture, that's an invitation. Nothing is unhackable — some things just haven't met the right person yet.",
  },
  {
    tag: "to: the_companies",
    text: "I'm not the threat. I'm the rehearsal. Better you find me in your logs than someone who won't send a report afterward.",
  },
  {
    tag: "to: the_curious",
    text: "Curiosity isn't a crime, but access without permission is. Learn the rules cold — then you'll know exactly where the line is worth standing on.",
  },
  {
    tag: "to: my_targets",
    text: "By the time you read this, I've already been through, left nothing broken, and written down every door you forgot to lock. You're welcome.",
  },
  {
    tag: "to: the_next_gen",
    text: "The best exploit is patience. Read the manual nobody reads. The vulnerability is almost always in the assumption everyone agreed not to question.",
  },
];

export function Transmissions() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".msg-card");
      const cleanup = revealEach(cards, "up");
      return cleanup;
    }, ref);
    return () => ctx.revert();
  }, []);


  return (
    <section id="transmissions" className="relative z-10 mx-auto max-w-5xl px-5 py-20 sm:py-28">
      <SectionHeading index="02" title="transmissions" subtitle="tail -f /var/log/danger" />
      <div ref={ref} className="mt-12 grid gap-5 md:grid-cols-2">
        {MESSAGES.map((m) => (
          <blockquote
            key={m.tag}
            className="msg-card card-hack card-hack-hover rounded-lg p-6"
          >
            <div className="mb-3 flex items-center gap-2 font-tech text-xs text-terminal">
              <span className="inline-block h-2 w-2 animate-flicker rounded-full bg-terminal" />
              {m.tag}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="text-terminal-dim">"</span>
              {m.text}
              <span className="text-terminal-dim">"</span>
            </p>
            <p className="mt-4 font-tech text-xs text-terminal-dim">— danger, over &amp; out</p>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
