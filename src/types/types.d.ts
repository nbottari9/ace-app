export interface QuickActionButtonProps {
    title: string
    description: string
    icon: "SOCIAL_MEDIA" | "GET_INVOLVED" | "UPCOMING_EVENTS" | "SUBMIT_EVENT_IDEA",
    redirectUrl: string
}

export interface LeaderboardPositionProps {
    name: string
    position: number
    points: number
}