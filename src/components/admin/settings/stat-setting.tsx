import { cn } from "@/lib/utils"
import { GripVertical, Plus, Save, Trash2 } from "lucide-react"
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

const defaultStat = [
    {
        label: "Années d'expérience",
        value: "3+",
        error: false,
        error_message: "",
    },
    {
        label: "Projets terminés",
        value: "10+",
        error: false,
        error_message: "",
    },
    {
        label: "Services proposés",
        value: "6+",
        error: false,
        error_message: "",
    },
]

export default function StatSetting({ loading, onSubmit }: SettingProp) {
    const [onLoading, setLoading] = useState(loading)

    const handleSubmit = () => {
        onSubmit()
    }

    useEffect(() => {
        const initLoading = () => setLoading(loading)
        initLoading()
    }, [loading])

    return (
        <motion.form
            id="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
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
                        "flex items-center justify-between border-b pb-2",
                        "border-gray-800"
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
                            "flex items-center gap-1 rounded-md p-2.5 text-xs font-medium transition",
                            "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                        )}
                    >
                        <Plus className={cn("h-3.5 w-3.5")} /> Ajouter une stat
                    </button>
                </div>

                {defaultStat.map((stat, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex items-center gap-2.5 rounded-md border p-3",
                            "border-gray-800 bg-gray-900/30"
                        )}
                    >
                        <GripVertical
                            className={cn("cursor-move", "text-gray-500")}
                        />
                        <div className={cn("grid flex-1 grid-cols-5 gap-2.5")}>
                            <div className={cn("relative col-span-3")}>
                                <label
                                    className={cn(
                                        "absolute top-1/2 left-2 -translate-y-1/2 border-r pr-2 text-xs font-medium",
                                        "border-gray-700 text-gray-400"
                                    )}
                                >
                                    TITRE
                                </label>
                                <input
                                    type="text"
                                    id="stat-label"
                                    value={stat.label}
                                    placeholder={stat.label}
                                    className={cn(
                                        "w-full rounded-md border py-2 pr-3 pl-17 text-sm focus:ring-1 focus:outline-none",
                                        "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                        stat.error
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-700 focus:ring-emerald-500"
                                    )}
                                />
                            </div>
                            <div className={cn("relative col-span-2")}>
                                <label
                                    className={cn(
                                        "absolute top-1/2 left-2 -translate-y-1/2 border-r pr-2 text-xs font-medium",
                                        "border-gray-700 text-gray-400"
                                    )}
                                >
                                    VALEUR
                                </label>
                                <input
                                    type="text"
                                    id="stat-value"
                                    value={stat.value}
                                    placeholder={stat.value}
                                    className={cn(
                                        "w-full rounded-md border py-2 pr-3 pl-17 text-sm focus:ring-1 focus:outline-none",
                                        "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                        stat.error
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-700 focus:ring-emerald-500"
                                    )}
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            className={cn(
                                "rounded-md p-2 transition",
                                "bg-gray-800/50 text-gray-400 hover:bg-red-500/10 hover:text-red-500"
                            )}
                        >
                            <Trash2 className={cn("h-4 w-4")} />
                        </button>
                    </div>
                ))}
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
        </motion.form>
    )
}
