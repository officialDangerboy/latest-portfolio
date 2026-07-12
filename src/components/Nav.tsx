import { useEffect, useState } from "react";

const LINKS = [
  { href: "#home", label: "home" },
  { href: "#skills", label: "skills" },
  { href: "#transmissions", label: "transmissions" },
  { href: "#ops", label: "ops" },
  { href: "#contact", label: "contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#home" className="font-tech text-lg text-terminal text-glow">
          root@danger:~$
        </a>
        <ul className="hidden items-center gap-7 text-sm md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-muted-foreground transition-colors duration-200 hover:text-terminal hover:text-glow"
              >
                <span className="text-terminal-dim">./</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="glow-border rounded px-4 py-1.5 text-xs text-terminal transition-transform duration-200 hover:scale-105"
        >
          ping_me
        </a>
      </nav>
    </header>
  );
}
