import { cn } from "@/lib/utils"
import {
    Briefcase,
    Building2,
    Calendar,
    ImageIcon,
    MapPin,
    Pencil,
    Plus,
    Save,
    TagIcon,
    Trash2,
    X,
} from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"

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

export interface Experience {
    year: string
    type: string
    title: string
    company: string
    location: string
    description: string
    tags: string[]
    image: string
}

const initialExperiences: Experience[] = [
    {
        year: "Avr. 2026 - Jui. 2026",
        type: "Freelance",
        title: "Création d'une application web mobile-first (Ton Cosmos)",
        company: "JVN Lab",
        location: "Fianarantsoa 301, Madagascar",
        description:
            "Conception d'une plateforme avec FastAPI, Stripe et l'IA Anthropic pour générer des rapports astrologiques personnalisés.",
        tags: [
            "React.js",
            "Supabase",
            "FastAPI",
            "Docker",
            "Stripe API",
            "Anthropic API",
        ],
        image: "/assets/experiences/tonCosmos.png",
    },
    {
        year: "Oct. 2025 - Nov. 2025",
        type: "Projet de fin de cycle",
        title: "Automatisation de l'analyse d'e-mails avec l'IA et n8n",
        company: "ENI",
        location: "Fianarantsoa 301, Madagascar",
        description:
            "Développement d'une solution d'automatisation intelligente sous n8n et Flask pour analyser, trier et gérer les e-mails.",
        tags: ["React.js", "PostgreSQL", "Flask", "N8N", "Docker"],
        image: "/assets/experiences/n8nENI.png",
    },
    {
        year: "Oct. 2025 - Nov. 2025",
        type: "Mission",
        title: "Développement de l'application mobile - Mandika",
        company: "RafalTech",
        location: "Full Remote",
        description:
            "Conception d'une application mobile Flutter intégrant OCR et Django pour capturer, analyser et exporter des données.",
        tags: [
            "Flutter",
            "Django",
            "PostgreSQL",
            "Tesseract OCR",
            "Hugging Face",
        ],
        image: "/assets/experiences/mandikaAPK.png",
    },
    {
        year: "Aug. 2024 - Dec. 2024",
        type: "Stage en entreprise",
        title: "Gestion de rendez-vous synchronisée avec Google Calendar",
        company: "SfyriTech",
        location: "Antananarivo, Madagascar",
        description:
            "Création d'une application de planification synchronisée avec Google Calendar grâce à Nest.js et des API WebSockets.",
        tags: [
            "Quasar",
            "PostgreSQL",
            "Nest.js",
            "Prisma ORM",
            "Google Calendar API",
        ],
        image: "/assets/experiences/sfyriBooking.png",
    },
    {
        year: "May 2024 - Sept. 2024",
        type: "Mission",
        title: "Développement d'API pour la plateforme Hello Archi",
        company: "SfyriTech",
        location: "Full Remote",
        description:
            "Optimisation du backend Node.js et développement de nouvelles fonctionnalités d'API pour améliorer la scalabilité système.",
        tags: ["Node.js", "Express", "Docker", "Sequelize ORM", "websocket"],
        image: "/assets/experiences/helloArchi.png",
    },
    {
        year: "Sept. 2023 - Nov. 2023",
        type: "Stage en entreprise",
        title: "Application de gestion des commandes et des livraisons",
        company: "Open Delivery",
        location: "Antsirabe, Madagascar",
        description:
            "Participation au développement Full Stack d'un système de gestion des livraisons sous Laravel et Vue.js.",
        tags: ["Vue.js", "PHP", "Laravel", "jQuery", "MySQL"],
        image: "/assets/experiences/openDelivery.png",
    },
]

const emptyExperience: Experience = {
    year: "",
    type: "Freelance",
    title: "",
    company: "",
    location: "",
    description: "",
    tags: [],
    image: "",
}

