import { FolderGit2 } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Project {
    name: string
    category: string
    tech: string
    status: string
    progress: number
}

interface CurrentProjectsProps {
    projects: Project[]
}

export default function CurrentProjects({ projects }: CurrentProjectsProps) {
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
                        Projets en Cours
                    </CardTitle>
                    <CardDescription className={cn("text-slate-400")}>
                        État d'avancement des développements actifs
                    </CardDescription>
                </div>
                <FolderGit2 size={20} className={cn("text-emerald-400")} />
            </CardHeader>
            <CardContent className={cn("space-y-4 pt-4")}>
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className={cn(
                            "space-y-2 rounded-lg border p-3",
                            "border-gray-800/60 bg-gray-950/20"
                        )}
                    >
                        <div
                            className={cn("flex items-center justify-between")}
                        >
                            <div>
                                <h4
                                    className={cn(
                                        "text-sm font-medium",
                                        "text-white"
                                    )}
                                >
                                    {project.name}
                                </h4>
                                <span
                                    className={cn(
                                        "text-[11px]",
                                        "text-slate-400"
                                    )}
                                >
                                    {project.category} • {project.tech}
                                </span>
                            </div>
                            <Badge
                                variant="outline"
                                className={cn(
                                    "border-emerald-500/20 bg-emerald-500/10 text-[10px] text-emerald-400"
                                )}
                            >
                                {project.status}
                            </Badge>
                        </div>
                        <div className={cn("space-y-1")}>
                            <div
                                className={cn(
                                    "flex justify-between text-[10px]",
                                    "text-slate-400"
                                )}
                            >
                                <span>Progression</span>
                                <span
                                    className={cn(
                                        "font-medium",
                                        "text-slate-200"
                                    )}
                                >
                                    {project.progress}%
                                </span>
                            </div>
                            <div
                                className={cn(
                                    "h-1.5 w-full overflow-hidden rounded-full",
                                    "bg-gray-800"
                                )}
                            >
                                <div
                                    className={cn(
                                        "h-full rounded-full transition-all duration-500",
                                        "bg-emerald-500"
                                    )}
                                    style={{
                                        width: `${project.progress}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
