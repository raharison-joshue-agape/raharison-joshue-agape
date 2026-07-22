import { motion, useScroll, useTransform } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { Mail, Zap, MapPin, ExternalLink } from "lucide-react"
import { personalInfo } from "@/data/personal-info"
import { staggerContainer, staggerItem } from "@/lib/animations"
import GridBackground from "@/components/grid-background"

const GithubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
)

const LinkedinIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)

export default function Hero() {
    const { scrollY } = useScroll()
    const imageY = useTransform(scrollY, [0, 400], [0, 40])
    const textY = useTransform(scrollY, [0, 400], [0, 20])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    const socialLinks = [
        { icon: GithubIcon, href: personalInfo.github, label: "GitHub" },
        { icon: LinkedinIcon, href: personalInfo.linkedin, label: "LinkedIn" },
    ]

    return (
        <section
            id="hero"
            className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
            <GridBackground className="opacity-30" />

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.08, 1],
                        x: [0, 10, 0],
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-20 right-[10%] h-72 w-72 rounded-full bg-cyan-500/8 blur-2xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.12, 1],
                        x: [0, -8, 0],
                        y: [0, 12, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3,
                    }}
                    className="absolute bottom-20 left-[5%] h-80 w-80 rounded-full bg-emerald-500/6 blur-2xl"
                />
            </div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8 lg:pt-15">
                <div className="grid min-h-[88vh] grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        style={{ y: textY }}
                        className="order-2 flex flex-col lg:order-1"
                    >
                        <motion.div
                            variants={staggerItem}
                            className="mb-8 flex flex-wrap items-center gap-3"
                        >
                            <div className="relative flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/8 px-3.5 py-1.5 font-mono text-xs font-semibold text-emerald-400 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                </span>
                                {personalInfo.availability}
                            </div>

                            <div className="h-4 w-px bg-slate-700" />

                            <span className="flex items-center gap-1.5 font-mono text-sm font-normal text-slate-400">
                                <MapPin size={15} className="text-slate-400" />
                                {personalInfo.location}
                            </span>
                        </motion.div>

                        <motion.div variants={staggerItem} className="mb-5">
                            <p className="mb-3 font-mono text-xs font-semibold tracking-[0.25em] text-cyan-500 uppercase">
                                Salut, moi c'est
                            </p>
                            <h1 className="text-5xl leading-[1.02] font-black tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
                                {personalInfo.name.split(" ")[0]}
                                <span className="ml-4 text-cyan-400">
                                    {personalInfo.name.split(" ")[1]}
                                </span>
                            </h1>
                        </motion.div>

                        <motion.div
                            variants={staggerItem}
                            className="mb-7 flex h-8 items-center gap-3"
                        >
                            <span className="font-mono text-lg text-slate-400">
                                {">"}
                            </span>
                            <span className="font-mono text-lg font-semibold text-cyan-400 sm:text-xl">
                                <TypeAnimation
                                    sequence={[
                                        "Développeur Frontend",
                                        2000,
                                        "Ingénieur DevOps",
                                        2000,
                                        "Développeur Backend",
                                        2000,
                                        "Développeur Full Stack",
                                        2000,
                                        "Développeur Mobile",
                                        2000,
                                        "Analyste de Données",
                                        2000,
                                        "Intégrateur IA",
                                        2000,
                                    ]}
                                    wrapper="span"
                                    speed={55}
                                    repeat={Infinity}
                                />
                            </span>
                        </motion.div>

                        <motion.p
                            variants={staggerItem}
                            className="mb-9 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base"
                        >
                            {personalInfo.tagline}
                        </motion.p>

                        <motion.div
                            variants={staggerItem}
                            className="mb-10 flex flex-wrap gap-3"
                        >
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.03, y: -1 }}
                                whileTap={{ scale: 0.97 }}
                                className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition-shadow hover:shadow-xl hover:shadow-cyan-500/40"
                            >
                                <span className="absolute inset-0 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                <Mail size={15} />
                                Contactez-moi
                            </motion.a>

                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.03, y: -1 }}
                                whileTap={{ scale: 0.97 }}
                                className="group flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-slate-500 hover:bg-slate-800"
                            >
                                <Zap size={15} className="text-cyan-400" />
                                Découvrir mes projets
                                <ExternalLink
                                    size={13}
                                    className="text-slate-500 transition-colors group-hover:text-slate-400"
                                />
                            </motion.a>
                        </motion.div>

                        <motion.div
                            variants={staggerItem}
                            className="mb-12 flex items-center gap-3"
                        >
                            <span className="font-mono text-sm text-slate-400">
                                Suivez-moi sur
                            </span>
                            <div className="h-px max-w-10 flex-1 bg-slate-600" />

                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.15, y: -2 }}
                                    whileTap={{ scale: 0.92 }}
                                    title={label}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-400 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800 hover:text-slate-200"
                                >
                                    <Icon />
                                </motion.a>
                            ))}

                            <motion.a
                                href={`mailto:${personalInfo.email}`}
                                whileHover={{ scale: 1.15, y: -2 }}
                                whileTap={{ scale: 0.92 }}
                                title="Email"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-400 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800 hover:text-slate-200"
                            >
                                <Mail size={15} />
                            </motion.a>
                        </motion.div>

                        <motion.div
                            variants={staggerItem}
                            className="grid grid-cols-4 gap-1 border-t border-slate-700 pt-8"
                        >
                            {personalInfo.stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.9 + i * 0.1,
                                        duration: 0.5,
                                    }}
                                    className="group flex cursor-default flex-col items-center rounded-xl px-2 py-3 text-center transition-colors hover:bg-slate-900/60"
                                >
                                    <span className="font-mono text-2xl font-black text-white transition-colors group-hover:text-cyan-400">
                                        {stat.value}
                                    </span>
                                    <span className="mt-1 font-mono text-[11px] leading-tight tracking-wide text-slate-400 uppercase">
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, x: 60 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{
                            duration: 0.9,
                            delay: 0.25,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        style={{ y: imageY }}
                        className="order-1 flex justify-center lg:order-2 lg:justify-end"
                    >
                        <div className="relative my-10">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute -inset-8 rounded-full border border-dashed border-slate-800 opacity-60"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute -inset-14 rounded-full border border-slate-800/40 opacity-40"
                                style={{
                                    borderStyle: "dashed",
                                    borderWidth: "1px",
                                    borderSpacing: "8px",
                                }}
                            />

                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute -inset-6 rounded-full opacity-60"
                                style={{
                                    background:
                                        "conic-gradient(from 0deg, transparent 70%, #22d3ee, transparent)",
                                }}
                            />

                            <div className="absolute -inset-1 rounded-full bg-linear-to-br from-cyan-400/30 via-transparent to-blue-600/20 blur-md" />

                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-cyan-500/40 sm:h-100 sm:w-100"
                                style={{
                                    boxShadow:
                                        "0 0 0 1px rgba(34,211,238,0.1), 0 0 60px rgba(34,211,238,0.12), 0 30px 80px rgba(0,0,0,0.5)",
                                }}
                            >
                                <img
                                    src="/images/profile.jpg"
                                    alt={personalInfo.name}
                                    className="h-full w-full object-cover"
                                />
                                <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-b from-transparent via-transparent to-slate-950/30" />
                            </motion.div>

                            {personalInfo.floating_badges.map((badge, i) => (
                                <motion.div
                                    key={badge.text}
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                        duration: 3.5 + i * 0.7,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.8,
                                    }}
                                    whileHover={{ scale: 1.08 }}
                                    className={`${badge.pos} absolute rounded-xl border border-slate-700/80 bg-slate-900 px-3 py-2 font-mono text-xs font-bold shadow-xl shadow-black/40 backdrop-blur-sm`}
                                    style={{ color: badge.color }}
                                >
                                    <span
                                        className={`flex items-center gap-1.5 ${badge.color}`}
                                    >
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${badge.bg_color}`}
                                        />
                                        {badge.text}
                                    </span>
                                </motion.div>
                            ))}

                            <div className="absolute -top-3 -right-3 h-6 w-6 rounded-tr-lg border-t-2 border-r-2 border-cyan-500/50" />
                            <div className="absolute -bottom-3 -left-3 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-cyan-500/50" />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    style={{ opacity }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
                >
                    <span className="font-mono text-sm tracking-[0.2em] text-slate-400 uppercase">
                        scroll
                    </span>
                    <div className="relative h-10 w-px overflow-hidden rounded-full bg-slate-800">
                        <motion.div
                            animate={{ y: ["-100%", "200%"] }}
                            transition={{
                                duration: 1.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-x-0 h-1/2 rounded-full bg-linear-to-b from-transparent via-cyan-400 to-transparent"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
