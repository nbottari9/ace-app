import { defineFunction } from "@aws-amplify/backend";

export const parseAttendanceReports = defineFunction({
    entry: "./onUploadHandler.ts",
    resourceGroupName: "data"
})