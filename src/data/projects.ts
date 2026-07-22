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

export const projects: Project[] = [
    {
        title: "Portfolio V1.0",
        description:
            "Un espace web pour présenter mes réalisations, mes aptitudes et mon parcours, avec une approche actuelle et facile à utiliser, assurant une découverte aisée et une adaptation à tous les écrans.",
        tags: ["Vue.js", "PrimeVue", "Tailwindcss", "FastAPI"],
        category: "Applications Web",
        image: "/projects/portfolio-v1.png",
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
            "Amélioration de mon portfolio personnel avec une nouvelle combinaison de technologies. Une refonte complète conçue pour améliorer la rapidité, rendre l'utilisation plus agréable et actualiser le design visuel.",
        tags: ["React", "Framer Motion", "Tailwindcss", "Node.js/Express"],
        category: "Applications Web",
        image: "/projects/portfolio-v2.png",
        github: "",
        demo: "https://raharison-joshue-agape.vercel.app/",
        stars: 1,
        featured: true,
        metrics: [],
        color: "accent",
    },
    /*{
        title: "Système d'Aide à la Décision Multicritère",
        description:
            'ADOMC est une application web interactive permettant d’analyser et de comparer plusieurs alternatives selon plusieurs critères, en utilisant une approche robuste basée sur la minimisation du regret maximal (Min-Max).',
        tags: ['Python', 'NumPy', 'Streamlit', 'Panda', 'Plotly Express'],
        category: 'Applications Web',
        image: '/projects/adomc.png',
        github: 'https://github.com/joshue-agape/Decision-Support-System',
        demo: '',
        stars: 1,
        featured: true,
        metrics: [],
        color: 'green',
    },*/
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
        source: "https://github.com/joshue-agape/git-cli",
        title: "Git CLI",
        description:
            "Alias prédéfinis pour accélérer vos flux de travail et la gestion de vos versions.",
        color: "purple",
        type: "Alias PowerShell Windows",
    },
    {
        source: "https://github.com/joshue-agape/docker-cli",
        title: "Docker CLI",
        description:
            "Alias prédéfinis pour accélérer la gestion et le déploiement de vos conteneurs.",
        color: "accent",
        type: "Alias PowerShell Windows",
    },
    {
        source: "https://github.com/joshue-agape/express-cli",
        title: "Express Project",
        description:
            "Alias prédéfinis pour accélérer l’initialisation et la configuration de projets Express.",
        color: "green",
        type: "Alias PowerShell Windows",
    },
    {
        source: "https://github.com/joshue-agape/python-cli",
        title: "FastAPI Project",
        description:
            "Alias prédéfinis pour accélérer l’initialisation et la configuration de projets FastAPI.",
        color: "orange",
        type: "Alias PowerShell Windows",
    },
    {
        source: "https://github.com/joshue-agape/vue-cli",
        title: "VueJS Project",
        description:
            "Alias prédéfinis pour accélérer l’initialisation et la configuration de projets VueJS.",
        color: "purple",
        type: "Alias PowerShell Windows",
    },
    {
        source: "https://github.com/joshue-agape/react-cli",
        title: "ReactJS Project",
        description:
            "Alias prédéfinis pour accélérer l’initialisation et la configuration de projets ReactJS.",
        color: "accent",
        type: "Alias PowerShell Windows",
    },
]
