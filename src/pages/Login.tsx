import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Link } from "react-router-dom"
import { useState } from "react"
import { AlertCircleIcon, Eye, EyeOff } from "lucide-react"
import DottedBackground from "@/components/dotted-background"
import { LOGIN_API, useApi } from "@/hooks/use-api"

interface AlertType {
    show: boolean
    title: string
    message: string
    type: "success" | "info" | "warning" | "error"
}

type DataType = {
    access_token: string
    token_type: "bearer"
}

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [password, setPassword] = useState({
        value: "",
        error: false,
        error_message: "",
        show: false,
    })

    const [alertMessage, setAlert] = useState<AlertType>({
        show: false,
        type: "success",
        title: "",
        message: "",
    })

    const checkError = () => {
        let hasError = false

        if (!email.value.trim()) {
            setEmail((prev) => ({
                ...prev,
                error: true,
                error_message: "L'email est requis.",
            }))
            hasError = true
        } else if (!/\S+@\S+\.\S+/.test(email.value)) {
            setEmail((prev) => ({
                ...prev,
                error: true,
                error_message: "L'email n'est pas valide.",
            }))
            hasError = true
        } else {
            setEmail((prev) => ({ ...prev, error: false, error_message: "" }))
        }

        if (!password.value.trim()) {
            setPassword((prev) => ({
                ...prev,
                error: true,
                error_message: "Le mot de passe est requis.",
            }))
            hasError = true
        } else {
            setPassword((prev) => ({
                ...prev,
                error: false,
                error_message: "",
            }))
        }

        return hasError
    }

    const { request } = useApi<DataType[]>()

    const onSubmit = async () => {
        if (checkError()) return
        setLoading(true)

        const payload = {
            email: email.value,
            password: password.value,
        }

        try {
            const response = await request(LOGIN_API, {
                method: "POST",
                body: payload,
            })
            if (response?.success) {
                // 
            }
        } catch {
            setAlert({
                show: true,
                type: "error",
                title: "Échec de l'envoi",
                message:
                    "Une erreur technique est survenue. Veuillez réessayer ou nous contacter directement.",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <main
            className={cn(
                "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden",
                "bg-gray-950 p-4 text-slate-100"
            )}
        >
            <DottedBackground
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                }}
                frequency={2}
                gamma={3}
                cellSize={2}
            />
            <div
                className={cn(
                    "pointer-events-none absolute top-1/4 h-87.5 w-87.5 -translate-y-1/2 rounded-full blur-[120px]",
                    "bg-emerald-500/10"
                )}
            />

            <div
                className={cn("relative z-10 mb-6 flex flex-col items-center")}
            >
                <div
                    className={cn(
                        "relative mb-4 flex h-25 w-25 items-center justify-center overflow-hidden rounded-full border shadow-inner",
                        "border-gray-800 bg-gray-900/50"
                    )}
                >
                    <img
                        src="/logo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className={cn("object-contain")}
                    />
                </div>
                <h1
                    className={cn(
                        "text-xl font-medium tracking-tight",
                        "text-white"
                    )}
                >
                    Portofolio Administration
                </h1>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }}
                className="w-full max-w-100"
            >
                <Card
                    className={cn(
                        "relative z-10 w-full shadow-2xl backdrop-blur-xl",
                        "border-gray-800/80 bg-gray-900/80 text-slate-100"
                    )}
                >
                    <CardHeader className={cn("space-y-1 pb-4")}>
                        <CardTitle
                            className={cn(
                                "text-lg font-semibold tracking-wide"
                            )}
                        >
                            Connexion
                        </CardTitle>
                        <CardDescription
                            className={cn("text-xs", "text-gray-400")}
                        >
                            Veuillez entrer vos accès administrateur pour
                            continuer
                        </CardDescription>
                    </CardHeader>

                    <CardContent className={cn("space-y-4")}>
                        {alertMessage.show && (
                            <Alert
                                variant={
                                    alertMessage.type === "error"
                                        ? "destructive"
                                        : "default"
                                }
                                className={cn(
                                    "mb-8 w-full bg-gray-900/60",
                                    alertMessage.type === "success" &&
                                        "border-emerald-500/40 bg-emerald-400/10 text-emerald-400"
                                )}
                            >
                                <AlertCircleIcon />
                                <AlertTitle>{alertMessage.title}</AlertTitle>
                                <AlertDescription
                                    className={cn(
                                        alertMessage.type === "success" &&
                                            "text-emerald-400"
                                    )}
                                >
                                    {alertMessage.message}
                                </AlertDescription>
                            </Alert>
                        )}
                        <div className={cn("space-y-2")}>
                            <Label
                                htmlFor="email"
                                className={cn(
                                    "text-xs font-medium",
                                    "text-gray-300"
                                )}
                            >
                                Adresse email
                            </Label>
                            <input
                                id="email"
                                type="email"
                                value={email.value}
                                onChange={(e) =>
                                    setEmail((prev) => ({
                                        ...prev,
                                        value: e.target.value,
                                    }))
                                }
                                placeholder="contact@exemple.com"
                                className={cn(
                                    "w-full rounded-md border px-3 py-2 text-sm transition-colors focus:ring-1 focus:outline-none",
                                    "bg-gray-950/10 text-[#c9d1d9] placeholder-[#6e7681]",
                                    email.error
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                        : "border-gray-800 focus:border-[#58a6ff] focus:ring-[#58a6ff]"
                                )}
                            />
                            {email.error && (
                                <small
                                    className={cn(
                                        "mt-1 text-sm",
                                        "text-red-500"
                                    )}
                                >
                                    {email.error_message}
                                </small>
                            )}
                        </div>

                        <div className={cn("space-y-2")}>
                            <div
                                className={cn(
                                    "flex items-center justify-between"
                                )}
                            >
                                <Label
                                    htmlFor="password"
                                    className={cn(
                                        "text-xs font-medium",
                                        "text-gray-300"
                                    )}
                                >
                                    Mot de passe
                                </Label>
                                <Link
                                    to="/auth/admin-forgot-password"
                                    className={cn(
                                        "text-xs transition-colors",
                                        "text-emerald-400 hover:text-emerald-300"
                                    )}
                                >
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={password.show ? "text" : "password"}
                                    value={password.value}
                                    onChange={(e) =>
                                        setPassword((prev) => ({
                                            ...prev,
                                            value: e.target.value,
                                        }))
                                    }
                                    placeholder="********"
                                    className={cn(
                                        "w-full rounded-md border px-3 py-2 text-sm transition-colors focus:ring-1 focus:outline-none",
                                        "bg-gray-950/10 text-[#c9d1d9] placeholder-[#6e7681]",
                                        password.error
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                            : "border-gray-800 focus:border-[#58a6ff] focus:ring-[#58a6ff]"
                                    )}
                                />
                                <button
                                    onClick={() =>
                                        setPassword((prev) => ({
                                            ...prev,
                                            show: !prev.show,
                                        }))
                                    }
                                    className={cn(
                                        "absolute top-1/2 right-1 -translate-1/2",
                                        password.show
                                            ? "text-slate-400"
                                            : "text-slate-500"
                                    )}
                                >
                                    {password.show ? (
                                        <Eye size={18} />
                                    ) : (
                                        <EyeOff size={18} />
                                    )}
                                </button>
                                {password.error && (
                                    <small
                                        className={cn(
                                            "mt-1 text-sm",
                                            "text-red-500"
                                        )}
                                    >
                                        {password.error_message}
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className={cn("flex items-center space-x-2 pt-1")}>
                            <Checkbox
                                id="remember"
                                className={cn(
                                    "border-gray-700 bg-gray-950 text-white data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
                                )}
                            />
                            <Label
                                htmlFor="remember"
                                className={cn(
                                    "cursor-pointer text-xs font-normal select-none",
                                    "text-gray-300"
                                )}
                            >
                                Se souvenir de moi sur cet appareil
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={!loading ? { scale: 1.02 } : {}}
                            whileTap={!loading ? { scale: 0.98 } : {}}
                            className={cn(
                                "flex cursor-pointer items-center gap-2 rounded-md px-5 py-2 text-sm font-semibold transition-all duration-200",
                                loading
                                    ? "cursor-not-allowed border border-gray-800 bg-[#21262d] text-[#6e7681]"
                                    : "border border-[#238636] bg-[#238636] text-white shadow-[0_0_0_3px_rgba(35,134,54,0.1)] hover:bg-[#2ea043]"
                            )}
                        >
                            {loading ? (
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
                                    Envoi en cours...
                                </>
                            ) : (
                                "Se connecter"
                            )}
                        </motion.button>
                    </CardContent>
                    <CardFooter
                        className={cn(
                            "flex justify-center rounded-b-xl border-t py-3",
                            "border-gray-800/60 bg-gray-950/20"
                        )}
                    >
                        <p
                            className={cn(
                                "text-[11px] font-medium tracking-wide uppercase",
                                "text-gray-500"
                            )}
                        >
                            Espace sécurisé - Acces restreint
                        </p>
                    </CardFooter>
                </Card>
            </form>
        </main>
    )
}
