import { GithubIcon } from "@/components/sections/hero"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import {
    Check,
    ExternalLink,
    FolderGit2,
    ImageIcon,
    Palette,
    Pencil,
    Plus,
    Save,
    Star,
    TagIcon,
    Trash2,
    TrendingUp,
    X,
} from "lucide-react"
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

export interface Project {
    title: string
    description: string
    tags: string[]
    category: string
    github: string
    demo: string
    stars: number
    featured: boolean
    metrics: string[]
    color: string
    image: string
}

const initialProjects: Project[] = [
    {
        title: "Portfolio V1.0",
        description:
            "Un espace web moderne et responsive pour présenter mes réalisations et mon parcours avec une navigation fluide et adaptée à tous les écrans.",
        tags: ["Vue.js", "PrimeVue", "Tailwindcss", "FastAPI"],
        category: "Applications Web",
        image: "/assets/projects/portfolio-v1.png",
        github: "",
        demo: "https://raharison-joshue-agape-folio.vercel.app",
        stars: 1,
        featured: true,
        metrics: [],
        color: "green",
    },
    {
        title: "Portfolio V2.0",
        description:
            "Refonte complète de mon portfolio personnel intégrant des animations fluides et de nouvelles technologies pour booster les performances et dynamiser l'expérience.",
        tags: ["React", "Framer Motion", "Tailwindcss", "Node.js/Express"],
        category: "Applications Web",
        image: "/assets/projects/portfolio-v2.png",
        github: "",
        demo: "https://raharison-joshue-agape.vercel.app/",
        stars: 1,
        featured: true,
        metrics: [],
        color: "accent",
    },
]

const emptyProject: Project = {
    title: "",
    description: "",
    tags: [],
    category: "Applications Web",
    github: "",
    demo: "",
    stars: 0,
    featured: false,
    metrics: [],
    color: "accent",
    image: "",
}

