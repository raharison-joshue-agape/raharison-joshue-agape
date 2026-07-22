import CustomCursor from "@/components/custom-cursor"
import AboutMe from "@/components/sections/about-me"
import Experiences from "@/components/sections/experiences"
import Header from "@/components/sections/Header"
import Hero from "@/components/sections/hero"
import Skills from "@/components/sections/skills"

export function App() {
    return (
        <main className="relative min-h-screen w-full bg-gray-950">
            <CustomCursor />

            <Header />
            <Hero />
            <AboutMe />
            <Experiences />
            <Skills />
        </main>
    )
}

export default App
