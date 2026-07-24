import { projects } from "@/data/projects"
import { staggerContainer, staggerItem } from "@/lib/animations"
import { AnimatePresence, motion } from "framer-motion"
import {
    ExternalLink,
    Filter,
    FolderGit2,
    GitBranch,
    RefreshCcw,
    Star,
    Terminal,
} from "lucide-react"
import { useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"
import GridBackground from "@/components/grid-background"
import { cn } from "@/lib/utils"

const GithubIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
)

const categories = [
    "Tous",
    "Applications Web",
    "Applications Mobiles",
    "Services Backend",
]

const colorMap: Record<string, { text: string; bg: string; glow: string }> = {
    accent: {
        text: "#22d3ee",
        bg: "rgba(34,211,238,0.08)",
        glow: "rgba(34,211,238,0.18)",
    }, // cyan
    green: {
        text: "#34d399",
        bg: "rgba(52,211,153,0.08)",
        glow: "rgba(52,211,153,0.18)",
    }, // emerald
    sky: {
        text: "#38bdf8",
        bg: "rgba(56,189,248,0.08)",
        glow: "rgba(56,189,248,0.18)",
    }, // sky
    teal: {
        text: "#2dd4bf",
        bg: "rgba(45,212,191,0.08)",
        glow: "rgba(45,212,191,0.18)",
    }, // teal
    slate: {
        text: "#94a3b8",
        bg: "rgba(148,163,184,0.08)",
        glow: "rgba(148,163,184,0.12)",
    }, // slate
}

