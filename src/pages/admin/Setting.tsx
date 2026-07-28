import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import {
    User,
    Bell,
    Shield,
    Palette,
    Link,
    Contact,
    Sparkles,
    BarChart2,
    Briefcase,
} from "lucide-react"
import ProfileSetting, {
    type PayloadProfileType,
} from "@/components/admin/settings/profile-setting"
import SecuritySetting from "@/components/admin/settings/security-setting"
import NotificationSetting from "@/components/admin/settings/notification-setting"
import AppearanceSetting from "@/components/admin/settings/appearance-setting"
import { useSearchParams } from "react-router-dom"
import LinkSetting from "@/components/admin/settings/link-setting"
import ContactSetting from "@/components/admin/settings/contact-setting"
import BioTaglineSetting from "@/components/admin/settings/bio-tagline-setting"
import StatSetting from "@/components/admin/settings/stat-setting"
import BadgeTechSetting from "@/components/admin/settings/badge-tech-setting"
import ExperienceSetting from "@/components/admin/settings/experience-setting"

const sidebarItem = [
    { label: "Profil & Identité", tabValue: "profile", icon: User },
    { label: "Contacts", tabValue: "contacts", icon: Contact },
    { label: "Liens Réseaux", tabValue: "links", icon: Link },
    { label: "Bio & Accroche", tabValue: "bio-and-tagline", icon: Sparkles },
    { label: "Statistiques", tabValue: "stats", icon: BarChart2 },
    { label: "Badges Flottants", tabValue: "tech-badge", icon: Sparkles },
    { label: "Mes Expériences", tabValue: "experiences", icon: Briefcase },
    { label: "Sécurité & Mot de passe", tabValue: "security", icon: Shield },
    { label: "Notifications", tabValue: "notifications", icon: Bell },
    { label: "Apparence & Langue", tabValue: "appearance", icon: Palette },
]

export default function AdminSetting() {
    const [searchParams, setSearchParams] = useSearchParams()

    const currentTab = searchParams.get("tab") || "profile"

    const [activeTab, setActiveTab] = useState(currentTab)
    const [loadingProfile, setLoadingProfile] = useState(false)
    const [loadingSecurity, setLoadingSecurity] = useState(false)

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
            className={cn("z-0 mx-auto max-w-375 space-y-6 p-6")}
        >
            <div
                className={cn(
                    "flex flex-col gap-2 border-b border-border pb-4"
                )}
            >
                <h1
                    className={cn(
                        "text-2xl font-bold tracking-tight",
                        "text-slate-100"
                    )}
                >
                    Paramètres du Compte
                </h1>
                <p className={cn("text-sm", "text-slate-400")}>
                    Gérez vos informations personnelles, vos préférences de
                    notification et la sécurité de votre espace administrateur.
                </p>
            </div>

            <div
                className={cn(
                    "flex max-h-[calc(100vh-16.3rem)] flex-col gap-8 overflow-y-auto lg:flex-row"
                )}
            >
                <aside className={cn("sticky top-0 z-50 shrink-0 lg:w-64")}>
                    <nav className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:pb-0">
                        {sidebarItem.map((item) => {
                            const Icon = item.icon
                            return (
                                <button
                                    onClick={() =>
                                        handleTabChange(item.tabValue)
                                    }
                                    className={cn(
                                        "flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                                        activeTab === item.tabValue
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:bg-muted hover:text-slate-100"
                                    )}
                                >
                                    <Icon size={18} />
                                    {item.label}
                                </button>
                            )
                        })}
                    </nav>
                </aside>

                <main className={cn("flex-1 space-y-6")}>
                    {activeTab === "profile" && (
                        <ProfileSetting
                            loading={loadingProfile}
                            onSubmit={(payloadProfile: PayloadProfileType) => {
                                setLoadingProfile(true)
                                console.log(payloadProfile)
                            }}
                        />
                    )}

                    {activeTab === "contacts" && (
                        <ContactSetting loading onSubmit={() => {}} />
                    )}

                    {activeTab === "links" && (
                        <LinkSetting loading onSubmit={() => {}} />
                    )}

                    {activeTab === "bio-and-tagline" && (
                        <BioTaglineSetting loading onSubmit={() => {}} />
                    )}

                    {activeTab === "stats" && (
                        <StatSetting loading onSubmit={() => {}} />
                    )}

                    {activeTab === "tech-badge" && (
                        <BadgeTechSetting loading onSubmit={() => {}} />
                    )}

                    {activeTab === "experiences" && (
                        <ExperienceSetting loading onSubmit={() => {}} />
                    )}

                    {activeTab === "security" && (
                        <SecuritySetting
                            loading={loadingSecurity}
                            onSubmit={() => {
                                setLoadingSecurity(true)
                            }}
                        />
                    )}

                    {/* Onglet 3 : Notifications */}
                    {activeTab === "notifications" && <NotificationSetting />}

                    {/* Onglet 5 : Apparence */}
                    {activeTab === "appearance" && <AppearanceSetting />}
                </main>
            </div>
        </motion.div>
    )
}
