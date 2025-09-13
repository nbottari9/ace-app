"use server"

import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api"
import { Schema } from "AMPLIFY/data/resource"
import { cookies } from "next/headers"
import outputs from "../../amplify_outputs.json"
import { uploadData } from "aws-amplify/storage"
import { File } from "buffer"

const cookieBasedClient = generateServerClientUsingCookies<Schema>({
    config: outputs,
    cookies
})

export const addPoints = async (member: Schema["Member"]["type"], formData: FormData,) => {
    const value = formData.get("value")
    const reason = formData.get("reason")
    const { historyData, historyErrors } = await cookieBasedClient.models.History.create({
        memberId: member.id,
        value: value ? parseInt(value?.toString()) : -1,
        reason: reason ? reason.toString() : ""
    })

    const { memberData, memberErrors } = await cookieBasedClient.models.Member.update({
        id: member.id,
        points: member.points + (value ? parseInt(value?.toString()) : 0),
    })

}

export const handleFileUpload = async (file: any, formData: FormData) => {
    if (!file) {
        return
    }
    uploadData({
        path: `attendanceReports/${file.name}`,
        data: file
    })
}