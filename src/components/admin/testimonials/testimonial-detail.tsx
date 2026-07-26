import { Star, Edit, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Testimonial } from "@/components/admin/testimonials/testimonial-list"

interface TestimonialDetailProps {
    currentId: string | null
    testimonials: Testimonial[]
    isEditing: boolean
    onStartEdit: () => void
    onCancelEdit: () => void
    onSave: (e: React.FormEvent) => void
    // Form states
    author: string
    setAuthor: (v: string) => void
    role: string
    setRole: (v: string) => void
    company: string
    setCompany: (v: string) => void
    content: string
    setContent: (v: string) => void
    rating: number
    setRating: (v: number) => void
}

export function TestimonialDetail({
    currentId,
    testimonials,
    isEditing,
    onStartEdit,
    onCancelEdit,
    onSave,
    author,
    setAuthor,
    role,
    setRole,
    company,
    setCompany,
    content,
    setContent,
    rating,
    setRating,
}: TestimonialDetailProps) {
    const active = testimonials.find((t) => t.id === currentId)

    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 shadow-lg backdrop-blur-md lg:col-span-2">
            <div className="flex shrink-0 items-center justify-between border-b border-gray-800 bg-gray-900/80 px-4 py-3">
                <span className="text-xs font-semibold text-white">
                    {isEditing
                        ? currentId
                            ? "Modifier le témoignage"
                            : "Nouveau témoignage"
                        : "Détails de l'avis"}
                </span>
                {!isEditing && currentId && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-7 border-gray-700 bg-transparent text-[11px] text-slate-200 hover:bg-gray-800"
                        onClick={onStartEdit}
                    >
                        <Edit size={12} className="mr-1.5" /> Éditer
                    </Button>
                )}
            </div>

            {isEditing ? (
                <form
                    onSubmit={onSave}
                    className="flex flex-1 flex-col justify-between space-y-3 overflow-y-auto p-4"
                >
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <label className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
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
                                <label className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
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
                                <label className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
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
                            <label className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
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
                                                star <= rating
                                                    ? "fill-amber-400 text-amber-400"
                                                    : "fill-gray-800 text-gray-800"
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                                Témoignage
                            </label>
                            <textarea
                                rows={5}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Message..."
                                className="w-full resize-none rounded-md border border-gray-800 bg-gray-950/80 p-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:ring-1 focus:ring-slate-700 focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center justify-end gap-2 border-t border-gray-800 pt-3">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={onCancelEdit}
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
                <div className="flex flex-1 flex-col space-y-4 overflow-y-auto p-4 text-xs">
                    {active ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-gray-800/80 pb-3">
                                <Avatar className="h-10 w-10 border border-gray-800">
                                    <AvatarFallback className="bg-gray-900 text-xs font-medium text-slate-200">
                                        {active.author
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold text-slate-100">
                                        {active.author}
                                    </h3>
                                    <p className="text-[11px] text-slate-400">
                                        {active.role} -{" "}
                                        <span className="text-slate-300">
                                            {active.company}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                                    Note attribuée
                                </span>
                                <div className="flex items-center gap-1 text-amber-400">
                                    {Array.from({ length: active.rating }).map(
                                        (_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                className="fill-amber-400"
                                            />
                                        )
                                    )}
                                    <span className="ml-1 text-xs font-medium text-slate-300">
                                        ({active.rating}/5)
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                                    Message complet
                                </span>
                                <p className="rounded-lg border border-gray-800/50 bg-gray-950/60 p-3 leading-relaxed text-slate-300">
                                    "{active.content}"
                                </p>
                            </div>

                            <div className="space-y-1 border-t border-gray-800/80 pt-2 text-[11px] text-slate-500">
                                <div className="flex justify-between">
                                    <span>Statut :</span>
                                    <span
                                        className={
                                            active.status === "published"
                                                ? "font-medium text-emerald-400"
                                                : "font-medium text-amber-400"
                                        }
                                    >
                                        {active.status === "published"
                                            ? "Publié"
                                            : "En attente"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Date d'ajout :</span>
                                    <span className="text-slate-300">
                                        {active.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-full flex-1 flex-col items-center justify-center text-center text-slate-500">
                            <p>Sélectionnez un avis pour voir les détails.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
