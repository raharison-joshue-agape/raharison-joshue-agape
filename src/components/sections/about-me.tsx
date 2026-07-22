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
import { personalInfo } from "@/data/personal-info"
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
            className="relative overflow-hidden py-28"
        >
            <GridBackground className="opacity-15" />

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-[10%] left-[5%] h-130 w-130 rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute right-[5%] bottom-[10%] h-130 w-130 rounded-full bg-emerald-500/10 blur-[120px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.07)_1px,transparent_0)] bg-size-[32px_32px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-20 text-center"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 backdrop-blur-sm">
                        <Terminal size={14} className="text-cyan-400" />
                        <span className="font-mono text-xs font-semibold tracking-wider text-slate-400 uppercase">
                            System.Profile
                        </span>
                    </div>
                    <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
                        Qui suis-<span className="text-cyan-400">je ?</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg font-light text-slate-400">
                        Professionnel Full Stack et DevOps, je bâtis des
                        architectures modernes.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
                    <motion.div
                        variants={slideInLeft}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <div className="mb-12 space-y-6">
                            {personalInfo.bio.split("\n\n").map((para, i) => (
                                <p
                                    key={i}
                                    className="text-[15px] leading-relaxed font-normal text-slate-300"
                                >
                                    {para}
                                </p>
                            ))}
                        </div>

                        <div>
                            <p className="mb-6 flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                Domaines d'expertise
                            </p>
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                className="grid grid-cols-2 gap-4"
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
                                            className="group relative cursor-default overflow-hidden rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/40"
                                        >
                                            <div
                                                className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,${color}15_0%,transparent_70%)]`}
                                            />

                                            <div className="relative">
                                                <div
                                                    className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-300 bg-[${color}10] border-[${color}30] shadow-[0_0_15px_-3px_${color}20]`}
                                                >
                                                    <Icon
                                                        size={16}
                                                        style={{ color }}
                                                        strokeWidth={2}
                                                    />
                                                </div>
                                                <div className="mb-1 text-sm font-semibold text-slate-100 transition-colors group-hover:text-white">
                                                    {label}
                                                </div>
                                                <div className="font-mono text-[11px] tracking-wide text-slate-500">
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
                        <div className="relative overflow-hidden rounded-xl border border-slate-800/60 bg-gray-900/40 shadow-2xl shadow-black/40">
                            <div className="flex items-center justify-between border-b border-slate-800/60 bg-gray-900 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                                    <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="h-3 w-3 rounded-full bg-[#28ca41]" />
                                </div>
                                <span className="font-mono text-xs text-slate-500">
                                    profile.py
                                </span>
                                <div className="w-14" />
                            </div>

                            <div className="overflow-x-auto p-5">
                                <div className="min-w-75 space-y-1 font-mono text-[13px] leading-relaxed">
                                    <div className="text-slate-500 italic">
                                        # RAHARISON Joshué Agapé — Ingénieur
                                        Full Stack & DevOps
                                    </div>

                                    <div className="mt-4">
                                        <span className="text-cyan-400">
                                            class{" "}
                                        </span>
                                        <span className="text-sky-300">
                                            Engineer
                                        </span>
                                        <span className="text-slate-400">
                                            :
                                        </span>
                                    </div>

                                    <div className="pl-4">
                                        <span className="text-cyan-400">
                                            def{" "}
                                        </span>
                                        <span className="text-sky-300">
                                            __init__
                                        </span>
                                        <span className="text-slate-400">
                                            (
                                        </span>
                                        <span className="text-orange-400/80">
                                            self
                                        </span>
                                        <span className="text-slate-400">
                                            ):
                                        </span>
                                    </div>

                                    <div className="pl-8">
                                        <span className="text-orange-400/80">
                                            self
                                        </span>
                                        <span className="text-slate-400">
                                            .
                                        </span>
                                        <span className="text-slate-200">
                                            name
                                        </span>
                                        <span className="text-slate-400">
                                            {" "}
                                            ={" "}
                                        </span>
                                        <span className="text-emerald-400">
                                            "{personalInfo.name}"
                                        </span>
                                    </div>

                                    <div className="pl-8">
                                        <span className="text-orange-400/80">
                                            self
                                        </span>
                                        <span className="text-slate-400">
                                            .
                                        </span>
                                        <span className="text-slate-200">
                                            birth_date
                                        </span>
                                        <span className="text-slate-400">
                                            {" "}
                                            ={" "}
                                        </span>
                                        <span className="text-emerald-400">
                                            "{personalInfo.birth}"
                                        </span>
                                    </div>

                                    <div className="pl-8">
                                        <span className="text-orange-400/80">
                                            self
                                        </span>
                                        <span className="text-slate-400">
                                            .
                                        </span>
                                        <span className="text-slate-200">
                                            languages
                                        </span>
                                        <span className="text-slate-400">
                                            {" "}
                                            = [
                                        </span>
                                        <span className="text-emerald-400">
                                            "Malagasy"
                                        </span>
                                        <span className="text-slate-400">
                                            ,{" "}
                                        </span>
                                        <span className="text-emerald-400">
                                            "Français"
                                        </span>
                                        <span className="text-slate-400">
                                            ,{" "}
                                        </span>
                                        <span className="text-emerald-400">
                                            "Anglais"
                                        </span>
                                        <span className="text-slate-400">
                                            ]
                                        </span>
                                    </div>

                                    <div className="pl-8">
                                        <span className="text-orange-400/80">
                                            self
                                        </span>
                                        <span className="text-slate-400">
                                            .
                                        </span>
                                        <span className="text-slate-200">
                                            status
                                        </span>
                                        <span className="text-slate-400">
                                            {" "}
                                            ={" "}
                                        </span>
                                        <span className="text-emerald-400">
                                            "À l'écoute d'opportunités"
                                        </span>
                                    </div>

                                    <div className="mt-4 pl-4">
                                        <span className="text-cyan-400">
                                            def{" "}
                                        </span>
                                        <span className="text-sky-300">
                                            get_education
                                        </span>
                                        <span className="text-slate-400">
                                            (
                                        </span>
                                        <span className="text-orange-400/80">
                                            self
                                        </span>
                                        <span className="text-slate-400">
                                            ):
                                        </span>
                                    </div>

                                    <div className="pl-8">
                                        <span className="text-cyan-400">
                                            return{" "}
                                        </span>
                                        <span className="text-slate-400">
                                            [
                                        </span>
                                    </div>

                                    <div className="pl-12">
                                        <span className="text-slate-400">
                                            {"{"}
                                        </span>
                                    </div>
                                    <div className="pl-16">
                                        <span className="text-sky-300">
                                            "degree"
                                        </span>
                                        <span className="text-slate-400">
                                            :{" "}
                                        </span>
                                        <span className="text-emerald-400">
                                            "Master Professionnelle (M2)"
                                        </span>
                                        <span className="text-slate-400">
                                            ,
                                        </span>
                                    </div>
                                    <div className="pl-16">
                                        <span className="text-sky-300">
                                            "field"
                                        </span>
                                        <span className="text-slate-400">
                                            :{" "}
                                        </span>
                                        <span className="text-emerald-400">
                                            "Génie Logiciel & Bases de Données"
                                        </span>
                                        <span className="text-slate-400">
                                            ,
                                        </span>
                                    </div>
                                    <div className="pl-16">
                                        <span className="text-sky-300">
                                            "institution"
                                        </span>
                                        <span className="text-slate-400">
                                            :{" "}
                                        </span>
                                        <span className="text-emerald-400">
                                            "Université de Fianarantsoa"
                                        </span>
                                    </div>
                                    <div className="pl-12">
                                        <span className="text-slate-400">
                                            {"}"}
                                        </span>
                                        <span className="text-slate-400">
                                            ,
                                        </span>
                                    </div>

                                    <div className="pl-12">
                                        <span className="text-slate-400">
                                            {"{"}
                                        </span>
                                    </div>
                                    <div className="pl-16">
                                        <span className="text-sky-300">
                                            "degree"
                                        </span>
                                        <span className="text-slate-400">
                                            :{" "}
                                        </span>
                                        <span className="text-emerald-400">
                                            "Licence Professionnelle"
                                        </span>
                                        <span className="text-slate-400">
                                            ,
                                        </span>
                                    </div>
                                    <div className="pl-16">
                                        <span className="text-sky-300">
                                            "field"
                                        </span>
                                        <span className="text-slate-400">
                                            :{" "}
                                        </span>
                                        <span className="text-emerald-400">
                                            "Génie Logiciel & Bases de Données"
                                        </span>
                                        <span className="text-slate-400">
                                            ,
                                        </span>
                                    </div>
                                    <div className="pl-16">
                                        <span className="text-sky-300">
                                            "institution"
                                        </span>
                                        <span className="text-slate-400">
                                            :{" "}
                                        </span>
                                        <span className="text-emerald-400">
                                            "Université de Fianarantsoa"
                                        </span>
                                    </div>
                                    <div className="pl-12">
                                        <span className="text-slate-400">
                                            {"}"}
                                        </span>
                                        <span className="text-slate-400">
                                            ,
                                        </span>
                                    </div>

                                    <div className="pl-12">
                                        <span className="text-slate-400">
                                            {"{"}
                                        </span>
                                    </div>
                                    <div className="pl-16">
                                        <span className="text-sky-300">
                                            "degree"
                                        </span>
                                        <span className="text-slate-400">
                                            :{" "}
                                        </span>
                                        <span className="text-emerald-400">
                                            "Baccalauréat Scientifique"
                                        </span>
                                        <span className="text-slate-400">
                                            ,
                                        </span>
                                    </div>
                                    <div className="pl-16">
                                        <span className="text-sky-300">
                                            "field"
                                        </span>
                                        <span className="text-slate-400">
                                            :{" "}
                                        </span>
                                        <span className="text-emerald-400">
                                            "Série C"
                                        </span>
                                        <span className="text-slate-400">
                                            ,
                                        </span>
                                    </div>
                                    <div className="pl-16">
                                        <span className="text-sky-300">
                                            "institution"
                                        </span>
                                        <span className="text-slate-400">
                                            :{" "}
                                        </span>
                                        <span className="text-emerald-400">
                                            "Saint Joseph de Cluny Tambohobe,
                                            Fianarantsoa"
                                        </span>
                                    </div>
                                    <div className="pl-12">
                                        <span className="text-slate-400">
                                            {"}"}
                                        </span>
                                    </div>

                                    <div className="pl-8">
                                        <span className="text-slate-400">
                                            ]
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Tags */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            {tags.map((chip) => (
                                <motion.span
                                    key={chip.text}
                                    whileHover={{ scale: 1.05, y: -1 }}
                                    className="inline-flex cursor-default items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1.5 font-mono text-xs font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:text-cyan-400"
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
