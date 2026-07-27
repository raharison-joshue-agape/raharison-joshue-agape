import type { MessageItemProps } from "@/components/admin/message"
import type { ConversationGroup } from "@/components/admin/messages/types"
import type { NotificationItemProps } from "@/components/admin/notification"
import {
    Briefcase,
    ChartColumn,
    CheckCircle2,
    Eye,
    FolderKanban,
    Globe,
    LayoutDashboard,
    ListTodo,
    MessageSquare,
    Receipt,
    Send,
    Settings,
    Star,
    TrendingUp,
    Users,
} from "lucide-react"

export const adminNavItems = [
    {
        title: "Vue d'ensemble",
        items: [
            {
                title: "Tableau de bord",
                href: "/portfolio/dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "Analyses & Rapports",
                href: "/portfolio/analytics",
                icon: ChartColumn,
            },
        ],
    },
    {
        title: "Production & Projets",
        items: [
            {
                title: "Tous les projets",
                href: "/portfolio/projects",
                icon: Briefcase,
            },
            {
                title: "Tâches & Suivi",
                href: "/portfolio/tasks",
                icon: ListTodo,
            },
            {
                title: "Devis & Factures",
                href: "/portfolio/invoices",
                icon: Receipt,
            },
        ],
    },
    {
        title: "Relation Client (CRM)",
        items: [
            {
                title: "Répertoire Clients",
                href: "/portfolio/clients",
                icon: Users,
            },
            {
                title: "Messagerie",
                href: "/portfolio/messages",
                icon: MessageSquare,
            },
            {
                title: "Avis & Témoignages",
                href: "/portfolio/testimonials",
                icon: Star,
            },
        ],
    },
    {
        title: "Administration",
        items: [
            {
                title: "Contenu du portfolio",
                href: "/portfolio/content",
                icon: Globe,
            },
            {
                title: "Paramètres",
                href: "/portfolio/settings?tab=profile",
                icon: Settings,
            },
        ],
    },
]

export const mockMessages: MessageItemProps[] = [
    {
        senderName: "Jean Dupont",
        preview:
            "Bonjour, est-ce que les maquettes du dashboard sont prêtes pour validation ?",
        time: "10:45",
        unread: true,
        avatarUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    },
    {
        senderName: "Sophie Martin",
        preview:
            "Le devis a bien été signé de notre côté, on peut lancer la phase de développement.",
        time: "Hier",
        unread: false,
        avatarUrl:
            "https://raharison-joshue-agape.vercel.app/assets/profile-7cyklktk.jpg",
    },
    {
        senderName: "Marc Durand",
        preview: "Merci pour le retour rapide, c'est parfait pour moi.",
        time: "Il y a 3 jours",
        unread: false,
    },
    {
        senderName: "Claire Bernard",
        preview:
            "Peut-on prévoir un point téléphonique demain à 14h concernant le nouveau projet ?",
        time: "Il y a 4 jours",
        unread: true,
        avatarUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    },
]

export interface GroupedNotifications {
    date: string
    items: NotificationItemProps[]
}

export const mockNotificationsGrouped: GroupedNotifications[] = [
    {
        date: "Aujourd'hui",
        items: [
            {
                title: "Nouveau projet assigné",
                description:
                    "Le client Groupe Alpha a validé le devis pour la refonte du site e-commerce.",
                time: "Il y a 5 min",
                type: "success",
            },
            {
                title: "Échéance de tâche proche",
                description:
                    "La date limite pour la livraison de l'API de paiement arrive à expiration demain.",
                time: "Il y a 25 min",
                type: "warning",
            },
            {
                title: "Erreur de synchronisation",
                description:
                    "Échec de la mise en compte automatique des factures avec le serveur distant.",
                time: "Il y a 1 heure",
                type: "error",
            },
            {
                title: "Nouveau message client",
                description:
                    "Jean Dupont vous a envoyé un message concernant la maquette du dashboard.",
                time: "Il y a 3 heures",
                type: "info",
            },
        ],
    },
    {
        date: "Hier",
        items: [
            {
                title: "Mise à jour du système",
                description:
                    "Une nouvelle version de l'espace d'administration a été déployée avec succès.",
                time: "Il y a 1 jour",
                type: "default",
            },
        ],
    },
]

