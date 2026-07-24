import { motion } from "framer-motion"
import {
    CalendarRange,
    ChartSpline,
    CodeXml,
    Server,
    type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface WorkStep {
    title: string
    description: string
    icon: LucideIcon
}

export default function WorkProcess() {
    const workStepData: WorkStep[] = [
        {
            title: "Cadrage & Analyse des Besoins",
            description:
                "Compréhension fine des objectifs, utilisateurs et données.",
            icon: CalendarRange,
        },
        {
            title: "Analyse & Architecture",
            description:
                "Modélisation du système et conception d’architectures scalables.",
            icon: ChartSpline,
        },
        {
            title: "Développement & Traitement",
            description:
                "Construction des applications, des API et pipelines de données.",
            icon: CodeXml,
        },
        {
            title: "Tests & Déploiement",
            description:
                "Validation, optimisation et mise en production sécurisée.",
            icon: Server,
        },
    ]

    return (
        <section id="work-process" className={cn("relative py-28")}>
            <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8")}>
                <div
                    className={cn(
                        "grid items-center gap-16 xl:grid-cols-2 xl:gap-32"
                    )}
                >
                    {/* LEFT */}
                    <div className={cn("space-y-6")}>
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={cn(
                                "text-center lg:text-start",
                                "text-emerald-400"
                            )}
                        >
                            Méthodologie
                        </motion.h2>

                        <motion.h3
                            initial={{ opacity: 0, x: -25 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={cn(
                                "text-center text-3xl font-bold md:text-4xl lg:text-start",
                                "text-gray-300"
                            )}
                        >
                            Comment je bâtis{" "}
                            <span className={cn("text-emerald-400")}>
                                mes systèmes
                            </span>
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={cn(
                                "text-center text-sm leading-relaxed md:text-base lg:text-start",
                                "text-gray-400"
                            )}
                        >
                            Suivant une démarche d'ingénierie structurée, je
                            mets l'accent sur la scalabilité, la performance et
                            la maintenabilité. Chaque phase est pensée pour
                            réduire les incertitudes et maximiser la qualité
                            finale du produit.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={cn(
                                "text-center text-sm leading-relaxed md:text-base lg:text-start",
                                "text-gray-400"
                            )}
                        >
                            De l'idéation à la mise en production, je m'assure
                            que chaque système soit fiable, observable et
                            optimisé pour des conditions d'utilisation réelles.
                        </motion.p>
                    </div>

                    {/* RIGHT */}
                    <div className={cn("grid grid-cols-2 gap-x-4 md:gap-x-6")}>
                        {workStepData.map((step, i) => {
                            const Icon = step.icon

                            return (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 25, scale: 0.97 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.08,
                                        ease: "easeOut",
                                    }}
                                    className={cn(
                                        "group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                                        "border-gray-800 bg-gray-900/40",
                                        i % 2 === 1 ? "mt-8" : "mb-8"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition",
                                            "bg-emerald-500/10 group-hover:bg-emerald-500/15"
                                        )}
                                    >
                                        <Icon
                                            size={20}
                                            className={cn(
                                                "transition group-hover:scale-110",
                                                "text-emerald-400"
                                            )}
                                        />
                                    </div>

                                    <div
                                        className={cn(
                                            "mb-2 font-mono text-xs opacity-60",
                                            "text-gray-500"
                                        )}
                                    >
                                        0{i + 1}
                                    </div>

                                    <h3
                                        className={cn(
                                            "mb-2 text-base font-semibold",
                                            "text-gray-300"
                                        )}
                                    >
                                        {step.title}
                                    </h3>

                                    <p
                                        className={cn(
                                            "text-sm leading-relaxed",
                                            "text-gray-400"
                                        )}
                                    >
                                        {step.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
