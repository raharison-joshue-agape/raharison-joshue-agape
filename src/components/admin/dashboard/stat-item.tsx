import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react"

// Interface pour typer les propriétés attendues par le composant
interface StatItemProps {
    stat: {
        title: string
        value: string | number
        change: string
        isPositive: boolean
        description: string
    }
    icon: LucideIcon
    index?: number
}

export default function StatItem({ stat, icon: Icon, index }: StatItemProps) {
    return (
        <Card
            key={index}
            className={cn(
                "border-gray-800 bg-gray-900/40 text-slate-100 backdrop-blur-sm transition-all hover:border-gray-700"
            )}
        >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                    {stat.title}
                </CardTitle>
                <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                    <Icon size={18} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">
                    {stat.value}
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs">
                    <span
                        className={cn(
                            "flex items-center font-medium",
                            stat.isPositive
                                ? "text-emerald-400"
                                : "text-red-400"
                        )}
                    >
                        {stat.isPositive ? (
                            <ArrowUpRight size={14} className="mr-0.5" />
                        ) : (
                            <ArrowDownRight size={14} className="mr-0.5" />
                        )}
                        {stat.change}
                    </span>
                    <span className="text-slate-500">{stat.description}</span>
                </div>
            </CardContent>
        </Card>
    )
}
