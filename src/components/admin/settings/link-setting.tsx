import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Save } from "lucide-react"
import { useEffect, useState } from "react"

export type PayloadLinkType = {
    gitHubLink: string
    gitLabLink: string
    linkedinLink: string
    facebookLink: string
    googleMap: string
}

interface SettingProp {
    loading: boolean
    onSubmit: (payload: PayloadLinkType) => void
}

export default function LinkSetting({ loading, onSubmit }: SettingProp) {
    const [onLoading, setLoading] = useState(loading)

    const [gitHubLink, setGitHubLink] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [gitLabLink, setGitLabLink] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [linkedinLink, setLinkedinLink] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [facebookLink, setFacebookLink] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [googleMap, setGoogleMap] = useState({
        value: "",
        error: false,
        error_message: "",
    })

    const handleSubmit = () => {
        const payload = {
            gitHubLink: gitHubLink.value,
            gitLabLink: gitLabLink.value,
            linkedinLink: linkedinLink.value,
            facebookLink: facebookLink.value,
            googleMap: googleMap.value,
        }

        onSubmit(payload)
    }

    useEffect(() => {
        const initLoading = () => setLoading(loading)
        initLoading()
    }, [loading])

    return (
        <form
            id="link-form"
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
                        Informations sur les Réseaux
                    </h2>
                    <p className={cn("text-xs", "text-slate-400")}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Iure, dolorem.
                    </p>
                </div>

                <div className={cn("space-y-1")}>
                    <label
                        htmlFor="gitHub-link"
                        className={cn(
                            "block text-xs font-medium",
                            "text-slate-100"
                        )}
                    >
                        URL GitHub
                    </label>
                    <input
                        type="text"
                        id="gitHub-link"
                        value={gitHubLink.value}
                        placeholder="https://github.com/raharison-joshue-agape"
                        onChange={(e) =>
                            setGitHubLink({
                                value: e.target.value,
                                error: false,
                                error_message: "",
                            })
                        }
                        className={cn(
                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                            "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                            gitHubLink.error
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-emerald-500"
                        )}
                    />
                    {gitHubLink.error && (
                        <small className="ml-1 text-xs font-medium text-red-500">
                            {gitHubLink.error_message}
                        </small>
                    )}
                </div>

                <div className={cn("space-y-1")}>
                    <label
                        htmlFor="gitlab-link"
                        className={cn(
                            "block text-xs font-medium",
                            "text-slate-100"
                        )}
                    >
                        URL GitLab
                    </label>
                    <input
                        type="text"
                        id="gitlab-link"
                        value={gitLabLink.value}
                        placeholder="https://gitlab.com/raharison-joshue-agape"
                        onChange={(e) =>
                            setGitLabLink({
                                value: e.target.value,
                                error: false,
                                error_message: "",
                            })
                        }
                        className={cn(
                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                            "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                            gitLabLink.error
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-emerald-500"
                        )}
                    />
                    {gitLabLink.error && (
                        <small className="ml-1 text-xs font-medium text-red-500">
                            {gitLabLink.error_message}
                        </small>
                    )}
                </div>

                <div className={cn("space-y-1")}>
                    <label
                        htmlFor="linkedin-link"
                        className={cn(
                            "block text-xs font-medium",
                            "text-slate-100"
                        )}
                    >
                        URL LinkedIn
                    </label>
                    <input
                        type="text"
                        id="linkedin-link"
                        value={linkedinLink.value}
                        placeholder="https://www.linkedin.com/in/joshue-agape"
                        onChange={(e) =>
                            setLinkedinLink({
                                value: e.target.value,
                                error: false,
                                error_message: "",
                            })
                        }
                        className={cn(
                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                            "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                            linkedinLink.error
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-emerald-500"
                        )}
                    />
                    {linkedinLink.error && (
                        <small className="ml-1 text-xs font-medium text-red-500">
                            {linkedinLink.error_message}
                        </small>
                    )}
                </div>

                <div className={cn("space-y-1")}>
                    <label
                        htmlFor="facebook-link"
                        className={cn(
                            "block text-xs font-medium",
                            "text-slate-100"
                        )}
                    >
                        Lien Facebook
                    </label>
                    <input
                        type="text"
                        id="facebook-link"
                        value={facebookLink.value}
                        placeholder="https://www.facebook.com/"
                        onChange={(e) =>
                            setFacebookLink({
                                value: e.target.value,
                                error: false,
                                error_message: "",
                            })
                        }
                        className={cn(
                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                            "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                            facebookLink.error
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-emerald-500"
                        )}
                    />
                    {facebookLink.error && (
                        <small className="ml-1 text-xs font-medium text-red-500">
                            {facebookLink.error_message}
                        </small>
                    )}
                </div>

                <div className={cn("space-y-1")}>
                    <label
                        htmlFor="google-map-link"
                        className={cn(
                            "block text-xs font-medium",
                            "text-slate-100"
                        )}
                    >
                        Lien Google Maps
                    </label>
                    <input
                        type="text"
                        id="google-map-link"
                        value={googleMap.value}
                        placeholder="https://www.google.com/maps/place//@-21.4227759,47.1116422,150m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D"
                        onChange={(e) =>
                            setGoogleMap({
                                value: e.target.value,
                                error: false,
                                error_message: "",
                            })
                        }
                        className={cn(
                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                            "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                            googleMap.error
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-emerald-500"
                        )}
                    />
                    {googleMap.error && (
                        <small className="ml-1 text-xs font-medium text-red-500">
                            {googleMap.error_message}
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
                    form="link-form"
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
