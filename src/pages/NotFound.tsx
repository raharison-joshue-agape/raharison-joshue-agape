import { ArrowLeft, ShieldAlert } from "lucide-react"
import CustomCursor from "@/components/custom-cursor"
import { cn } from "@/lib/utils"
import DottedBackground from "@/components/dotted-background"

export default function NotFoundPage() {
    return (
        <main
            className={cn(
                "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center antialiased",
                "bg-gray-950"
            )}
        >
            <CustomCursor />
            <DottedBackground
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                }}
            />

            <div
                className={cn(
                    "relative z-10 flex max-w-xl flex-col items-center"
                )}
            >
                <div
                    className={cn(
                        "mb-6 flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium tracking-wide backdrop-blur-md",
                        "border-cyan-500/30 bg-cyan-950/40 text-cyan-400"
                    )}
                >
                    <ShieldAlert size={16} className={cn("text-cyan-400")} />
                    <span>Erreur 404</span>
                </div>

                <h1
                    className={cn(
                        "bg-linear-to-b bg-clip-text text-8xl font-black tracking-tighter text-transparent sm:text-9xl",
                        "from-white via-gray-300 to-gray-800"
                    )}
                >
                    404
                </h1>

                <h2
                    className={cn(
                        "mt-4 text-2xl font-semibold tracking-tight sm:text-3xl",
                        "text-white"
                    )}
                >
                    Page introuvable
                </h2>

                <p className={cn("mt-4 text-base leading-7", "text-gray-400")}>
                    Désolé, la page que vous recherchez semble avoir été
                    déplacée, supprimée ou n'a jamais existé. Vérifiez l'adresse
                    URL ou retournez à l'accueil.
                </p>

                <div
                    className={cn(
                        "mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
                    )}
                >
                    <button
                        onClick={() => window.history.back()}
                        className={cn(
                            "group flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition-all duration-200",
                            "border-gray-800 bg-gray-900/50 text-gray-300 hover:border-gray-700 hover:bg-gray-900 hover:text-white"
                        )}
                    >
                        <ArrowLeft
                            size={16}
                            className={cn(
                                "transition-transform group-hover:-translate-x-0.5"
                            )}
                        />
                        <span>Retour en arrière</span>
                    </button>
                </div>
            </div>

            <div
                className={cn(
                    "absolute bottom-6 z-10 text-xs",
                    "text-gray-600"
                )}
            >
                L'adresse URL est peut-être incorrecte.
            </div>
        </main>
    )
}
