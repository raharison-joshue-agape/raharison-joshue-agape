import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export interface MessageItemProps {
    senderName: string
    preview: string
    time: string
    avatarUrl?: string
    unread?: boolean
}

export const MessageItem = ({
    senderName,
    preview,
    time,
    avatarUrl = "https://raharison-joshue-agape.vercel.app/assets/profile-7cyklktk.jpg",
    unread = false,
}: MessageItemProps) => {
    return (
        <div className="flex cursor-pointer items-start gap-3 border-b border-border p-4 transition-colors last:border-none hover:bg-muted/50">
            <div className="relative shrink-0">
                <Avatar size="lg">
                    <AvatarImage src={avatarUrl} alt={senderName} />
                    <AvatarFallback>
                        {senderName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                {unread && (
                    <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
                )}
            </div>

            {/* Contenu du message */}
            <div className="flex-1 space-y-1 overflow-hidden">
                <div className="flex items-center justify-between">
                    <p
                        className={`truncate text-xs ${unread ? "font-bold text-foreground" : "font-semibold text-foreground/80"}`}
                    >
                        {senderName}
                    </p>
                    <span className="ml-2 shrink-0 text-[10px] text-muted-foreground">
                        {time}
                    </span>
                </div>
                <p
                    className={`w-60 truncate text-[11px] leading-relaxed ${unread ? "font-medium text-foreground" : "text-muted-foreground"}`}
                >
                    {preview}
                </p>
            </div>
        </div>
    )
}
