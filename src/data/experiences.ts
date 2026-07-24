export type Experience = {
    year: string
    type: string
    title: string
    company: string
    location: string
    description: string
    tags: string[]
    image: string
}

const tonCosmosURL = new URL(
    "@/assets/experiences/tonCosmos.png",
    import.meta.url
).href
const n8nENIURL = new URL("@/assets/experiences/n8nENI.png", import.meta.url)
    .href
const mandikaAppURL = new URL(
    "@/assets/experiences/mandikaAPK.png",
    import.meta.url
).href
const sfyriBookingURL = new URL(
    "@/assets/experiences/sfyriBooking.png",
    import.meta.url
).href
const helloArchiURL = new URL(
    "@/assets/experiences/helloArchi.png",
    import.meta.url
).href
const openDeliveryURL = new URL(
    "@/assets/experiences/openDelivery.png",
    import.meta.url
).href

export const experiences: Experience[] = [
    {
        year: "Avr. 2026 - Jui. 2026",
        type: "Freelance",
        title: "Création d'une application web mobile-first (Ton Cosmos)",
        company: "JVN Lab",
        location: "Fianarantsoa 301, Madagascar",
        description:
            "Conception d'une plateforme avec FastAPI, Stripe et l'IA Anthropic pour générer des rapports astrologiques personnalisés.",
        tags: [
            "React.js",
            "Supabase",
            "FastAPI",
            "Docker",
            "Stripe API",
            "Anthropic API",
        ],
        image: tonCosmosURL,
    },
    {
        year: "Oct. 2025 - Nov. 2025",
        type: "Projet de fin de cycle",
        title: "Automatisation de l'analyse d'e-mails avec l'IA et n8n",
        company: "ENI",
        location: "Fianarantsoa 301, Madagascar",
        description:
            "Développement d'une solution d'automatisation intelligente sous n8n et Flask pour analyser, trier et gérer les e-mails.",
        tags: ["React.js", "PostgreSQL", "Flask", "N8N", "Docker"],
        image: n8nENIURL,
    },
    {
        year: "Oct. 2025 - Nov. 2025",
        type: "Mission",
        title: "Développement de l'application mobile - Mandika",
        company: "RafalTech",
        location: "Full Remote",
        description:
            "Conception d'une application mobile Flutter intégrant OCR et Django pour capturer, analyser et exporter des données.",
        tags: [
            "Flutter",
            "Django",
            "PostgreSQL",
            "Tesseract OCR",
            "Hugging Face",
        ],
        image: mandikaAppURL,
    },
    {
        year: "Aug. 2024 - Dec. 2024",
        type: "Stage en entreprise",
        title: "Gestion de rendez-vous synchronisée avec Google Calendar",
        company: "SfyriTech",
        location: "Antananarivo, Madagascar",
        description:
            "Création d'une application de planification synchronisée avec Google Calendar grâce à Nest.js et des API WebSockets.",
        tags: [
            "Quasar",
            "PostgreSQL",
            "Nest.js",
            "Prisma ORM",
            "Google Calendar API",
        ],
        image: sfyriBookingURL,
    },
    {
        year: "May 2024 - Sept. 2024",
        type: "Mission",
        title: "Développement d'API pour la plateforme Hello Archi",
        company: "SfyriTech",
        location: "Full Remote",
        description:
            "Optimisation du backend Node.js et développement de nouvelles fonctionnalités d'API pour améliorer la scalabilité système.",
        tags: ["Node.js", "Express", "Sequelize ORM", "Docker", "websocket"],
        image: helloArchiURL,
    },
    {
        year: "Sept. 2023 - Nov. 2023",
        type: "Stage en entreprise",
        title: "Application de gestion des commandes et des livraisons",
        company: "Open Delivery",
        location: "Antsirabe, Madagascar",
        description:
            "Participation au développement Full Stack d'un système de gestion des livraisons sous Laravel et Vue.js.",
        tags: ["Vue.js", "PHP", "Laravel", "jQuery", "MySQL"],
        image: openDeliveryURL,
    },
]
