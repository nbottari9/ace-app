import { DMSans } from '@/app/fonts';
import { RawMember } from '@/types/types';
import { Dialog, CloseButton, Button } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react'

export const ConfirmUploadDialog = ({ showConfirmUpload, setShowConfirmUpload, extractedCsvEntries, pointsToAdd, uploadReportAddPoints }: { showConfirmUpload: boolean, setShowConfirmUpload: Dispatch<SetStateAction<boolean>>, extractedCsvEntries: RawMember[], pointsToAdd: number, uploadReportAddPoints: () => void }) => {
    return (
        <Dialog.Root open={showConfirmUpload} onOpenChange={(e) => setShowConfirmUpload(e.open)}>
            {/* <form action={handleFileUpload}> */}
            <Dialog.Trigger />
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton />
                    </Dialog.CloseTrigger>
                    <Dialog.Header>
                        <Dialog.Title className="text-xl font-bold">
                            Upload
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body className="flex flex-col gap-2 overflow-scroll">
                        {
                            extractedCsvEntries?.map((newMember, idx) => (
                                <div key={idx} className={`flex justify-between p-4 bg-neutral-300 ${DMSans.className}`}>
                                    <div>{newMember["First Name"] + " " + newMember["Last Name"]}</div>
                                    {
                                        pointsToAdd! > 0 ? (
                                            <div className="text-green-600">{pointsToAdd}</div>
                                        ) : (
                                            <div className="text-red-400">{pointsToAdd}</div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </Dialog.Body>
                    <Dialog.Footer>

                        {/* <Button className="border-black border text-red-500">Cancel</Button> */}

                        <Button className="border-black border text-green-300" type="submit" onClick={uploadReportAddPoints}>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
            {/* </form> */}
        </Dialog.Root >

    );
}