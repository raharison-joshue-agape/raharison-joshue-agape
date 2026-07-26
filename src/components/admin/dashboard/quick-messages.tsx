import { MessageSquareText, ArrowUpRight } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

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
        <Card
            className={cn(
                "backdrop-blur-sm",
                "border-gray-800 bg-gray-900/40 text-slate-100"
            )}
        >
            <CardHeader
                className={cn(
                    "flex flex-row items-center justify-between pb-2"
                )}
            >
                <div>
                    <CardTitle className={cn("text-base font-semibold")}>
                        Messages Récents
                    </CardTitle>
                    <CardDescription className={cn("text-slate-400")}>
                        Dernières demandes de contact reçues
                    </CardDescription>
                </div>
                <div
                    className={cn(
                        "rounded-lg",
                        "bg-emerald-500/10 p-2 text-emerald-400"
                    )}
                >
                    <MessageSquareText size={18} />
                </div>
            </CardHeader>
            <CardContent className={cn("space-y-3 pt-4")}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "group flex items-start justify-between gap-3 rounded-lg border p-3 transition-all",
                            "border-gray-800/60 bg-gray-950/20 hover:border-gray-700 hover:bg-gray-800/20"
                        )}
                    >
                        <div className={cn("flex items-start gap-3")}>
                            <Avatar
                                className={cn(
                                    "h-9 w-9 border",
                                    "border-gray-800"
                                )}
                            >
                                <AvatarFallback
                                    className={cn(
                                        "text-xs font-medium",
                                        "bg-gray-800 text-slate-200"
                                    )}
                                >
                                    {msg.sender
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div className={cn("space-y-1")}>
                                <div className={cn("flex items-center gap-2")}>
                                    <h4
                                        className={cn(
                                            "text-xs font-medium",
                                            "text-white"
                                        )}
                                    >
                                        {msg.sender}
                                    </h4>
                                    {msg.unread && (
                                        <span
                                            className={cn(
                                                "h-2 w-2 rounded-full",
                                                "bg-emerald-500"
                                            )}
                                        />
                                    )}
                                </div>
                                <p
                                    className={cn(
                                        "line-clamp-1 text-[11px]",
                                        "text-slate-400"
                                    )}
                                >
                                    {msg.preview}
                                </p>
                                <span
                                    className={cn(
                                        "text-[10px]",
                                        "text-slate-500"
                                    )}
                                >
                                    {msg.time}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className={cn(
                                "rounded-md p-1.5 opacity-0 transition-opacity group-hover:opacity-100",
                                "text-slate-400 hover:bg-gray-800 hover:text-white"
                            )}
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
