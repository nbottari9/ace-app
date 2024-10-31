import { LeaderboardPosition } from "@/components/LeaderboardPosition";
import { DMSans } from "FONTS";

export default function LeaderboardPage() {
    return (
        <div className="flex flex-col w-full items-center justify-center">
            <div className={`${DMSans} text-3xl`}>Current Rankings</div>
            <div className="flex flex-col justify-start gap-3 p-3 w-full">
                <LeaderboardPosition position={1} name="John Doe" points={100} />
                <LeaderboardPosition position={2} name="John Doe" points={100} />
                <LeaderboardPosition position={3} name="John Doe" points={100} />
                <LeaderboardPosition position={4} name="John Doe" points={100} />
            </div>
        </div>
    )
}