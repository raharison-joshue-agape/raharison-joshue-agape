import type { MessageItemProps } from "@/components/admin/message"
import type { NotificationItemProps } from "@/components/admin/notification"
import {
    Briefcase,
    ChartColumn,
    Globe,
    LayoutDashboard,
    ListTodo,
    MessageSquare,
    Receipt,
    Settings,
    Star,
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
