import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Search, MailOpen } from "lucide-react"
import type { ConversationGroup } from "@/components/admin/messages/types"
import { ConversationItem } from "@/components/admin/messages/conversation-item"

interface ConversationListProps {
    conversations: ConversationGroup[]
    selectedEmail: string | null
    searchQuery: string
    setSearchQuery: (query: string) => void
    onSelectConversation: (email: string) => void
    onToggleStar: (email: string, e: React.MouseEvent) => void
    formatDate: (iso: string) => string
}

export function ConversationList({
    conversations,
    selectedEmail,
    searchQuery,
    setSearchQuery,
    onSelectConversation,
    onToggleStar,
    formatDate,
}: ConversationListProps) {
    return (
        <div
            className={cn(
                "flex flex-col border-b lg:border-r lg:border-b-0",
                "border-gray-800"
            )}
        >
            <div className={cn("border-b p-3", "border-gray-800")}>
                <div className={cn("relative")}>
                    <Search
                        size={14}
                        className={cn(
                            "absolute top-1/2 left-3 -translate-y-1/2",
                            "text-slate-400"
                        )}
                    />
                    <Input
                        placeholder={"Rechercher par nom, email, sujet..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={cn(
                            "h-9 pl-9 text-xs",
                            "border-gray-800 bg-gray-950/50 text-slate-200 placeholder:text-slate-500"
                        )}
                    />
                </div>
            </div>

            <div
                className={cn(
                    "flex-1 divide-y overflow-y-auto",
                    "divide-gray-800/50"
                )}
            >
                {conversations.length === 0 ? (
                    <div
                        className={cn(
                            "flex h-40 flex-col items-center justify-center p-4 text-center",
                            "text-slate-500"
                        )}
                    >
                        <MailOpen size={24} className={cn("mb-2 opacity-50")} />
                        <p className={cn("text-xs")}>
                            Aucune discussion trouvée
                        </p>
                    </div>
                ) : (
                    conversations.map((conv) => (
                        <ConversationItem
                            key={conv.email}
                            conversation={conv}
                            isSelected={selectedEmail === conv.email}
                            onSelect={() => onSelectConversation(conv.email)}
                            onToggleStar={(e) =>
                                toggleStarHandler(conv.email, e, onToggleStar)
                            }
                            formatDate={formatDate}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

function toggleStarHandler(
    email: string,
    e: React.MouseEvent,
    callback: (email: string, e: React.MouseEvent) => void
) {
    callback(email, e)
}
