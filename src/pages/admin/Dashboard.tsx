import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import StatItem from "@/components/admin/dashboard/stat-item"
import TrafficOverview from "@/components/admin/dashboard/traffic-overview"
import RecentActivities from "@/components/admin/dashboard/recent-activities"
import {
    projects,
    quickMessagesData,
    recentActivities,
    stats,
} from "@/data/admin.data"
import CurrentProjects from "@/components/admin/dashboard/current-projects"
import QuickMessages from "@/components/admin/dashboard/quick-messages"

export default function AdminDashboard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn("space-y-6")}
        >
            {/* En-tête de bienvenue */}
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

            {/* Grille des Cartes de Statistiques */}
            <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4")}>
                {stats.map((stat, index) => (
                    <StatItem
                        key={index}
                        stat={stat}
                        icon={stat.icon}
                        index={index}
                    />
                ))}
            </div>

            {/* Grille principale (Graphique & Activités) */}
            <div className="grid gap-6 lg:grid-cols-7">
                <TrafficOverview />
                <RecentActivities activities={recentActivities} />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <CurrentProjects projects={projects} />
                <QuickMessages messages={quickMessagesData} />
            </div>
        </motion.div>
    )
}
