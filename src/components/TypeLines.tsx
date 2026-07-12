import { useEffect, useRef, useState } from "react";

const LINES = [
  "> initializing secure shell...",
  "> access granted. welcome to the grid.",
  "> I am danger — I break systems so you can trust them.",
];

/** Types out an array of terminal lines, one after another. */
export function TypeLines() {
  const [display, setDisplay] = useState<string[]>([""]);
  const ref = useRef({ line: 0, char: 0 });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const { line, char } = ref.current;
      if (line >= LINES.length) return;
      const current = LINES[line];
      if (char <= current.length) {
        setDisplay((prev) => {
          const next = [...prev];
          next[line] = current.slice(0, char);
          return next;
        });
        ref.current.char++;
        timeout = setTimeout(tick, 28 + Math.random() * 40);
      } else {
        ref.current.line++;
        ref.current.char = 0;
        setDisplay((prev) => [...prev, ""]);
        timeout = setTimeout(tick, 450);
      }
    };
    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="font-tech text-sm leading-relaxed text-terminal-dim sm:text-base">
      {display.map((l, i) => (
        <p key={i} className={i === 2 ? "text-terminal text-glow" : undefined}>
          {l}
          {i === display.length - 1 && (
            <span className="cursor-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-terminal" />
          )}
        </p>
      ))}
    </div>
  );
}
