import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Eye, EyeOff, Save } from "lucide-react"
import { useEffect, useState } from "react"

type PayloadSecurityType = {
    current_password: string
    new_password: string
}

interface ProfileSettingProp {
    loading: boolean
    onSubmit: (payload: PayloadSecurityType) => void
}

export default function SecuritySetting({
    loading,
    onSubmit,
}: ProfileSettingProp) {
    const [onLoading, setLoading] = useState(loading)

    const [currentPassword, setCurrentPassword] = useState({
        value: "",
        error: false,
        error_message: "",
        show: false,
    })

    const [newPassword, setNewPassword] = useState({
        value: "",
        error: false,
        error_message: "",
        show: false,
    })

    const [confirmNewPassword, setConfirmNewPassword] = useState({
        value: "",
        error: false,
        error_message: "",
        show: false,
    })

    const checkError = () => {
        let hasError = false

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/

        if (!currentPassword.value.trim()) {
            hasError = true
            setCurrentPassword((prev) => ({
                ...prev,
                error: true,
                error_message: "Le mot de passe actuel est requis.",
            }))
        } else {
            setCurrentPassword((prev) => ({
                ...prev,
                error: false,
                error_message: "",
            }))
        }

        if (!newPassword.value.trim()) {
            hasError = true
            setNewPassword((prev) => ({
                ...prev,
                error: true,
                error_message: "Le nouveau mot de passe est requis.",
            }))
        } else if (newPassword.value.length < 8) {
            hasError = true
            setNewPassword((prev) => ({
                ...prev,
                error: true,
                error_message:
                    "Le mot de passe doit contenir au moins 8 caractères.",
            }))
        } else if (!passwordRegex.test(newPassword.value)) {
            hasError = true
            setNewPassword((prev) => ({
                ...prev,
                error: true,
                error_message:
                    "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.",
            }))
        } else {
            setNewPassword((prev) => ({
                ...prev,
                error: false,
                error_message: "",
            }))
        }

        if (!confirmNewPassword.value.trim()) {
            hasError = true
            setConfirmNewPassword((prev) => ({
                ...prev,
                error: true,
                error_message: "Veuillez confirmer le mot de passe.",
            }))
        } else if (
            newPassword.value.trim() !== confirmNewPassword.value.trim()
        ) {
            hasError = true
            setConfirmNewPassword((prev) => ({
                ...prev,
                error: true,
                error_message: "Les mots de passe ne correspondent pas.",
            }))
        } else {
            setConfirmNewPassword((prev) => ({
                ...prev,
                error: false,
                error_message: "",
            }))
        }

        return hasError
    }

    const handleSubmit = () => {
        if (checkError()) return
        const payload = {
            current_password: currentPassword.value,
            new_password: newPassword.value,
        }

        onSubmit(payload)
    }

    useEffect(() => {
        const initLoading = () => setLoading(loading)
        initLoading()
    }, [loading])

    return (
        <form
            id="profile-form"
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
                        Sécurité du Compte
                    </h2>
                    <p className={cn("text-xs", "text-slate-400")}>
                        Modifiez votre mot de passe et sécurisez votre accès.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="current-password"
                            className={cn(
                                "block text-xs font-medium",
                                "text-slate-100"
                            )}
                        >
                            Mot de passe actuel
                        </label>
                        <input
                            type="password"
                            id="current-password"
                            value={currentPassword.value}
                            onChange={(e) =>
                                setCurrentPassword({
                                    ...currentPassword,
                                    value: e.target.value,
                                    error: false,
                                    error_message: "",
                                })
                            }
                            placeholder="••••••••"
                            className={cn(
                                "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                currentPassword.error
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-700 focus:ring-emerald-500"
                            )}
                        />
                        {currentPassword.error && (
                            <small className="ml-1 text-xs font-medium text-red-500">
                                {currentPassword.error_message}
                            </small>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="new-password"
                            className={cn(
                                "block text-xs font-medium",
                                "text-slate-100"
                            )}
                        >
                            Nouveau mot de passe
                        </label>
                        <div className="relative">
                            <input
                                id="new-password"
                                type={newPassword.show ? "text" : "password"}
                                value={newPassword.value}
                                onChange={(e) =>
                                    setNewPassword({
                                        ...newPassword,
                                        value: e.target.value,
                                        error: false,
                                        error_message: "",
                                    })
                                }
                                placeholder="••••••••"
                                className={cn(
                                    "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                    "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                    newPassword.error
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-700 focus:ring-emerald-500"
                                )}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setNewPassword((prev) => ({
                                        ...prev,
                                        show: !prev.show,
                                    }))
                                }
                                className={cn(
                                    "absolute top-1/2 right-1 -translate-1/2",
                                    newPassword.show
                                        ? "text-slate-400"
                                        : "text-slate-500"
                                )}
                            >
                                {newPassword.show ? (
                                    <Eye size={18} />
                                ) : (
                                    <EyeOff size={18} />
                                )}
                            </button>
                        </div>
                        {newPassword.error && (
                            <small className="ml-1 text-xs font-medium text-red-500">
                                {newPassword.error_message}
                            </small>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="confirm-new-password"
                            className={cn(
                                "block text-xs font-medium",
                                "text-slate-100"
                            )}
                        >
                            Confirmer le nouveau mot de passe
                        </label>
                        <input
                            type="password"
                            id="confirm-new-password"
                            value={confirmNewPassword.value}
                            onChange={(e) =>
                                setConfirmNewPassword({
                                    ...confirmNewPassword,
                                    value: e.target.value,
                                    error: false,
                                    error_message: "",
                                })
                            }
                            placeholder="••••••••"
                            className={cn(
                                "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                confirmNewPassword.error
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-700 focus:ring-emerald-500"
                            )}
                        />
                        {confirmNewPassword.error && (
                            <small className="ml-1 text-xs font-medium text-red-500">
                                {confirmNewPassword.error_message}
                            </small>
                        )}
                    </div>
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
                    form="profile-form"
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