export default function MyProjects({ loading }: SettingProp) {
    const [onLoading, setLoading] = useState(loading)

    const [projects, setProjects] = useState<Project[]>(initialProjects)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [formData, setFormData] = useState<Project>(emptyProject)

    // Inputs temporaires pour tags & métriques
    const [tagInput, setTagInput] = useState("")
    const [metricInput, setMetricInput] = useState("")

    // Ouverture du modal création
    const handleOpenCreateModal = () => {
        setEditingIndex(null)
        setFormData(emptyProject)
        setIsModalOpen(true)
    }

    // Ouverture du modal édition
    const handleOpenEditModal = (index: number) => {
        setEditingIndex(index)
        setFormData(projects[index])
        setIsModalOpen(true)
    }

    // Suppression
    const handleDelete = (index: number) => {
        if (confirm("Voulez-vous vraiment supprimer ce projet ?")) {
            setProjects((prev) => prev.filter((_, i) => i !== index))
        }
    }

    // Basculer 'featured' directement depuis la carte
    const toggleFeatured = (index: number) => {
        const updated = [...projects]
        updated[index].featured = !updated[index].featured
        setProjects(updated)
    }

    // Handlers formulaires
    const handleChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked
            setFormData((prev) => ({ ...prev, [name]: checked }))
        } else if (type === "number") {
            setFormData((prev) => ({ ...prev, [name]: Number(value) }))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }

    // Tags
    const handleAddTag = () => {
        const trimmed = tagInput.trim()
        if (trimmed && !formData.tags.includes(trimmed)) {
            setFormData((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }))
            setTagInput("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tagToRemove),
        }))
    }

    // Metrics
    const handleAddMetric = () => {
        const trimmed = metricInput.trim()
        if (trimmed && !formData.metrics.includes(trimmed)) {
            setFormData((prev) => ({
                ...prev,
                metrics: [...prev.metrics, trimmed],
            }))
            setMetricInput("")
        }
    }

    const handleRemoveMetric = (metricToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            metrics: prev.metrics.filter((m) => m !== metricToRemove),
        }))
    }

    // Soumission du formulaire
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (editingIndex !== null) {
            const updated = [...projects]
            updated[editingIndex] = formData
            setProjects(updated)
        } else {
            setProjects((prev) => [formData, ...prev])
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
            className={cn("space-y-6")}
        >
            <div
                className={cn(
                    "flex flex-col items-start justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center",
                    "border-gray-800"
                )}
            >
                <div>
                    <h2
                        className={cn(
                            "text-lg font-semibold",
                            "text-slate-100"
                        )}
                    >
                        Gestion des Projets (2)
                    </h2>
                    <p className={cn("text-xs", "text-slate-400")}>
                        Gérez vos projets phares, démos, dépôts GitHub et
                        caractéristiques.
                    </p>
                </div>

                <button
                    onClick={handleOpenCreateModal}
                    className={cn(
                        "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition",
                        "bg-blue-600 text-white hover:bg-blue-700"
                    )}
                >
                    <Plus className={cn("h-4 w-4")} /> Ajouter une expérience
                </button>
            </div>

            {/* Grid des projets */}
            <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-3")}>
                {projects.map((proj, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex flex-col justify-between overflow-hidden rounded-xl border shadow-sm",
                            "border-gray-700 bg-gray-800"
                        )}
                    >
                        <div
                            className={cn(
                                "group relative h-44 overflow-hidden",
                                "bg-gray-900"
                            )}
                        >
                            {proj.image ? (
                                <img
                                    src={proj.image}
                                    alt={proj.title}
                                    className={cn(
                                        "h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    )}
                                    onError={(e) => {
                                        ;(
                                            e.target as HTMLElement
                                        ).style.display = "none"
                                    }}
                                />
                            ) : (
                                <div
                                    className={cn(
                                        "flex h-full w-full items-center justify-center",
                                        "text-gray-400"
                                    )}
                                >
                                    <ImageIcon className={cn("h-12 w-12")} />
                                </div>
                            )}

                            <div
                                className={cn(
                                    "absolute top-3 left-3 flex gap-2"
                                )}
                            >
                                <span
                                    className={cn(
                                        "rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md",
                                        "border-white/20 bg-black/60 text-white"
                                    )}
                                >
                                    {proj.category}
                                </span>
                                <button
                                    onClick={() => toggleFeatured(index)}
                                    className={cn(
                                        "rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md transition",
                                        proj.featured
                                            ? "border-amber-500/40 bg-amber-500/20 text-amber-300"
                                            : "border-white/10 bg-black/40 text-gray-300 hover:border-white/30"
                                    )}
                                >
                                    ★ {proj.featured ? "A la une" : "Standard"}
                                </button>
                            </div>

                            <div
                                className={cn(
                                    "absolute top-3 right-3 flex items-center gap-1 rounded-lg px-2 py-1 text-xs backdrop-blur-md",
                                    "bg-black/60 text-white"
                                )}
                            >
                                <Star
                                    className={cn(
                                        "h-3.5 w-3.5",
                                        "fill-amber-400 text-amber-400"
                                    )}
                                />
                                <span>{proj.stars}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div
                            className={cn(
                                "flex flex-1 flex-col justify-between space-y-3 p-5"
                            )}
                        >
                            <div className={cn("space-y-2")}>
                                <div
                                    className={cn(
                                        "flex items-start justify-between gap-2"
                                    )}
                                >
                                    <h3
                                        className={cn(
                                            "text-lg font-bold",
                                            "text-white"
                                        )}
                                    >
                                        {proj.title}
                                    </h3>
                                    <div
                                        className={cn(
                                            "flex items-center gap-1"
                                        )}
                                    >
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

                                <p
                                    className={cn(
                                        "line-clamp-3 text-sm",
                                        "text-gray-600"
                                    )}
                                >
                                    {proj.description}
                                </p>
                            </div>

                            {proj.metrics.length > 0 && (
                                <div className={cn("space-y-1")}>
                                    <span
                                        className={cn(
                                            "flex items-center gap-1 text-xs font-semibold",
                                            "text-gray-400"
                                        )}
                                    >
                                        <TrendingUp className={cn("h-3 w-3")} />{" "}
                                        Impact :
                                    </span>
                                    <div className={cn("flex flex-wrap gap-1")}>
                                        {proj.metrics.map((m, mIdx) => (
                                            <span
                                                key={mIdx}
                                                className={cn(
                                                    "rounded px-2 py-0.5 text-xs font-medium",
                                                    "bg-emerald-500/10 text-emerald-400"
                                                )}
                                            >
                                                {m}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tags */}
                            <div className={cn("flex flex-wrap gap-1.5 pt-2")}>
                                {proj.tags.map((tag, tIdx) => (
                                    <span
                                        key={tIdx}
                                        className={cn(
                                            "rounded px-2 py-0.5 text-xs",
                                            "bg-gray-700 text-gray-700"
                                        )}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Footer links */}
                            <div
                                className={cn(
                                    "flex items-center justify-between border-t pt-4 text-xs",
                                    "border-gray-700/60"
                                )}
                            >
                                <div className={cn("flex items-center gap-2")}>
                                    {proj.github && (
                                        <a
                                            href={proj.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={cn(
                                                "flex items-center gap-1",
                                                "text-gray-400 hover:text-blue-500"
                                            )}
                                        >
                                            <GithubIcon /> Code
                                        </a>
                                    )}
                                    {proj.demo && (
                                        <a
                                            href={proj.demo}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={cn(
                                                "flex items-center gap-1 font-medium hover:underline",
                                                "text-blue-400"
                                            )}
                                        >
                                            <ExternalLink
                                                className={cn("h-3.5 w-3.5")}
                                            />{" "}
                                            Démo Live
                                        </a>
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        "font-mono text-[10px] uppercase",
                                        "text-gray-400"
                                    )}
                                >
                                    Couleur: {proj.color}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL CRÉATION / ÉDITION */}
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
                        {/* Header */}
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
                                <FolderGit2
                                    className={cn("h-5 w-5", "text-blue-500")}
                                />
                                {editingIndex !== null
                                    ? "Modifier le projet"
                                    : "Ajouter un projet"}
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

                        {/* Form */}
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
                                        Titre du projet
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
                                        Catégorie
                                    </label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
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
                                        Nombre d'étoiles / Note
                                    </label>
                                    <input
                                        type="number"
                                        name="stars"
                                        value={formData.stars}
                                        onChange={handleChange}
                                        min={0}
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
                                        <Palette
                                            className={cn("h-3.5 w-3.5")}
                                        />{" "}
                                        Thème / Couleur accent
                                    </label>
                                    <select
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                        className={cn(
                                            "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2",
                                            "border-gray-700 bg-gray-900 focus:ring-blue-500"
                                        )}
                                    >
                                        <option value="accent">
                                            Accent (Bleu / Cyan)
                                        </option>
                                        <option value="green">
                                            Vert (Emerald)
                                        </option>
                                        <option value="purple">Violet</option>
                                        <option value="orange">Orange</option>
                                    </select>
                                </div>
                            </div>

                            {/* Option Featured */}
                            <div className={cn("flex items-center gap-2 pt-1")}>
                                <input
                                    type="checkbox"
                                    id="featured"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                    className={cn(
                                        "h-4 w-4 rounded",
                                        "border-gray-300 text-blue-600 focus:ring-blue-500"
                                    )}
                                />
                                <label
                                    htmlFor="featured"
                                    className={cn(
                                        "cursor-pointer text-sm font-medium",
                                        "text-gray-300"
                                    )}
                                >
                                    Mettre ce projet en avant (Featured)
                                </label>
                            </div>

                            <div>
                                <label
                                    className={cn(
                                        "mb-1 block text-xs font-semibold",
                                        "text-gray-300"
                                    )}
                                >
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    required
                                    className={cn(
                                        "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2",
                                        "border-gray-700 bg-gray-900 focus:ring-blue-500"
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label
                                        className={cn(
                                            "mb-1 flex items-center gap-1 text-xs font-semibold",
                                            "block text-gray-300"
                                        )}
                                    >
                                        <GithubIcon /> URL Dépôt GitHub
                                    </label>
                                    <input
                                        type="url"
                                        name="github"
                                        value={formData.github}
                                        onChange={handleChange}
                                        placeholder="https://github.com/..."
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
                                        <ExternalLink
                                            className={cn("h-3.5 w-3.5")}
                                        />{" "}
                                        URL Démo Live
                                    </label>
                                    <input
                                        type="url"
                                        name="demo"
                                        value={formData.demo}
                                        onChange={handleChange}
                                        placeholder="https://monprojet.vercel.app"
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
                                        "mb-1 flex items-center gap-1 text-xs font-semibold",
                                        "block text-gray-300"
                                    )}
                                >
                                    <ImageIcon className={cn("h-3.5 w-3.5")} />{" "}
                                    URL de l'image de couverture
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

                            {/* Tags */}
                            <div>
                                <label
                                    className={cn(
                                        "mb-1 flex items-center gap-1 text-xs font-semibold",
                                        "block text-gray-300"
                                    )}
                                >
                                    <TagIcon className={cn("h-3.5 w-3.5")} />{" "}
                                    Technologies / Tags
                                </label>
                                <div className={cn("mb-2 flex gap-2")}>
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) =>
                                            setTagInput(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault()
                                                handleAddTag()
                                            }
                                        }}
                                        placeholder="Ajouter une tech (ex: React)"
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
                                                className={cn(
                                                    "hover:text-red-500"
                                                )}
                                            >
                                                <X className={cn("h-3 w-3")} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Metrics */}
                            <div>
                                <label
                                    className={cn(
                                        "mb-1 flex items-center gap-1 text-xs font-semibold",
                                        "block text-gray-300"
                                    )}
                                >
                                    <TrendingUp className={cn("h-3.5 w-3.5")} />{" "}
                                    Chiffres / Métriques de résultat
                                </label>
                                <div className={cn("mb-2 flex gap-2")}>
                                    <input
                                        type="text"
                                        value={metricInput}
                                        onChange={(e) =>
                                            setMetricInput(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault()
                                                handleAddMetric()
                                            }
                                        }}
                                        placeholder="ex: +40% de performance"
                                        className={cn(
                                            "flex-1 rounded-lg border px-3 py-1.5 text-sm outline-none",
                                            "border-gray-700 bg-gray-900"
                                        )}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddMetric}
                                        className={cn(
                                            "rounded-lg px-3 py-1.5 text-xs font-semibold",
                                            "bg-gray-700 hover:bg-gray-300"
                                        )}
                                    >
                                        Ajouter
                                    </button>
                                </div>
                                <div className={cn("flex flex-wrap gap-1.5")}>
                                    {formData.metrics.map((metric, mIdx) => (
                                        <span
                                            key={mIdx}
                                            className={cn(
                                                "flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium",
                                                "bg-emerald-500/10 text-emerald-400"
                                            )}
                                        >
                                            <Check className={cn("h-3 w-3")} />
                                            {metric}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveMetric(metric)
                                                }
                                                className={cn(
                                                    "hover:text-red-500"
                                                )}
                                            >
                                                <X className={cn("h-3 w-3")} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
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
