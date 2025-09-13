import { defineFunction, defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
    name: "attendanceReports",
    triggers: {
        onUpload: defineFunction({
            entry: "./onUploadHandler.ts",
            resourceGroupName: "storage"
        })
    }
})