import { cn } from "@/lib/utils"
import { Plus, Save, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export type PayloadLinkType = {
    tagline: string
    bio: string
}

interface SettingProp {
    loading: boolean
    onSubmit: () => void
}

const defaultBadgeTech = [
    {
        text: "TypeScript",
        color: "text-cyan-400",
        bg_color: "bg-cyan-400",
        pos: "absolute -right-10 top-8",
        error: false,
        error_message: "",
    },
    {
        text: "PHP",
        color: "text-orange-400",
        bg_color: "bg-orange-400",
        pos: "absolute left-4 top-0",
        error: false,
        error_message: "",
    },
    {
        text: "Python",
        color: "text-emerald-400",
        bg_color: "bg-emerald-400",
        pos: "absolute -left-8 bottom-16",
        error: false,
        error_message: "",
    },
    {
        text: "Dart",
        color: "text-yellow-400",
        bg_color: "bg-yellow-400",
        pos: "absolute -right-4 bottom-10",
        error: false,
        error_message: "",
    },
]

export default function BadgeTechSetting({ loading, onSubmit }: SettingProp) {
    const [onLoading, setLoading] = useState(loading)

    const handleSubmit = () => {
        onSubmit()
    }

    useEffect(() => {
        const initLoading = () => setLoading(loading)
        initLoading()
    }, [loading])

    return (
        <form
            id="contact-form"
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}
        >
            <div
                className={cn(
                    "space-y-6 rounded-lg border border-border p-6 shadow-sm",
                    "bg-gray-900/30"
                )}
            >
                <div
                    className={cn(
                        "bo flex items-center justify-between border-b",
                        "rder-gray-200 pb-2 dark:border-gray-700"
                    )}
                >
                    <h2
                        className={cn(
                            "text-lg font-semibold",
                            "text-slate-100"
                        )}
                    >
                        Statistiques chiffrées
                    </h2>

                    <button
                        type="button"
                        className={cn(
                            "flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition",
                            "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:text-blue-400"
                        )}
                    >
                        <Plus className={cn("h-3.5 w-3.5")} /> Ajouter une stat
                    </button>
                </div>

                <div className={cn("grid grid-cols-1 gap-4")}>
                    {defaultBadgeTech.map((badge, index) => (
                        <div
                            key={index}
                            className={cn(
                                "relative space-y-2 rounded-lg border p-3",
                                "border-gray-700 bg-gray-900/40"
                            )}
                        >
                            <button
                                type="button"
                                className={cn(
                                    "absolute top-2 right-2 transition",
                                    "text-gray-400 hover:text-red-500"
                                )}
                            >
                                <Trash2 className={cn("h-4 w-4")} />
                            </button>
                            <div
                                className={cn(
                                    "mt-2 grid grid-cols-2 gap-x-3 gap-y-4"
                                )}
                            >
                                <div className={cn("space-y-1")}>
                                    <label
                                        className={cn(
                                            "block text-xs font-medium",
                                            "text-gray-400"
                                        )}
                                    >
                                        Texte
                                    </label>
                                    <input
                                        type="tel"
                                        id="yas-number"
                                        value={badge.text}
                                        placeholder={badge.text}
                                        className={cn(
                                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                            "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                            badge.error
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-gray-700 focus:ring-emerald-500"
                                        )}
                                    />
                                </div>
                                <div className={cn("space-y-1")}>
                                    <label
                                        className={cn(
                                            "block text-xs font-medium",
                                            "text-gray-400"
                                        )}
                                    >
                                        Classe Couleur Texte
                                    </label>
                                    <input
                                        type="text"
                                        value={badge.color}
                                        className={cn(
                                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                            "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                            badge.error
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-gray-700 focus:ring-emerald-500"
                                        )}
                                    />
                                </div>
                                <div className={cn("space-y-1")}>
                                    <label
                                        className={cn(
                                            "block text-xs font-medium",
                                            "text-gray-400"
                                        )}
                                    >
                                        Classe Couleur Fond
                                    </label>
                                    <input
                                        type="text"
                                        value={badge.bg_color}
                                        className={cn(
                                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                            "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                            badge.error
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-gray-700 focus:ring-emerald-500"
                                        )}
                                    />
                                </div>
                                <div className={cn("space-y-1")}>
                                    <label
                                        className={cn(
                                            "block text-xs font-medium",
                                            "text-gray-400"
                                        )}
                                    >
                                        Position CSS Absolue
                                    </label>
                                    <input
                                        type="text"
                                        value={badge.pos}
                                        className={cn(
                                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                            "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                            badge.error
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-gray-700 focus:ring-emerald-500"
                                        )}
                                    />
                                </div>
                            </div>
                            {badge.error && (
                                <small
                                    className={cn(
                                        "ml-1 text-xs font-medium",
                                        "text-red-500"
                                    )}
                                >
                                    {badge.error_message}
                                </small>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className={cn("mt-4 flex justify-end gap-3 pt-2")}>
                <button
                    type="button"
                    className={cn(
                        "rounded-md border px-4 py-2 text-xs font-medium transition-colors",
                        "border-gray-900 bg-gray-950/50 text-slate-100 hover:bg-gray-950"
                    )}
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    form="contact-form"
                    className={cn(
                        "flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-colors",
                        "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                >
                    {onLoading ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className={cn(
                                    "h-4 w-4 rounded-full border-2",
                                    "border-[#6e7681]/30 border-t-[#6e7681]"
                                )}
                            />
                            Enregistrement des modifications
                        </>
                    ) : (
                        <>
                            <Save className={cn("h-3.5 w-3.5")} />
                            Enregistrer les modifications
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}
