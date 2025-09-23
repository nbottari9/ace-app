
import { S3Handler } from "aws-lambda";
import { S3 } from "aws-sdk"
import { parse } from "papaparse";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime"
import { env } from "$amplify/env/onUploadHandler"
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../data/resource";
import { Amplify } from "aws-amplify";

interface RawMember {
    "First Name": string
    "Last Name": string
    "Net ID": string
}
const s3 = new S3

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();

export const handler: S3Handler = async (event) => {
    try {
        for (const record of event.Records) {
            const bucket = record.s3.bucket.name
            const key = record.s3.object.key

            const object = await s3.getObject({ Bucket: bucket, Key: key }).promise()
            const csvData = object.Body?.toString("utf-8")

            if (!csvData) {
                console.log("csv file error")
                return
            }

            const parsed = parse<RawMember>(csvData, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
            })
            const { data: members, errors } = await client.models.Member.list()
            if (errors) {
                console.error(errors)
            }
            for (const member of parsed.data) {
                const checkForMember = members.find(m => m.cgNetId == member["Net ID"])
                if (!checkForMember) {
                    const { data: newMember, errors: createErrors } = await client.models.Member.create({
                        name: `${member["First Name"]} ${member["Last Name"]}`,
                        cgNetId: `${member["Net ID"]}`,
                        points: 0
                    })
                    if (errors) {
                        console.error(createErrors)
                    }
                }

            }
        }
    } catch (err) {
        console.error("Error processing CSV:", err);
        throw err;
    }


}