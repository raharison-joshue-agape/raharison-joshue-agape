export type Project = {
    title: string
    description: string
    tags: string[]
    category: string
    github: string
    demo: string
    stars: number
    featured: boolean
    metrics: string[]
    color: string
    image: string
}

const portfolioV1URL = new URL(
    "@/assets/projects/portfolio-v1.png",
    import.meta.url
).href

const portfolioV2URL = new URL(
    "@/assets/projects/portfolio-v2.png",
    import.meta.url
).href

export const projects: Project[] = [
    {
        title: "Portfolio V1.0",
        description:
            "Un espace web moderne et responsive pour présenter mes réalisations et mon parcours avec une navigation fluide et adaptée à tous les écrans.",
        tags: ["Vue.js", "PrimeVue", "Tailwindcss", "FastAPI"],
        category: "Applications Web",
        image: portfolioV1URL,
        github: "",
        demo: "https://raharison-joshue-agape-folio.vercel.app",
        stars: 1,
        featured: true,
        metrics: [],
        color: "green",
    },
    {
        title: "Portfolio V2.0",
        description:
            "Refonte complète de mon portfolio personnel intégrant des animations fluides et de nouvelles technologies pour booster les performances et dynamiser l'expérience.",
        tags: ["React", "Framer Motion", "Tailwindcss", "Node.js/Express"],
        category: "Applications Web",
        image: portfolioV2URL,
        github: "",
        demo: "https://raharison-joshue-agape.vercel.app/",
        stars: 1,
        featured: true,
        metrics: [],
        color: "accent",
    },
]

export type ToolBox = {
    source: string
    title: string
    description: string
    color: string
    type: string
}

export const toolbox: ToolBox[] = [
    {
        source: "https://github.com/raharison-joshue-agape/ps-git-aliases",
        title: "Git CLI",
        description:
            "Alias prédéfinis pour accélérer vos flux de travail et la gestion de vos versions.",
        color: "purple",
        type: "Alias PowerShell Windows",
    },
    {
        source: "https://github.com/raharison-joshue-agape/ps-docker-aliases",
        title: "Docker CLI",
        description:
            "Alias prédéfinis pour accélérer la gestion et le déploiement de vos conteneurs.",
        color: "accent",
        type: "Alias PowerShell Windows",
    },
    {
        source: "https://github.com/raharison-joshue-agape/ps-express-aliases",
        title: "Express Project",
        description:
            "Alias prédéfinis pour accélérer l’initialisation et la configuration de projets Express.",
        color: "green",
        type: "Alias PowerShell Windows",
    },
    {
        source: "https://github.com/raharison-joshue-agape/ps-fastapi-aliases",
        title: "FastAPI Project",
        description:
            "Alias prédéfinis pour accélérer l’initialisation et la configuration de projets FastAPI.",
        color: "orange",
        type: "Alias PowerShell Windows",
    },
    {
        source: "https://github.com/raharison-joshue-agape/ps-vue-project",
        title: "VueJS Project",
        description:
            "Alias prédéfinis pour accélérer l’initialisation et la configuration de projets VueJS.",
        color: "purple",
        type: "Alias PowerShell Windows",
    },
    {
        source: "https://github.com/raharison-joshue-agape/ps-react-project",
        title: "ReactJS Project",
        description:
            "Alias prédéfinis pour accélérer l’initialisation et la configuration de projets ReactJS.",
        color: "accent",
        type: "Alias PowerShell Windows",
    },
]
