import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ReplyBox } from "@/components/admin/messages/reply-box"
import { Trash2, MapPin, Calendar, Link2, Mail } from "lucide-react"
import type {
    ConversationGroup,
    ReplyMode,
} from "@/components/admin/messages/types"

interface ChatViewProps {
    activeConversation: ConversationGroup | undefined
    onDelete: (email: string) => void
    formatDate: (iso: string) => string
    mode: ReplyMode
    setMode: (mode: ReplyMode) => void
    replyText: string
    setReplyText: (text: string) => void
    customInviteNote: string
    setCustomInviteNote: (note: string) => void
    onSend: () => void
}

export function ChatView({
    activeConversation,
    onDelete,
    formatDate,
    mode,
    setMode,
    replyText,
    setReplyText,
    customInviteNote,
    setCustomInviteNote,
    onSend,
}: ChatViewProps) {
    if (!activeConversation) {
        return (
            <div
                className={cn(
                    "flex h-full flex-col items-center justify-center p-6 text-center",
                    "text-slate-500"
                )}
            >
                <Mail size={32} className={cn("mb-2 opacity-40")} />
                <p className={cn("text-xs")}>
                    Sélectionnez une discussion pour afficher l'historique et
                    envoyer une invitation client.
                </p>
            </div>
        )
    }

    const initials = activeConversation.name
        .split(" ")
        .map((n) => n[0])
        .join("")

    return (
        <div className={cn("flex h-190 flex-col")}>
            {/* En-tête */}
            <div
                className={cn(
                    "flex items-center justify-between border-b p-3",
                    "border-gray-800 bg-gray-900/20"
                )}
            >
                <div className={cn("flex items-center gap-2.5")}>
                    <Avatar className={cn("h-9 w-9 border", "border-gray-800")}>
                        <AvatarFallback
                            className={cn(
                                "text-xs font-semibold",
                                "bg-emerald-500/10 text-emerald-400"
                            )}
                        >
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className={cn("space-y-0.5")}>
                        <h3
                            className={cn(
                                "flex items-center gap-2 text-xs font-semibold",
                                "text-white"
                            )}
                        >
                            {activeConversation.name}
                            {activeConversation.location && (
                                <span
                                    className={cn(
                                        "flex items-center gap-1 text-[10px] font-normal",
                                        "text-slate-400"
                                    )}
                                >
                                    <MapPin size={10} />{" "}
                                    {activeConversation.location}
                                </span>
                            )}
                        </h3>
                        <p className={cn("text-[10px]", "text-slate-400")}>
                            {activeConversation.email}
                        </p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "h-8 w-8",
                        "text-slate-400 hover:text-red-400"
                    )}
                    onClick={() => onDelete(activeConversation.email)}
                    title="Supprimer toute la discussion"
                >
                    <Trash2 size={16} />
                </Button>
            </div>

            {/* Historique */}
            <div
                className={cn(
                    "max-h-130 flex-1 space-y-4 overflow-y-auto border p-4"
                )}
            >
                <div className={cn("text-center")}>
                    <span
                        className={cn(
                            "rounded-full border px-3 py-1 text-[10px]",
                            "border-gray-700/50 bg-gray-800/60 text-slate-400"
                        )}
                    >
                        Sujet initial : {activeConversation.subject}
                    </span>
                </div>

                {activeConversation.messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex flex-col space-y-1.5 rounded-xl p-3 text-xs shadow-sm",
                            msg.isFromAdmin
                                ? "ml-6 border border-emerald-500/30 bg-emerald-500/5 text-slate-200"
                                : "mr-6 border border-gray-800 bg-gray-900/60 text-slate-300"
                        )}
                    >
                        <div
                            className={cn(
                                "flex items-center justify-between border-b pb-1.5 text-[10px]",
                                "border-gray-800/40 text-slate-500"
                            )}
                        >
                            <span
                                className={cn(
                                    "font-semibold",
                                    "text-slate-400"
                                )}
                            >
                                {msg.isFromAdmin
                                    ? "Vous (Admin)"
                                    : activeConversation.name}
                            </span>
                            <span className={cn("flex items-center gap-1")}>
                                <Calendar size={10} />{" "}
                                {formatDate(msg.created_at)}
                            </span>
                        </div>
                        <div
                            className={cn(
                                "pt-0.5 leading-relaxed whitespace-pre-line",
                                "text-slate-300"
                            )}
                        >
                            {msg.description}
                        </div>
                        {msg.isInvitation && (
                            <div
                                className={cn(
                                    "mt-2 flex items-center gap-1.5 rounded border p-2 text-[10px]",
                                    "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                )}
                            >
                                <Link2 size={12} />
                                <span>
                                    Invitation officielle client avec lien
                                    d'inscription unique envoyée.
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Zone de réponse */}
            <ReplyBox
                mode={mode}
                setMode={setMode}
                replyText={replyText}
                setReplyText={setReplyText}
                customInviteNote={customInviteNote}
                setCustomInviteNote={setCustomInviteNote}
                email={activeConversation.email}
                onSend={onSend}
            />
        </div>
    )
}
