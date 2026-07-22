import "swiper/css"
import "swiper/css/pagination"
import { type ReactNode } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { frameworks, skills } from "@/data/skills"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import GridBackground from "@/components/grid-background"
import { Terminal } from "lucide-react"

type MarqueeProps = {
    children: ReactNode
    speed?: number
}

export function Marquee({ children, speed = 50 }: MarqueeProps) {
    return (
        <div className="marquee">
            <div
                className="marquee-track"
                style={{ animationDuration: `${speed}s` }}
            >
                {children}
                {children}
            </div>
        </div>
    )
}

export default function Skills() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
    return (
        <section id="skills" className="relative py-28">
            <div className="absolute inset-0 bg-(--bg-primary)" />

            <GridBackground className="opacity-20" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-16 text-center"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3.5 py-1 backdrop-blur-sm">
                        <Terminal size={14} className="text-cyan-400" />
                        <span className="font-mono text-[11px] font-semibold tracking-widest text-slate-400 uppercase">
                            System.Skills
                        </span>
                    </div>
                    <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
                        Technologies{" "}
                        <span className="text-emerald-400">Maîtrisées</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg font-light text-slate-400">
                        Synthèse de mes compétences techniques et des
                        technologies que je maîtrise.
                    </p>
                </motion.div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-16 text-center"
                >
                    <Marquee speed={30}>
                        {frameworks.map((f, i) => (
                            <div
                                key={i}
                                className="mr-6 flex flex-col items-center gap-3 rounded-full px-2 py-2"
                            >
                                <div className="h-15 w-15 overflow-hidden rounded-full">
                                    <img
                                        src={f.icon}
                                        alt={f.name}
                                        className="h-full w-full"
                                    />
                                </div>
                                <span className="font-medium text-gray-300">
                                    {f.name}
                                </span>
                            </div>
                        ))}
                    </Marquee>
                </motion.div>

                {/* Skills grid */}
                <Swiper
                    modules={[Pagination]}
                    grabCursor
                    pagination={{ clickable: true }}
                    className="mt-20 pb-24"
                >
                    {skills.map((category, catIdx) => (
                        <SwiperSlide key={category.title} className="px-1">
                            <motion.article
                                initial={{ opacity: 0, y: 40 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.6,
                                    delay: catIdx * 0.1,
                                    ease: "easeOut",
                                }}
                                className="group relative mb-15 px-0 py-5 md:px-10"
                            >
                                <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-blue-500/5 via-transparent to-purple-500/5 opacity-20" />

                                <header className="relative mb-10 text-center">
                                    <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                                        {category.title}
                                    </h3>

                                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
                                        {category.subtitle}
                                    </p>
                                </header>

                                <div className="relative grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                                    {category.techs.map((tech) => (
                                        <div
                                            key={tech.name}
                                            className="group relative overflow-hidden rounded-xl border border-neutral-800/70 bg-neutral-900/40 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                        >
                                            <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 transition duration-300 group-hover:opacity-100" />

                                            <div className="relative mb-3 flex items-center justify-between">
                                                <span className="text-sm font-medium text-neutral-200">
                                                    {tech.name}
                                                </span>

                                                <span className="font-mono text-xs text-neutral-400">
                                                    {tech.value}%
                                                </span>
                                            </div>

                                            <div className="relative h-2 w-full overflow-hidden rounded-full border border-gray-700 bg-neutral-700">
                                                <div
                                                    className="h-full rounded-full bg-emerald-500 transition-all duration-700 ease-out"
                                                    style={{
                                                        width: `${tech.value}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.article>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* All skills tags cloud */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    className="mt-16 text-center"
                >
                    <p className="mb-6 font-mono text-sm text-gray-400">
                        // Soft Skills
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            "Résolution de problèmes",
                            "Travail en équipe",
                            "Communication",
                            "Gestion du temps",
                            "Adaptabilité",
                            "Créativité",
                            "Souci du détail",
                            "Autonomie",
                        ].map((tool, i) => (
                            <motion.span
                                key={tool}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.7 + i * 0.03 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="skill-tag border border-gray-700 bg-gray-700/50 text-gray-400 hover:bg-gray-700/70"
                            >
                                {tool}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
