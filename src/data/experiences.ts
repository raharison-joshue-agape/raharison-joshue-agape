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

export const experiences: Experience[] = [
    {
        year: "Oct. 2026 - En cours",
        type: "Professionnel",
        title: "Création d'une application web mobile-first (Ton Cosmos)",
        company: "Freelance",
        location: "Fianarantsoa 301, Madagascar",
        description:
            "Conception d'une plateforme web mobile-first de produits digitaux sous React et d'une architecture backend asynchrone avec FastAPI, intégrant le paiement Stripe, des calculs astronomiques et un moteur IA (Anthropic) pour générer et livrer des rapports astrologiques PDF personnalisés en moins de 3 minutes.",
        tags: [
            "React.js",
            "Supabase",
            "FastAPI",
            "Docker",
            "Stripe API",
            "Anthropic API",
        ],
        image: "/experiences/ton-cosmos.jpg",
    },
    {
        year: "Oct. 2025 - Nov. 2025",
        type: "Projet de fin de cycle",
        title: "Automatisation de l'analyse d'e-mails avec l'IA et n8n",
        company: "ENI",
        location: "Fianarantsoa 301, Madagascar",
        description:
            "J'ai conçu et déployé une solution d'automatisation intégrale pour examiner les e-mails, exploitant l'intelligence artificielle et la plateforme n8n. Une interface conviviale a vu le jour pour consulter les e-mails analysés, permettant un tri et une gestion aisés, tout en offrant un aperçu immédiat des informations.",
        tags: ["React.js", "PostgreSQL", "Flask", "N8N", "Docker"],
        image: "/experiences/n8n-autoflow.png",
    },
    {
        year: "Oct. 2025 - Nov. 2025",
        type: "Professionnel",
        title: "Développement de l'application mobile - Mandika",
        company: "RafalTech, Antananarivo",
        location: "Full Remote",
        description:
            "J'ai mis au point une application mobile qui permet de prendre et d'améliorer des photos. En outre, j'ai inclus la technologie OCR pour en tirer des informations, ainsi que des interfaces pour voir, modifier et exporter les données de manière organisée.",
        tags: [
            "Flutter",
            "Django",
            "PostgreSQL",
            "Tesseract OCR",
            "Hugging Face",
        ],
        image: "/experiences/flutter-django.png",
    },
    {
        year: "Aug. 2024 - Dec. 2024",
        type: "Stage en entreprise",
        title: "Gestion de rendez-vous synchronisée avec Google Calendar",
        company: "SfyriTech - Start Up",
        location: "Antananarivo, Madagascar",
        description:
            "J'ai conçu et développé une application de planification parfaitement synchronisée avec Google Calendar. Pour garantir des mises à jour en temps réel et une expérience utilisateur fluide sur l'ensemble de la plateforme, j'ai développé des API RESTful et WebSocket.",
        tags: [
            "Quasar",
            "PostgreSQL",
            "Nest.js",
            "Prisma ORM",
            "Google Calendar API",
        ],
        image: "/experiences/nest-vue.webp",
    },
    {
        year: "May 2024 - Sept. 2024",
        type: "Professionnel",
        title: "Développement d'API pour la plateforme Hello Archi",
        company: "SfyriTech - Start Up",
        location: "Full Remote",
        description:
            "J'ai amélioré les performances du backend en optimisant le code existant et en résolvant des anomalies critiques. De plus, j'ai développé de nouvelles fonctionnalités d'API adaptées aux besoins des clients, améliorant ainsi l'utilisabilité, la scalabilité et la fiabilité globale du système.",
        tags: ["Node.js", "Express", "Sequelize ORM", "Docker", "websocket"],
        image: "/experiences/node-express.jpg",
    },
    {
        year: "Sept. 2023 - Nov. 2023",
        type: "Stage en entreprise",
        title: "Application de gestion des commandes et des livraisons",
        company: "Open Data / Open Delivery",
        location: "Antsirabe, Madagascar",
        description:
            "J'ai contribué au développement Full Stack d'un système de gestion des commandes et des livraisons. J'ai implémenté des fonctionnalités sur mesure et des solutions scalables adaptées aux exigences des clients, améliorant ainsi l'efficacité opérationnelle.",
        tags: ["Vue.js", "PHP", "Laravel", "jQuery", "MySQL"],
        image: "/experiences/laravel.png",
    },
]
