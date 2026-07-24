import AIChat from "@/components/ai-chat"
import CustomCursor from "@/components/custom-cursor"
import DottedBackground from "@/components/dotted-background"
import AboutMe from "@/components/sections/about-me"
import Contact from "@/components/sections/contact"
import Experiences from "@/components/sections/experiences"
import Footer from "@/components/sections/Footer"
import Header from "@/components/sections/Header"
import Hero from "@/components/sections/hero"
import Projects from "@/components/sections/projects"
import Services from "@/components/sections/services"
import Skills from "@/components/sections/skills"
import ToolBox from "@/components/sections/ToolBox"
import WorkProcess from "@/components/sections/work-process"
import { cn } from "@/lib/utils"

export default function App() {
    return (
        <main className={cn("relative min-h-screen w-full")}>
            <CustomCursor />
            <DottedBackground
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                }}
            />

            <Header />
            <Hero />
            <AboutMe />
            <Experiences />
            <Projects />
            <Skills />
            <Services />
            <WorkProcess />
            <ToolBox />
            <Contact />
            <Footer />
            <AIChat />
        </main>
    )
}
