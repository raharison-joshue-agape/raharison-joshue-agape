import { useState } from "react"
import { motion } from "framer-motion"
import {
    TestimonialList,
    type Testimonial,
} from "@/components/admin/testimonials/testimonial-list"
import { TestimonialDetail } from "@/components/admin/testimonials/testimonial-detail"
import { cn } from "@/lib/utils"

const initialTestimonials: Testimonial[] = [
    {
        id: "t1",
        author: "Marc Andriana",
        role: "Directeur Technique",
        company: "DGSR",
        content:
            "L'architecture mise en place pour la plateforme ERP et la sécurisation des flux de données a totalement transformé nos opérations internes. Un travail d'une rigueur exemplaire.",
        rating: 5,
        status: "published",
        date: "2026-07-20",
    },
    {
        id: "t2",
        author: "Sarah Ravelo",
        role: "Chef de Projet Digital",
        company: "Tech Solutions Madagascar",
        content:
            "Collaboration fluide et livraison dans les délais. La maîtrise de la stack Angular / NestJS a permis d'obtenir des performances exceptionnelles sur l'interface client.",
        rating: 5,
        status: "published",
        date: "2026-07-15",
    },
    {
        id: "t3",
        author: "Jean Dupont",
        role: "Consultant Indépendant",
        company: "Enterprise Corp",
        content:
            "Un développeur et architecte hautement qualifié. Les spécifications techniques ont été respectées à la lettre avec un souci constant de la sécurité.",
        rating: 4,
        status: "pending",
        date: "2026-07-25",
    },
]

export default function AdminTestimonial() {
    const [testimonials, setTestimonials] =
        useState<Testimonial[]>(initialTestimonials)
    const [isEditing, setIsEditing] = useState(false)
    const [currentId, setCurrentId] = useState<string | null>(
        initialTestimonials[0]?.id || null
    )
    const [searchQuery, setSearchQuery] = useState("")

    // Form state
    const [author, setAuthor] = useState(initialTestimonials[0]?.author || "")
    const [role, setRole] = useState(initialTestimonials[0]?.role || "")
    const [company, setCompany] = useState(
        initialTestimonials[0]?.company || ""
    )
    const [content, setContent] = useState(
        initialTestimonials[0]?.content || ""
    )
    const [rating, setRating] = useState(initialTestimonials[0]?.rating || 5)

    const handleSelectTestimonial = (t: Testimonial) => {
        setCurrentId(t.id)
        setAuthor(t.author)
        setRole(t.role)
        setCompany(t.company)
        setContent(t.content)
        setRating(t.rating)
        setIsEditing(false)
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

    const handleOpenEdit = (t: Testimonial, e: React.MouseEvent) => {
        e.stopPropagation()
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
                    ? {
                          ...t,
                          status:
                              t.status === "published"
                                  ? "pending"
                                  : "published",
                      }
                    : t
            )
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn("flex h-[calc(100vh-6rem)] flex-col space-y-4 p-1")}
        >
            <div className={cn("flex shrink-0 flex-col gap-1")}>
                <h1
                    className={cn(
                        "text-xl font-bold tracking-tight",
                        "text-white"
                    )}
                >
                    Avis & Témoignages
                </h1>
                <p className={cn("text-xs", "text-slate-400")}>
                    Gérez la visibilité des recommandations clients sur votre
                    portfolio public.
                </p>
            </div>

            <div
                className={cn(
                    "grid flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-5"
                )}
            >
                <TestimonialList
                    testimonials={testimonials}
                    currentId={currentId}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onSelect={handleSelectTestimonial}
                    onOpenCreate={handleOpenCreate}
                    onOpenEdit={handleOpenEdit}
                    onDelete={handleDelete}
                    onToggleStatus={toggleStatus}
                />

                <TestimonialDetail
                    currentId={currentId}
                    testimonials={testimonials}
                    isEditing={isEditing}
                    onStartEdit={() => {
                        const active = testimonials.find(
                            (t) => t.id === currentId
                        )
                        if (active) {
                            setAuthor(active.author)
                            setRole(active.role)
                            setCompany(active.company)
                            setContent(active.content)
                            setRating(active.rating)
                        }
                        setIsEditing(true)
                    }}
                    onCancelEdit={() => setIsEditing(false)}
                    onSave={handleSave}
                    author={author}
                    setAuthor={setAuthor}
                    role={role}
                    setRole={setRole}
                    company={company}
                    setCompany={setCompany}
                    content={content}
                    setContent={setContent}
                    rating={rating}
                    setRating={setRating}
                />
            </div>
        </motion.div>
    )
}
