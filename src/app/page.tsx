"use client"
// import Image from "next/image";

import { DMSans } from "FONTS";
import { AbsoluteCenter, ProgressCircle } from "@chakra-ui/react";
import { QuickActionButton } from "@/components/QuickActionButton";
import { QuickActionButtonProps } from "@/types/types";

const quickactionbuttons: QuickActionButtonProps[] = [
    {
        title: "Get involved",
        description: "Volunteer for an ACE event!",
        icon: "GET_INVOLVED",
        redirectUrl: "https://umasslowellclubs.campuslabs.com/engage/organization/association-for-campus-events/events"
    },
    {
        title: "Social Media",
        description: "Check out ACE Social Media!",
        icon: "SOCIAL_MEDIA",
        redirectUrl: "https://linktr.ee/umlace"
    },
    {
        title: "Upcoming Events",
        description: "Upcoming ACE Events on campus",
        icon: "UPCOMING_EVENTS",
        redirectUrl: "https://umasslowellclubs.campuslabs.com/engage/organization/association-for-campus-events/events"
    },
    {
        title: "Leaderboard",
        description: "Attendance rewards leaderboard",
        icon: "UPCOMING_EVENTS",
        redirectUrl: "/leaderboard"
    }
]
export default function Home() {
    const points = 40;

    return (
        <div className="flex flex-col items-center p-4 gap-10 h-full">
            <div className={`text-6xl ${DMSans.className} pt-9`}>Hi, Nick</div>

            {/*this is probably bad*/}
            <ProgressCircle.Root css={{ "--size": "200px" }} value={points}>
                <ProgressCircle.Circle strokeLinecap={"round"} css={{ "--size": "200px" }}>
                    <ProgressCircle.Track css={{ "--size": "200px", "--thickness": "1em" }} />
                    <ProgressCircle.Range css={{ "--size": "200px", "--thickness": "1em" }} />
                </ProgressCircle.Circle>
                <AbsoluteCenter>
                    <div className={`${DMSans.className} text-6xl`}>
                        {points}
                    </div>
                </AbsoluteCenter>
            </ProgressCircle.Root>
            <div className={`${DMSans.className} text-xl`}>your attendance points</div>
            <div className="grid grid-cols-2 w-screen h-full">
                {
                    quickactionbuttons.map((p, idx) => (
                        <QuickActionButton props={p} key={idx} />
                    ))
                }
            </div>

        </div >


    );
}
