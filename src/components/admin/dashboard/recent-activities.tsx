import { Clock, type LucideIcon } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Activity {
    action: string
    time: string
    status: string
    icon: LucideIcon
}

interface RecentActivitiesProps {
    activities: Activity[]
}

export default function RecentActivities({
    activities,
}: RecentActivitiesProps) {
    return (
        <Card
            className={cn(
                "backdrop-blur-sm lg:col-span-3",
                "border-gray-800 bg-gray-900/40 text-slate-100"
            )}
        >
            <CardHeader>
                <CardTitle className={cn("text-base font-semibold")}>
                    Dernières Activités
                </CardTitle>
                <CardDescription className={cn("text-slate-400")}>
                    Historique récent de vos actions système
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className={cn("space-y-4")}>
                    {activities.map((activity, index) => {
                        const Icon = activity.icon
                        return (
                            <div
                                key={index}
                                className={cn(
                                    "flex items-start gap-3 rounded-lg border p-3 transition-colors",
                                    "border-gray-800/60 bg-gray-950/20 hover:bg-gray-800/20"
                                )}
                            >
                                <div
                                    className={cn(
                                        "rounded-md p-2",
                                        "bg-gray-800/80 text-slate-300"
                                    )}
                                >
                                    <Icon size={16} />
                                </div>
                                <div className={cn("flex-1 space-y-1")}>
                                    <p
                                        className={cn(
                                            "text-xs font-medium",
                                            "text-slate-200"
                                        )}
                                    >
                                        {activity.action}
                                    </p>
                                    <div
                                        className={cn(
                                            "flex items-center gap-2 text-[10px]",
                                            "text-slate-400"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "flex items-center gap-1"
                                            )}
                                        >
                                            <Clock size={12} />
                                            {activity.time}
                                        </span>
                                    </div>
                                </div>
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "text-[10px]",
                                        "border-gray-800 text-slate-400"
                                    )}
                                >
                                    {activity.status}
                                </Badge>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
