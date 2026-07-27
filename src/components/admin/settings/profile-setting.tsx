import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Save, Mail, Calendar } from "lucide-react"
import { useState, useRef as useReactRef, useEffect } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export type PayloadProfileType = {
    firstname: string
    lastname: string
    emailPro: string
    emailConnexion: string
}

interface ProfileSettingProp {
    loading: boolean
    onSubmit: (payload: PayloadProfileType) => void
}

const DEFAULT_AVATAR_URL =
    "https://raharison-joshue-agape.vercel.app/assets/profile-7cyklktk.jpg"

export default function ProfileSetting({
    loading,
    onSubmit,
}: ProfileSettingProp) {
    const [onLoading, setLoading] = useState(loading)

    const [previewUrl, setPreviewUrl] = useState<string>(DEFAULT_AVATAR_URL)
    const [fileName, setFileName] = useState<string>("default-profile.jpg")
    const [fileSize, setFileSize] = useState<string>("192ko")

    const fileInputRef = useReactRef<HTMLInputElement>(null)

    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return "0 Octets"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Octets", "Ko", "Mo", "Go"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFileName(file.name)
            setFileSize(formatBytes(file.size))

            const objectUrl = URL.createObjectURL(file)
            setPreviewUrl(objectUrl)
        }
    }

    const handleRemove = () => {
        setPreviewUrl(DEFAULT_AVATAR_URL)
        setFileName("default-profile.jpg")
        setFileSize("192ko")
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const [firstname, setFirstname] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [lastname, setLastname] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [emailPro, setEmailPro] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [emailConnexion, setEmailConnexion] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [role, setRole] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [birthDate, setBirthDate] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [availability, setAvailability] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [exp, setExp] = useState({
        value: "",
        error: false,
        error_message: "",
    })

    const checkError = () => {
        let hasError = false
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!firstname.value.trim()) {
            hasError = true
            setFirstname((prev) => ({
                ...prev,
                error: true,
                error_message: "Le nom est requis.",
            }))
        } else {
            setFirstname((prev) => ({
                ...prev,
                error: false,
                error_message: "",
            }))
        }

        if (!lastname.value.trim()) {
            hasError = true
            setLastname((prev) => ({
                ...prev,
                error: true,
                error_message: "Le prénom est requis.",
            }))
        } else {
            setLastname((prev) => ({
                ...prev,
                error: false,
                error_message: "",
            }))
        }

        if (!emailPro.value.trim()) {
            hasError = true
            setEmailPro((prev) => ({
                ...prev,
                error: true,
                error_message: "L'adresse email est requise.",
            }))
        } else if (!emailRegex.test(emailPro.value.trim())) {
            hasError = true
            setEmailPro((prev) => ({
                ...prev,
                error: true,
                error_message: "Veuillez entrer une adresse email valide.",
            }))
        } else {
            setEmailPro((prev) => ({
                ...prev,
                error: false,
                error_message: "",
            }))
        }

        if (!emailConnexion.value.trim()) {
            hasError = true
            setEmailConnexion((prev) => ({
                ...prev,
                error: true,
                error_message: "L'adresse email est requise.",
            }))
        } else if (!emailRegex.test(emailConnexion.value.trim())) {
            hasError = true
            setEmailConnexion((prev) => ({
                ...prev,
                error: true,
                error_message: "Veuillez entrer une adresse email valide.",
            }))
        } else {
            setEmailConnexion((prev) => ({
                ...prev,
                error: false,
                error_message: "",
            }))
        }

        if (!role.value.trim()) {
            hasError = true
            setRole((prev) => ({
                ...prev,
                error: true,
                error_message: "Le Rôle / Intitulé du poste est requis.",
            }))
        } else {
            setRole((prev) => ({
                ...prev,
                error: false,
                error_message: "",
            }))
        }

        if (!birthDate.value.trim()) {
            hasError = true
            setBirthDate((prev) => ({
                ...prev,
                error: true,
                error_message: "Le date de naissance est requis.",
            }))
        } else {
            setBirthDate((prev) => ({
                ...prev,
                error: false,
                error_message: "",
            }))
        }

        if (!availability.value.trim()) {
            hasError = true
            setAvailability((prev) => ({
                ...prev,
                error: true,
                error_message: "Le date de naissance est requis.",
            }))
        } else {
            setAvailability((prev) => ({
                ...prev,
                error: false,
                error_message: "",
            }))
        }

        if (!exp.value.trim()) {
            hasError = true
            setExp((prev) => ({
                ...prev,
                error: true,
                error_message: "Le expérience est requis.",
            }))
        } else {
            setExp((prev) => ({
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
            firstname: firstname.value,
            lastname: lastname.value,
            emailPro: emailPro.value,
            emailConnexion: emailConnexion.value,
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
                        Informations du Profil
                    </h2>
                    <p className={cn("text-xs", "text-slate-400")}>
                        Mettez à jour votre photo et vos informations
                        personnelles.
                    </p>
                </div>

                <div className={cn("flex items-center gap-6")}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className={cn("hidden")}
                    />
                    <Avatar
                        className={cn("h-20 w-20 shrink-0 sm:h-24 sm:w-24")}
                    >
                        <AvatarImage
                            src={previewUrl}
                            alt="Avatar"
                            className={cn("object-cover")}
                        />
                        <AvatarFallback>RJA</AvatarFallback>
                    </Avatar>

                    <div
                        className={cn(
                            "flex flex-col gap-1.5 text-center sm:text-left"
                        )}
                    >
                        <p className={cn("font-semibold")}>Photo de profile</p>

                        {fileName && (
                            <div className="text-xs text-slate-400">
                                <span className="font-medium text-slate-200">
                                    {fileName}
                                </span>
                                {fileSize && (
                                    <span className="ml-2 text-slate-500">
                                        ({fileSize})
                                    </span>
                                )}
                            </div>
                        )}

                        <div
                            className={cn(
                                "mt-2 flex flex-wrap justify-center gap-3 sm:justify-start"
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className={cn(
                                    "cursor-pointer rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                                    "border-gray-800 bg-gray-800/50 text-slate-300 hover:bg-gray-800/80"
                                )}
                            >
                                Changer l'image
                            </button>
                            {fileName !== "default-profile.jpg" && (
                                <button
                                    type="button"
                                    onClick={handleRemove}
                                    className={cn(
                                        "cursor-pointer rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                                        "border-destructive/30 text-destructive hover:bg-destructive/10"
                                    )}
                                >
                                    Supprimer
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2")}>
                    <div>
                        <label
                            htmlFor="firstname"
                            className={cn(
                                "block text-xs font-medium",
                                "text-slate-100"
                            )}
                        >
                            Nom
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            value={firstname.value}
                            placeholder="RAHARISON"
                            onChange={(e) =>
                                setFirstname({
                                    value: e.target.value,
                                    error: false,
                                    error_message: "",
                                })
                            }
                            className={cn(
                                "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                firstname.error
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-700 focus:ring-emerald-500"
                            )}
                        />
                        {firstname.error && (
                            <small className="ml-1 text-xs font-medium text-red-500">
                                {firstname.error_message}
                            </small>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="lastname"
                            className={cn(
                                "block text-xs font-medium",
                                "text-slate-100"
                            )}
                        >
                            Prénom
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            value={lastname.value}
                            placeholder="Joshué Agapé"
                            onChange={(e) =>
                                setLastname({
                                    value: e.target.value,
                                    error: false,
                                    error_message: "",
                                })
                            }
                            className={cn(
                                "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                lastname.error
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-700 focus:ring-emerald-500"
                            )}
                        />
                        {lastname.error && (
                            <small className="ml-1 text-xs font-medium text-red-500">
                                {lastname.error_message}
                            </small>
                        )}
                    </div>
                </div>

                <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2")}>
                    <div className="space-y-1">
                        <label
                            htmlFor="email-address-pro"
                            className={cn(
                                "block text-xs font-medium",
                                "text-slate-100"
                            )}
                        >
                            Adresse Email Professionnel
                        </label>
                        <div className="relative">
                            <Mail className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
                            <input
                                type="email"
                                id="email-address-pro"
                                value={emailPro.value}
                                onChange={(e) =>
                                    setEmailPro({
                                        value: e.target.value,
                                        error: false,
                                        error_message: "",
                                    })
                                }
                                placeholder="joshueagape.itpro@gmail.com"
                                className={cn(
                                    "-mb-1 w-full rounded-md border py-2 pr-3 pl-9 text-sm focus:ring-1 focus:outline-none",
                                    "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                    emailPro.error
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-700 focus:ring-emerald-500"
                                )}
                            />
                        </div>
                        {emailPro.error && (
                            <small className="ml-1 text-xs font-medium text-red-500">
                                {emailPro.error_message}
                            </small>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label
                            htmlFor="email-address-connexion"
                            className={cn(
                                "block text-xs font-medium",
                                "text-slate-100"
                            )}
                        >
                            Adresse Email de Connexion
                        </label>
                        <div className="relative">
                            <Mail className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
                            <input
                                type="email"
                                id="email-address-connexion"
                                value={emailConnexion.value}
                                onChange={(e) =>
                                    setEmailConnexion({
                                        value: e.target.value,
                                        error: false,
                                        error_message: "",
                                    })
                                }
                                placeholder="joshueagape.itpro@gmail.com"
                                className={cn(
                                    "-mb-1 w-full rounded-md border py-2 pr-3 pl-9 text-sm focus:ring-1 focus:outline-none",
                                    "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                    emailConnexion.error
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-700 focus:ring-emerald-500"
                                )}
                            />
                        </div>
                        {emailConnexion.error && (
                            <small className="ml-1 text-xs font-medium text-red-500">
                                {emailConnexion.error_message}
                            </small>
                        )}
                    </div>
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="role"
                        className={cn(
                            "block text-xs font-medium",
                            "text-slate-100"
                        )}
                    >
                        Rôle / Intitulé du poste
                    </label>
                    <input
                        type="text"
                        id="role"
                        value={role.value}
                        placeholder="RAHARISON"
                        onChange={(e) =>
                            setRole({
                                value: e.target.value,
                                error: false,
                                error_message: "",
                            })
                        }
                        className={cn(
                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                            "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                            role.error
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-700 focus:ring-emerald-500"
                        )}
                    />
                    {role.error && (
                        <small className="ml-1 text-xs font-medium text-red-500">
                            {role.error_message}
                        </small>
                    )}
                </div>

                <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-8")}>
                    <div className="col-span-3 space-y-1">
                        <label
                            htmlFor="birth-date"
                            className={cn(
                                "block text-xs font-medium",
                                "text-slate-100"
                            )}
                        >
                            Date de naissance
                        </label>
                        <div className="relative">
                            <Calendar className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
                            <input
                                type="date"
                                id="birth-date"
                                value={birthDate.value}
                                onChange={(e) =>
                                    setBirthDate({
                                        value: e.target.value,
                                        error: false,
                                        error_message: "",
                                    })
                                }
                                className={cn(
                                    "-mb-1 w-full rounded-md border py-2 pr-3 pl-9 text-sm focus:ring-1 focus:outline-none",
                                    "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                    birthDate.error
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-700 focus:ring-emerald-500"
                                )}
                            />
                        </div>
                        {birthDate.error && (
                            <small className="ml-1 text-xs font-medium text-red-500">
                                {birthDate.error_message}
                            </small>
                        )}
                    </div>

                    <div className="col-span-3 space-y-1">
                        <label
                            htmlFor="availability"
                            className={cn(
                                "block text-xs font-medium",
                                "text-slate-100"
                            )}
                        >
                            Disponibilité
                        </label>
                        <input
                            type="text"
                            id="availability"
                            value={availability.value}
                            placeholder="RAHARISON"
                            onChange={(e) =>
                                setAvailability({
                                    value: e.target.value,
                                    error: false,
                                    error_message: "",
                                })
                            }
                            className={cn(
                                "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                availability.error
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-700 focus:ring-emerald-500"
                            )}
                        />
                        {availability.error && (
                            <small className="ml-1 text-xs font-medium text-red-500">
                                {availability.error_message}
                            </small>
                        )}
                    </div>

                    <div className={cn("col-span-2 space-y-1")}>
                        <label
                            htmlFor="exp"
                            className={cn(
                                "block text-xs font-medium",
                                "text-slate-100"
                            )}
                        >
                            Expérience globale
                        </label>
                        <input
                            type="text"
                            id="exp"
                            value={exp.value}
                            placeholder="3+ ans"
                            onChange={(e) =>
                                setExp({
                                    value: e.target.value,
                                    error: false,
                                    error_message: "",
                                })
                            }
                            className={cn(
                                "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                "bg-gray-950/80 text-slate-100 placeholder:text-slate-500",
                                exp.error
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-700 focus:ring-emerald-500"
                            )}
                        />
                        {exp.error && (
                            <small className="ml-1 text-xs font-medium text-red-500">
                                {exp.error_message}
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
