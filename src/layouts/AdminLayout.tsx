import { cn } from "@/lib/utils"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { LayoutDashboard, MessageSquare, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import DottedBackground from "@/components/dotted-background"

export default function AdminLayout() {
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("admin_token")
        navigate("/")
    }

    const navItems = [
        {
            title: "Dashboard",
            href: "/portfolio/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Messages",
            href: "/portfolio/messages",
            icon: MessageSquare,
        },
    ]

    return (
        <div
            className={cn(
                "flex min-h-screen w-full bg-gray-950 text-slate-100"
            )}
        >
            <DottedBackground
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                }}
                frequency={2}
                gamma={3}
                cellSize={2}
            />

            {/* Sidebar de navigation */}
            <aside className="z-50 hidden w-70 flex-col border-r border-gray-800 bg-gray-900/50 p-4 md:flex">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn(
                        "relative z-5 mb-10 flex flex-col items-center rounded-lg border px-2 py-4",
                        "border-gray-800/50 bg-gray-900/50"
                    )}
                >
                    <div
                        className={cn(
                            "relative mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border shadow-inner",
                            "border-gray-800 bg-gray-900/50"
                        )}
                    >
                        <img
                            src="/logo.png"
                            alt="Logo"
                            width={80}
                            height={80}
                            className={cn("object-contain")}
                        />
                    </div>
                    <h1
                        className={cn(
                            "text-[17px] font-medium tracking-tight",
                            "text-white"
                        )}
                    >
                        RAHARISON Joshué Agapé
                    </h1>
                    <p className={cn("text-sm", "text-slate-400")}>
                        raharison-joshue-agape
                    </p>
                </motion.div>

                <nav className="flex-1 space-y-1">
                    <p
                        className={cn(
                            "mb-2.5 ml-2.5 text-xs uppercase",
                            "text-slate-500"
                        )}
                    >
                        Gestion des Clients
                    </p>
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                        : "border-transparent text-gray-400 hover:bg-gray-800/50 hover:text-slate-100"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>

                {/* Section déconnexion en bas de sidebar */}
                <div className="border-t border-gray-800/80 pt-4">
                    <button
                        onClick={handleLogout}
                        className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition-colors",
                            "hover:bg-red-500/10 hover:text-red-300"
                        )}
                    >
                        <LogOut className="h-4 w-4" />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Contenu principal */}
            <main className="z-50 flex min-w-0 flex-1 flex-col overflow-y-auto">
                <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900/50 px-6 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-slate-300">
                            Espace Administrateur
                        </span>
                    </div>
                    {/* Tu pourras ajouter ici un profil utilisateur ou des actions rapides */}
                </header>

                <div className="flex-1 p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
