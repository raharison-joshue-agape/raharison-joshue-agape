import { Inbox, Mail, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type {
    FilterType,
    ConversationGroup,
} from "@/components/admin/messages/types"

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
        <div
            className={cn(
                "flex space-y-1 border-b p-3 lg:flex-col lg:border-r lg:border-b-0",
                "border-gray-800"
            )}
        >
            <div
                className={cn(
                    "mb-2 hidden px-3 pt-2 text-xs font-semibold lg:block",
                    "text-slate-500"
                )}
            >
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
                <span className={cn("hidden lg:inline")}>
                    Toutes les discussions
                </span>
                <span className={cn("ml-auto text-[10px] opacity-60")}>
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
                <span className={cn("hidden lg:inline")}>Non lues</span>
                <span className={cn("ml-auto text-[10px] opacity-60")}>
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
                <Star size={16} className={cn("text-amber-400")} />
                <span className={cn("hidden lg:inline")}>Favorites</span>
                <span className={cn("ml-auto text-[10px] opacity-60")}>
                    {starredCount}
                </span>
            </Button>
        </div>
    )
}
