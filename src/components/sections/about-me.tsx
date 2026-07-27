import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
    staggerContainer,
    staggerItem,
    slideInLeft,
    slideInRight,
} from "@/lib/animations"
import {
    Code2,
    Server,
    Smartphone,
    Wrench,
    ShieldCheck,
    Workflow,
    Terminal,
    Globe,
    CheckCircle2,
} from "lucide-react"
import { personalInfo } from "@/data/Personal-info"
import GridBackground from "@/components/grid-background"

const focuses = [
    {
        icon: Code2,
        label: "Développement Web",
        desc: "UI Moderne · Responsive",
        color: "#22d3ee",
    }, // Cyan
    {
        icon: Server,
        label: "Développement Backend",
        desc: "APIs REST · GraphQL",
        color: "#34d399",
    }, // Emerald
    {
        icon: Smartphone,
        label: "Développement Mobile",
        desc: "Flutter · React Native",
        color: "#38bdf8",
    }, // Sky
    {
        icon: Wrench,
        label: "Intégration Web & IaC",
        desc: "Terraform · Ansible",
        color: "#94a3b8",
    }, // Slate
    {
        icon: ShieldCheck,
        label: "DevOps / CI-CD",
        desc: "Jenkins · Docker · Git",
        color: "#2dd4bf",
    }, // Teal
    {
        icon: Workflow,
        label: "Méthodologies",
        desc: "2TUP · Agile Scrum",
        color: "#10b981",
    }, // Green
]

const tags = [
    { icon: Globe, text: "Ouvert au télétravail" },
    { icon: CheckCircle2, text: "Disponible pour embauche" },
]

