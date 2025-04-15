"use client"
import { QuickActionButtonProps } from '@/types/types';
import { IoShareSocial, IoAccessibility, IoCheckmark, IoCalendar } from "react-icons/io5";
import React from 'react'
import { DMSans } from '@/app/fonts';
import { useRouter } from 'next/navigation';


export const QuickActionButton = ({ props }: { props: QuickActionButtonProps }) => {
    const router = useRouter()

    const redirect = () => {
        router.push(props.redirectUrl)
    }

    return (
        <button onClick={redirect} className="flex flex-row justify-center items-center bg-[#fed7fe] m-2 rounded-2xl p-2 h-5/6">
            {
                props.icon === "SOCIAL_MEDIA" ? (
                    <IoShareSocial size={"4em"} />
                )
                    : props.icon === "GET_INVOLVED" ? (
                        <IoAccessibility size={"4em"} />
                    )
                        : props.icon === "SUBMIT_EVENT_IDEA" ? (
                            <IoCheckmark size={"4em"} />
                        )
                            : props.icon === "UPCOMING_EVENTS" ? (
                                <IoCalendar size={"4em"} />
                            )
                                : (
                                    <IoAccessibility size={"4em"} />
                                )
            }

            <span className={`${DMSans.className} flex flex-col items-center text-center gap-2`}>
                <span className=" font-medium text-lg">
                    {props.title}
                </span>
                {props.description}
            </span>
        </button>
    )

}