export default function Experiences({ loading }: SettingProp) {
    const [onLoading, setLoading] = useState(loading)

    const [experiences, setExperiences] =
        useState<Experience[]>(initialExperiences)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [formData, setFormData] = useState<Experience>(emptyExperience)
    const [newTagInput, setNewTagInput] = useState("")

    // Ouverture du modal pour création
    const handleOpenCreateModal = () => {
        setEditingIndex(null)
        setFormData(emptyExperience)
        setIsModalOpen(true)
    }

    // Ouverture du modal pour édition
    const handleOpenEditModal = (index: number) => {
        setEditingIndex(index)
        setFormData(experiences[index])
        setIsModalOpen(true)
    }

    // Suppression d'une expérience
    const handleDelete = (index: number) => {
        if (confirm("Voulez-vous vraiment supprimer cette expérience ?")) {
            setExperiences((prev) => prev.filter((_, i) => i !== index))
        }
    }

    // Changement dans les champs du formulaire
    const handleChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Gestion des tags
    const handleAddTag = () => {
        const trimmed = newTagInput.trim()
        if (trimmed && !formData.tags.includes(trimmed)) {
            setFormData((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }))
            setNewTagInput("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tagToRemove),
        }))
    }

    // Soumission du formulaire (Ajout ou Édition)
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (editingIndex !== null) {
            const updated = [...experiences]
            updated[editingIndex] = formData
            setExperiences(updated)
        } else {
            setExperiences((prev) => [formData, ...prev])
        }
        setIsModalOpen(false)
    }

    useEffect(() => {
        const initLoading = () => setLoading(loading)
        initLoading()
    }, [loading])

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn("space-y-6 px-16 py-6")}
        >
            <div
                className={cn(
                    "flex flex-col items-start justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center",
                    "border-gray-700"
                )}
            >
                <div>
                    <h2
                        className={cn(
                            "text-lg font-semibold",
                            "text-slate-100"
                        )}
                    >
                        Gestion des Expériences
                    </h2>
                    <p className={cn("text-xs", "text-slate-400")}>
                        Ajoutez, modifiez ou supprimez vos expériences
                        professionnelles et stages.
                    </p>
                </div>

                <button
                    onClick={handleOpenCreateModal}
                    className={cn(
                        "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition",
                        "bg-blue-600 text-white hover:bg-blue-700"
                    )}
                >
                    <Plus className="h-4 w-4" /> Ajouter une expérience
                </button>
            </div>

            {/* Liste des cartes d'expériences */}
            <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2")}>
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex flex-col justify-between gap-4 rounded-lg border p-5 shadow-sm transition hover:shadow-md",
                            "border-gray-700 bg-gray-800"
                        )}
                    >
                        <div className={cn("space-y-3")}>
                            <div
                                className={cn(
                                    "flex items-start justify-between gap-2"
                                )}
                            >
                                <span
                                    className={cn(
                                        "inline-block rounded-full border px-2.5 py-1 text-xs font-semibold",
                                        "border-blue-500/20 bg-blue-500/10 text-blue-400"
                                    )}
                                >
                                    {exp.type}
                                </span>
                                <div className={cn("flex items-center gap-1")}>
                                    <button
                                        onClick={() =>
                                            handleOpenEditModal(index)
                                        }
                                        className={cn(
                                            "rounded-md p-1.5 transition",
                                            "text-gray-500 hover:bg-gray-700 hover:text-blue-600"
                                        )}
                                        title="Modifier"
                                    >
                                        <Pencil className={cn("h-4 w-4")} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className={cn(
                                            "rounded-md p-1.5 transition",
                                            "text-gray-500 hover:bg-gray-700 hover:text-red-600"
                                        )}
                                        title="Supprimer"
                                    >
                                        <Trash2 className={cn("h-4 w-4")} />
                                    </button>
                                </div>
                            </div>

                            <h3
                                className={cn(
                                    "text-base leading-snug font-semibold",
                                    "text-white"
                                )}
                            >
                                {exp.title}
                            </h3>

                            <div
                                className={cn(
                                    "flex flex-wrap gap-3 text-xs",
                                    "text-gray-400"
                                )}
                            >
                                <span className={cn("flex items-center gap-1")}>
                                    <Building2
                                        className={cn(
                                            "h-3.5 w-3.5",
                                            "text-blue-500"
                                        )}
                                    />
                                    {exp.company}
                                </span>
                                <span className={cn("flex items-center gap-1")}>
                                    <Calendar
                                        className={cn(
                                            "h-3.5 w-3.5",
                                            "text-blue-500"
                                        )}
                                    />
                                    {exp.year}
                                </span>
                                <span className={cn("flex items-center gap-1")}>
                                    <MapPin
                                        className={cn(
                                            "h-3.5 w-3.5",
                                            "text-blue-500"
                                        )}
                                    />
                                    {exp.location}
                                </span>
                            </div>

                            <p
                                className={cn(
                                    "line-clamp-3 text-sm",
                                    "text-gray-300"
                                )}
                            >
                                {exp.description}
                            </p>
                        </div>

                        {/* Tags */}
                        <div
                            className={cn(
                                "flex flex-wrap gap-1.5 border-t pt-2",
                                "border-gray-700/50"
                            )}
                        >
                            {exp.tags.map((tag, tIndex) => (
                                <span
                                    key={tIndex}
                                    className={cn(
                                        "rounded px-2 py-0.5 text-xs",
                                        "bg-gray-700 text-gray-300"
                                    )}
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL / DIALOG D'ÉDITION ET CRÉATION */}
            {isModalOpen && (
                <div
                    className={cn(
                        "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 backdrop-blur-sm",
                        "bg-black/50"
                    )}
                >
                    <div
                        className={cn(
                            "my-8 w-full max-w-2xl overflow-hidden rounded-xl border shadow-xl",
                            "border-gray-700 bg-gray-800"
                        )}
                    >
                        {/* Modal Header */}
                        <div
                            className={cn(
                                "flex items-center justify-between border-b p-4",
                                "border-gray-700"
                            )}
                        >
                            <h3
                                className={cn(
                                    "flex items-center gap-2 text-lg font-bold",
                                    "text-white"
                                )}
                            >
                                <Briefcase
                                    className={cn("h-5 w-5", "text-blue-500")}
                                />
                                {editingIndex !== null
                                    ? "Modifier l'expérience"
                                    : "Ajouter une expérience"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className={cn(
                                    "rounded-lg p-1",
                                    "text-gray-400 hover:text-gray-200"
                                )}
                            >
                                <X className={cn("h-5 w-5")} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form
                            onSubmit={handleSubmit}
                            className={cn("space-y-4 p-6")}
                        >
                            <div
                                className={cn(
                                    "grid grid-cols-1 gap-4 md:grid-cols-2"
                                )}
                            >
                                <div>
                                    <label
                                        className={cn(
                                            "mb-1 block text-xs font-semibold",
                                            "text-gray-300"
                                        )}
                                    >
                                        Titre du poste / Mission
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className={cn(
                                            "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2",
                                            "border-gray-700 bg-gray-900 focus:ring-blue-500"
                                        )}
                                    />
                                </div>
                                <div>
                                    <label
                                        className={cn(
                                            "mb-1 block text-xs font-semibold",
                                            "text-gray-300"
                                        )}
                                    >
                                        Entreprise / Organisation
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                        className={cn(
                                            "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2",
                                            "border-gray-700 bg-gray-900 focus:ring-blue-500"
                                        )}
                                    />
                                </div>
                                <div>
                                    <label
                                        className={cn(
                                            "mb-1 block text-xs font-semibold",
                                            "text-gray-300"
                                        )}
                                    >
                                        Type de contrat
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className={cn(
                                            "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2",
                                            "border-gray-700 bg-gray-900 focus:ring-blue-500"
                                        )}
                                    >
                                        <option value="Freelance">
                                            Freelance
                                        </option>
                                        <option value="Stage en entreprise">
                                            Stage en entreprise
                                        </option>
                                        <option value="Mission">Mission</option>
                                        <option value="Projet de fin de cycle">
                                            Projet de fin de cycle
                                        </option>
                                        <option value="CDI">CDI</option>
                                        <option value="CDD">CDD</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        className={cn(
                                            "mb-1 block text-xs font-semibold",
                                            "text-gray-300"
                                        )}
                                    >
                                        Période (ex: Avr. 2026 - Jui. 2026)
                                    </label>
                                    <input
                                        type="text"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        required
                                        className={cn(
                                            "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2",
                                            "border-gray-700 bg-gray-900 focus:ring-blue-500"
                                        )}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label
                                        className={cn(
                                            "mb-1 block text-xs font-semibold",
                                            "text-gray-300"
                                        )}
                                    >
                                        Lieu / Localisation
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className={cn(
                                            "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2",
                                            "border-gray-700 bg-gray-900 focus:ring-blue-500"
                                        )}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    className={cn(
                                        "mb-1 block text-xs font-semibold",
                                        "text-gray-300"
                                    )}
                                >
                                    Description détaillée
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    required
                                    className={cn(
                                        "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2",
                                        "border-gray-700 bg-gray-900 focus:ring-blue-500"
                                    )}
                                />
                            </div>

                            <div>
                                <label
                                    className={cn(
                                        "mb-1 flex items-center gap-1 text-xs font-semibold",
                                        "block text-gray-300"
                                    )}
                                >
                                    <ImageIcon className="h-3.5 w-3.5" /> URL de
                                    l'image d'illustration
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className={cn(
                                        "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2",
                                        "border-gray-700 bg-gray-900 focus:ring-blue-500"
                                    )}
                                />
                            </div>

                            {/* Tags section */}
                            <div>
                                <label
                                    className={cn(
                                        "mb-1 flex items-center gap-1 text-xs font-semibold",
                                        "block text-gray-300"
                                    )}
                                >
                                    <TagIcon className="h-3.5 w-3.5" />{" "}
                                    Technologies / Tags
                                </label>
                                <div className={cn("mb-2 flex gap-2")}>
                                    <input
                                        type="text"
                                        value={newTagInput}
                                        onChange={(e) =>
                                            setNewTagInput(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault()
                                                handleAddTag()
                                            }
                                        }}
                                        placeholder="Ajouter une tech (ex: React.js)"
                                        className={cn(
                                            "flex-1 rounded-lg border px-3 py-1.5 text-sm outline-none",
                                            "border-gray-700 bg-gray-900"
                                        )}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddTag}
                                        className={cn(
                                            "rounded-lg px-3 py-1.5 text-xs font-semibold",
                                            "bg-gray-700 hover:bg-gray-300"
                                        )}
                                    >
                                        Ajouter
                                    </button>
                                </div>
                                <div className={cn("flex flex-wrap gap-1.5")}>
                                    {formData.tags.map((tag, tIdx) => (
                                        <span
                                            key={tIdx}
                                            className={cn(
                                                "flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium",
                                                "bg-blue-500/10 text-blue-400"
                                            )}
                                        >
                                            #{tag}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveTag(tag)
                                                }
                                                className="hover:text-red-500"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Modal Actions */}
                            <div
                                className={cn(
                                    "flex justify-end gap-3 border-t pt-4",
                                    "border-gray-700"
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className={cn(
                                        "rounded-lg px-4 py-2 text-sm",
                                        "text-gray-300 hover:bg-gray-700"
                                    )}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={onLoading}
                                    className={cn(
                                        "flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition",
                                        "bg-blue-600 text-white hover:bg-blue-700"
                                    )}
                                >
                                    <Save className={cn("h-4 w-4")} />{" "}
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </motion.div>
    )
}
