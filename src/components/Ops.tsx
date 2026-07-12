import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionHeading } from "./Skills";
import { revealEach } from "@/lib/reveal";


const OPS = [
  {
    codename: "OP_GHOSTWIRE",
    type: "red_team // financial",
    desc: "Full-scope red team engagement. Breached perimeter via spear-phish, pivoted to domain admin in 6 hours. Zero detection until debrief.",
    stack: ["C2", "Kerberoasting", "Social Eng"],
    result: "Domain compromised",
  },
  {
    codename: "OP_NIGHTFALL",
    type: "exploit_dev // IoT",
    desc: "Discovered and weaponized a stack overflow in a smart-lock firmware. Responsible disclosure led to CVE assignment and vendor patch.",
    stack: ["Ghidra", "Shellcode", "ARM"],
    result: "CVE assigned",
  },
  {
    codename: "OP_BLACKTIDE",
    type: "web_app // healthcare",
    desc: "Chained an IDOR with a JWT confusion bug to access records across tenants. Reported, triaged, and remediated within the disclosure window.",
    stack: ["Burp", "JWT", "IDOR"],
    result: "Critical patched",
  },
  {
    codename: "OP_DEADRECKON",
    type: "physical // corporate",
    desc: "On-site intrusion assessment. Tailgated through 3 checkpoints, cloned a badge, and reached the server room. All findings documented.",
    stack: ["Proxmark", "OSINT", "Lockpick"],
    result: "Access achieved",
  },
];

export function Ops() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".op-card");
      const cleanup = revealEach(cards, "scale");
      return cleanup;
    }, ref);
    return () => ctx.revert();
  }, []);


  return (
    <section id="ops" className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <SectionHeading index="03" title="operations_log" subtitle="ls -la ~/ops (redacted)" />
      <div ref={ref} className="mt-12 grid gap-5 md:grid-cols-2">
        {OPS.map((o) => (
          <article key={o.codename} className="op-card card-hack card-hack-hover group rounded-lg p-7">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-mono text-xl font-bold text-foreground transition-colors group-hover:text-terminal">
                  {o.codename}
                </h3>
                <p className="mt-1 font-tech text-xs text-terminal-dim">{o.type}</p>
              </div>
              <span className="rounded border border-terminal/40 px-2 py-1 text-[10px] uppercase tracking-wider text-terminal">
                {o.result}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{o.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {o.stack.map((s) => (
                <span
                  key={s}
                  className="glass-panel rounded px-2.5 py-1 font-tech text-xs text-secondary-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
