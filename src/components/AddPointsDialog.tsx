import { Dialog, CloseButton, Input, Button } from '@chakra-ui/react';
import { Field } from "@/components/ui/field"
import React, { Dispatch, SetStateAction } from 'react'
import { LoadingSpinner } from './LoadingSpinner';
import { MemberSearch } from './MemberSearch';
import { Schema } from 'AMPLIFY/data/resource';

export const AddPointsDialog = ({ showAddPoints, setShowAddPoints, addPointsWithProps, members, setSelected }: { showAddPoints: boolean, setShowAddPoints: Dispatch<SetStateAction<boolean>>, addPointsWithProps: (formData: FormData) => Promise<void>, members: Schema["Member"]["type"][], setSelected: Dispatch<SetStateAction<Schema["Member"]["type"] | undefined>> }) => {
    return (
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
    );
}