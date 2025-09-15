import { defineStorage } from "@aws-amplify/backend";
import { parseAttendanceReports } from "../functions/parseAttendanceReports/resource";

export const storage = defineStorage({
    name: "attendanceReports",
    triggers: {
        onUpload: parseAttendanceReports
    },
    access: (allow) => ({
        "attendanceReports/*": [
            allow.guest.to(["read", "write", "delete"]),
            allow.resource(parseAttendanceReports).to(["read", "write", "delete"])
        ]
    })
})