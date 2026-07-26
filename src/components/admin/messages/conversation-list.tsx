import { Search, MailOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { ConversationGroup } from "./types"
import { ConversationItem } from "./conversation-item"

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
        <div className="flex flex-col border-b border-gray-800 lg:col-span-4 lg:border-r lg:border-b-0">
            <div className="border-b border-gray-800 p-3">
                <div className="relative">
                    <Search
                        size={14}
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                    />
                    <Input
                        placeholder="Rechercher par nom, email, sujet..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-9 border-gray-800 bg-gray-950/50 pl-9 text-xs text-slate-200 placeholder:text-slate-500"
                    />
                </div>
            </div>

            <div className="flex-1 divide-y divide-gray-800/50 overflow-y-auto">
                {conversations.length === 0 ? (
                    <div className="flex h-40 flex-col items-center justify-center p-4 text-center text-slate-500">
                        <MailOpen size={24} className="mb-2 opacity-50" />
                        <p className="text-xs">Aucune discussion trouvée</p>
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

// Petite fonction utilitaire locale pour propager l'événement star
function toggleStarHandler(
    email: string,
    e: React.MouseEvent,
    callback: (email: string, e: React.MouseEvent) => void
) {
    callback(email, e)
}
