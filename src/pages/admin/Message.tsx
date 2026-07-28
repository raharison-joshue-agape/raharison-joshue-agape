import { cn } from "@/lib/utils"
import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type {
    ConversationGroup,
    FilterType,
    ReplyMode,
} from "@/components/admin/messages/types"
import { Shredder } from "lucide-react"
import { MessageSidebar } from "@/components/admin/messages/message-sidebar"
import { ConversationList } from "@/components/admin/messages/conversation-list"
import { ChatView } from "@/components/admin/messages/chat-view"
import { initialConversations } from "@/data/admin.data"
import { Button } from "@/components/ui/button"

const customInvite = `Bonjour,

Suite à votre message envoyé depuis mon portfolio, je vous invite à rejoindre mon espace client sécurisé pour collaborer sur votre projet.

Cliquez sur le lien ci-dessous pour activer votre compte :`

export default function AdminMessage() {
    const [conversations, setConversations] =
        useState<ConversationGroup[]>(initialConversations)
    const [selectedEmail, setSelectedEmail] = useState<string | null>(
        "jean.dupont@enterprise.com"
    )
    const [searchQuery, setSearchQuery] = useState("")
    const [filter, setFilter] = useState<FilterType>("all")

    const [mode, setMode] = useState<ReplyMode>("message")
    const [replyText, setReplyText] = useState("")
    const [customInviteNote, setCustomInviteNote] = useState(customInvite)

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const formatDate = (isoString: string) => {
        try {
            const date = new Date(isoString)
            return new Intl.DateTimeFormat("fr-FR", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
            }).format(date)
        } catch {
            return isoString
        }
    }

    const filteredConversations = conversations.filter((conv) => {
        const matchesSearch =
            conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conv.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conv.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (conv.location &&
                conv.location.toLowerCase().includes(searchQuery.toLowerCase()))

        if (filter === "unread") return matchesSearch && !conv.isRead
        if (filter === "starred") return matchesSearch && conv.isStarred
        return matchesSearch
    })

    const activeConversation = conversations.find(
        (c) => c.email === selectedEmail
    )

    const handleSelectConversation = (email: string) => {
        setSelectedEmail(email)
        setConversations((prev) =>
            prev.map((c) => (c.email === email ? { ...c, isRead: true } : c))
        )
    }

    const toggleStar = (email: string, e: React.MouseEvent) => {
        e.stopPropagation()
        setConversations((prev) =>
            prev.map((c) =>
                c.email === email ? { ...c, isStarred: !c.isStarred } : c
            )
        )
    }

    const [email, setEmail] = useState("")
    const handleDelete = () => {
        setLoading(true)
        setTimeout(() => {
            setConversations((prev) => prev.filter((c) => c.email !== email))
            if (selectedEmail === email) {
                setSelectedEmail(null)
            }
            setLoading(false)
            setIsOpen(false)
        }, 1000)
    }

    const handleSend = () => {
        if (!selectedEmail) return

        const newDescription =
            mode === "invitation"
                ? `${customInviteNote}\n\n👉 [Lien d'inscription client sécurisé](https://votreplateforme.com/register?email=${encodeURIComponent(
                      selectedEmail
                  )}&invite=true&code=30N001)`
                : replyText

        if (!newDescription.trim()) return

        setConversations((prev) =>
            prev.map((c) => {
                if (c.email === selectedEmail) {
                    return {
                        ...c,
                        messages: [
                            ...c.messages,
                            {
                                id: Date.now().toString(),
                                description: newDescription,
                                created_at: new Date().toISOString(),
                                isFromAdmin: true,
                                isInvitation: mode === "invitation",
                            },
                        ],
                    }
                }
                return c
            })
        )

        setReplyText("")
        setMode("message")
    }

    const unreadCount = conversations.filter((c) => !c.isRead).length

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "flex h-[calc(100vh-4rem)] flex-col space-y-4 px-16 py-6"
            )}
        >
            <div className={cn("flex items-center justify-between")}>
                <div>
                    <h1
                        className={cn(
                            "text-2xl font-bold tracking-tight",
                            "text-white"
                        )}
                    >
                        Boîte de Réception
                    </h1>
                    <p className={cn("text-xs", "text-slate-400")}>
                        Centralisez les messages reçus et convertissez vos
                        visiteurs en clients sur votre plateforme
                    </p>
                </div>
                <Badge
                    variant="outline"
                    className={cn(
                        "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    )}
                >
                    {unreadCount} non lus
                </Badge>
            </div>

            <Dialog open={isOpen}>
                <DialogContent
                    showCloseButton={false}
                    className={cn("backdrop-blur-sm", "bg-gray-900/50")}
                >
                    <DialogHeader>
                        <DialogTitle>
                            <div className={cn("flex items-center gap-x-2.5")}>
                                <Shredder size={25} />
                                Supprimer la conversation
                            </div>
                        </DialogTitle>
                        <DialogDescription className={cn("mt-3 text-sm")}>
                            Êtes-vous sûr de vouloir supprimer cette
                            conversation ? Cette action est irréversible et
                            effacera tout l'historique.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter
                        className={cn("py-2 sm:justify-end", "bg-gray-900/80")}
                    >
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                            autoFocus
                        >
                            Annuler
                        </Button>
                        <Button
                            disabled={loading}
                            className={cn(
                                "rounded-md px-4 pt-2 pb-1.75 normal-case",
                                "bg-red-600 text-white hover:bg-red-600/80 dark:bg-red-500 dark:hover:bg-red-500/80"
                            )}
                            onClick={handleDelete}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        className={cn(
                                            "h-4 w-4 rounded-full border-2",
                                            "border-[#6e7681]/30 border-t-[#6e7681]"
                                        )}
                                    />
                                    Suppression en cours...
                                </span>
                            ) : (
                                "Confirmer la suppression"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div
                className={cn(
                    "grid flex-1 grid-cols-1 overflow-hidden rounded-xl border backdrop-blur-sm lg:grid-cols-[16rem_28rem_auto]",
                    "border-gray-800 bg-gray-900/40"
                )}
            >
                <MessageSidebar
                    filter={filter}
                    setFilter={setFilter}
                    conversations={conversations}
                />

                <ConversationList
                    conversations={filteredConversations}
                    selectedEmail={selectedEmail}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSelectConversation={handleSelectConversation}
                    onToggleStar={toggleStar}
                    formatDate={formatDate}
                />

                <div className={cn("flex flex-1 flex-col", "bg-gray-950/20")}>
                    <ChatView
                        activeConversation={activeConversation}
                        onDelete={(email: string) => {
                            setEmail(email)
                            setIsOpen(true)
                        }}
                        formatDate={formatDate}
                        mode={mode}
                        setMode={setMode}
                        replyText={replyText}
                        setReplyText={setReplyText}
                        customInviteNote={customInviteNote}
                        setCustomInviteNote={setCustomInviteNote}
                        onSend={handleSend}
                    />
                </div>
            </div>
        </motion.div>
    )
}
