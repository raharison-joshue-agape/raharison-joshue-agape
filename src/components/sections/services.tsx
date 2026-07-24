import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { services } from "@/data/services"
import { CheckCircle2, Terminal } from "lucide-react"
import { staggerContainer, staggerItem } from "@/lib/animations"
import GridBackground from "@/components/grid-background"
import { cn } from "@/lib/utils"

export default function Services() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <section
            id="services"
            ref={ref}
            className={cn("relative py-28 backdrop-blur-lg", "bg-gray-950/30")}
        >
            <GridBackground className={cn("opacity-15")} />

            <div
                className={cn(
                    "relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                )}
            >
                <motion.div
                    ref={ref}
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
                            System.Services
                        </span>
                    </div>
                    <h2
                        className={cn(
                            "mb-4 text-4xl font-bold tracking-tight sm:text-5xl",
                            "text-slate-50"
                        )}
                    >
                        Ce que{" "}
                        <span className={cn("text-cyan-400")}>je fais</span>
                    </h2>
                    <p
                        className={cn(
                            "mx-auto max-w-2xl text-lg font-light",
                            "text-slate-400"
                        )}
                    >
                        Je conçois et développe des applications web et mobiles
                        performantes et responsives, combinant un front-end
                        intuitif et un back-end robuste. Mon travail couvre
                        l'ensemble du cycle de vie du projet, de la conception à
                        la mise en production, afin de garantir une expérience
                        utilisateur optimale.
                    </p>
                </motion.div>

                {/* Services grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className={cn(
                        "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                    )}
                >
                    {services.map((service) => {
                        return (
                            <motion.div
                                key={service.title}
                                variants={staggerItem}
                                whileHover={{ y: -6, scale: 1.02 }}
                                transition={{ duration: 0.25 }}
                                className={cn(
                                    "group relative cursor-default overflow-hidden rounded-2xl border p-6 shadow-sm backdrop-blur-sm",
                                    "border-gray-800 bg-gray-900/40"
                                )}
                            >
                                <div
                                    className={cn(
                                        "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    )}
                                />

                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className={cn(
                                        "mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl",
                                        "bg-cyan-500/10"
                                    )}
                                >
                                    <service.icon
                                        className={cn("text-cyan-400")}
                                    />
                                </motion.div>

                                <h3
                                    className={cn(
                                        "mb-3 text-lg font-bold",
                                        "text-gray-300"
                                    )}
                                >
                                    {service.title}
                                </h3>

                                <p
                                    className={cn(
                                        "mb-5 text-sm leading-relaxed",
                                        "text-gray-400"
                                    )}
                                >
                                    {service.description}
                                </p>

                                <div className={cn("space-y-2.5")}>
                                    {service.features.map((feat) => (
                                        <div
                                            key={feat}
                                            className={cn(
                                                "flex items-start gap-2.5"
                                            )}
                                        >
                                            <CheckCircle2
                                                size={14}
                                                className={cn(
                                                    "mt-0.5 shrink-0",
                                                    "text-emerald-400"
                                                )}
                                            />
                                            <span
                                                className={cn(
                                                    "text-sm",
                                                    "text-gray-400"
                                                )}
                                            >
                                                {feat}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className={cn("mt-16 text-center")}
                >
                    <div
                        className={cn(
                            "inline-flex flex-col items-center gap-6 rounded-2xl border border-border bg-(--bg-card) p-6 sm:flex-row"
                        )}
                    >
                        <div className={cn("text-left")}>
                            <div className={cn("font-bold", "text-gray-300")}>
                                À la recherche d'un DevOps pour votre projet ?
                            </div>
                            <div className={cn("text-sm", "text-gray-400")}>
                                Parlons de vos besoins en infrastructure.
                            </div>
                        </div>
                        <motion.a
                            href="#contact"
                            className={cn(
                                "rounded-md px-5 py-3 font-medium whitespace-nowrap",
                                "bg-cyan-500 hover:bg-cyan-600"
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Démarrer une discussion →
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
