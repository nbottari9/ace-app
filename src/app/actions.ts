"use server"

import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api"
import { Schema } from "AMPLIFY/data/resource"
import { cookies } from "next/headers"
import outputs from "../../amplify_outputs.json"
import { SelectionSet } from "aws-amplify/api"

const cookieBasedClient = generateServerClientUsingCookies<Schema>({
    config: outputs,
    cookies
})

export const addPoints = async (member: Schema["Member"]["type"], formData: FormData,) => {
    const value = formData.get("value")
    const reason = formData.get("reason")
    await cookieBasedClient.models.History.create({
        memberId: member.id,
        value: value ? parseInt(value?.toString()) : -1,
        reason: reason ? reason.toString() : ""
    })

    await cookieBasedClient.models.Member.update({
        id: member.id,
        points: member.points + (value ? parseInt(value?.toString()) : 0),
    })

}

export const getMembers = async () => {
    return cookieBasedClient.models.Member.list()
}


export const getMember = async ({ memberId }: { memberId: string }): Promise<Schema["Member"]["type"] | null | undefined> => {
    const { data: member, errors } = await cookieBasedClient.models.Member.get({
        id: memberId
    })

    if (errors) {
        console.error(errors)
        return
    }
    return member
}

const memberSelectionSet = ["history.*"] as const
export const getMemberHistory = async ({ memberId }: { memberId: string }): Promise<SelectionSet<Schema["Member"]["type"], typeof memberSelectionSet> | null | undefined> => {

    const { data: memberWithHistory, errors } = await cookieBasedClient.models.Member.get({
        id: memberId
    }, {
        selectionSet: memberSelectionSet
    })

    if (errors) {
        console.error(errors)
        return
    }

    if (!memberWithHistory) {
        return
    }

    return memberWithHistory

}