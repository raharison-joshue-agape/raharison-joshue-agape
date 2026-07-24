import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { personalInfo } from "@/data/Personal-info"
import {
    Mail,
    MapPin,
    Send,
    CheckCircle2,
    User,
    Building2,
    FileText,
    MessageSquare,
    ExternalLink,
} from "lucide-react"
import { AlertComponent, type Alert } from "@/components/alert"
import { SEND_MESSAGE, useApi } from "@/hooks/use-api"
import { cn } from "@/lib/utils"

type DataType = {
    name: string
    email: string
    location: string
    subject: string
    message: string
    id: number
    last_device_logged: string
    last_ip_logged: string
    is_read: boolean
    created_at: string
    updated_at: string
}

const GithubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
)

const LinkedinIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)

const contactLinks = [
    {
        icon: GithubIcon,
        label: "GitHub",
        value: "raharison-joshue-agape",
        href: personalInfo.github,
    },
    {
        icon: LinkedinIcon,
        label: "LinkedIn",
        value: "Raharison Joshué Agapé",
        href: personalInfo.linkedin,
    },
    {
        icon: Mail,
        label: "Email",
        value: "joshueagape.itpro@gmail.com",
        href: `mailto:${personalInfo.email}`,
        isLucide: true,
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Lot 021B III 3504FR, 301, Fianarantsoa, Madagascar",
        href: personalInfo.map,
        isLucide: true,
    },
]

