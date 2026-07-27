import { cn } from "@/lib/utils"
import { Save } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export type PayloadLinkType = {
    tagline: string
    bio: string
}

interface ProfileSettingProp {
    loading: boolean
    onSubmit: (payload: PayloadLinkType) => void
}

const defaultTagline = `En tant que développeur passionné, je suis continuellement motivé par la création de solutions novatrices et par le perfectionnement constant de mes aptitudes techniques.`
const defaultBio = `Développeur web motivé, cumulant plus de 3 années dans le métier, je crée des applications à la pointe, performantes et pensées pour l'utilisateur. Je me perfectionne sans cesse grâce à une veille technologique assidue et à des réalisations concrètes axées sur la qualité, la facilité d'entretien et l'efficacité.

Ma méthode : l'Infrastructure as Code. Je monte des infrastructures solides qui autorisent les équipes produit à livrer avec assurance.`
export default function BioTaglineSetting({
    loading,
    onSubmit,
}: ProfileSettingProp) {
    const [onLoading, setLoading] = useState(loading)

    const [tagline, setTagline] = useState({
        value: defaultTagline,
        error: false,
        error_message: "",
    })
    const [bio, setBio] = useState({
        value: defaultBio,
        error: false,
        error_message: "",
    })

    const handleSubmit = () => {
        const payload = {
            tagline: tagline.value,
            bio: bio.value,
        }

        onSubmit(payload)
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
                <div>
                    <h2
                        className={cn(
                            "text-lg font-semibold",
                            "text-slate-100"
                        )}
                    >
                        Bio & Accroche
                    </h2>
                    <p className={cn("text-xs", "text-slate-400")}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Iure, dolorem.
                    </p>
                </div>

                <div className={cn("space-y-1")}>
                    <label
                        htmlFor="tagline"
                        className={cn(
                            "block text-xs font-medium",
                            "text-slate-100"
                        )}
                    >
                        Tagline (Accroche principale)
                    </label>
                    <textarea
                        id="tagline"
                        value={tagline.value}
                        onChange={(e) =>
                            setTagline({
                                value: e.target.value,
                                error: false,
                                error_message: "",
                            })
                        }
                        rows={4}
                        className={cn(
                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                            "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                            tagline.error
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-emerald-500"
                        )}
                    />
                    {tagline.error && (
                        <small className="ml-1 text-xs font-medium text-red-500">
                            {tagline.error_message}
                        </small>
                    )}
                </div>

                <div className={cn("space-y-1")}>
                    <label
                        htmlFor="bio"
                        className={cn(
                            "block text-xs font-medium",
                            "text-slate-100"
                        )}
                    >
                        Biographie complète
                    </label>
                    <textarea
                        id="bio"
                        value={bio.value}
                        onChange={(e) =>
                            setBio({
                                value: e.target.value,
                                error: false,
                                error_message: "",
                            })
                        }
                        rows={7}
                        className={cn(
                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                            "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                            bio.error
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-emerald-500"
                        )}
                    />
                    {bio.error && (
                        <small className="ml-1 text-xs font-medium text-red-500">
                            {bio.error_message}
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
        </form>
    )
}
