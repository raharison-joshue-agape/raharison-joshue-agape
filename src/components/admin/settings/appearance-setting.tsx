import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function AppearanceSetting() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
                "space-y-6 rounded-lg border border-border p-6 shadow-sm",
                "bg-gray-900/30"
            )}
        >
            <div>
                <h2 className={cn("text-lg font-semibold", "text-slate-100")}>
                    Apparence & Langue
                </h2>
                <p className={cn("text-xs", "text-slate-400")}>
                    Personnalisez l'affichage de votre tableau de bord.
                </p>
            </div>

            <div className={cn("space-y-4")}>
                <div className={cn("space-y-2")}>
                    <label
                        className={cn("text-xs font-medium", "text-slate-100")}
                    >
                        Thème de l'interface
                    </label>
                    <select
                        className={cn(
                            "w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                            "border-input bg-gray-950/80 text-slate-100 focus:ring-emerald-500"
                        )}
                    >
                        <option value="system">Système (Par défaut)</option>
                        <option value="dark">Sombre</option>
                        <option value="light">Clair</option>
                    </select>
                </div>
                <div className={cn("space-y-2")}>
                    <label
                        className={cn("text-xs font-medium", "text-slate-100")}
                    >
                        Langue
                    </label>
                    <select
                        className={cn(
                            "w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                            "border-input bg-gray-950/80 text-slate-100 focus:ring-emerald-500"
                        )}
                    >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                    </select>
                </div>
            </div>
        </motion.div>
    )
}
