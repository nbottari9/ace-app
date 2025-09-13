"use client"
import { Button, CloseButton, Dialog, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"
import { useEffect, useState } from "react";
import { MemberSearch } from "@/components/MemberSearch";
import { Schema } from "AMPLIFY/data/resource";
import { generateClient } from "@aws-amplify/api";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { addPoints } from "../actions";

const client = generateClient<Schema>()

export default function Admin() {
    const [members, setMembers] = useState<Schema["Member"]["type"][]>()
    const [selected, setSelected] = useState<Schema["Member"]["type"]>()
    const [showAddPoints, setShowAddPoints] = useState(false)

    useEffect(() => {
        client.models.Member.list().then(({ data, errors }) => {
            if (errors) {
                console.error(errors)
                return
            }
            setMembers(data)
        })
    }, [])

    const addPointsWithProps = addPoints.bind(null, selected!)

    return (
        <div>
            <div className="flex flex-col gap-2">
                <Button className="bg-gray-400" onClick={() => setShowAddPoints(!showAddPoints)}>
                    Add points
                </Button>
                <Button className="bg-gray-400">
                    Add member
                </Button>
            </div>
            <Dialog.Root open={showAddPoints} onOpenChange={(e) => setShowAddPoints(e.open)}>
                <form action={addPointsWithProps}>
                    <Dialog.Trigger />
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton />
                            </Dialog.CloseTrigger>
                            <Dialog.Header>
                                <Dialog.Title className="text-xl font-bold">
                                    Add Points
                                </Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Field label="Member name">
                                    {members ? (<MemberSearch props={{ members, setMember: setSelected }} />) : (<LoadingSpinner />)}
                                </Field>
                                <Field className="pt-3">
                                    <Input placeholder="Points" className="border-black border" name="value" />
                                </Field>
                                <Field className="pt-3">
                                    <Input placeholder="Reason" className="border-black border" name="reason" />
                                </Field>
                            </Dialog.Body>
                            <Dialog.Footer>

                                {/* <Button className="border-black border text-red-500">Cancel</Button> */}

                                <Button className="border-black border text-green-300" type="submit">Submit</Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </form>
            </Dialog.Root>

        </div>
    )
}