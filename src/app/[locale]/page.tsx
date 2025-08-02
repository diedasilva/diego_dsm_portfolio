import Hero from "@/components/section/Hero/Hero";
import Bio from "@/components/section/Bio/Bio";
import Projects from "@/components/section/Projects/Projects";
import Contacts from "@/components/section/Contacts/Contacts";
import TechnicalToolBox from "@/components/section/TechnicalToolBox/TechnicalToolBox";
import FadeContent from "@/components/animate/FadeContent/FadeContent";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FadeContent
        blur={true}
        duration={1000}
        easing="ease-out"
        initialOpacity={0}
      >
        <Bio />
      </FadeContent>
      <Projects />
      <FadeContent
        blur={true}
        duration={1000}
        easing="ease-out"
        initialOpacity={0}
      >
        <TechnicalToolBox />
      </FadeContent>
      <FadeContent
        blur={true}
        duration={1000}
        easing="ease-out"
        initialOpacity={0}
      >
        <Contacts />
      </FadeContent>
    </main>
  );
}
