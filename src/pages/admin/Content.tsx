import PersonalInfoForm from "@/components/admin/content/personal-info-form"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { User } from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function AdminContent() {
    const [searchParams, setSearchParams] = useSearchParams()

    const currentTab = searchParams.get("tab") || "personal-info"

    const [activeTab, setActiveTab] = useState(currentTab)

    useEffect(() => {
        const initTab = () => {
            const tabFromUrl = searchParams.get("tab")
            if (tabFromUrl && tabFromUrl !== activeTab) {
                setActiveTab(tabFromUrl)
            }
        }
        initTab()
    }, [searchParams, activeTab])

    const handleTabChange = (newTab: string) => {
        setActiveTab(newTab)
        setSearchParams({ tab: newTab })
    }

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
                    Contenu du portfolio
                </h1>
                <p className={cn("text-sm", "text-slate-400")}>
                    Gérez, modifiez et organisez l'ensemble des sections et
                    informations visibles sur votre site.
                </p>
            </div>

            <div className={cn("flex flex-col gap-8 lg:flex-row")}>
                <aside className={cn("sticky top-100 z-50 shrink-0 lg:w-72")}>
                    <nav className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:pb-0">
                        <button
                            onClick={() => handleTabChange("personal-info")}
                            className={cn(
                                "flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                                activeTab === "personal-info"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-slate-100"
                            )}
                        >
                            <User className={cn("h-4 w-4")} />
                            Information personnel
                        </button>
                    </nav>
                </aside>

                <main className={cn("flex-1 space-y-6")}>
                    {activeTab === "personal-info" && <PersonalInfoForm />}
                </main>
            </div>
        </motion.div>
    )
}