const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
    const [hovered, setHovered] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const colors = colorMap[project.color] || colorMap.accent

    return (
        <motion.div
            variants={staggerItem}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ y: -6 }}
            className={cn(
                "group relative overflow-hidden rounded-xl border backdrop-blur-xl transition-all duration-500",
                "bg-[#0d1117]"
            )}
            style={{
                borderColor: hovered
                    ? `${colors.text}40`
                    : "rgba(48, 54, 61, 0.6)",
                boxShadow: hovered
                    ? `0 20px 60px -15px ${colors.glow}, 0 0 0 1px ${colors.text}20`
                    : "0 4px 20px -8px rgba(0,0,0,0.6)",
            }}
        >
            <motion.div
                className={cn(
                    "absolute top-0 right-0 left-0 h-px bg-linear-to-r",
                    "from-transparent via-current to-transparent"
                )}
                style={{ color: colors.text }}
                animate={{ opacity: hovered ? 0.6 : 0.2 }}
                transition={{ duration: 0.4 }}
            />

            <motion.div
                className={cn(
                    "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700"
                )}
                style={{
                    background: `radial-gradient(800px circle at ${hovered ? "50%" : "50%"} 0%, ${colors.glow}, transparent 50%)`,
                }}
                animate={{ opacity: hovered ? 0.15 : 0 }}
            />

            <div
                className={cn("relative h-48 overflow-hidden", "bg-[#161b22]")}
            >
                <motion.div
                    animate={{ scale: hovered ? 1.05 : 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn("h-full w-full")}
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        className={cn(
                            "h-full w-full object-cover transition-opacity duration-500",
                            imageLoaded ? "opacity-100" : "opacity-0"
                        )}
                        onLoad={() => setImageLoaded(true)}
                    />

                    {!imageLoaded && (
                        <div
                            className={cn(
                                "absolute inset-0 animate-pulse bg-linear-to-br",
                                "from-[#161b22] to-[#0d1117]"
                            )}
                        />
                    )}
                </motion.div>

                <div
                    className={cn(
                        "absolute inset-0 bg-linear-to-t opacity-60",
                        "from-[#0d1117] via-[#0d1117]/40 to-transparent"
                    )}
                />

                <div className={cn("absolute top-3 left-3 z-10")}>
                    <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={cn(
                            "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md"
                        )}
                        style={{
                            backgroundColor: `${colors.bg}`,
                            borderColor: `${colors.text}30`,
                            color: colors.text,
                        }}
                    >
                        <div
                            className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                `bg-[${colors.text}]`
                            )}
                        />
                        {project.category}
                    </motion.span>
                </div>

                <div className={cn("absolute top-3 right-3 z-10")}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={cn(
                            "flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[11px] backdrop-blur-md",
                            "border-[#30363d]/80 bg-[#0d1117]/90"
                        )}
                    >
                        <Star
                            size={11}
                            className={cn("text-amber-400")}
                            fill="currentColor"
                        />
                        <span className={cn("font-semibold", "text-[#c9d1d9]")}>
                            {project.stars}
                        </span>
                    </motion.div>
                </div>

                <div className={cn("absolute right-3 bottom-3 z-10")}>
                    <motion.div
                        animate={{ scale: hovered ? 1.05 : 1 }}
                        className={cn(
                            "flex items-center gap-1.5 rounded-md border px-2 py-1 backdrop-blur-md",
                            "border-[#30363d]/80 bg-[#0d1117]/90"
                        )}
                    >
                        <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className={cn("h-1.5 w-1.5 rounded-full")}
                            style={{ backgroundColor: colors.text }}
                        />
                        <span
                            className={cn(
                                "font-mono text-[9px]",
                                "text-[#8b949e]"
                            )}
                        >
                            Active
                        </span>
                    </motion.div>
                </div>
            </div>

            <div className={cn("relative z-10 p-5")}>
                <h3
                    className={cn(
                        "mb-2 line-clamp-1 text-lg font-bold tracking-tight transition-colors",
                        "text-[#f0f6fc] group-hover:text-white"
                    )}
                >
                    {project.title}
                </h3>

                <p
                    className={cn(
                        "mb-5 line-clamp-4 min-h-[2.6rem] text-[13px] leading-relaxed",
                        "text-[#8b949e]"
                    )}
                >
                    {project.description}
                </p>

                {project.metrics && project.metrics.length > 0 && (
                    <div
                        className={cn(
                            "mb-5 grid grid-cols-3 gap-3 rounded-lg border p-3",
                            "border-[#30363d]/50 bg-[#161b22]/50"
                        )}
                    >
                        {project.metrics.map((idx) => (
                            <div
                                key={idx}
                                className={cn("flex flex-col items-center")}
                            >
                                <span
                                    className={cn(
                                        "mb-1 text-[9px] font-semibold tracking-wider uppercase",
                                        "text-[#6e7681]"
                                    )}
                                >
                                    Metric
                                </span>
                                <span
                                    className={cn(
                                        "font-mono text-sm font-bold",
                                        `text-[${colors.text}]`
                                    )}
                                >
                                    50K+ Users
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <div className={cn("mb-5 flex flex-wrap gap-1.5")}>
                    {project.tags.slice(0, 5).map((tag) => (
                        <motion.span
                            key={tag}
                            whileHover={{ scale: 1.05, y: -1 }}
                            className={cn(
                                "cursor-default rounded border px-2 py-0.5 text-[10px] font-medium transition-all",
                                "border-[#30363d] text-[#7d8590] hover:border-[#58a6ff]/50 hover:text-[#58a6ff]"
                            )}
                        >
                            {tag}
                        </motion.span>
                    ))}
                    {project.tags.length > 5 && (
                        <span
                            className={cn(
                                "px-2 py-0.5 text-[10px] font-medium",
                                "text-[#6e7681]"
                            )}
                        >
                            +{project.tags.length - 5}
                        </span>
                    )}
                </div>

                <div
                    className={cn(
                        "flex items-center justify-between border-t pt-4",
                        "border-[#30363d]/60"
                    )}
                >
                    <div className={cn("flex items-center gap-3")}>
                        {project.github && (
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    "rounded-md p-1.5 transition-all",
                                    "text-[#8b949e] hover:bg-[#30363d]/50 hover:text-white"
                                )}
                                title="View on GitHub"
                            >
                                <GithubIcon />
                            </motion.a>
                        )}
                        {project.demo && (
                            <motion.a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02, x: 2 }}
                                whileTap={{ scale: 0.98 }}
                                className={cn(
                                    "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition-all"
                                )}
                                style={{
                                    backgroundColor: `${colors.bg}`,
                                    borderColor: `${colors.text}40`,
                                    color: colors.text,
                                }}
                            >
                                <ExternalLink size={12} />
                                <span>Live Demo</span>
                            </motion.a>
                        )}
                    </div>

                    <motion.div
                        animate={{
                            opacity: hovered ? 1 : 0.5,
                            x: hovered ? 0 : 4,
                        }}
                        className={cn(
                            "flex items-center gap-1.5 rounded px-2 py-1",
                            "bg-[#161b22]/50"
                        )}
                    >
                        <GitBranch size={11} className={cn("text-[#6e7681]")} />
                        <span
                            className={cn(
                                "font-mono text-[10px]",
                                "text-[#8b949e]"
                            )}
                        >
                            v1.0.4
                        </span>
                    </motion.div>
                </div>
            </div>

            <motion.div
                className={cn(
                    "pointer-events-none absolute inset-0 rounded-xl"
                )}
                style={{
                    boxShadow: hovered
                        ? `inset 0 0 0 1px ${colors.text}30`
                        : "none",
                }}
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    )
}

