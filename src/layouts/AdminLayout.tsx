import { cn } from "@/lib/utils"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { LayoutDashboard, MessageSquare, LogOut, ShieldAlert } from "lucide-react"

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
            {/* Sidebar de navigation */}
            <aside className="hidden w-64 flex-col border-r border-gray-800 bg-gray-900/50 p-4 md:flex">
                <div className="mb-6 flex items-center gap-2 px-2 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                    <ShieldAlert className="h-4 w-4 text-emerald-500" />
                    <span>Administration</span>
                </div>

                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                        : "text-gray-400 hover:bg-gray-800/50 hover:text-slate-100"
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
            <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
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