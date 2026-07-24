import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
    { label: "À propos", href: "#about" },
    { label: "Expériences", href: "#experiences" },
    { label: "Projets", href: "#projects" },
    { label: "Compétences", href: "#skills" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
]

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("hero")

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActiveSection(e.target.id)
                })
            },
            { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
        )

        document
            .querySelectorAll("section[id]")
            .forEach((s) => observer.observe(s))
        return () => observer.disconnect()
    }, [])

    return (
        <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "fixed top-4 left-1/2 z-50 w-[94%] max-w-6xl -translate-x-1/2"
            )}
        >
            <nav
                className={cn(
                    "relative flex h-14 items-center justify-between rounded-2xl border px-2 backdrop-blur-lg transition-all duration-500 ease-out",
                    "border-white/8",
                    scrolled &&
                        "bg-zinc-950/70 shadow-[0_16px_48px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]"
                )}
            >
                <motion.a
                    href="#hero"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                        "flex items-center gap-2.5 rounded-xl py-1.5 pr-4 pl-3 transition-colors",
                        "hover:bg-white/3"
                    )}
                >
                    <div
                        className={cn(
                            "relative flex h-7 w-7 items-center justify-center rounded-lg border",
                            "border-white/8 bg-white/5"
                        )}
                    >
                        <Terminal
                            size={14}
                            className={cn("text-cyan-400")}
                            strokeWidth={2.5}
                        />
                        <div
                            className={cn(
                                "absolute inset-0 rounded-lg blur-md",
                                "bg-cyan-400/10"
                            )}
                        />
                    </div>
                    <span
                        className={cn(
                            "font-mono text-[15px] font-semibold tracking-tight",
                            "text-zinc-100"
                        )}
                    >
                        rja<span className={cn("text-zinc-500")}>@</span>
                        <span className={cn("text-zinc-300")}>devops</span>
                    </span>
                </motion.a>

                <div className={cn("hidden items-center gap-0.5 md:flex")}>
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.slice(1)
                        return (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "group relative rounded-lg px-3.5 py-1.5 text-[13px] font-medium tracking-wide transition-colors duration-200",
                                    isActive ? "text-white" : "text-[#a1a1aa]"
                                )}
                                whileHover={{ color: "#ffffff" }}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="active-pill"
                                        className={cn(
                                            "absolute inset-0 rounded-lg border",
                                            "border-white/8 bg-white/8"
                                        )}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                <span
                                    className={cn(
                                        "relative z-10 flex items-center gap-1.5"
                                    )}
                                >
                                    {link.label}
                                </span>
                            </motion.a>
                        )
                    })}
                </div>

                <div className={cn("flex items-center gap-2 pr-1.5")}>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                            "hidden h-9 items-center rounded-xl px-4 text-[13px] font-semibold tracking-wide transition-all duration-200 md:flex",
                            "bg-white text-zinc-950 shadow-[0_0_12px_rgba(255,255,255,0.1)] hover:bg-zinc-200"
                        )}
                    >
                        Me contacter
                    </motion.a>

                    <motion.button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        whileTap={{ scale: 0.9 }}
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-xl border transition-colors md:hidden",
                            "border-white/8 bg-white/5 text-zinc-400 hover:text-white"
                        )}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={mobileOpen ? "x" : "menu"}
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.15 }}
                            >
                                {mobileOpen ? (
                                    <X size={16} />
                                ) : (
                                    <Menu size={16} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </div>
            </nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{
                            duration: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className={cn(
                            "mt-2 rounded-2xl border p-2 backdrop-blur-2xl md:hidden",
                            "border-white/8 bg-zinc-950/90 shadow-[0_16px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
                        )}
                    >
                        <div className={cn("flex flex-col gap-0.5")}>
                            {navLinks.map((link) => {
                                const isActive =
                                    activeSection === link.href.slice(1)
                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={cn(
                                            "rounded-xl px-4 py-2.5 text-[14px] font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-white/8 text-white"
                                                : "text-zinc-400 hover:bg-white/4 hover:text-white"
                                        )}
                                    >
                                        {link.label}
                                    </a>
                                )
                            })}

                            <div
                                className={cn(
                                    "my-1.5 border-t",
                                    "border-white/6"
                                )}
                            />

                            <a
                                href="#contact"
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "flex items-center justify-center rounded-xl px-4 py-2.5 text-[14px] font-semibold transition-colors",
                                    "bg-white text-zinc-950 hover:bg-zinc-200"
                                )}
                            >
                                Me contacter
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
