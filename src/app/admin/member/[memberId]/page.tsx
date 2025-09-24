import { getMember, getMemberHistory } from "@/app/actions"
import { DMSans } from "@/app/fonts"
import { HistoryEntry } from "@/components/HistoryEntry"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { PointsGauge } from "@/components/PointsGauge"


export default async function Member({ params }: { params: Promise<{ memberId: string }> }) {
    const { memberId } = await params
    const member = await getMember({
        memberId,
    })

    const history = await getMemberHistory({
        memberId
    })

    const sortedHistory = history!.history.sort((a, b) => { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() })


    return (
        <div className="flex flex-col gap-2">
            {member ?

                (
                    <div className="flex flex-col items-center m-8 gap-6">
                        <div className={`${DMSans.className} text-xs`}>{member.id}</div>
                        <div className={`${DMSans.className} text-5xl`}>{member.name}</div>
                        <PointsGauge points={member.points} />
                        <div className={`${DMSans.className} text-3xl`}>History</div>
                        <div className="flex flex-col gap-2 w-full overflow-scroll">
                            {
                                history ? (
                                    sortedHistory.map((entry, idx) => (
                                        <HistoryEntry key={idx} reason={entry.reason!} value={entry.value!} />
                                    ))
                                ) : (
                                    <LoadingSpinner />
                                )

                            }
                        </div>
                    </div>

                ) : (
                    <LoadingSpinner />
                )}
        </div>
    )
}