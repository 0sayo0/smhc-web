import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-cream pt-40 pb-24 flex items-center justify-center selection:bg-terracotta selection:text-white">
      <Container className="text-center">
        <FadeIn>
          <span className="text-terracotta text-xs font-system font-bold uppercase tracking-[0.3em] mb-6 block">
            Sobre Mí
          </span>
          <h1 className="font-brand text-4xl md:text-6xl text-coal mb-6">
            Stephany Manzano
          </h1>
          <div className="w-16 h-[1px] bg-coal/20 mx-auto mb-8"></div>
          <p className="font-editorial text-xl md:text-2xl text-coal/70 italic max-w-2xl mx-auto leading-relaxed">
            "Esta página está siendo moldeada con la misma delicadeza y atención
            al detalle que nuestras piezas. Próximamente..."
          </p>
        </FadeIn>
      </Container>
    </main>
  );
}
