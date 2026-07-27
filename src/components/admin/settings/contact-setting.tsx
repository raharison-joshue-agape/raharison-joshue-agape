import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export type PayloadLinkType = {
    gitHubLink: string
    gitLabLink: string
    linkedinLink: string
    facebookLink: string
    googleMap: string
}

interface ProfileSettingProp {
    loading: boolean
    onSubmit: (payload: PayloadLinkType) => void
}

export default function ContactSetting({ loading }: ProfileSettingProp) {
    const [onLoading, setLoading] = useState(loading)

    useEffect(() => {
        const initLoading = () => setLoading(loading)
        initLoading()
    }, [loading])

    return (
        <form
            id="link-form"
            onSubmit={(e) => {
                e.preventDefault()
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
            </div>
        </form>
    )
}
