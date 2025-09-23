"use server"

import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api"
import { Schema } from "AMPLIFY/data/resource"
import { cookies } from "next/headers"
import outputs from "../../amplify_outputs.json"
import { parse } from "papaparse"
import { readFile } from "fs"

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

export const processCsvFile = async (csvFile: File) => {

    interface RawMember {
        "First Name": string
        "Last Name": string
        "Net ID": string
    }

    if (!csvFile) {
        return
    }

    try {
        readFile(csvFile, (data) => {
            console.log(data)
        })
        const parsedData: RawMember[] = await new Promise<RawMember[]>((resolve, reject) => {
            parse<RawMember>(csvFile, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
                complete: (results) => {
                    resolve(results.data);
                },
                error: (err) => {
                    reject(err);
                }
            });
        });

        console.log(parsedData)

        const { data: members, errors } = await cookieBasedClient.models.Member.list();
        if (errors) {
            console.error(errors);
        }
        for (const member of parsedData) {
            const checkForMember = members.find(m => m.cgNetId == member["Net ID"]);
            if (!checkForMember) {
                const { errors: createErrors } = await cookieBasedClient.models.Member.create({
                    name: `${member["First Name"]} ${member["Last Name"]}`,
                    cgNetId: `${member["Net ID"]}`,
                    points: 0
                });
                if (createErrors) {
                    console.error(createErrors);
                }
            }
        }
    } catch (err) {
        console.error("Error processing CSV:", err);
        throw err;
    }
}