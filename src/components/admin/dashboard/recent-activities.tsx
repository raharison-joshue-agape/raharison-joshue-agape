import { Clock, type LucideIcon } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
        <Card className="border-gray-800 bg-gray-900/40 text-slate-100 backdrop-blur-sm lg:col-span-3">
            <CardHeader>
                <CardTitle className="text-base font-semibold">
                    Dernières Activités
                </CardTitle>
                <CardDescription className="text-slate-400">
                    Historique récent de vos actions système
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity, index) => {
                        const Icon = activity.icon
                        return (
                            <div
                                key={index}
                                className="flex items-start gap-3 rounded-lg border border-gray-800/60 bg-gray-950/20 p-3 transition-colors hover:bg-gray-800/20"
                            >
                                <div className="rounded-md bg-gray-800/80 p-2 text-slate-300">
                                    <Icon size={16} />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-xs font-medium text-slate-200">
                                        {activity.action}
                                    </p>
                                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} />
                                            {activity.time}
                                        </span>
                                    </div>
                                </div>
                                <Badge
                                    variant="outline"
                                    className="border-gray-800 text-[10px] text-slate-400"
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
