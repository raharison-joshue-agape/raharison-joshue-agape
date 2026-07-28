import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function AdminProject() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn("space-y-6")}
        >
            <div className={cn("flex flex-col gap-1")}>
                <h1
                    className={cn(
                        "text-2xl font-bold tracking-tight",
                        "text-white"
                    )}
                >
                    Tableau de bord
                </h1>
                <p className={cn("text-sm", "text-slate-400")}>
                    Bienvenue sur votre espace d'administration. Voici un aperçu
                    de vos activités.
                </p>
            </div>
        </motion.div>
    )
}
