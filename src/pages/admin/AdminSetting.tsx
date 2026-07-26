import { cn } from "@/lib/utils"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { User, Bell, Shield, Palette } from "lucide-react"
import ProfileSetting, {
    type PayloadProfileType,
} from "@/components/admin/profile-setting"
import SecuritySetting from "@/components/admin/security-setting"

export default function AdminSetting() {
    const [activeTab, setActiveTab] = useState("profile")
    const [loadingProfile, setLoadingProfile] = useState(false)
    const [loadingSecurity, setLoadingSecurity] = useState(false)

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
                            onClick={() => setActiveTab("profile")}
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
                            onClick={() => setActiveTab("security")}
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
                            onClick={() => setActiveTab("notifications")}
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
                            onClick={() => setActiveTab("appearance")}
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
                    {activeTab === "notifications" && (
                        <div
                            className={cn(
                                "space-y-6 rounded-lg border border-border p-6 shadow-sm",
                                "bg-gray-900/30"
                            )}
                        >
                            <div>
                                <h2
                                    className={cn(
                                        "text-lg font-semibold",
                                        "text-slate-100"
                                    )}
                                >
                                    Préférences de Notification
                                </h2>
                                <p className={cn("text-xs", "text-slate-400")}>
                                    Choisissez comment et quand vous souhaitez
                                    être alerté.
                                </p>
                            </div>

                            <div
                                className={cn(
                                    "space-y-4 divide-y divide-border"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex items-center justify-between pt-4 first:pt-0"
                                    )}
                                >
                                    <div>
                                        <p
                                            className={cn(
                                                "text-sm font-medium",
                                                "text-slate-100"
                                            )}
                                        >
                                            Notifications par email
                                        </p>
                                        <p
                                            className={cn(
                                                "text-xs",
                                                "text-slate-400"
                                            )}
                                        >
                                            Recevoir un résumé des activités
                                            importantes par e-mail.
                                        </p>
                                    </div>
                                    <Switch id="email-notif" defaultChecked />
                                </div>

                                <div
                                    className={cn(
                                        "flex items-center justify-between pt-4"
                                    )}
                                >
                                    <div>
                                        <p
                                            className={cn(
                                                "text-sm font-medium",
                                                "text-slate-100"
                                            )}
                                        >
                                            Alertes de sécurité
                                        </p>
                                        <p
                                            className={cn(
                                                "text-xs",
                                                "text-slate-400"
                                            )}
                                        >
                                            Être averti en cas de connexion
                                            suspecte ou modification du mot de
                                            passe.
                                        </p>
                                    </div>
                                    <Switch
                                        id="security-alert"
                                        defaultChecked
                                    />
                                </div>

                                <div
                                    className={cn(
                                        "flex items-center justify-between pt-4"
                                    )}
                                >
                                    <div>
                                        <p
                                            className={cn(
                                                "text-sm font-medium",
                                                "text-slate-100"
                                            )}
                                        >
                                            Messages clients
                                        </p>
                                        <p
                                            className={cn(
                                                "text-xs",
                                                "text-slate-400"
                                            )}
                                        >
                                            Notification immédiate lorsqu'un
                                            client vous envoie un message.
                                        </p>
                                    </div>
                                    <Switch
                                        id="client-message"
                                        defaultChecked
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Onglet 5 : Apparence */}
                    {activeTab === "appearance" && (
                        <div
                            className={cn(
                                "space-y-6 rounded-lg border border-border p-6 shadow-sm",
                                "bg-gray-900/30"
                            )}
                        >
                            <div>
                                <h2
                                    className={cn(
                                        "text-lg font-semibold",
                                        "text-slate-100"
                                    )}
                                >
                                    Apparence & Langue
                                </h2>
                                <p className={cn("text-xs", "text-slate-400")}>
                                    Personnalisez l'affichage de votre tableau
                                    de bord.
                                </p>
                            </div>

                            <div className={cn("space-y-4")}>
                                <div className={cn("space-y-2")}>
                                    <label
                                        className={cn(
                                            "text-xs font-medium",
                                            "text-slate-100"
                                        )}
                                    >
                                        Thème de l'interface
                                    </label>
                                    <select
                                        className={cn(
                                            "w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                            "border-input bg-gray-950/80 text-slate-100 focus:ring-emerald-500"
                                        )}
                                    >
                                        <option value="dark">
                                            Sombre (Par défaut)
                                        </option>
                                        <option value="light">Clair</option>
                                        <option value="system">Système</option>
                                    </select>
                                </div>
                                <div className={cn("space-y-2")}>
                                    <label
                                        className={cn(
                                            "text-xs font-medium",
                                            "text-slate-100"
                                        )}
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
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
