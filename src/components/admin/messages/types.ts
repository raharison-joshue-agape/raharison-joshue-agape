export interface ContactMessageItem {
    id: string
    description: string
    created_at: string
    isFromAdmin: boolean
    isInvitation?: boolean
}

export interface ConversationGroup {
    email: string
    name: string
    location?: string
    subject: string
    isStarred: boolean
    isRead: boolean
    messages: ContactMessageItem[]
}

export type FilterType = "all" | "unread" | "starred"
export type ReplyMode = "message" | "invitation"
