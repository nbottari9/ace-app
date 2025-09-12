

export interface QuickActionButtonProps {
    title: string
    description: string
    icon: "SOCIAL_MEDIA" | "GET_INVOLVED" | "UPCOMING_EVENTS" | "SUBMIT_EVENT_IDEA",
    redirectUrl: string
}

export interface Member {
    name: string,
    points: number
}

export interface MemberSearchProps {
    members: Member[]
    setMember: (member: Member) => Dispatch<SetStateAction<Member>>
}