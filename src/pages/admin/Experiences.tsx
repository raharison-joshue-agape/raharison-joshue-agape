import {
    useState,
    type ChangeEvent,
    type FormEvent,
    type KeyboardEvent,
} from "react"
import { motion } from "framer-motion"
import {
    Briefcase,
    Building2,
    Calendar,
    CloudUpload,
    ImageIcon,
    MapPin,
    Pencil,
    Plus,
    Trash2,
    X,
} from "lucide-react"

import { experiences } from "@/data/experiences"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export interface Experience {
    id?: string
    year: string
    type: string
    title: string
    company: string
    location: string
    description: string
    tags: string[]
    image: string
}

interface ExperiencesProps {
    loading?: boolean
}

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

export default function Experiences({ loading = false }: ExperiencesProps) {
    const [experiencesData, setExperiences] =
        useState<Experience[]>(experiences)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isOpenDelete, setOpenDelete] = useState(false)

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
        setFormData(experiencesData[index])
        setIsModalOpen(true)
    }

    // Suppression d'une expérience
    const handleDelete = () => {
        setOpenDelete(true)
    }

    // Changement dans les champs standard
    const handleChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Upload d'image avec lecture en Base64 pour prévisualisation
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    image: reader.result as string,
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    // Gestion des tags
    const handleAddTag = () => {
        const trimmed = newTagInput.trim()
        if (trimmed && !formData.tags.includes(trimmed)) {
            setFormData((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }))
            setNewTagInput("")
        }
    }

    const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleAddTag()
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
            const updated = [...experiencesData]
            updated[editingIndex] = formData
            setExperiences(updated)
        } else {
            setExperiences((prev) => [formData, ...prev])
        }
        setIsModalOpen(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn("space-y-6 px-4 py-6 md:px-16")}
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
                        Gestion des Expériences
                    </h2>
                    <p className={cn("text-xs", "text-slate-400")}>
                        Ajoutez, modifiez ou supprimez vos expériences
                        professionnelles et stages.
                    </p>
                </div>

                <Button
                    onClick={handleOpenCreateModal}
                    disabled={loading}
                    className={cn(
                        "h-10 rounded-md",
                        "bg-blue-600 text-white hover:bg-blue-700"
                    )}
                >
                    <Plus size={16} /> Ajouter une expérience
                </Button>
            </div>

            {/* Liste des cartes d'expériences */}
            <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-3")}>
                {experiencesData.map((exp, index) => (
                    <div
                        key={exp.id || `${exp.title}-${index}`}
                        className={cn(
                            "flex flex-col justify-between gap-4 rounded-lg border p-5 shadow-sm transition hover:shadow-md",
                            "border-gray-800 bg-gray-900/50"
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
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            handleOpenEditModal(index)
                                        }
                                        className={cn(
                                            "h-8 w-8",
                                            "text-gray-400 hover:bg-gray-800 hover:text-blue-500"
                                        )}
                                        title="Modifier"
                                    >
                                        <Pencil size={16} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setOpenDelete(true)}
                                        className={cn(
                                            "h-8 w-8",
                                            "text-gray-400 hover:bg-gray-800 hover:text-red-500"
                                        )}
                                        title="Supprimer"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>

                            {/* Aperçu de l'image */}
                            {exp.image && (
                                <div className="relative h-40 w-full overflow-hidden rounded-md border border-gray-800 bg-gray-950">
                                    <img
                                        src={exp.image}
                                        alt={exp.title}
                                        className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            )}
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
                                        size={15}
                                        className={cn("text-blue-500")}
                                    />
                                    {exp.company}
                                </span>
                                <span className={cn("flex items-center gap-1")}>
                                    <Calendar
                                        size={15}
                                        className={cn("text-blue-500")}
                                    />
                                    {exp.year}
                                </span>
                                {exp.location && (
                                    <span
                                        className={cn(
                                            "flex items-center gap-1"
                                        )}
                                    >
                                        <MapPin
                                            size={15}
                                            className={cn("text-blue-500")}
                                        />
                                        {exp.location}
                                    </span>
                                )}
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

                        {exp.tags && exp.tags.length > 0 && (
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
                                            "bg-gray-800 text-gray-300"
                                        )}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal d'édition / création */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent
                    showCloseButton={false}
                    className={cn(
                        "min-w-3xl backdrop-blur-sm",
                        "border-gray-800 bg-gray-900/70 text-slate-100"
                    )}
                >
                    <DialogHeader>
                        <DialogTitle
                            className={cn(
                                "flex items-center gap-2.5 text-lg font-semibold"
                            )}
                        >
                            <Briefcase
                                size={24}
                                className={cn("text-blue-500")}
                            />
                            {editingIndex !== null
                                ? "Modifier l'expérience"
                                : "Ajouter une expérience"}
                        </DialogTitle>
                    </DialogHeader>

                    <form
                        id="experience-form"
                        onSubmit={handleSubmit}
                        className="space-y-4 pt-2"
                    >
                        <div
                            className={cn(
                                "grid grid-cols-1 gap-6 md:grid-cols-5"
                            )}
                        >
                            <div className={cn("md:col-span-2")}>
                                <label
                                    className={cn(
                                        "mb-1.5 flex items-center gap-2 text-xs font-semibold",
                                        "text-gray-300"
                                    )}
                                >
                                    <ImageIcon size={15} /> Image d'illustration
                                </label>
                                <label
                                    htmlFor="image-upload"
                                    className={cn(
                                        "relative flex h-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border border-dashed p-2 transition",
                                        "border-gray-700 bg-gray-950/40 hover:border-gray-500"
                                    )}
                                >
                                    {formData.image ? (
                                        <img
                                            src={formData.image}
                                            alt="Aperçu"
                                            className={cn(
                                                "h-full w-full rounded object-cover"
                                            )}
                                        />
                                    ) : (
                                        <div
                                            className={cn(
                                                "flex flex-col items-center gap-1 text-center text-xs",
                                                "text-gray-400"
                                            )}
                                        >
                                            <CloudUpload
                                                size={32}
                                                className={cn("text-blue-500")}
                                            />
                                            <span>Télécharger une image</span>
                                        </div>
                                    )}
                                </label>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className={cn("hidden")}
                                />
                            </div>

                            {/* Titre & Entreprise */}
                            <div className={cn("space-y-3 md:col-span-3")}>
                                <div className={cn("space-y-1")}>
                                    <label
                                        htmlFor="title"
                                        className={cn(
                                            "block text-xs font-semibold",
                                            "text-gray-300"
                                        )}
                                    >
                                        Titre du poste / Mission *
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className={cn(
                                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                            "border-gray-700 bg-gray-950/30 text-slate-100 placeholder:text-slate-500 focus:ring-emerald-500"
                                        )}
                                    />
                                </div>

                                <div className={cn("space-y-1")}>
                                    <label
                                        htmlFor="company"
                                        className={cn(
                                            "block text-xs font-semibold",
                                            "text-gray-300"
                                        )}
                                    >
                                        Entreprise / Organisation *
                                    </label>
                                    <input
                                        id="company"
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                        className={cn(
                                            "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                            "border-gray-700 bg-gray-950/30 text-slate-100 placeholder:text-slate-500 focus:ring-emerald-500"
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Type & Période */}
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
                                    Type de contrat
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className={cn(
                                        "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                        "border-gray-700 bg-gray-950/30 text-slate-100 placeholder:text-slate-500 focus:ring-emerald-500"
                                    )}
                                >
                                    <option value="Freelance">Freelance</option>
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
                                    Période (ex: Avr. 2026 - Jui. 2026) *
                                </label>
                                <input
                                    type="text"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                    className={cn(
                                        "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                        "border-gray-700 bg-gray-950/30 text-slate-100 placeholder:text-slate-500 focus:ring-emerald-500"
                                    )}
                                />
                            </div>
                        </div>

                        {/* Localisation */}
                        <div>
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
                                    "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                    "border-gray-700 bg-gray-950/30 text-slate-100 placeholder:text-slate-500 focus:ring-emerald-500"
                                )}
                            />
                        </div>

                        {/* Description */}
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
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                className={cn(
                                    "-mb-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                    "border-gray-700 bg-gray-950/30 text-slate-100 placeholder:text-slate-500 focus:ring-emerald-500"
                                )}
                            />
                        </div>

                        {/* Saisie & Affichage des Tags */}
                        <div>
                            <label
                                className={cn(
                                    "mb-1 block text-xs font-semibold",
                                    "text-gray-300"
                                )}
                            >
                                Technologies / Tags
                            </label>
                            <div className={cn("flex items-center gap-2")}>
                                <input
                                    type="text"
                                    value={newTagInput}
                                    onChange={(e) =>
                                        setNewTagInput(e.target.value)
                                    }
                                    onKeyDown={handleTagKeyDown}
                                    placeholder="Ajouter un tag (ex: React, TypeScript) et appuyer sur Entrée"
                                    className={cn(
                                        "w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none",
                                        "border-gray-700 bg-gray-950/30 text-slate-100 placeholder:text-slate-500 focus:ring-emerald-500"
                                    )}
                                />
                                <Button
                                    type="button"
                                    onClick={handleAddTag}
                                    variant="secondary"
                                    className={cn(
                                        "h-10 shrink-0",
                                        "bg-gray-800 hover:bg-gray-700"
                                    )}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            {formData.tags.length > 0 && (
                                <div
                                    className={cn(
                                        "mt-2 flex flex-wrap gap-1.5"
                                    )}
                                >
                                    {formData.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={cn(
                                                "inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs",
                                                "bg-gray-800 text-blue-400"
                                            )}
                                        >
                                            #{tag}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveTag(tag)
                                                }
                                                className={cn(
                                                    "text-gray-400 hover:text-red-400"
                                                )}
                                            >
                                                <X size={15} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Boutons du Formulaire */}
                        <DialogFooter
                            className={cn("mt-6 gap-2", "bg-gray-800/50")}
                        >
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => setIsModalOpen(false)}
                                className={cn(
                                    "h-10 px-4",
                                    "bg-gray-700/80 text-gray-300 hover:bg-gray-700"
                                )}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                className={cn(
                                    "h-10 px-4",
                                    "bg-blue-600 text-white hover:bg-blue-700"
                                )}
                            >
                                {editingIndex !== null
                                    ? "Mettre à jour"
                                    : "Enregistrer"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Modal de suppression */}
            <Dialog open={isOpenDelete}>
                <DialogContent
                    showCloseButton={false}
                    className={cn("backdrop-blur-sm", "bg-gray-900/50")}
                >
                    <DialogHeader>
                        <DialogTitle>
                            <div className={cn("flex items-center gap-x-2.5")}>
                                <Trash2 size={25} />
                                Supprimer l'expérience
                            </div>
                        </DialogTitle>
                        <DialogDescription className={cn("mt-3 text-sm")}>
                            Êtes-vous sûr de vouloir supprimer cette expérience
                            ? Cette action est <strong>irréversible</strong> et
                            la retirera définitivement de votre parcours.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter
                        className={cn("py-2 sm:justify-end", "bg-gray-900/80")}
                    >
                        <Button
                            variant="ghost"
                            onClick={() => setOpenDelete(false)}
                            autoFocus
                        >
                            Annuler
                        </Button>
                        <Button
                            disabled={loading}
                            className={cn(
                                "rounded-md px-4 pt-2 pb-1.75 normal-case",
                                "bg-red-600 text-white hover:bg-red-600/80 dark:bg-red-500 dark:hover:bg-red-500/80"
                            )}
                            onClick={handleDelete}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
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
                                    Suppression...
                                </span>
                            ) : (
                                "Oui, supprimer"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </motion.div>
    )
}
