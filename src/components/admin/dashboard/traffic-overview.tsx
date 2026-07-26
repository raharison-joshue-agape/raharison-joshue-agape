import { motion } from "framer-motion"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function TrafficOverview() {
    return (
        <Card className="border-gray-800 bg-gray-900/40 text-slate-100 backdrop-blur-sm lg:col-span-4">
            <CardHeader>
                <CardTitle className="text-base font-semibold">
                    Aperçu du Trafic
                </CardTitle>
                <CardDescription className="text-slate-400">
                    Nombre de visites sur les 7 derniers jours
                </CardDescription>
            </CardHeader>
            <CardContent className="flex h-64 items-center justify-center">
                <div className="flex h-full w-full items-end justify-between gap-2 pt-6">
                    {[40, 65, 30, 85, 55, 95, 75].map((height, i) => (
                        <div
                            key={i}
                            className="flex h-full flex-1 flex-col items-center gap-2"
                        >
                            <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-t bg-gray-800/40">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{
                                        duration: 0.6,
                                        delay: i * 0.1,
                                    }}
                                    className="w-full rounded-t border-t border-emerald-500/50 bg-emerald-500/20"
                                />
                            </div>
                            <span className="text-[10px] text-slate-500">
                                J-{7 - i}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
