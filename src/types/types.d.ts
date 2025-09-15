import { Schema } from "AMPLIFY/data/resource"


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
    members: Schema["Member"]["type"][]
    setMember: (member: Schema["Member"]["type"]) => Dispatch<SetStateAction<Schema["Member"]["type"]>>
}

export type AttendanceReportCSVEntry = {
    "First Name": string
    "Last Name": string
    "Net ID": string
}