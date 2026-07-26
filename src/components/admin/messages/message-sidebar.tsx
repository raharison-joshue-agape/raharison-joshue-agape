import { Inbox, Mail, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { FilterType, ConversationGroup } from "./types"

interface MessageSidebarProps {
    filter: FilterType
    setFilter: (filter: FilterType) => void
    conversations: ConversationGroup[]
}

export function MessageSidebar({
    filter,
    setFilter,
    conversations,
}: MessageSidebarProps) {
    const unreadCount = conversations.filter((c) => !c.isRead).length
    const starredCount = conversations.filter((c) => c.isStarred).length

    return (
        <div className="flex space-y-1 border-b border-gray-800 p-3 lg:col-span-3 lg:flex-col lg:border-r lg:border-b-0">
            <div className="mb-2 hidden px-3 pt-2 text-xs font-semibold text-slate-500 lg:block">
                DOSSIERS
            </div>
            <Button
                variant={filter === "all" ? "secondary" : "ghost"}
                onClick={() => setFilter("all")}
                className={cn(
                    "justify-start gap-2 text-xs",
                    filter === "all" && "bg-gray-800 text-white"
                )}
            >
                <Inbox size={16} />
                <span className="hidden lg:inline">Toutes les discussions</span>
                <span className="ml-auto text-[10px] opacity-60">
                    {conversations.length}
                </span>
            </Button>
            <Button
                variant={filter === "unread" ? "secondary" : "ghost"}
                onClick={() => setFilter("unread")}
                className={cn(
                    "justify-start gap-2 text-xs",
                    filter === "unread" && "bg-gray-800 text-white"
                )}
            >
                <Mail size={16} />
                <span className="hidden lg:inline">Non lues</span>
                <span className="ml-auto text-[10px] opacity-60">
                    {unreadCount}
                </span>
            </Button>
            <Button
                variant={filter === "starred" ? "secondary" : "ghost"}
                onClick={() => setFilter("starred")}
                className={cn(
                    "justify-start gap-2 text-xs",
                    filter === "starred" && "bg-gray-800 text-white"
                )}
            >
                <Star size={16} className="text-amber-400" />
                <span className="hidden lg:inline">Favorites</span>
                <span className="ml-auto text-[10px] opacity-60">
                    {starredCount}
                </span>
            </Button>
        </div>
    )
}
