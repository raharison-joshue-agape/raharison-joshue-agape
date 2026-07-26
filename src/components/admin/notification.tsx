import React from "react"
import {
    AlertCircle,
    AlertTriangle,
    Info,
    CheckCircle2,
    Bell,
} from "lucide-react"

export type NotificationType =
    "error" | "warning" | "info" | "success" | "default"

export interface NotificationItemProps {
    title: string
    description: string
    time: string
    type?: NotificationType
    icon?: React.ReactNode
}

const getNotificationConfig = (type: NotificationType = "default") => {
    switch (type) {
        case "error":
            return {
                icon: <AlertCircle className="h-4 w-4 text-destructive" />,
                badgeBg: "bg-destructive/10 text-destructive",
            }
        case "warning":
            return {
                icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
                badgeBg: "bg-amber-500/10 text-amber-500",
            }
        case "success":
            return {
                icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
                badgeBg: "bg-emerald-500/10 text-emerald-500",
            }
        case "info":
            return {
                icon: <Info className="h-4 w-4 text-blue-500" />,
                badgeBg: "bg-blue-500/10 text-blue-500",
            }
        default:
            return {
                icon: <Bell className="h-4 w-4 text-muted-foreground" />,
                badgeBg: "bg-muted text-muted-foreground",
            }
    }
}

export const NotificationItem = ({
    title,
    description,
    time,
    type = "default",
    icon,
}: NotificationItemProps) => {
    const config = getNotificationConfig(type)
    const displayIcon = icon || config.icon

    return (
        <div className="flex cursor-pointer items-start gap-3 border-b border-border p-2 transition-colors last:border-none hover:bg-muted/50">
            <div
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.badgeBg}`}
            >
                {displayIcon}
            </div>
            <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-foreground">
                        {title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                        {time}
                    </span>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    )
}
