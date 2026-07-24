export type Skill = {
    title: string
    subtitle: string
    techs: { name: string; value: number }[]
}

export const skills: Skill[] = [
    {
        title: "Développement Web Front-End & Mobile",
        subtitle:
            "Conception et développement d’interfaces performantes, réactives et accessibles pour applications web et mobiles. Maîtrise des frameworks modernes, de l’intégration UI, de l’optimisation des performances, de l’accessibilité, des animations et de la consommation efficace d’API.",
        techs: [
            { name: "Vue.js", value: 90 },
            { name: "React", value: 90 },
            { name: "Next.js", value: 90 },
            { name: "Angular", value: 90 },
            { name: "Flutter", value: 80 },
            { name: "React Native", value: 70 },
            { name: "Bootstrap", value: 90 },
            { name: "Tailwind CSS", value: 90 },
        ],
    },
    {
        title: "Développement de Services Back-End",
        subtitle:
            "Architecture et développement de services back-end sécurisés et scalables. Conception d'API, gestion de bases de données, authentification, optimisation des performances, tests, intégrations et déploiement cloud fiable, le tout aligné sur les exigences métiers.",
        techs: [
            { name: "Node.js", value: 90 },
            { name: "Express.js", value: 90 },
            { name: "NestJS", value: 90 },
            { name: "Django", value: 80 },
            { name: "Flask", value: 80 },
            { name: "FastAPI", value: 90 },
            { name: "Laravel", value: 70 },
            { name: "Symfony", value: 50 },
        ],
    },
    {
        title: "Design UI/UX & Base de données & DevOps",
        subtitle:
            "Conception centrée utilisateur et pratiques DevOps pour des livraisons fiables. Prototypage, tests utilisateurs, design systems, automatisation, CI/CD, sécurité, monitoring, amélioration continue des performances, collaboration, qualité, scalabilité et documentation.",
        techs: [
            { name: "Figma", value: 50 },
            { name: "MySQL", value: 90 },
            { name: "PostgreSQL", value: 90 },
            { name: "MongoDB", value: 50 },
            { name: "Git", value: 90 },
            { name: "Docker", value: 90 },
            { name: "Jenkins", value: 60 },
            { name: "SEO", value: 50 },
        ],
    },
]

export type Framework = {
    name: string
    icon: string
}

export const frameworks: Framework[] = [
    {
        name: "IA N8N",
        icon: new URL("@/assets/techs/n8n.png", import.meta.url).href,
    },
    {
        name: "Tailwind css",
        icon: new URL("@/assets/techs/tailwindcss.png", import.meta.url).href,
    },
    {
        name: "Bootstrap",
        icon: new URL("@/assets/techs/bootstrap.jpeg", import.meta.url).href,
    },
    {
        name: "Nuxt",
        icon: new URL("@/assets/techs/nuxt.png", import.meta.url).href,
    },
    {
        name: "Primevue",
        icon: new URL("@/assets/techs/primevue.png", import.meta.url).href,
    },
    {
        name: "Quasar",
        icon: new URL("@/assets/techs/quasar.png", import.meta.url).href,
    },
    {
        name: "Nest",
        icon: new URL("@/assets/techs/nestjs.png", import.meta.url).href,
    },
    {
        name: "Vuetify",
        icon: new URL("@/assets/techs/vuetify.jpeg", import.meta.url).href,
    },
    {
        name: "Material UI",
        icon: new URL("@/assets/techs/material-ui.jpg", import.meta.url).href,
    },
    {
        name: "Hero UI",
        icon: new URL("@/assets/techs/heroUI.png", import.meta.url).href,
    },
    {
        name: "React bootstrap",
        icon: new URL("@/assets/techs/React-bootstrap.webp", import.meta.url)
            .href,
    },
    {
        name: "Shadcn ui",
        icon: new URL("@/assets/techs/shadcs.png", import.meta.url).href,
    },
    {
        name: "Chakra UI",
        icon: new URL("@/assets/techs/chakraui.jpeg", import.meta.url).href,
    },
    {
        name: "Ant design",
        icon: new URL("@/assets/techs/ant-design.jpg", import.meta.url).href,
    },
    {
        name: "Primereact",
        icon: new URL("@/assets/techs/primereact.jpg", import.meta.url).href,
    },
    {
        name: "Element Plus",
        icon: new URL("@/assets/techs/element-plus.png", import.meta.url).href,
    },
    {
        name: "Bootstrap vue",
        icon: new URL("@/assets/techs/bootstrapvue.jpg", import.meta.url).href,
    },
    {
        name: "PrimeNG",
        icon: new URL("@/assets/techs/primeng.png", import.meta.url).href,
    },
    {
        name: "Angular Material",
        icon: new URL("@/assets/techs/angular-material.svg", import.meta.url)
            .href,
    },
    {
        name: "Lucide Icon",
        icon: new URL("@/assets/techs/lucide.jpg", import.meta.url).href,
    },
    {
        name: "Flaticon",
        icon: new URL("@/assets/techs/flaticon.jpeg", import.meta.url).href,
    },
    {
        name: "Native Expo",
        icon: new URL("@/assets/techs/native-expo.jpeg", import.meta.url).href,
    },
    {
        name: "Prisma ORM",
        icon: new URL("@/assets/techs/prisma.png", import.meta.url).href,
    },
    {
        name: "Sequelize",
        icon: new URL("@/assets/techs/sequelize.jpg", import.meta.url).href,
    },
]
