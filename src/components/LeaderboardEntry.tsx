
import { DMSans } from "FONTS"

export const LeaderboardEntry = ({ position, name, points }: { position: number, name: string, points: number }) => {
    let bgColor = "bg-light-purple"
    switch (position) {
        case 1:
            bgColor = "bg-first-place-gold"
            break;
        case 2:
            bgColor = "bg-second-place-silver"
            break
        case 3:
            bgColor = "bg-third-place-bronze"
            break
        default:
            bgColor = "bg-primary"
            break
    }

    return (
        <div className={`flex flex-row items-center justify-between ${bgColor} rounded-lg pt-3 pb-3`}>
            <div className={`p-2 w-4 text-3xl ${DMSans.className}`}>{position}</div>
            <div className={`p-2 text-3xl ${DMSans.className}`}>{name}</div>
            <div className={`p-2 text-3xl ${DMSans.className}`}>{points}</div>
        </div>
    )
}