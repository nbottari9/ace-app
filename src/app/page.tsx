import { LeaderboardEntry } from "@/components/LeaderboardEntry"
import { DMSans } from "@/app/fonts";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/data"
import { Schema } from "AMPLIFY/data/resource";
import outputs from "../../amplify_outputs.json"
import { cookies } from "next/headers";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// const testdata: LeaderboardPositionProps[] = [
//     {
//         name: "John Doe",
//         position: 1,
//         points: 100
//     },
//     {
//         name: "John Doe",
//         position: 2,
//         points: 100
//     },
//     {
//         name: "John Doe",
//         position: 3,
//         points: 100

//     },
//     {
//         name: "John Doe",
//         position: 4,
//         points: 100
//     }
// ]

const cookieBasedClient = generateServerClientUsingCookies<Schema>({
    config: outputs,
    cookies
})


const getLeaderboard = async (): Promise<Schema["Member"]["type"][] | null> => {
    const { data, errors } = await cookieBasedClient.models.Member.list({
        sortDirection: "DESC",
    })

    if (errors) {
        console.error(errors)
        return null
    }

    return data
}

const leaderboard = (await getLeaderboard())?.sort((a, b) => b.points - a.points);

export default async function LeaderboardPage() {
    return (
        <div className="flex flex-col w-full items-center justify-center gap-4 pt-4">
            <div className={`${DMSans.className} text-3xl font-md`}>Current Rankings</div>
            <div className="flex flex-col justify-start gap-3 p-3 w-full">
                {
                    leaderboard ? (
                        leaderboard.map((p, idx) => (
                            <LeaderboardEntry position={idx + 1} name={p.name} points={p.points} key={idx} />
                        ))
                    ) : (
                        <LoadingSpinner />
                    )
                }
            </div>
        </div>
    )
}