export default function Contact() {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
    const [name, setName] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [email, setEmail] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [location, setLocation] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [subject, setSubject] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [message, setMessage] = useState({
        value: "",
        error: false,
        error_message: "",
    })
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
    const [alertMessage, setAlert] = useState<Alert>({
        show: false,
        type: "success",
        title: "",
        message: "",
    })

    const { request } = useApi<DataType[]>()

    const checkError = () => {
        let hasError = false
        if (!name.value.trim()) {
            setName((prev) => ({
                ...prev,
                error: true,
                error_message: "Le nom est requis.",
            }))
            hasError = true
        } else {
            setName((prev) => ({ ...prev, error: false, error_message: "" }))
        }

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

        if (!location.value.trim()) {
            setLocation((prev) => ({
                ...prev,
                error: true,
                error_message: "La localisation est requise.",
            }))
            hasError = true
        } else {
            setLocation((prev) => ({
                ...prev,
                error: false,
                error_message: "",
            }))
        }

        if (!subject.value.trim()) {
            setSubject((prev) => ({
                ...prev,
                error: true,
                error_message: "Le sujet est requis.",
            }))
            hasError = true
        } else {
            setSubject((prev) => ({ ...prev, error: false, error_message: "" }))
        }

        if (!message.value.trim()) {
            setMessage((prev) => ({
                ...prev,
                error: true,
                error_message: "Le message est requis.",
            }))
            hasError = true
        } else {
            setMessage((prev) => ({ ...prev, error: false, error_message: "" }))
        }

        return hasError
    }

    const handleSubmit = async () => {
        if (checkError()) return

        setSending(true)
        const payload = {
            name: name.value,
            email: email.value,
            location: location.value,
            subject: subject.value,
            message: message.value,
        }

        try {
            const response = await request(SEND_MESSAGE, {
                method: "POST",
                body: payload,
            })
            if (response?.success) {
                setAlert({
                    show: true,
                    type: "success",
                    title: "Message envoyé !",
                    message:
                        "Merci pour votre message ! Je l'ai bien reçu et je vous réponds au plus vite.",
                })
                setName({ value: "", error: false, error_message: "" })
                setEmail({ value: "", error: false, error_message: "" })
                setLocation({ value: "", error: false, error_message: "" })
                setSubject({ value: "", error: false, error_message: "" })
                setMessage({ value: "", error: false, error_message: "" })
                setSent(true)
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
            setSending(false)
            setTimeout(() => setSent(false), 5000)
        }
    }

    return (
        <section id="contact" className={cn("relative overflow-hidden py-24")}>
            <div
                className={cn(
                    "relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                )}
            >
                {/* GitHub Style Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className={cn("mb-16 text-center")}
                >
                    <div
                        className={cn(
                            "mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1",
                            "border-gray-800 bg-[#161b22]"
                        )}
                    >
                        <div
                            className={cn(
                                "h-2 w-2 rounded-full",
                                "bg-[#3fb950]"
                            )}
                        />
                        <span
                            className={cn(
                                "text-xs font-semibold",
                                "text-[#7d8590]"
                            )}
                        >
                            À l'écoute du marché
                        </span>
                    </div>

                    <h2
                        className={cn(
                            "mb-4 text-5xl font-bold sm:text-6xl",
                            "text-[#c9d1d9]"
                        )}
                    >
                        Discutons{" "}
                        <span className={cn("text-emerald-400")}>ensemble</span>
                    </h2>
                    <p
                        className={cn(
                            "mx-auto max-w-2xl text-lg",
                            "text-[#8b949e]"
                        )}
                    >
                        Discutons de votre prochain projet. Je réponds
                        généralement en moins de 24 heures.
                    </p>
                </motion.div>

                <div className={cn("grid grid-cols-1 gap-6 lg:grid-cols-3")}>
                    {/* Left Sidebar - Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={cn("space-y-4 lg:col-span-1")}
                    >
                        {/* Status Card */}
                        <div
                            className={cn(
                                "rounded-lg border p-6",
                                "border-gray-800 bg-gray-900/50"
                            )}
                        >
                            <div className={cn("flex items-start gap-3")}>
                                <div
                                    className={cn(
                                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-md border",
                                        "border-[#238636]/20 bg-[#238636]/10"
                                    )}
                                >
                                    <CheckCircle2
                                        size={20}
                                        strokeWidth={2}
                                        className={cn("text-[#3fb950]")}
                                    />
                                </div>
                                <div>
                                    <h4
                                        className={cn(
                                            "mb-2 text-sm font-semibold",
                                            "text-[#c9d1d9]"
                                        )}
                                    >
                                        Ouvert aux collaborations
                                    </h4>
                                    <p
                                        className={cn(
                                            "text-xs leading-relaxed",
                                            "text-[#8b949e]"
                                        )}
                                    >
                                        Actuellement disponible pour des
                                        missions en freelance et à l'écoute de
                                        nouvelles opportunités.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Profile Card */}
                        <div
                            className={cn(
                                "rounded-lg border p-6",
                                "border-gray-800 bg-gray-900/50"
                            )}
                        >
                            <div
                                className={cn(
                                    "mb-6 flex items-center gap-4 border-b pb-6",
                                    "border-[#21262d]"
                                )}
                            >
                                <div>
                                    <h3
                                        className={cn(
                                            "text-lg font-semibold",
                                            "text-[#c9d1d9]"
                                        )}
                                    >
                                        Raharison Joshué Agapé
                                    </h3>
                                    <p
                                        className={cn(
                                            "text-sm",
                                            "text-[#8b949e]"
                                        )}
                                    >
                                        Développeur Full Stack
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {contactLinks.map(
                                    ({
                                        icon: Icon,
                                        label,
                                        value,
                                        href,
                                        isLucide,
                                    }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={cn(
                                                "group flex items-center gap-4 rounded-md px-3 py-2.5 transition-colors duration-200",
                                                "hover:bg-[#21262d]"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "h-5 w-5 shrink-0 transition-colors",
                                                    "text-[#8b949e] group-hover:text-[#58a6ff]"
                                                )}
                                            >
                                                {isLucide ? (
                                                    <Icon
                                                        size={18}
                                                        strokeWidth={2}
                                                    />
                                                ) : (
                                                    <Icon />
                                                )}
                                            </div>
                                            <div
                                                className={cn("min-w-0 flex-1")}
                                            >
                                                <p
                                                    className={cn(
                                                        "mb-0.5 text-xs",
                                                        "text-[#8b949e]"
                                                    )}
                                                >
                                                    {label}
                                                </p>
                                                <p
                                                    className={cn(
                                                        "line-clamp-2 text-sm transition-colors",
                                                        "text-[#c9d1d9] group-hover:text-[#58a6ff]"
                                                    )}
                                                >
                                                    {value}
                                                </p>
                                            </div>
                                            <ExternalLink
                                                size={14}
                                                className={cn(
                                                    "opacity-0 transition-opacity group-hover:opacity-100",
                                                    "text-[#8b949e]"
                                                )}
                                            />
                                        </a>
                                    )
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={cn("lg:col-span-2")}
                    >
                        <div
                            className={cn(
                                "rounded-lg border",
                                "border-gray-800 bg-gray-900/50"
                            )}
                        >
                            {/* Form Header */}
                            <div
                                className={cn(
                                    "border-b px-6 py-4",
                                    "border-[#21262d]"
                                )}
                            >
                                <h3
                                    className={cn(
                                        "text-lg font-semibold",
                                        "text-[#c9d1d9]"
                                    )}
                                >
                                    Formulaire de contact
                                </h3>
                                <p
                                    className={cn(
                                        "mt-1 text-sm",
                                        "text-[#8b949e]"
                                    )}
                                >
                                    Remplissez le formulaire ci-dessous pour
                                    lancer la discussion
                                </p>
                            </div>

                            {/* Form Body */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleSubmit()
                                }}
                                className={cn("space-y-5 p-6")}
                            >
                                {alertMessage.show && (
                                    <AlertComponent
                                        alertMessage={alertMessage}
                                    />
                                )}

                                {/* Name & Email */}
                                <div
                                    className={cn(
                                        "grid grid-cols-1 gap-5 sm:grid-cols-2"
                                    )}
                                >
                                    <div>
                                        <label
                                            className={cn(
                                                "mb-2 flex items-center gap-2 text-sm font-semibold",
                                                "text-[#c9d1d9]"
                                            )}
                                        >
                                            <User size={14} strokeWidth={2} />
                                            Votre nom
                                        </label>
                                        <input
                                            type="text"
                                            value={name.value}
                                            onChange={(e) =>
                                                setName({
                                                    value: e.target.value,
                                                    error: false,
                                                    error_message: "",
                                                })
                                            }
                                            placeholder="Saisissez votre nom"
                                            className={cn(
                                                "w-full rounded-md border px-3 py-2 text-sm transition-colors focus:ring-1 focus:outline-none",
                                                "bg-gray-950/10 text-[#c9d1d9] placeholder-[#6e7681]",
                                                name.error
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                    : "border-gray-800 focus:border-[#58a6ff] focus:ring-[#58a6ff]"
                                            )}
                                        />
                                        <p
                                            className={cn(
                                                "mt-1 text-sm",
                                                "text-red-500"
                                            )}
                                        >
                                            {name.error_message}
                                        </p>
                                    </div>
                                    <div>
                                        <label
                                            className={cn(
                                                "mb-2 flex items-center gap-2 text-sm font-semibold",
                                                "text-[#c9d1d9]"
                                            )}
                                        >
                                            <Mail size={14} strokeWidth={2} />
                                            Adresse e-mail
                                        </label>
                                        <input
                                            type="email"
                                            value={email.value}
                                            onChange={(e) =>
                                                setEmail({
                                                    value: e.target.value,
                                                    error: false,
                                                    error_message: "",
                                                })
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
                                        <p
                                            className={cn(
                                                "mt-1 text-sm",
                                                "text-red-500"
                                            )}
                                        >
                                            {email.error_message}
                                        </p>
                                    </div>
                                </div>

                                {/* Location & Subject */}
                                <div
                                    className={cn(
                                        "grid grid-cols-1 gap-5 sm:grid-cols-2"
                                    )}
                                >
                                    <div>
                                        <label
                                            className={cn(
                                                "mb-2 flex items-center gap-2 text-sm font-semibold",
                                                "text-[#c9d1d9]"
                                            )}
                                        >
                                            <Building2
                                                size={14}
                                                strokeWidth={2}
                                            />
                                            Localisation
                                        </label>
                                        <input
                                            type="text"
                                            value={location.value}
                                            onChange={(e) =>
                                                setLocation({
                                                    value: e.target.value,
                                                    error: false,
                                                    error_message: "",
                                                })
                                            }
                                            placeholder="Ville, Pays"
                                            className={cn(
                                                "w-full rounded-md border px-3 py-2 text-sm transition-colors focus:ring-1 focus:outline-none",
                                                "bg-gray-950/10 text-[#c9d1d9] placeholder-[#6e7681]",
                                                location.error
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                    : "border-gray-800 focus:border-[#58a6ff] focus:ring-[#58a6ff]"
                                            )}
                                        />
                                        <p
                                            className={cn(
                                                "mt-1 text-sm",
                                                "text-red-500"
                                            )}
                                        >
                                            {location.error_message}
                                        </p>
                                    </div>
                                    <div>
                                        <label
                                            className={cn(
                                                "mb-2 flex items-center gap-2 text-sm font-semibold",
                                                "text-[#c9d1d9]"
                                            )}
                                        >
                                            <FileText
                                                size={14}
                                                strokeWidth={2}
                                            />
                                            Sujet du message
                                        </label>
                                        <input
                                            type="text"
                                            value={subject.value}
                                            onChange={(e) =>
                                                setSubject({
                                                    value: e.target.value,
                                                    error: false,
                                                    error_message: "",
                                                })
                                            }
                                            placeholder="Quel est l'objet de votre demande ?"
                                            className={cn(
                                                "w-full rounded-md border px-3 py-2 text-sm transition-colors focus:ring-1 focus:outline-none",
                                                "bg-gray-950/10 text-[#c9d1d9] placeholder-[#6e7681]",
                                                subject.error
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                    : "border-gray-800 focus:border-[#58a6ff] focus:ring-[#58a6ff]"
                                            )}
                                        />
                                        <p
                                            className={cn(
                                                "mt-1 text-sm",
                                                "text-red-500"
                                            )}
                                        >
                                            {subject.error_message}
                                        </p>
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        className={cn(
                                            "mb-2 flex items-center gap-2 text-sm font-semibold",
                                            "text-[#c9d1d9]"
                                        )}
                                    >
                                        <MessageSquare
                                            size={14}
                                            strokeWidth={2}
                                        />
                                        Votre message
                                    </label>
                                    <textarea
                                        rows={6}
                                        value={message.value}
                                        onChange={(e) =>
                                            setMessage({
                                                value: e.target.value,
                                                error: false,
                                                error_message: "",
                                            })
                                        }
                                        placeholder="Dites-en plus sur votre projet..."
                                        className={cn(
                                            "w-full rounded-md border px-3 py-2 text-sm transition-colors focus:ring-1 focus:outline-none",
                                            "bg-gray-950/10 text-[#c9d1d9] placeholder-[#6e7681]",
                                            message.error
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                : "border-gray-800 focus:border-[#58a6ff] focus:ring-[#58a6ff]"
                                        )}
                                    />
                                    <p
                                        className={cn(
                                            "mt-1 text-sm",
                                            "text-red-500"
                                        )}
                                    >
                                        {message.error_message}
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <div
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-4 border-t pt-4 md:flex-row md:justify-between",
                                        "border-gray-800"
                                    )}
                                >
                                    <p
                                        className={cn(
                                            "text-xs",
                                            "text-[#8b949e]"
                                        )}
                                    >
                                        Veuillez remplir tous les champs.
                                    </p>
                                    <motion.button
                                        type="submit"
                                        disabled={sending || sent}
                                        whileHover={
                                            !sending && !sent
                                                ? { scale: 1.02 }
                                                : {}
                                        }
                                        whileTap={
                                            !sending && !sent
                                                ? { scale: 0.98 }
                                                : {}
                                        }
                                        className={cn(
                                            "flex cursor-pointer items-center gap-2 rounded-md px-5 py-2 text-sm font-semibold transition-all duration-200",
                                            sent
                                                ? "border border-[#238636] bg-[#238636] text-white hover:bg-[#2ea043]"
                                                : sending
                                                  ? "cursor-not-allowed border border-gray-800 bg-[#21262d] text-[#6e7681]"
                                                  : "border border-[#238636] bg-[#238636] text-white shadow-[0_0_0_3px_rgba(35,134,54,0.1)] hover:bg-[#2ea043]"
                                        )}
                                    >
                                        {sent ? (
                                            <>
                                                <CheckCircle2
                                                    size={16}
                                                    strokeWidth={2}
                                                />
                                                Message envoyé !
                                            </>
                                        ) : sending ? (
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
                                            <>
                                                <Send
                                                    size={16}
                                                    strokeWidth={2}
                                                />
                                                Envoyer le message
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </form>
                        </div>

                        {/* GitHub Style Footer Note */}
                        <div
                            className={cn(
                                "mt-4 rounded-lg border px-4 py-3",
                                "border-gray-800 bg-gray-900/50"
                            )}
                        >
                            <div className={cn("flex items-start gap-3")}>
                                <div
                                    className={cn(
                                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                                        "border-[#58a6ff]"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "h-1.5 w-1.5 rounded-full",
                                            "bg-[#58a6ff]"
                                        )}
                                    />
                                </div>
                                <div>
                                    <h4
                                        className={cn(
                                            "mb-1 text-sm font-semibold",
                                            "text-[#c9d1d9]"
                                        )}
                                    >
                                        Délai de réponse
                                    </h4>
                                    <p
                                        className={cn(
                                            "text-xs leading-relaxed",
                                            "text-[#8b949e]"
                                        )}
                                    >
                                        Je réponds généralement à toutes les
                                        demandes sous 24 heures les jours
                                        ouvrés. Pour les questions urgentes,
                                        merci de le préciser dans l'objet de
                                        votre message.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
