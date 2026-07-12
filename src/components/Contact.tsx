import { SectionHeading } from "./Skills";

const CHANNELS = [
  { label: "encrypted_mail", value: "danger@blackbox.io", href: "mailto:danger@blackbox.io" },
  { label: "github", value: "github.com/danger", href: "https://github.com/officialDangerboy" },
  { label: "signal", value: "@danger.secure", href: "#" },
  { label: "pgp_key", value: "0xDA43ER00", href: "#" },
];

export function Contact() {
  return (
    <section id="contact" className="relative z-10 mx-auto max-w-4xl px-5 py-20 sm:py-28">
      <SectionHeading index="04" title="establish_connection" subtitle="ssh danger@grid" />
      <div className="card-hack mt-12 rounded-lg p-6 sm:p-10">
        <p className="font-tech text-sm text-terminal-dim">
          <span className="text-terminal">$</span> echo "have a target that needs breaking? a system
          that needs proving? open a channel."
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="glass-panel group flex flex-col gap-1 rounded px-4 py-3 transition-all duration-200 hover:border-terminal hover:shadow-[var(--shadow-glow)] sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-5 sm:py-4"
            >
              <span className="font-tech text-xs text-terminal-dim">{c.label}</span>
              <span className="break-all text-sm text-foreground transition-colors group-hover:text-terminal sm:text-right">
                {c.value}
              </span>
            </a>
          ))}
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center font-tech text-xs text-terminal-dim">
          <p>[ all communications should be encrypted. i don't do plaintext. ]</p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border py-8 text-center font-tech text-xs text-terminal-dim">
      <p>
        <span className="text-terminal">root@danger:~$</span> exit
        <span className="cursor-blink ml-1 text-terminal">_</span>
      </p>
      <p className="mt-2">
        © {new Date().getFullYear()} danger // stay curious, stay ethical.
      </p>
    </footer>
  );
}
