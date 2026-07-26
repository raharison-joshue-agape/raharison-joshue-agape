import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ConversationGroup } from "@/components/admin/messages/types"

interface ConversationItemProps {
    conversation: ConversationGroup
    isSelected: boolean
    onSelect: () => void
    onToggleStar: (e: React.MouseEvent) => void
    formatDate: (iso: string) => string
}

export function ConversationItem({
    conversation,
    isSelected,
    onSelect,
    onToggleStar,
    formatDate,
}: ConversationItemProps) {
    const lastMsg = conversation.messages[conversation.messages.length - 1]

    return (
        <div
            onClick={onSelect}
            className={cn(
                "group flex cursor-pointer flex-col gap-1 p-3 transition-colors",
                "hover:bg-gray-800/30",
                isSelected && "bg-gray-800/50",
                !conversation.isRead && "bg-emerald-500/10"
            )}
        >
            <div className={cn("flex items-center justify-between")}>
                <span
                    className={cn(
                        "text-xs font-medium",
                        !conversation.isRead
                            ? "font-bold text-white"
                            : "text-slate-300"
                    )}
                >
                    {conversation.name}
                </span>
                <div className={cn("flex items-center gap-1.5")}>
                    <button
                        type="button"
                        onClick={onToggleStar}
                        className={cn("text-slate-500 hover:text-amber-400")}
                    >
                        <Star
                            size={14}
                            className={cn(
                                conversation.isStarred &&
                                    "fill-amber-400 text-amber-400"
                            )}
                        />
                    </button>
                    <span className={cn("text-[10px]", "text-slate-500")}>
                        {formatDate(lastMsg.created_at)}
                    </span>
                </div>
            </div>
            <h4
                className={cn(
                    "truncate text-xs",
                    !conversation.isRead
                        ? cn("font-semibold", "text-slate-100")
                        : "text-slate-400"
                )}
            >
                {conversation.subject}
            </h4>
            <div
                className={cn(
                    "flex items-center justify-between pt-0.5 text-[10px]",
                    "text-slate-500"
                )}
            >
                <span className={cn("max-w-42.5 truncate")}>
                    {lastMsg.description}
                </span>
                <Badge
                    variant="outline"
                    className={cn(
                        "px-1 py-0 text-[9px]",
                        "border-gray-800 bg-gray-950"
                    )}
                >
                    {conversation.messages.length} msg
                    {conversation.messages.length > 1 ? "s" : ""}
                </Badge>
            </div>
        </div>
    )
}