export default function AboutMe() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <section
            id="about"
            ref={ref}
            className={cn(
                "relative overflow-hidden py-28 backdrop-blur-lg",
                "bg-gray-950/5"
            )}
        >
            <GridBackground className={cn("opacity-15")} />

            <div
                className={cn(
                    "relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                )}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn("mb-20 text-center")}
                >
                    <div
                        className={cn(
                            "mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 backdrop-blur-sm",
                            "border-slate-800 bg-slate-900/50"
                        )}
                    >
                        <Terminal size={14} className={cn("text-cyan-400")} />
                        <span
                            className={cn(
                                "font-mono text-xs font-semibold tracking-wider uppercase",
                                "text-slate-400"
                            )}
                        >
                            System.Profile
                        </span>
                    </div>
                    <h2
                        className={cn(
                            "mb-4 text-4xl font-bold tracking-tight sm:text-5xl",
                            "text-slate-50"
                        )}
                    >
                        Qui suis-
                        <span className={cn("text-cyan-400")}>je ?</span>
                    </h2>
                    <p
                        className={cn(
                            "mx-auto max-w-2xl text-lg font-light",
                            "text-slate-400"
                        )}
                    >
                        Professionnel Full Stack et DevOps, je bâtis des
                        architectures modernes.
                    </p>
                </motion.div>

                <div
                    className={cn(
                        "grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16"
                    )}
                >
                    <motion.div
                        variants={slideInLeft}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <div className={cn("mb-12 space-y-6")}>
                            {personalInfo.bio.split("\n\n").map((para, i) => (
                                <p
                                    key={i}
                                    className={cn(
                                        "text-[15px] leading-relaxed font-normal",
                                        "text-slate-300"
                                    )}
                                >
                                    {para}
                                </p>
                            ))}
                        </div>

                        <div>
                            <p
                                className={cn(
                                    "mb-6 flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase",
                                    "text-slate-500"
                                )}
                            >
                                <span
                                    className={cn(
                                        "h-2 w-2 rounded-full",
                                        "bg-emerald-500"
                                    )}
                                />
                                Domaines d'expertise
                            </p>
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                className={cn("grid grid-cols-2 gap-4")}
                            >
                                {focuses.map(
                                    ({ icon: Icon, label, desc, color }) => (
                                        <motion.div
                                            key={label}
                                            variants={staggerItem}
                                            whileHover={{
                                                y: -4,
                                                transition: { duration: 0.2 },
                                            }}
                                            className={cn(
                                                "group relative cursor-default overflow-hidden rounded-xl border p-4 backdrop-blur-sm transition-all duration-300",
                                                "border-slate-800/60 bg-slate-900/40 hover:bg-slate-800/40"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                                                    `bg-[radial-gradient(circle_at_50%_0%,${color}15_0%,transparent_70%)]`
                                                )}
                                            />

                                            <div className={cn("relative")}>
                                                <div
                                                    className={cn(
                                                        "mb-3 flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-300",
                                                        `bg-[${color}10] border-[${color}30] shadow-[0_0_15px_-3px_${color}20]`
                                                    )}
                                                >
                                                    <Icon
                                                        size={16}
                                                        style={{ color }}
                                                        strokeWidth={2}
                                                    />
                                                </div>
                                                <div
                                                    className={cn(
                                                        "mb-1 text-sm font-semibold transition-colors",
                                                        "text-slate-100 group-hover:text-white"
                                                    )}
                                                >
                                                    {label}
                                                </div>
                                                <div
                                                    className={cn(
                                                        "font-mono text-[11px] tracking-wide",
                                                        "text-slate-500"
                                                    )}
                                                >
                                                    {desc}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                )}
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={slideInRight}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <div
                            className={cn(
                                "relative overflow-hidden rounded-xl border shadow-2xl shadow-black/40",
                                "border-slate-800/60 bg-gray-900/40"
                            )}
                        >
                            <div
                                className={cn(
                                    "flex items-center justify-between border-b px-4 py-3",
                                    "border-slate-800/60 bg-gray-900"
                                )}
                            >
                                <div className={cn("flex items-center gap-2")}>
                                    <div
                                        className={cn(
                                            "h-3 w-3 rounded-full",
                                            "bg-[#ff5f57]"
                                        )}
                                    />
                                    <div
                                        className={cn(
                                            "h-3 w-3 rounded-full",
                                            "bg-[#ffbd2e]"
                                        )}
                                    />
                                    <div
                                        className={cn(
                                            "h-3 w-3 rounded-full",
                                            "bg-[#28ca41]"
                                        )}
                                    />
                                </div>
                                <span
                                    className={cn(
                                        "font-mono text-xs",
                                        "text-slate-500"
                                    )}
                                >
                                    profile.py
                                </span>
                                <div className={cn("w-14")} />
                            </div>

                            <div className={cn("overflow-x-auto p-5")}>
                                <div
                                    className={cn(
                                        "min-w-75 space-y-1 font-mono text-[13px] leading-relaxed"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "italic",
                                            "text-slate-500"
                                        )}
                                    >
                                        # RAHARISON Joshué Agapé — Ingénieur
                                        Full Stack & DevOps
                                    </div>

                                    <div className={cn("mt-4")}>
                                        <span className={cn("text-cyan-400")}>
                                            class{" "}
                                        </span>
                                        <span className={cn("text-sky-300")}>
                                            Engineer
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            :
                                        </span>
                                    </div>

                                    <div className={cn("pl-4")}>
                                        <span className={cn("text-cyan-400")}>
                                            def{" "}
                                        </span>
                                        <span className={cn("text-sky-300")}>
                                            __init__
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            (
                                        </span>
                                        <span
                                            className={cn("text-orange-400/80")}
                                        >
                                            self
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            ):
                                        </span>
                                    </div>

                                    <div className={cn("pl-8")}>
                                        <span
                                            className={cn("text-orange-400/80")}
                                        >
                                            self
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            .
                                        </span>
                                        <span className={cn("text-slate-200")}>
                                            name
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            {" "}
                                            ={" "}
                                        </span>
                                        <span
                                            className={cn("text-emerald-400")}
                                        >
                                            "{personalInfo.name}"
                                        </span>
                                    </div>

                                    <div className={cn("pl-8")}>
                                        <span
                                            className={cn("text-orange-400/80")}
                                        >
                                            self
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            .
                                        </span>
                                        <span className={cn("text-slate-200")}>
                                            birth_date
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            {" "}
                                            ={" "}
                                        </span>
                                        <span
                                            className={cn("text-emerald-400")}
                                        >
                                            "{personalInfo.birth}"
                                        </span>
                                    </div>

                                    <div className={cn("pl-8")}>
                                        <span
                                            className={cn("text-orange-400/80")}
                                        >
                                            self
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            .
                                        </span>
                                        <span className={cn("text-slate-200")}>
                                            languages
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            {" "}
                                            = [
                                        </span>
                                        <span
                                            className={cn("text-emerald-400")}
                                        >
                                            "Malagasy"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            ,{" "}
                                        </span>
                                        <span
                                            className={cn("text-emerald-400")}
                                        >
                                            "Français"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            ,{" "}
                                        </span>
                                        <span
                                            className={cn("text-emerald-400")}
                                        >
                                            "Anglais"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            ]
                                        </span>
                                    </div>

                                    <div className={cn("pl-8")}>
                                        <span
                                            className={cn("text-orange-400/80")}
                                        >
                                            self
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            .
                                        </span>
                                        <span className={cn("text-slate-200")}>
                                            status
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            {" "}
                                            ={" "}
                                        </span>
                                        <span
                                            className={cn("text-emerald-400")}
                                        >
                                            "À l'écoute d'opportunités"
                                        </span>
                                    </div>

                                    <div className={cn("mt-4 pl-4")}>
                                        <span className={cn("text-cyan-400")}>
                                            def{" "}
                                        </span>
                                        <span className={cn("text-sky-300")}>
                                            get_education
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            (
                                        </span>
                                        <span
                                            className={cn("text-orange-400/80")}
                                        >
                                            self
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            ):
                                        </span>
                                    </div>

                                    <div className={cn("pl-8")}>
                                        <span className={cn("text-cyan-400")}>
                                            return{" "}
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            [
                                        </span>
                                    </div>

                                    {/*<div className={cn("pl-12")}>
                                        <span className={cn("text-slate-400")}>
                                            {"{"}
                                        </span>
                                    </div>
                                    <div className={cn("pl-16")}>
                                        <span className={cn("text-sky-300")}>
                                            "degree"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            :{" "}
                                        </span>
                                        <span
                                            className={cn("text-emerald-400")}
                                        >
                                            "Master Professionnelle (M2)"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            ,
                                        </span>
                                    </div>
                                    <div className={cn("pl-16")}>
                                        <span className={cn("text-sky-300")}>
                                            "field"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            :{" "}
                                        </span>
                                        <span
                                            className={cn("text-emerald-400")}
                                        >
                                            "Génie Logiciel & Bases de Données"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            ,
                                        </span>
                                    </div>
                                    <div className={cn("pl-16")}>
                                        <span className={cn("text-sky-300")}>
                                            "institution"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            :{" "}
                                        </span>
                                        <span
                                            className={cn("text-emerald-400")}
                                        >
                                            "Université de Fianarantsoa"
                                        </span>
                                    </div>
                                    <div className={cn("pl-12")}>
                                        <span className={cn("text-slate-400")}>
                                            {"}"}
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            ,
                                        </span>
                                    </div>*/}

                                    <div className={cn("pl-12")}>
                                        <span className={cn("text-slate-400")}>
                                            {"{"}
                                        </span>
                                    </div>
                                    <div className={cn("pl-16")}>
                                        <span className={cn("text-sky-300")}>
                                            "degree"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            :{" "}
                                        </span>
                                        <span
                                            className={cn("text-emerald-400")}
                                        >
                                            "Licence Professionnelle"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            ,
                                        </span>
                                    </div>
                                    <div className={cn("pl-16")}>
                                        <span className={cn("text-sky-300")}>
                                            "field"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            :{" "}
                                        </span>
                                        <span
                                            className={cn("text-emerald-400")}
                                        >
                                            "Génie Logiciel & Bases de Données"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            ,
                                        </span>
                                    </div>
                                    <div className={cn("pl-16")}>
                                        <span className={cn("text-sky-300")}>
                                            "institution"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            :{" "}
                                        </span>
                                        <span
                                            className={cn("text-emerald-400")}
                                        >
                                            "Université de Fianarantsoa"
                                        </span>
                                    </div>
                                    <div className={cn("pl-12")}>
                                        <span className={cn("text-slate-400")}>
                                            {"}"}
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            ,
                                        </span>
                                    </div>

                                    <div className={cn("pl-12")}>
                                        <span className={cn("text-slate-400")}>
                                            {"{"}
                                        </span>
                                    </div>
                                    <div className={cn("pl-16")}>
                                        <span className={cn("text-sky-300")}>
                                            "degree"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            :{" "}
                                        </span>
                                        <span
                                            className={cn("text-emerald-400")}
                                        >
                                            "Baccalauréat Scientifique"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            ,
                                        </span>
                                    </div>
                                    <div className={cn("pl-16")}>
                                        <span className={cn("text-sky-300")}>
                                            "field"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            :{" "}
                                        </span>
                                        <span
                                            className={cn("text-emerald-400")}
                                        >
                                            "Série C"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            ,
                                        </span>
                                    </div>
                                    <div className={cn("pl-16")}>
                                        <span className={cn("text-sky-300")}>
                                            "institution"
                                        </span>
                                        <span className={cn("text-slate-400")}>
                                            :{" "}
                                        </span>
                                        <span
                                            className={cn("text-emerald-400")}
                                        >
                                            "Saint Joseph de Cluny Tambohobe,
                                            Fianarantsoa"
                                        </span>
                                    </div>
                                    <div className={cn("pl-12")}>
                                        <span className={cn("text-slate-400")}>
                                            {"}"}
                                        </span>
                                    </div>

                                    <div className={cn("pl-8")}>
                                        <span className={cn("text-slate-400")}>
                                            ]
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Tags */}
                        <div className={cn("mt-6 flex flex-wrap gap-3")}>
                            {tags.map((chip) => (
                                <motion.span
                                    key={chip.text}
                                    whileHover={{ scale: 1.05, y: -1 }}
                                    className={cn(
                                        "inline-flex cursor-default items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs font-medium backdrop-blur-sm transition-all duration-300",
                                        "border-slate-800 bg-slate-900/50 text-slate-300 hover:border-cyan-500/30 hover:text-cyan-400"
                                    )}
                                >
                                    <chip.icon size={12} strokeWidth={2.5} />
                                    {chip.text}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