export default function Projects() {
    const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
    const [activeCategory, setActiveCategory] = useState("Tous")

    const filtered = useMemo(
        () =>
            activeCategory === "Tous"
                ? projects
                : projects.filter((p) => p.category.startsWith(activeCategory)),
        [activeCategory]
    )

    return (
        <section
            id="projects"
            ref={ref}
            className={cn("relative overflow-hidden py-28", "bg-[#06090e]")}
        >
            <GridBackground className={cn("opacity-15")} />

            <div
                className={cn(
                    "pointer-events-none absolute inset-0 overflow-hidden"
                )}
            >
                <div
                    className={cn(
                        "absolute top-[10%] left-[5%] h-130 w-130 rounded-full blur-[120px]",
                        "bg-cyan-500/10"
                    )}
                />
                <div
                    className={cn(
                        "absolute right-[5%] bottom-[10%] h-130 w-130 rounded-full blur-[120px]",
                        "bg-emerald-500/10"
                    )}
                />
                <div
                    className={cn(
                        "absolute inset-0 bg-size-[32px_32px]",
                        "bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.07)_1px,transparent_0)]"
                    )}
                />
            </div>

            <div
                className={cn(
                    "relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                )}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn("mb-16 text-center")}
                >
                    <div
                        className={cn(
                            "mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 backdrop-blur-sm",
                            "border-slate-800 bg-slate-900/50"
                        )}
                    >
                        <Terminal size={14} className={cn("text-cyan-400")} />
                        <span
                            className={cn(
                                "font-mono text-[11px] font-semibold tracking-widest uppercase",
                                "text-slate-400"
                            )}
                        >
                            System.Projects
                        </span>
                    </div>
                    <h2
                        className={cn(
                            "mb-4 text-4xl font-bold tracking-tight sm:text-5xl",
                            "text-slate-50"
                        )}
                    >
                        Mes{" "}
                        <span className={cn("text-cyan-400")}>
                            réalisations
                        </span>
                    </h2>
                    <p
                        className={cn(
                            "mx-auto max-w-2xl text-lg font-light",
                            "text-slate-400"
                        )}
                    >
                        Une sélection rigoureuse de projets prêts pour la
                        production, couvrant le web, le mobile et le DevOps.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className={cn(
                        "mb-12 hidden flex-wrap items-center justify-center gap-2"
                    )}
                >
                    <div
                        className={cn(
                            "mr-2 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs tracking-wider uppercase",
                            "border-slate-800 bg-slate-900/40 text-slate-400"
                        )}
                    >
                        <Filter size={12} />
                        Filtrer
                    </div>
                    {categories.map((cat) => {
                        const active = activeCategory === cat
                        return (
                            <motion.button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className={cn(
                                    "rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur-sm transition-all focus:ring-2 focus:outline-none",
                                    "focus:ring-cyan-500/30",
                                    active
                                        ? "border-[rgba(34,211,238,0.45)] bg-[rgba(34,211,238,0.08)] text-[#22d3ee]"
                                        : "border-[rgba(30,41,59,0.6)] bg-[rgba(15,23,42,0.55)] text-[#cbd5e1]"
                                )}
                                style={{
                                    boxShadow: active
                                        ? "0 8px 24px -8px rgba(34,211,238,0.22)"
                                        : "none",
                                }}
                            >
                                {cat}
                            </motion.button>
                        )
                    })}
                </motion.div>

                <AnimatePresence mode="wait">
                    {filtered.length > 0 ? (
                        <motion.div
                            key={activeCategory}
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, scale: 0.98 }}
                            className={cn(
                                "grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-3"
                            )}
                        >
                            {filtered.map((project, index) => (
                                <ProjectCard key={index} project={project} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4 }}
                            className={cn(
                                "flex min-h-90 w-full flex-col items-center justify-center rounded-2xl border border-dashed p-10 text-center backdrop-blur-xl",
                                "border-slate-700/60 bg-slate-900/30"
                            )}
                        >
                            <div
                                className={cn(
                                    "mb-6 rounded-full border p-4 shadow-inner",
                                    "border-slate-700/60 bg-slate-800/70"
                                )}
                            >
                                <FolderGit2 className="h-10 w-10 text-slate-400" />
                            </div>
                            <h3
                                className={cn(
                                    "text-2xl font-semibold tracking-tight",
                                    "text-slate-100"
                                )}
                            >
                                Aucun projet ne correspond à ce filtre
                            </h3>
                            <p
                                className={cn(
                                    "mt-3 max-w-md text-sm leading-relaxed",
                                    "text-slate-400"
                                )}
                            >
                                Aucun projet ne correspond actuellement à ce
                                critère. Veuillez sélectionner une autre
                                catégorie ou repasser prochainement pour voir
                                les derniers projets publiés.
                            </p>
                            <button
                                onClick={() => setActiveCategory("All")}
                                className={cn(
                                    "mt-6 inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors focus:ring-2 focus:outline-none",
                                    "border-slate-700/60 bg-slate-800/70 text-slate-200 hover:bg-slate-700/70 focus:ring-cyan-500/30"
                                )}
                            >
                                <RefreshCcw size={16} />
                                Réinitialiser les filtres
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
