"use client"
import { Button } from "@chakra-ui/react";

import { ChangeEvent, useEffect, useState } from "react";

import { Schema } from "AMPLIFY/data/resource";
import { generateClient } from "@aws-amplify/api";

import { addPoints } from "../actions";
import { parse } from "papaparse";
import { RawMember } from "@/types/types";

import { UploadCsvDialog } from "@/components/UploadCsvDialog";
import { ConfirmUploadDialog } from "@/components/ConfirmUploadDialog";
import { AddPointsDialog } from "@/components/AddPointsDialog";
import { SelectReportTypeDialog } from "@/components/SelectReportTypeDialog";
import { ViewMembersDialog } from "@/components/ViewMembersDialog";


const client = generateClient<Schema>()

export default function Admin() {
    const [members, setMembers] = useState<Schema["Member"]["type"][]>()
    const [selected, setSelected] = useState<Schema["Member"]["type"]>()
    const [showAddPoints, setShowAddPoints] = useState(false)
    const [showUploadFile, setShowUploadFile] = useState(false)
    const [showConfirmUpload, setShowConfirmUpload] = useState(false)
    const [showSelectReportType, setShowSelectReportType] = useState(false)
    const [showViewMembers, setShowViewMembers] = useState(false)
    const [file, setFile] = useState<File>()
    // const [fileProcessing, setFileProcessing] = useState(false)
    const [extractedCsvEntries, setExtractedCsvEntires] = useState<RawMember[]>()
    const [pointsToAdd, setPointsToAdd] = useState<number>()
    const [reasonToAdd, setReasonToAdd] = useState<string>("")

    useEffect(() => {
        client.models.Member.list().then(({ data, errors }) => {
            if (errors) {
                console.error(errors)
                return
            }
            setMembers(data)
        })
    }, [showAddPoints])

    const addPointsWithProps = addPoints.bind(null, selected!)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files?.[0])
    }

    const processUpload = async () => {
        console.log(file)
        if (!file) {
            return
        }

        const parsedData: RawMember[] = await new Promise<RawMember[]>((resolve, reject) => {
            parse<RawMember>(file, {
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
        setExtractedCsvEntires(parsedData)
        setShowUploadFile(false)
        setShowConfirmUpload(true)
    }

    const proceedToUpload = () => {
        setShowSelectReportType(false)
        setShowUploadFile(true)
    }

    const uploadReportAddPoints = async () => {
        for (const member of extractedCsvEntries!) {
            const checkForMember = members!.find(m => m.cgNetId == member["Net ID"])
            if (!checkForMember) {
                const { data: newMember, errors: createErrors } = await client.models.Member.create({
                    name: `${member["First Name"]} ${member["Last Name"]}`,
                    cgNetId: `${member["Net ID"]}`,
                    points: 0
                })
                const { errors: historyErrors } = await client.models.History.create({
                    memberId: newMember?.id,
                    value: pointsToAdd,
                    reason: reasonToAdd
                })
                if (createErrors || historyErrors) {
                    console.error(createErrors, historyErrors)
                }
            } else {
                const { errors: updateErrors } = await client.models.Member.update({
                    id: checkForMember.id,
                    points: checkForMember.points + pointsToAdd!
                })

                const { errors: historyErrors } = await client.models.History.create({
                    memberId: checkForMember.id,
                    value: pointsToAdd,
                    reason: reasonToAdd
                })

                if (updateErrors || historyErrors) {
                    console.error(updateErrors, historyErrors)
                }
            }

        }
    }


    return (
        <div>
            <div className="flex flex-col gap-2">
                <Button className="bg-gray-400" onClick={() => setShowAddPoints(!showAddPoints)}>
                    Add points
                </Button>
                <Button className="bg-gray-400">
                    Add member
                </Button>
                <Button className="bg-gray-400" onClick={() => setShowViewMembers(!showViewMembers)}>
                    View Members
                </Button>
                <Button className="bg-gray-400" onClick={() => setShowSelectReportType(!showSelectReportType)}>
                    Upload attendance report
                </Button>
            </div>
            {/*view member list*/}
            <ViewMembersDialog showViewMembers={showViewMembers} setShowViewMembers={setShowViewMembers} members={members} />
            {/*Add points dialog*/}
            <AddPointsDialog showAddPoints={showAddPoints} setShowAddPoints={setShowAddPoints} addPointsWithProps={addPointsWithProps} members={members!} setSelected={setSelected} />
            {/*set amount dialog*/}
            <SelectReportTypeDialog showSelectReportType={showSelectReportType} setShowSelectReportType={setShowSelectReportType} setPointsToAdd={setPointsToAdd} proceedToUpload={proceedToUpload} setReasonToAdd={setReasonToAdd} />
            {/*upload csv dialog */}
            <UploadCsvDialog showUploadFile={showUploadFile} setShowUploadFile={setShowUploadFile} handleChange={handleChange} processUpload={processUpload} />
            <ConfirmUploadDialog showConfirmUpload={showConfirmUpload} setShowConfirmUpload={setShowConfirmUpload} extractedCsvEntries={extractedCsvEntries!} pointsToAdd={pointsToAdd!} uploadReportAddPoints={uploadReportAddPoints} />
        </div >
    )
}