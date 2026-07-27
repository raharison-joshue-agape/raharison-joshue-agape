import { cn } from "@/lib/utils"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import {
    LogOut,
    Globe,
    Search,
    Bell,
    MessageSquareText,
    LogOutIcon,
    User,
    Shield,
    Palette,
} from "lucide-react"
import { motion } from "framer-motion"
import DottedBackground from "@/components/dotted-background"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UseAuth } from "@/context/AuthContext"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    adminNavItems,
    mockMessages,
    mockNotificationsGrouped,
} from "@/data/admin.data"
import { NotificationItem } from "@/components/admin/notification"
import { MessageItem } from "@/components/admin/message"

export default function AdminLayout() {
    const location = useLocation()
    const navigate = useNavigate()
    const { logout } = UseAuth()

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLogout = () => {
        setLoading(true)
        setTimeout(() => logout(), 1000)
    }

    const getBreadcrumbItem = () => {
        const currentPath = location.pathname
        for (const group of adminNavItems) {
            const foundItem = group.items.find(
                (item) => item.href === currentPath
            )
            if (foundItem) {
                return {
                    category: group.title,
                    title: foundItem.title,
                    href: foundItem.href,
                    icon: foundItem.icon,
                }
            }
        }
        return null
    }

    const currentBreadcrumb = getBreadcrumbItem()

    return (
        <div
            className={cn(
                "flex h-screen w-full overflow-auto",
                "bg-gray-950 text-slate-100"
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
            <aside
                className={cn(
                    "z-50 hidden h-screen w-70 flex-col overflow-auto border-r p-4 md:flex",
                    "border-gray-800 bg-gray-900/50"
                )}
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn(
                        "sticky top-0 z-5 mb-10 flex flex-col items-center rounded-lg border px-2 py-4",
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

                <nav className={cn("flex-1 space-y-1")}>
                    {adminNavItems.map((childrens, index) => {
                        return (
                            <div key={index} className="mb-6">
                                <p
                                    className={cn(
                                        "mb-2.5 ml-2.5 text-xs uppercase",
                                        "text-slate-500"
                                    )}
                                >
                                    {childrens.title}
                                </p>
                                {childrens.items.map((navItems) => {
                                    const Icon = navItems.icon
                                    const isActive = navItems.href.startsWith(
                                        location.pathname
                                    )

                                    return (
                                        <Link
                                            key={navItems.href}
                                            to={navItems.href}
                                            className={cn(
                                                "mb-1.5 flex items-center gap-3 rounded-sm border p-2.5 text-sm font-medium transition-colors",
                                                isActive
                                                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                                    : "border-transparent text-gray-400 hover:bg-gray-800/50 hover:text-slate-100"
                                            )}
                                        >
                                            <Icon size={20} />
                                            {navItems.title}
                                        </Link>
                                    )
                                })}
                            </div>
                        )
                    })}
                </nav>

                {/* Section déconnexion en bas de sidebar */}
                <div
                    className={cn(
                        "sticky bottom-0 border-t pt-4",
                        "border-gray-800/80"
                    )}
                >
                    <button
                        onClick={() => setIsOpen(true)}
                        className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors",
                            "hover:bg-red-500/10 hover:text-red-300"
                        )}
                    >
                        <LogOut size={20} />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Contenu principal */}
            <main
                className={cn(
                    "z-50 flex min-w-0 flex-1 flex-col overflow-y-auto"
                )}
            >
                <header
                    className={cn(
                        "sticky top-0 z-50 flex h-16 items-center justify-between border-b px-6 py-2 backdrop-blur-md",
                        "border-gray-800 bg-gray-900/50"
                    )}
                >
                    <div className="xl:min-w-75">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="flex items-center gap-2 text-slate-400">
                                        <Globe size={18} className="mb-px" />
                                        <span>Portfolio</span>
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                                {currentBreadcrumb && <BreadcrumbSeparator />}
                                {currentBreadcrumb && (
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {currentBreadcrumb.title}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                )}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className={cn("relative w-80")}>
                        <input
                            name="search"
                            type="search"
                            placeholder="Rechercher"
                            className={cn(
                                "w-full rounded-lg border py-2 pl-8 text-sm transition-all placeholder:text-sm focus:ring-1 focus:outline-none",
                                "border-gray-800 bg-gray-950/10 text-[#c9d1d9] placeholder-[#6e7681] focus:border-[#58a6ff] focus:ring-[#58a6ff]"
                            )}
                        />
                        <Search
                            size={18}
                            className={cn(
                                "absolute top-1/2 left-2 -translate-y-1/2 text-neutral-500"
                            )}
                        />
                    </div>

                    <div className={cn("flex items-center gap-4")}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className={cn("relative p-2")}>
                                    <Badge
                                        className={cn(
                                            "absolute -top-1 -right-2 px-1 text-xs",
                                            "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                                        )}
                                    >
                                        99
                                    </Badge>
                                    <MessageSquareText size={20} />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="center"
                                className={cn("mt-5 w-80", "bg-gray-950")}
                            >
                                <DropdownMenuGroup>
                                    {mockMessages.map((message, i) => (
                                        <DropdownMenuItem
                                            key={i}
                                            className={cn("mb-1 p-0 last:mb-0")}
                                        >
                                            <MessageItem
                                                preview={message.preview}
                                                senderName={message.senderName}
                                                avatarUrl={message.avatarUrl}
                                                time={message.time}
                                                unread={message.unread}
                                            />
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className={cn("relative p-2")}>
                                    <Badge
                                        className={cn(
                                            "absolute -top-1 -right-2 px-1 text-xs",
                                            "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                                        )}
                                    >
                                        99
                                    </Badge>
                                    <Bell size={20} />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="center"
                                className={cn("mt-5 w-90", "bg-gray-950")}
                            >
                                {mockNotificationsGrouped.map(
                                    (Notification, i) => (
                                        <DropdownMenuGroup key={i}>
                                            <p
                                                className={cn(
                                                    "mb-2 ml-2 text-xs first:mt-1"
                                                )}
                                            >
                                                {Notification.date}
                                            </p>
                                            {Notification.items.map(
                                                (item, j) => {
                                                    const Icon = item.icon
                                                    return (
                                                        <DropdownMenuItem
                                                            key={j}
                                                            className={cn(
                                                                "mb-1 p-0 last:mb-0"
                                                            )}
                                                        >
                                                            <NotificationItem
                                                                time={item.time}
                                                                title={
                                                                    item.title
                                                                }
                                                                description={
                                                                    item.description
                                                                }
                                                                icon={Icon}
                                                                type={item.type}
                                                            />
                                                        </DropdownMenuItem>
                                                    )
                                                }
                                            )}
                                        </DropdownMenuGroup>
                                    )
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="ml-4" asChild>
                                <div
                                    className={cn(
                                        "flex cursor-pointer items-center gap-3"
                                    )}
                                >
                                    <Avatar size="lg">
                                        <AvatarImage
                                            src="https://raharison-joshue-agape.vercel.app/assets/profile-7cyklktk.jpg"
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>RJA</AvatarFallback>
                                    </Avatar>
                                    <div className="text-start">
                                        <p className="text-[12px] font-semibold">
                                            RAHARISON Joshué Agapé
                                        </p>
                                        <p
                                            className={cn(
                                                "text-[11px] font-light",
                                                "text-slate-300"
                                            )}
                                        >
                                            joshueagape.itpro@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className={cn("mt-5 w-50", "bg-gray-950")}
                            >
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        onClick={() =>
                                            navigate(
                                                "/portfolio/settings?tab=profile"
                                            )
                                        }
                                        className={cn("cursor-pointer py-2")}
                                    >
                                        <User />
                                        Profil & Identité
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() =>
                                            navigate(
                                                "/portfolio/settings?tab=security"
                                            )
                                        }
                                        className={cn("cursor-pointer py-2")}
                                    >
                                        <Shield />
                                        Sécurité & Mot de passe
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() =>
                                            navigate(
                                                "/portfolio/settings?tab=notifications"
                                            )
                                        }
                                        className={cn("cursor-pointer py-2")}
                                    >
                                        <Bell />
                                        Notifications
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() =>
                                            navigate(
                                                "/portfolio/settings?tab=appearance"
                                            )
                                        }
                                        className={cn("cursor-pointer py-2")}
                                    >
                                        <Palette />
                                        Apparence & Langue
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className={cn("cursor-pointer py-2")}
                                    onClick={() => setIsOpen(true)}
                                >
                                    <LogOutIcon />
                                    Se déconnecter
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <Dialog open={isOpen}>
                    <DialogContent
                        showCloseButton={false}
                        className={cn("backdrop-blur-sm", "bg-gray-900/50")}
                    >
                        <DialogHeader>
                            <DialogTitle>
                                <div
                                    className={cn(
                                        "flex items-center gap-x-2.5"
                                    )}
                                >
                                    <LogOut size={25} />
                                    Se déconnecter
                                </div>
                            </DialogTitle>
                            <DialogDescription className={cn("mt-3 text-sm")}>
                                Êtes-vous sûr de vouloir quitter votre session ?
                                Vous devrez saisir vos identifiants pour
                                revenir.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter
                            className={cn(
                                "py-2 sm:justify-end",
                                "bg-gray-900/80"
                            )}
                        >
                            <Button
                                variant="ghost"
                                onClick={() => setIsOpen(false)}
                                autoFocus
                            >
                                Annuler
                            </Button>
                            <Button
                                disabled={loading}
                                className={cn(
                                    "rounded-md px-4 pt-2 pb-1.75 normal-case",
                                    "bg-amber-600 text-white hover:bg-amber-600/80 dark:bg-amber-500 dark:hover:bg-amber-500/80"
                                )}
                                onClick={handleLogout}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                            className={cn(
                                                "h-4 w-4 rounded-full border-2",
                                                "border-[#6e7681]/30 border-t-[#6e7681]"
                                            )}
                                        />
                                        Se déconnecter
                                    </span>
                                ) : (
                                    "Se déconnecter"
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <div className={cn("flex-1 px-16 py-6")}>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
