import { MessageSquareText, ArrowUpRight } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
    id: string
    sender: string
    email: string
    preview: string
    time: string
    unread: boolean
}

interface QuickMessagesProps {
    messages: Message[]
}

export default function QuickMessages({ messages }: QuickMessagesProps) {
    return (
        <Card className="border-gray-800 bg-gray-900/40 text-slate-100 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-base font-semibold">
                        Messages Récents
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        Dernières demandes de contact reçues
                    </CardDescription>
                </div>
                <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                    <MessageSquareText size={18} />
                </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className="group flex items-start justify-between gap-3 rounded-lg border border-gray-800/60 bg-gray-950/20 p-3 transition-all hover:border-gray-700 hover:bg-gray-800/20"
                    >
                        <div className="flex items-start gap-3">
                            <Avatar className="h-9 w-9 border border-gray-800">
                                <AvatarFallback className="bg-gray-800 text-xs font-medium text-slate-200">
                                    {msg.sender
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-xs font-medium text-white">
                                        {msg.sender}
                                    </h4>
                                    {msg.unread && (
                                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                    )}
                                </div>
                                <p className="line-clamp-1 text-[11px] text-slate-400">
                                    {msg.preview}
                                </p>
                                <span className="text-[10px] text-slate-500">
                                    {msg.time}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="rounded-md p-1.5 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-800 hover:text-white"
                            title="Voir le message"
                        >
                            <ArrowUpRight size={14} />
                        </button>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
