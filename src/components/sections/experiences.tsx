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

const TimelineCard = ({ experience }: { experience: Experience }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="group h-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 shadow-lg transition-all duration-300 hover:shadow-[0_8px_30px_rgb(88,166,255,0.12)]"
        >
            <div className="relative h-60 overflow-hidden bg-gray-900/40">
                <div className="absolute inset-0 bg-linear-to-br from-gray-950/20 to-gray-900/20" />
                <img
                    src={experience.image}
                    alt={experience.title}
                    className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-linear-to-t from-gray-900 to-transparent" />

                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-gray-800 bg-gray-900/50 px-3 py-1.5 backdrop-blur-sm">
                    <Calendar
                        size={12}
                        className="text-emerald-400"
                        strokeWidth={2}
                    />
                    <span className="text-xs font-semibold text-[#c9d1d9]">
                        {experience.year}
                    </span>
                </div>

                <div className="absolute right-3 bottom-3 left-3">
                    <div className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900/30 px-3 py-2 backdrop-blur-sm">
                        <Building2
                            size={14}
                            className="shrink-0 text-emerald-400"
                            strokeWidth={2}
                        />
                        <span className="flex-1 truncate text-sm font-semibold text-[#c9d1d9]">
                            {experience.company}
                        </span>
                        <span className="text-xs font-semibold text-emerald-400">
                            {experience.type}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h3 className="mb-3 line-clamp-2 text-lg font-bold text-[#c9d1d9] transition-colors group-hover:text-emerald-400">
                    {experience.title}
                </h3>

                <p className="mb-4 line-clamp-5 text-sm leading-relaxed text-[#8b949e]">
                    {experience.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {experience.tags.slice(0, 3).map((tag: string) => (
                        <span
                            key={tag}
                            className="inline-flex items-center rounded-md border border-[#30363d] bg-gray-900 px-2.5 py-1 text-xs font-medium text-[#8b949e] transition-colors hover:border-[#58a6ff] hover:text-[#58a6ff]"
                        >
                            {tag}
                        </span>
                    ))}
                    {experience.tags.length > 3 && (
                        <span className="inline-flex items-center rounded-md border border-[#30363d] bg-[#0d1117] px-2.5 py-1 text-xs font-medium text-[#6e7681]">
                            +{experience.tags.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default function Experiences() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <section id="experiences" className="relative py-24">
            <GridBackground className="opacity-25" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-20 text-center"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 backdrop-blur-sm">
                        <Terminal size={14} className="text-cyan-400" />
                        <span className="font-mono text-xs font-semibold tracking-wider text-slate-400 uppercase">
                            System.Professional_Journey
                        </span>
                    </div>
                    <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
                        Expérience{" "}
                        <span className="text-emerald-400">
                            Professionnelle
                        </span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg font-light text-slate-400">
                        Avec plus de 3 années d'expérience dans le développement
                        logiciel, je combine une formation solide et un
                        savoir-faire éprouvé.
                    </p>
                </motion.div>

                <div className="relative">
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
                        className="px-0.5! pt-2! pb-16!"
                    >
                        {experiences.map((experience, index) => (
                            <SwiperSlide key={index}>
                                <TimelineCard experience={experience} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button
                        title="Previous"
                        className="swiper-button-prev-custom absolute top-1/2 left-0 z-10 hidden h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-[#30363d] bg-[#161b22] text-[#c9d1d9] shadow-lg transition-all duration-200 hover:border-[#58a6ff] hover:text-[#58a6ff] disabled:cursor-not-allowed disabled:opacity-30 lg:flex"
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
                        className="swiper-button-next-custom absolute top-1/2 right-0 z-10 hidden h-10 w-10 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-[#30363d] bg-[#161b22] text-[#c9d1d9] shadow-lg transition-all duration-200 hover:border-[#58a6ff] hover:text-[#58a6ff] disabled:cursor-not-allowed disabled:opacity-30 lg:flex"
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
