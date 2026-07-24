import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { experiences, type Experience } from "@/data/experiences"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay } from "swiper/modules"
import { Calendar, Building2, Terminal } from "lucide-react"
import GridBackground from "@/components/grid-background"
import { cn } from "@/lib/utils"

function TimelineCard({ experience }: { experience: Experience }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            className={cn(
                "group overflow-hidden rounded-3xl border bg-linear-to-b transition-all duration-300",
                "border-white/10 from-[#151922a6] to-[#0e1118] shadow-[0_10px_35px_rgba(0,0,0,.35)] hover:border-emerald-500/20 hover:shadow-[0_20px_60px_rgba(16,185,129,.12)]"
            )}
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={experience.image}
                    alt={experience.title}
                    className={cn(
                        "h-full w-full object-cover",
                        "transition duration-700",
                        "group-hover:scale-105"
                    )}
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#0e1118] via-black/20 to-transparent" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,.20),transparent_60%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="absolute top-5 right-5">
                    <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-xl">
                        <Calendar size={12} className="mr-1 inline" />
                        {experience.year}
                    </span>
                </div>
            </div>

            <div className={cn("flex flex-col p-4")}>
                <div
                    className={cn(
                        "mb-4 flex items-center gap-2 rounded-lg border px-3 py-2 backdrop-blur-sm",
                        "border-gray-800 bg-gray-900/30"
                    )}
                >
                    <Building2
                        size={14}
                        className={cn("shrink-0", "text-emerald-400")}
                        strokeWidth={2}
                    />
                    <span
                        className={cn(
                            "flex-1 truncate text-sm font-semibold",
                            "text-[#c9d1d9]"
                        )}
                    >
                        {experience.company}
                    </span>
                    <span
                        className={cn(
                            "text-xs font-semibold",
                            "text-emerald-400"
                        )}
                    >
                        {experience.type}
                    </span>
                </div>

                <h3
                    className={cn(
                        "mb-3 line-clamp-2 text-sm font-bold transition-colors",
                        "text-[#c9d1d9] group-hover:text-emerald-400"
                    )}
                >
                    {experience.title}
                </h3>

                <p
                    className={cn(
                        "mb-4 line-clamp-5 flex-1 text-[13px] leading-relaxed",
                        "text-[#8b949e]"
                    )}
                >
                    {experience.description}
                </p>

                <div className={cn("flex flex-wrap gap-2")}>
                    {experience.tags.slice(0, 3).map((tag: string) => (
                        <span
                            key={tag}
                            className={cn(
                                "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                                "border-[#30363d] bg-gray-900 text-[#8b949e] hover:border-[#58a6ff] hover:text-[#58a6ff]"
                            )}
                        >
                            {tag}
                        </span>
                    ))}
                    {experience.tags.length > 3 && (
                        <span
                            className={cn(
                                "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium",
                                "border-[#30363d] bg-[#0d1117] text-[#6e7681]"
                            )}
                        >
                            +{experience.tags.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </motion.article>
    )
}

export default function Experiences() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <section id="experiences" className={cn("relative py-24")}>
            <GridBackground className={cn("opacity-25")} />

            <div
                className={cn(
                    "relative z-10 mx-auto max-w-350 px-4 sm:px-6 lg:px-8"
                )}
            >
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn("mb-20 text-center")}
                >
                    <div
                        className={cn(
                            "mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 backdrop-blur-sm",
                            "border-slate-800 bg-slate-900/50"
                        )}
                    >
                        <Terminal size={14} className={cn("text-cyan-400")} />
                        <span
                            className={cn(
                                "font-mono text-xs font-semibold tracking-wider uppercase",
                                "text-slate-400"
                            )}
                        >
                            System.Professional_Journey
                        </span>
                    </div>
                    <h2
                        className={cn(
                            "mb-4 text-4xl font-bold tracking-tight sm:text-5xl",
                            "text-slate-50"
                        )}
                    >
                        Expérience{" "}
                        <span className={cn("text-emerald-400")}>
                            Professionnelle
                        </span>
                    </h2>
                    <p
                        className={cn(
                            "mx-auto max-w-2xl text-lg font-light",
                            "text-slate-400"
                        )}
                    >
                        Avec plus de 3 années d'expérience dans le développement
                        logiciel, je combine une formation solide et un
                        savoir-faire éprouvé.
                    </p>
                </motion.div>

                <div className={cn("relative")}>
                    <Swiper
                        modules={[Pagination, Navigation, Autoplay]}
                        spaceBetween={24}
                        pagination={{
                            clickable: true,
                            bulletClass:
                                "swiper-pagination-bullet !bg-[#30363d]",
                            bulletActiveClass:
                                "swiper-pagination-bullet-active !bg-[#58a6ff]",
                        }}
                        navigation={{
                            nextEl: ".swiper-button-next-custom",
                            prevEl: ".swiper-button-prev-custom",
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        slidesPerView={1}
                        breakpoints={{
                            350: { slidesPerView: 1.25, spaceBetween: 20 },
                            640: { slidesPerView: 1.5, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 24 },
                            1024: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                        className={cn("px-0.5! pt-2! pb-16!")}
                    >
                        {experiences.map((experience, index) => (
                            <SwiperSlide key={index}>
                                <TimelineCard experience={experience} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button
                        title="Previous"
                        className={cn(
                            "swiper-button-prev-custom absolute top-1/2 left-0 z-10 hidden h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border shadow-lg transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-30 lg:flex",
                            "border-[#30363d] bg-[#161b22] text-[#c9d1d9] hover:border-[#58a6ff] hover:text-[#58a6ff]"
                        )}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button
                        title="Next"
                        className={cn(
                            "swiper-button-next-custom absolute top-1/2 right-0 z-10 hidden h-10 w-10 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border shadow-lg transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-30 lg:flex",
                            "border-[#30363d] bg-[#161b22] text-[#c9d1d9] hover:border-[#58a6ff] hover:text-[#58a6ff]"
                        )}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}
