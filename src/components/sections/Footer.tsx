import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Heart, Terminal } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer
            className={cn(
                "relative border-t py-10 backdrop-blur-3xl",
                "border-gray-900 bg-gray-950"
            )}
        >
            <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8")}>
                <div
                    className={cn(
                        "flex flex-col items-center justify-between gap-6 sm:flex-row"
                    )}
                >
                    {/* LEFT */}
                    <motion.a
                        href="#hero"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                            "flex items-center gap-2.5 rounded-xl py-1.5 pr-4 pl-3 transition-colors",
                            "hover:bg-white/3"
                        )}
                    >
                        <div
                            className={cn(
                                "relative flex h-7 w-7 items-center justify-center rounded-lg border",
                                "border-white/8 bg-white/5"
                            )}
                        >
                            <Terminal
                                size={18}
                                className={cn("text-cyan-400")}
                                strokeWidth={2.5}
                            />
                            <div
                                className={cn(
                                    "absolute inset-0 rounded-lg blur-md",
                                    "bg-cyan-400/10"
                                )}
                            />
                        </div>
                        <span
                            className={cn(
                                "font-mono text-[15px] font-medium tracking-tight",
                                "text-zinc-100"
                            )}
                        >
                            rja<span className={cn("text-zinc-500")}>@</span>
                            <span className={cn("text-zinc-300")}>devops</span>
                        </span>
                    </motion.a>

                    {/* CENTER */}
                    <motion.p
                        className={cn(
                            "flex items-center gap-2 text-center text-sm",
                            "text-gray-400"
                        )}
                    >
                        Fait avec
                        <motion.span
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 1.6 }}
                        >
                            <Heart size={15} className={cn("text-red-500")} />
                        </motion.span>
                        par Joshué Agapé · {currentYear}
                    </motion.p>

                    {/* RIGHT */}
                    <div
                        className={cn(
                            "flex items-center gap-2 rounded-full border px-3 py-1",
                            "border-gray-800 bg-gray-900/50"
                        )}
                    >
                        <span className={cn("text-emerald-400")}>●</span>

                        <span
                            className={cn("font-mono text-xs", "text-gray-400")}
                        >
                            Système opérationnel · 99.9% d'uptime
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
