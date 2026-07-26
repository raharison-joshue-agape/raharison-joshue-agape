import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import type {
    ConversationGroup,
    FilterType,
    ReplyMode,
} from "@/components/admin/messages/types"
import { MessageSidebar } from "@/components/admin/messages/message-sidebar"
import { ConversationList } from "@/components/admin/messages/conversation-list"
import { ChatView } from "@/components/admin/messages/chat-view"

const initialConversations: ConversationGroup[] = [
    {
        email: "jean.dupont@enterprise.com",
        name: "Jean Dupont",
        location: "Paris, France",
        subject: "Demande de prestation - Architecture ERP",
        isStarred: true,
        isRead: false,
        messages: [
            {
                id: "m1",
                description:
                    "Bonjour,\n\nJ'ai consulté vos réalisations et votre profil m'intéresse vivement. Nous avons un projet d'intégration ERP nécessitant des compétences poussées en Angular et NestJS.\n\nSeriez-vous disponible pour un échange ?",
                created_at: "2026-07-26T10:45:00.000Z",
                isFromAdmin: false,
            },
        ],
    },
    {
        email: "sarah.rav@tech-solutions.mg",
        name: "Sarah Ravelo",
        location: "Antananarivo, Madagascar",
        subject: "Refonte Interface Web Client",
        isStarred: false,
        isRead: false,
        messages: [
            {
                id: "m2",
                description:
                    "Salut,\n\nJe reviens vers toi suite à notre dernière réunion. Est-ce que tu as eu le temps de jeter un œil aux maquettes Figma pour l'interface client ?",
                created_at: "2026-07-25T14:20:00.000Z",
                isFromAdmin: false,
            },
            {
                id: "m3",
                description:
                    "Bonjour Sarah, oui j'ai regardé. C'est très propre. Je t'envoie une invitation sur ma plateforme client pour suivre l'avancement.",
                created_at: "2026-07-25T16:00:00.000Z",
                isFromAdmin: true,
            },
        ],
    },
    {
        email: "marc.andriana@dgsr-sec.mg",
        name: "Marc Andriana",
        location: "Fianarantsoa, Madagascar",
        subject: "Spécifications techniques - Module Sécurité",
        isStarred: true,
        isRead: true,
        messages: [
            {
                id: "m4",
                description:
                    "Bonjour,\n\nVous trouverez ci-joint les spécifications validées concernant les rôles d'accès et le chiffrement des données pour la plateforme DGSR.",
                created_at: "2026-07-24T09:15:00.000Z",
                isFromAdmin: false,
            },
        ],
    },
]

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
    const [customInviteNote, setCustomInviteNote] = useState(
        "Bonjour,\n\nSuite à votre message envoyé depuis mon portfolio, je vous invite à rejoindre mon espace client sécurisé pour collaborer sur votre projet.\n\nCliquez sur le lien ci-dessous pour activer votre compte :"
    )

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

    const handleDelete = (email: string) => {
        setConversations((prev) => prev.filter((c) => c.email !== email))
        if (selectedEmail === email) {
            setSelectedEmail(null)
        }
    }

    const handleSend = () => {
        if (!selectedEmail) return

        const newDescription =
            mode === "invitation"
                ? `${customInviteNote}\n\n👉 [Lien d'inscription client sécurisé](https://votreplateforme.com/register?email=${encodeURIComponent(
                      selectedEmail
                  )}&invite=true)`
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
            className="flex h-[calc(100vh-7rem)] flex-col space-y-4"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Boîte de Réception & Contacts Portfolio
                    </h1>
                    <p className="text-xs text-slate-400">
                        Centralisez les messages reçus et convertissez vos
                        visiteurs en clients sur votre plateforme
                    </p>
                </div>
                <Badge
                    variant="outline"
                    className="border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                >
                    {unreadCount} non lus
                </Badge>
            </div>

            <div className="grid flex-1 grid-cols-1 overflow-hidden rounded-xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm lg:grid-cols-12">
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

                <div className="flex flex-1 flex-col bg-gray-950/20 lg:col-span-5">
                    <ChatView
                        activeConversation={activeConversation}
                        onDelete={handleDelete}
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
