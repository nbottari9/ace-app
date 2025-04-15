import { LeaderboardPosition } from "@/components/LeaderboardPosition";
import { LeaderboardPositionProps } from "@/types/types";
import { DMSans } from "@/app/fonts";

const testdata: LeaderboardPositionProps[] = [
    {
        name: "John Doe",
        position: 1,
        points: 100
    },
    {
        name: "John Doe",
        position: 2,
        points: 100
    },
    {
        name: "John Doe",
        position: 3,
        points: 100

    },
    {
        name: "John Doe",
        position: 4,
        points: 100
    }
]

export default function LeaderboardPage() {
    return (
        <div className="flex flex-col w-full items-center justify-center gap-4 pt-4">
            <div className={`${DMSans.className} text-3xl font-md`}>Current Rankings</div>
            <div className="flex flex-col justify-start gap-3 p-3 w-full">
                {
                    testdata.map((p, idx) => (
                        <LeaderboardPosition position={p.position} name={p.name} points={p.points} key={idx} />
                    ))
                }
            </div>
        </div>
    )
}