import { FolderGit2 } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
        <Card className="border-gray-800 bg-gray-900/40 text-slate-100 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-base font-semibold">
                        Projets en Cours
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        État d'avancement des développements actifs
                    </CardDescription>
                </div>
                <FolderGit2 size={20} className="text-emerald-400" />
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="space-y-2 rounded-lg border border-gray-800/60 bg-gray-950/20 p-3"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-white">
                                    {project.name}
                                </h4>
                                <span className="text-[11px] text-slate-400">
                                    {project.category} • {project.tech}
                                </span>
                            </div>
                            <Badge
                                variant="outline"
                                className="border-emerald-500/20 bg-emerald-500/10 text-[10px] text-emerald-400"
                            >
                                {project.status}
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-400">
                                <span>Progression</span>
                                <span className="font-medium text-slate-200">
                                    {project.progress}%
                                </span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
                                <div
                                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
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
