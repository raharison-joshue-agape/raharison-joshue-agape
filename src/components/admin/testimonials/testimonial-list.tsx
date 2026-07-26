import { Star, Plus, Trash2, Edit, Search, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export interface Testimonial {
    id: string
    author: string
    role: string
    company: string
    content: string
    rating: number
    status: "published" | "pending"
    date: string
}

interface TestimonialListProps {
    testimonials: Testimonial[]
    currentId: string | null
    searchQuery: string
    onSearchChange: (query: string) => void
    onSelect: (t: Testimonial) => void
    onOpenCreate: () => void
    onOpenEdit: (t: Testimonial, e: React.MouseEvent) => void
    onDelete: (id: string, e: React.MouseEvent) => void
    onToggleStatus: (id: string, e: React.MouseEvent) => void
}

export function TestimonialList({
    testimonials,
    currentId,
    searchQuery,
    onSearchChange,
    onSelect,
    onOpenCreate,
    onOpenEdit,
    onDelete,
    onToggleStatus,
}: TestimonialListProps) {
    const filteredTestimonials = testimonials.filter(
        (t) =>
            t.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.company.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div
            className={cn(
                "flex flex-col overflow-hidden rounded-xl border backdrop-blur-md lg:col-span-3",
                "border-gray-800 bg-gray-900/30"
            )}
        >
            <div
                className={cn(
                    "flex shrink-0 items-center justify-between border-b px-4 py-3",
                    "border-gray-800"
                )}
            >
                <span className="text-xs font-semibold text-slate-300">
                    Témoignages ({filteredTestimonials.length})
                </span>
                <Button
                    onClick={onOpenCreate}
                    size="sm"
                    className="h-7 gap-1.5 bg-white text-[11px] font-semibold text-gray-950 hover:bg-slate-200"
                >
                    <Plus size={13} />
                    Nouveau
                </Button>
            </div>

            <div className="hidden shrink-0 border-b border-gray-800/60 p-3 md:block">
                <div className="relative w-full">
                    <Search
                        size={14}
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500"
                    />
                    <Input
                        placeholder="Rechercher par nom ou entreprise..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="h-8 w-full border-gray-800 bg-gray-950/50 pl-9 text-xs text-slate-200"
                    />
                </div>
            </div>

            <div className="flex-1 space-y-2 divide-y divide-gray-800/40 overflow-y-auto p-2">
                {filteredTestimonials.length === 0 ? (
                    <div className="flex h-40 flex-col items-center justify-center text-slate-500">
                        <Quote size={24} className="mb-2 opacity-20" />
                        <p className="text-xs">Aucun témoignage trouvé.</p>
                    </div>
                ) : (
                    filteredTestimonials.map((t) => {
                        const initials = t.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        const isActive = currentId === t.id

                        return (
                            <div
                                key={t.id}
                                onClick={() => onSelect(t)}
                                className={cn(
                                    "group flex cursor-pointer flex-col gap-2.5 rounded-lg border border-transparent p-3.5 transition-all",
                                    isActive
                                        ? "border-gray-700/60 bg-gray-800/40 shadow-sm"
                                        : "hover:border-gray-800 hover:bg-gray-800/20"
                                )}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 shrink-0 border border-gray-800">
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
                                                    onClick={(e) =>
                                                        onToggleStatus(t.id, e)
                                                    }
                                                >
                                                    {t.status === "published"
                                                        ? "Public"
                                                        : "Brouillon"}
                                                </Badge>
                                            </div>
                                            <p className="text-[11px] text-slate-400">
                                                {t.role} •{" "}
                                                <span className="text-slate-300">
                                                    {t.company}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-slate-400 hover:text-white"
                                            onClick={(e) => onOpenEdit(t, e)}
                                        >
                                            <Edit size={13} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-slate-400 hover:text-red-400"
                                            onClick={(e) => onDelete(t.id, e)}
                                        >
                                            <Trash2 size={13} />
                                        </Button>
                                    </div>
                                </div>

                                <p className="line-clamp-2 text-xs leading-relaxed text-slate-300">
                                    "{t.content}"
                                </p>

                                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500">
                                    <div className="flex items-center gap-0.5">
                                        {Array.from({ length: 5 }).map(
                                            (_, i) => (
                                                <Star
                                                    key={i}
                                                    size={11}
                                                    className={cn(
                                                        i < t.rating
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "fill-gray-800 text-gray-800"
                                                    )}
                                                />
                                            )
                                        )}
                                    </div>
                                    <span>{t.date}</span>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
