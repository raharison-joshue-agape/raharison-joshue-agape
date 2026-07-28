import { cn } from "@/lib/utils"
import { Save } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export type PayloadLinkType = {
    yas: string
    orange: string
    airtel: string
}

interface SettingProp {
    loading: boolean
    onSubmit: (payload: PayloadLinkType) => void
}

export default function ContactSetting({ loading, onSubmit }: SettingProp) {
    const [onLoading, setLoading] = useState(loading)

    const [yas, setYas] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [orange, setOrange] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [airtel, setAirtel] = useState({
        value: "",
        error: false,
        error_message: "",
    })

    const handleSubmit = () => {
        const payload = {
            yas: yas.value,
            orange: orange.value,
            airtel: airtel.value,
        }

        onSubmit(payload)
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
                <div>
                    <h2
                        className={cn(
                            "text-lg font-semibold",
                            "text-slate-100"
                        )}
                    >
                        Informations sur les contacts
                    </h2>
                    <p className={cn("text-xs", "text-slate-400")}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Iure, dolorem.
                    </p>
                </div>

                <div className={cn("space-y-1")}>
                    <label
                        htmlFor="yas-number"
                        className={cn(
                            "block text-xs font-medium",
                            "text-slate-100"
                        )}
                    >
                        YAS
                    </label>
                    <input
                        type="tel"
                        id="yas-number"
                        value={yas.value}
                        placeholder="+261 34 24 393 87"
                        onChange={(e) =>
                            setYas({
                                value: e.target.value,
                                error: false,
                                error_message: "",
                            })
                        }
                        className={cn(
                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                            "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                            yas.error
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-emerald-500"
                        )}
                    />
                    {yas.error && (
                        <small
                            className={cn(
                                "ml-1 text-xs font-medium",
                                "text-red-500"
                            )}
                        >
                            {yas.error_message}
                        </small>
                    )}
                </div>

                <div className={cn("space-y-1")}>
                    <label
                        htmlFor="orange-number"
                        className={cn(
                            "block text-xs font-medium",
                            "text-slate-100"
                        )}
                    >
                        ORANGE
                    </label>
                    <input
                        type="tel"
                        id="orange-number"
                        value={orange.value}
                        placeholder="+261 32 81 727 37"
                        onChange={(e) =>
                            setOrange({
                                value: e.target.value,
                                error: false,
                                error_message: "",
                            })
                        }
                        className={cn(
                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                            "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                            orange.error
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-emerald-500"
                        )}
                    />
                    {orange.error && (
                        <small
                            className={cn(
                                "ml-1 text-xs font-medium",
                                "text-red-500"
                            )}
                        >
                            {orange.error_message}
                        </small>
                    )}
                </div>

                <div className={cn("space-y-1")}>
                    <label
                        htmlFor="airtel-number"
                        className={cn(
                            "block text-xs font-medium",
                            "text-slate-100"
                        )}
                    >
                        AIRTEL
                    </label>
                    <input
                        type="tel"
                        id="airtel-number"
                        value={airtel.value}
                        placeholder="+261 33 68 473 73"
                        onChange={(e) =>
                            setAirtel({
                                value: e.target.value,
                                error: false,
                                error_message: "",
                            })
                        }
                        className={cn(
                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                            "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                            airtel.error
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-emerald-500"
                        )}
                    />
                    {airtel.error && (
                        <small
                            className={cn(
                                "ml-1 text-xs font-medium",
                                "text-red-500"
                            )}
                        >
                            {airtel.error_message}
                        </small>
                    )}
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
        </motion.form>
    )
}
