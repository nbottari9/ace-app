"use client"
// import Image from "next/image";

import { DMSans } from "FONTS";
import { Icon } from "@chakra-ui/react";
import { QuickActionButton } from "@/components/QuickActionButton";
import { QuickActionButtonProps } from "@/types/types";
import { generateClient, SelectionSet } from "aws-amplify/api";
import { Schema } from "AMPLIFY/data/resource";
import { MemberSearch } from "@/components/MemberSearch";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PointsGauge } from "@/components/PointsGauge";
import { HistoryEntry } from "@/components/HistoryEntry";
import { History } from "@/components/History"

// const quickactionbuttons: QuickActionButtonProps[] = [
//     {
//         title: "Get involved",
//         description: "Volunteer for an ACE event!",
//         icon: "GET_INVOLVED",
//         redirectUrl: "https://uml.campusgroups.com/feeds?type=club&type_id=35515"
//     },
//     {
//         title: "Social Media",
//         description: "Check out ACE Social Media!",
//         icon: "SOCIAL_MEDIA",
//         redirectUrl: "https://linktr.ee/umlace"
//     },
//     {
//         title: "Upcoming Events",
//         description: "Upcoming ACE Events on campus",
//         icon: "UPCOMING_EVENTS",
//         redirectUrl: "https://uml.campusgroups.com/feeds?type=club&type_id=35515&tab=events"
//     },
//     {
//         title: "Leaderboard",
//         description: "Attendance rewards leaderboard",
//         icon: "UPCOMING_EVENTS",
//         redirectUrl: "/leaderboard"
//     }
// ]

const client = generateClient<Schema>()


export default function Me() {

    type memberSelectionSet = ["name", "points", "history.*"]
    const [members, setMembers] = useState<Schema["Member"]["type"][]>()
    const [member, setMember] = useState<SelectionSet<Schema["Member"]["type"], memberSelectionSet>>()
    const [selected, setSelected] = useState<Schema["Member"]["type"] | null>()

    useEffect(() => {
        client.models.Member.list().then(({ data, errors }) => {
            if (errors) {
                console.error(errors)
                return
            }
            setMembers(data)
        })
    }, [])

    useEffect(() => {
        client.models.Member.get({
            id: selected ? selected?.id : "",

        }, {
            selectionSet: [
                "name", "points", "history.*"
            ]
        }).then(({ data, errors }) => {
            if (data && !errors) {
                setMember(data)
            }

        })
    }, [selected])

    const returnToSearch = () => {
        setSelected(null)
    }

    return (
        <div className="flex flex-col items-center p-4 gap-10 h-full">
            {
                selected ? (
                    <>
                        <Icon onClick={returnToSearch} className="absolute left-5">
                            <FaArrowLeftLong className="text-2xl" />
                        </Icon>
                        <div className={`text-5xl ${DMSans.className} pt-9`}>Hi, {selected?.name}</div>
                        <PointsGauge points={selected?.points} />
                        <div className={`${DMSans.className} text-xl`}>your attendance points</div>
                        {/* <div className="grid grid-cols-2 w-screen h-full">
                            {
                                quickactionbuttons.map((p, idx) => (
                                    <QuickActionButton props={p} key={idx} />
                                ))
                            }
                        </div> */}
                        <div className={`${DMSans.className} text-3xl`}>History</div>
                        <History history={member!.history} />
                    </>
                ) : (
                    members ? (<MemberSearch props={{ members, setMember: setSelected }} />) : (<LoadingSpinner />)
                )
            }


        </div >


    );
}
