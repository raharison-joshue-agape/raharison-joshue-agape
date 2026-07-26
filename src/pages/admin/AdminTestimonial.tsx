import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Plus, Trash2, Edit, Check, Search, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Testimonial {
    id: string
    author: string
    role: string
    company: string
    content: string
    rating: number
    status: "published" | "pending"
    date: string
}

const initialTestimonials: Testimonial[] = [
    {
        id: "t1",
        author: "Marc Andriana",
        role: "Directeur Technique",
        company: "DGSR",
        content: "L'architecture mise en place pour la plateforme ERP et la sécurisation des flux de données a totalement transformé nos opérations internes. Un travail d'une rigueur exemplaire.",
        rating: 5,
        status: "published",
        date: "2026-07-20",
    },
    {
        id: "t2",
        author: "Sarah Ravelo",
        role: "Chef de Projet Digital",
        company: "Tech Solutions Madagascar",
        content: "Collaboration fluide et livraison dans les délais. La maîtrise de la stack Angular / NestJS a permis d'obtenir des performances exceptionnelles sur l'interface client.",
        rating: 5,
        status: "published",
        date: "2026-07-15",
    },
    {
        id: "t3",
        author: "Jean Dupont",
        role: "Consultant Indépendant",
        company: "Enterprise Corp",
        content: "Un développeur et architecte hautement qualifié. Les spécifications techniques ont été respectées à la lettre avec un souci constant de la sécurité.",
        rating: 4,
        status: "pending",
        date: "2026-07-25",
    },
]

