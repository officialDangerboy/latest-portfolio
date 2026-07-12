import { createFileRoute } from "@tanstack/react-router";
import { MatrixRain } from "@/components/MatrixRain";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Transmissions } from "@/components/Transmissions";
import { Ops } from "@/components/Ops";
import { Contact, Footer } from "@/components/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background">
        <MatrixRain />
        <Nav />
        <main className="relative">
          <Hero />
          <Skills />
          <Transmissions />
          <Ops />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