// Données fictives pour les statistiques
export const stats = [
    {
        title: "Visites du Portfolio",
        value: "24,592",
        change: "+12.5%",
        isPositive: true,
        icon: Eye,
        description: "vs le mois dernier",
    },
    {
        title: "Messages Reçus",
        value: "142",
        change: "+18.2%",
        isPositive: true,
        icon: MessageSquare,
        description: "vs le mois dernier",
    },
    {
        title: "Projets Actifs",
        value: "8",
        change: "0%",
        isPositive: true,
        icon: FolderKanban,
        description: "En cours de maintenance",
    },
    {
        title: "Taux d'Engagement",
        value: "68.4%",
        change: "-2.1%",
        isPositive: false,
        icon: TrendingUp,
        description: "vs le mois dernier",
    },
]

// Activités récentes
export const recentActivities = [
    {
        action: "Mise à jour du projet DGSR",
        time: "Il y a 2 heures",
        status: "Complété",
        icon: CheckCircle2,
    },
    {
        action: "Nouveau message de contact (Jean Dupont)",
        time: "Il y a 5 heures",
        status: "En attente",
        icon: MessageSquare,
    },
    {
        action: "Déploiement de la version 2.4.0",
        time: "Il y a 1 jour",
        status: "Succès",
        icon: Send,
    },
]

export const projects = [
    {
        name: "Plateforme ERP DGSR",
        category: "Architecture & Backend",
        progress: 85,
        status: "En cours",
        tech: "Angular / NestJS",
    },
    {
        name: "Interface Portfolio Admin",
        category: "Frontend Management",
        progress: 95,
        status: "Finalisation",
        tech: "React / Vite / Tailwind",
    },
    {
        name: "API Sécurisée de Trafic",
        category: "Microservices",
        progress: 40,
        status: "Planifié",
        tech: "Node.js",
    },
]

export const quickMessagesData = [
    {
        id: "1",
        sender: "Jean Dupont",
        email: "jean.dupont@example.com",
        preview:
            "Bonjour, je souhaite discuter d'une collaboration sur une architecture d'application...",
        time: "Il y a 35 min",
        unread: true,
    },
    {
        id: "2",
        sender: "Sarah Ravelo",
        email: "sarah.rav@example.com",
        preview:
            "Super portfolio ! Seriez-vous disponible pour un projet de refonte frontend ?",
        time: "Il y a 3 heures",
        unread: true,
    },
    {
        id: "3",
        sender: "Marc Andriana",
        email: "marc.andriana@example.com",
        preview:
            "Voici les spécifications techniques demandées pour la partie backend NestJS.",
        time: "Il y a 1 jour",
        unread: false,
    },
]

export const initialConversations: ConversationGroup[] = [
    {
        email: "jean.dupont@enterprise.com",
        name: "Jean Dupont",
        location: "Paris, France",
        subject: "Demande de prestation - Architecture ERP",
        isStarred: true,
        isRead: false,
        messages: [
            {
                id: "m1",
                description:
                    "Bonjour,\n\nJ'ai consulté vos réalisations et votre profil m'intéresse vivement. Nous avons un projet d'intégration ERP nécessitant des compétences poussées en Angular et NestJS.\n\nSeriez-vous disponible pour un échange ?",
                created_at: "2026-07-26T10:45:00.000Z",
                isFromAdmin: false,
            },
        ],
    },
    {
        email: "sarah.rav@tech-solutions.mg",
        name: "Sarah Ravelo",
        location: "Antananarivo, Madagascar",
        subject: "Refonte Interface Web Client",
        isStarred: false,
        isRead: false,
        messages: [
            {
                id: "m2",
                description:
                    "Salut,\n\nJe reviens vers toi suite à notre dernière réunion. Est-ce que tu as eu le temps de jeter un œil aux maquettes Figma pour l'interface client ?",
                created_at: "2026-07-25T14:20:00.000Z",
                isFromAdmin: false,
            },
            {
                id: "m3",
                description:
                    "Bonjour Sarah, oui j'ai regardé. C'est très propre. Je t'envoie une invitation sur ma plateforme client pour suivre l'avancement.",
                created_at: "2026-07-25T16:00:00.000Z",
                isFromAdmin: true,
            },
        ],
    },
    {
        email: "marc.andriana@dgsr-sec.mg",
        name: "Marc Andriana",
        location: "Fianarantsoa, Madagascar",
        subject: "Spécifications techniques - Module Sécurité",
        isStarred: true,
        isRead: true,
        messages: [
            {
                id: "m4",
                description:
                    "Bonjour,\n\nVous trouverez ci-joint les spécifications validées concernant les rôles d'accès et le chiffrement des données pour la plateforme DGSR.",
                created_at: "2026-07-24T09:15:00.000Z",
                isFromAdmin: false,
            },
        ],
    },
]