export default function AdminTestimonial() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
    const [isEditing, setIsEditing] = useState(false)
    const [currentId, setCurrentId] = useState<string | null>(initialTestimonials[0]?.id || null)
    const [searchQuery, setSearchQuery] = useState("")

    // Form state
    const [author, setAuthor] = useState(initialTestimonials[0]?.author || "")
    const [role, setRole] = useState(initialTestimonials[0]?.role || "")
    const [company, setCompany] = useState(initialTestimonials[0]?.company || "")
    const [content, setContent] = useState(initialTestimonials[0]?.content || "")
    const [rating, setRating] = useState(initialTestimonials[0]?.rating || 5)

    const handleSelectTestimonial = (t: Testimonial) => {
        setCurrentId(t.id)
        setAuthor(t.author)
        setRole(t.role)
        setCompany(t.company)
        setContent(t.content)
        setRating(t.rating)
        setIsEditing(false) // Mode consultation par défaut au clic
    }

    const handleOpenCreate = () => {
        setCurrentId(null)
        setAuthor("")
        setRole("")
        setCompany("")
        setContent("")
        setRating(5)
        setIsEditing(true)
    }

    const handleOpenEdit = (t: Testimonial) => {
        handleSelectTestimonial(t)
        setIsEditing(true)
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        if (!author.trim() || !content.trim()) return

        if (currentId) {
            setTestimonials((prev) =>
                prev.map((t) =>
                    t.id === currentId
                        ? { ...t, author, role, company, content, rating }
                        : t
                )
            )
        } else {
            const newTestimonial: Testimonial = {
                id: Date.now().toString(),
                author,
                role,
                company,
                content,
                rating,
                status: "published",
                date: new Date().toISOString().split("T")[0],
            }
            setTestimonials([newTestimonial, ...testimonials])
            setCurrentId(newTestimonial.id)
        }

        setIsEditing(false)
    }

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        if (confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) {
            const updated = testimonials.filter((t) => t.id !== id)
            setTestimonials(updated)
            if (currentId === id && updated.length > 0) {
                handleSelectTestimonial(updated[0])
            }
        }
    }

    const toggleStatus = (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        setTestimonials((prev) =>
            prev.map((t) =>
                t.id === id
                    ? { ...t, status: t.status === "published" ? "pending" : "published" }
                    : t
            )
        )
    }

    const filteredTestimonials = testimonials.filter((t) =>
        t.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.company.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-[calc(100vh-6rem)] flex-col space-y-4 p-1"
        >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shrink-0">
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        Avis & Témoignages
                    </h1>
                    <p className="text-xs text-slate-400">
                        Gérez la visibilité des recommandations clients sur votre portfolio public.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative w-64 hidden md:block">
                        <Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                        <Input
                            placeholder="Rechercher..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-8 w-full border-gray-800 bg-gray-950/50 pl-9 text-xs text-slate-200"
                        />
                    </div>
                    <Button
                        onClick={handleOpenCreate}
                        size="sm"
                        className="h-8 gap-2 bg-white text-xs font-semibold text-gray-950 hover:bg-slate-200"
                    >
                        <Plus size={14} />
                        Nouveau
                    </Button>
                </div>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-5">
                
                <div className="flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900/30 backdrop-blur-md lg:col-span-3">
                    <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3 shrink-0">
                        <span className="text-xs font-semibold text-slate-300">
                            Témoignages ({filteredTestimonials.length})
                        </span>
                    </div>
                    
                    <div className="flex-1 divide-y divide-gray-800/40 overflow-y-auto p-2 space-y-2">
                        {filteredTestimonials.length === 0 ? (
                            <div className="flex h-40 flex-col items-center justify-center text-slate-500">
                                <Quote size={24} className="mb-2 opacity-20" />
                                <p className="text-xs">Aucun témoignage trouvé.</p>
                            </div>
                        ) : (
                            filteredTestimonials.map((t) => {
                                const initials = t.author.split(" ").map((n) => n[0]).join("")
                                const isActive = currentId === t.id

                                return (
                                    <div
                                        key={t.id}
                                        onClick={() => handleSelectTestimonial(t)}
                                        className={cn(
                                            "group flex flex-col gap-2.5 rounded-lg p-3.5 cursor-pointer transition-all border border-transparent",
                                            isActive 
                                                ? "bg-gray-800/40 border-gray-700/60 shadow-sm" 
                                                : "hover:bg-gray-800/20 hover:border-gray-800"
                                        )}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border border-gray-800 shrink-0">
                                                    <AvatarFallback className="bg-gray-900 text-xs font-medium text-slate-300">
                                                        {initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-xs font-semibold text-slate-100">
                                                            {t.author}
                                                        </h3>
                                                        <Badge
                                                            variant="outline"
                                                            className={cn(
                                                                "h-4.5 cursor-pointer border-transparent px-1.5 text-[9px] font-medium transition-colors",
                                                                t.status === "published"
                                                                    ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                                                                    : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                                                            )}
                                                            onClick={(e) => toggleStatus(t.id, e)}
                                                        >
                                                            {t.status === "published" ? "Public" : "Brouillon"}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-[11px] text-slate-400">
                                                        {t.role} • <span className="text-slate-300">{t.company}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-slate-400 hover:text-white"
                                                    onClick={(e) => { e.stopPropagation(); handleOpenEdit(t); }}
                                                >
                                                    <Edit size={13} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-slate-400 hover:text-red-400"
                                                    onClick={(e) => handleDelete(t.id, e)}
                                                >
                                                    <Trash2 size={13} />
                                                </Button>
                                            </div>
                                        </div>

                                        <p className="text-xs leading-relaxed text-slate-300 line-clamp-2">
                                            "{t.content}"
                                        </p>

                                        <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500">
                                            <div className="flex items-center gap-0.5">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        size={11} 
                                                        className={cn(i < t.rating ? "fill-amber-400 text-amber-400" : "fill-gray-800 text-gray-800")} 
                                                    />
                                                ))}
                                            </div>
                                            <span>{t.date}</span>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>

                <div className="flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-md lg:col-span-2 shadow-lg">
                    <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3 bg-gray-900/80 shrink-0">
                        <span className="text-xs font-semibold text-white">
                            {isEditing ? (currentId ? "Modifier le témoignage" : "Nouveau témoignage") : "Détails de l'avis"}
                        </span>
                        {!isEditing && currentId && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 border-gray-700 bg-transparent text-[11px] text-slate-200 hover:bg-gray-800"
                                onClick={() => {
                                    const active = testimonials.find(t => t.id === currentId)
                                    if (active) handleOpenEdit(active)
                                }}
                            >
                                <Edit size={12} className="mr-1.5" /> Éditer
                            </Button>
                        )}
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSave} className="flex flex-1 flex-col justify-between p-4 space-y-3 overflow-y-auto">
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                        Auteur
                                    </label>
                                    <Input
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        placeholder="Nom complet"
                                        className="h-8 border-gray-800 bg-gray-950/80 text-xs text-slate-200"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                            Rôle
                                        </label>
                                        <Input
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            placeholder="Ex: CTO"
                                            className="h-8 border-gray-800 bg-gray-950/80 text-xs text-slate-200"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                            Entreprise
                                        </label>
                                        <Input
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            placeholder="Ex: DGSR"
                                            className="h-8 border-gray-800 bg-gray-950/80 text-xs text-slate-200"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                        Note
                                    </label>
                                    <div className="flex items-center gap-1.5 rounded-md border border-gray-800 bg-gray-950/50 p-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                type="button"
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className="focus:outline-none"
                                            >
                                                <Star
                                                    size={16}
                                                    className={cn(
                                                        star <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-800 text-gray-800"
                                                    )}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                        Témoignage
                                    </label>
                                    <textarea
                                        rows={5}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Message..."
                                        className="w-full resize-none rounded-md border border-gray-800 bg-gray-950/80 p-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-700"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-800 shrink-0">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsEditing(false)}
                                    className="h-8 text-xs font-medium text-slate-400 hover:text-white"
                                >
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="h-8 gap-1 bg-white text-xs font-semibold text-gray-950 hover:bg-slate-200"
                                >
                                    <Check size={13} />
                                    Enregistrer
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex flex-1 flex-col p-4 space-y-4 overflow-y-auto text-xs">
                            {currentId ? (() => {
                                const active = testimonials.find(t => t.id === currentId)
                                if (!active) return null
                                return (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 pb-3 border-b border-gray-800/80">
                                            <Avatar className="h-10 w-10 border border-gray-800">
                                                <AvatarFallback className="bg-gray-900 text-xs font-medium text-slate-200">
                                                    {active.author.split(" ").map(n => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold text-slate-100">{active.author}</h3>
                                                <p className="text-[11px] text-slate-400">{active.role} - <span className="text-slate-300">{active.company}</span></p>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Note attribuée</span>
                                            <div className="flex items-center gap-1 text-amber-400">
                                                {Array.from({ length: active.rating }).map((_, i) => (
                                                    <Star key={i} size={14} className="fill-amber-400" />
                                                ))}
                                                <span className="ml-1 text-xs text-slate-300 font-medium">({active.rating}/5)</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Message complet</span>
                                            <p className="rounded-lg bg-gray-950/60 p-3 leading-relaxed text-slate-300 border border-gray-800/50">
                                                "{active.content}"
                                            </p>
                                        </div>

                                        <div className="space-y-1 pt-2 text-[11px] text-slate-500 border-t border-gray-800/80">
                                            <div className="flex justify-between">
                                                <span>Statut :</span>
                                                <span className={active.status === "published" ? "text-emerald-400 font-medium" : "text-amber-400 font-medium"}>
                                                    {active.status === "published" ? "Publié" : "En attente"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Date d'ajout :</span>
                                                <span className="text-slate-300">{active.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })() : (
                                <div className="flex flex-1 flex-col items-center justify-center text-center text-slate-500 h-full">
                                    <p>Sélectionnez un avis pour voir les détails.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}