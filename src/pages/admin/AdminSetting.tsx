import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { User, Bell, Shield, Palette } from "lucide-react"
import ProfileSetting, {
    type PayloadProfileType,
} from "@/components/admin/profile-setting"
import SecuritySetting from "@/components/admin/security-setting"
import NotificationSetting from "@/components/admin/notification-setting"
import AppearanceSetting from "@/components/admin/appearance-setting"
import { useSearchParams } from "react-router-dom"

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
        <div className={cn("mx-auto max-w-6xl space-y-6 p-6")}>
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

            <div className={cn("flex flex-col gap-8 lg:flex-row")}>
                <aside className={cn("sticky top-100 z-50 shrink-0 lg:w-64")}>
                    <nav className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:pb-0">
                        <button
                            onClick={() => handleTabChange("profile")}
                            className={cn(
                                "flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                                activeTab === "profile"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-slate-100"
                            )}
                        >
                            <User className={cn("h-4 w-4")} />
                            Profil & Identité
                        </button>

                        <button
                            onClick={() => handleTabChange("security")}
                            className={cn(
                                "flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                                activeTab === "security"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-slate-100"
                            )}
                        >
                            <Shield className={cn("h-4 w-4")} />
                            Sécurité & Mot de passe
                        </button>

                        <button
                            onClick={() => handleTabChange("notifications")}
                            className={cn(
                                "flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                                activeTab === "notifications"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-slate-100"
                            )}
                        >
                            <Bell className={cn("h-4 w-4")} />
                            Notifications
                        </button>

                        <button
                            onClick={() => handleTabChange("appearance")}
                            className={cn(
                                "flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                                activeTab === "appearance"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-slate-100"
                            )}
                        >
                            <Palette className={cn("h-4 w-4")} />
                            Apparence & Langue
                        </button>
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

                    {/* Onglet 2 : Sécurité */}
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
        </div>
    )
}
