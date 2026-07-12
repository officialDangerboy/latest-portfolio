import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealEach } from "@/lib/reveal";

gsap.registerPlugin(ScrollTrigger);


const SKILLS = [
  {
    cat: "// penetration_testing",
    items: ["Network Recon", "Web App Exploitation", "Privilege Escalation", "Post-Exploitation"],
    level: 96,
  },
  {
    cat: "// exploit_dev",
    items: ["Buffer Overflows", "Reverse Engineering", "Shellcode", "0-day Research"],
    level: 91,
  },
  {
    cat: "// red_teaming",
    items: ["Social Engineering", "Phishing Ops", "Physical Intrusion", "C2 Frameworks"],
    level: 89,
  },
  {
    cat: "// cryptography",
    items: ["Cipher Cracking", "Hash Collisions", "PKI Attacks", "Steganography"],
    level: 84,
  },
  {
    cat: "// tooling",
    items: ["Metasploit", "Burp Suite", "Nmap / Wireshark", "Ghidra / IDA"],
    level: 94,
  },
  {
    cat: "// languages",
    items: ["Python", "C / Assembly", "Bash", "Rust / Go"],
    level: 92,
  },
];

export function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".skill-card");
      const cleanup = revealEach(cards, "up");
      gsap.utils.toArray<HTMLElement>(".skill-bar").forEach((bar) => {
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: bar.dataset.level + "%",
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 92%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
      return cleanup;
    }, gridRef);
    return () => ctx.revert();
  }, []);


  return (
    <section id="skills" className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <SectionHeading index="01" title="skill_matrix" subtitle="cat ~/.arsenal" />
      <div ref={gridRef} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s) => (
          <div
            key={s.cat}
            className="skill-card card-hack card-hack-hover group rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-tech text-terminal">{s.cat}</h3>
              <span className="text-xs text-terminal-dim">{s.level}%</span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="skill-bar h-full w-0 rounded-full"
                data-level={s.level}
                style={{ background: "var(--gradient-terminal)" }}
              />
            </div>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {s.items.map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <span className="text-terminal">▸</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <p className="font-tech text-xs text-terminal-dim">
        <span className="text-terminal">{index}.</span> {subtitle}
      </p>
      <h2 className="mt-2 break-all font-mono text-2xl font-extrabold text-foreground sm:text-4xl">
        <span className="text-terminal text-glow">$</span> {title}
        <span className="cursor-blink ml-1 text-terminal">_</span>
      </h2>
    </div>
  );
}
