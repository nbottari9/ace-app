import { Button, CloseButton, Dialog, Input } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react'
import { Field } from './ui/field';

export const SelectReportTypeDialog = ({ showSelectReportType, setShowSelectReportType, setPointsToAdd, proceedToUpload, setReasonToAdd }: { showSelectReportType: boolean, setShowSelectReportType: Dispatch<SetStateAction<boolean>>, setPointsToAdd: Dispatch<SetStateAction<number | undefined>>, proceedToUpload: () => void, setReasonToAdd: Dispatch<SetStateAction<string>> }) => {
    return (
        <Dialog.Root open={showSelectReportType} onOpenChange={(e) => setShowSelectReportType(e.open)}>

            <Dialog.Trigger />
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton />
                    </Dialog.CloseTrigger>
                    <Dialog.Header>
                        <Dialog.Title className="text-xl font-bold">
                            Select Report Type
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Field className="pt-3">
                            <Input placeholder="Amount" className="border-black border" onChange={e => setPointsToAdd(parseInt(e.target.value))} />
                        </Field>
                        <Field className="pt-3">
                            <Input placeholder="Reason" className="border-black border" onChange={e => setReasonToAdd(e.target.value)} />
                        </Field>
                    </Dialog.Body>
                    <Dialog.Footer>

                        {/* <Button className="border-black border text-red-500">Cancel</Button> */}

                        <Button className="border-black border text-green-300" onClick={proceedToUpload}>Next</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>

        </Dialog.Root>
    );
}