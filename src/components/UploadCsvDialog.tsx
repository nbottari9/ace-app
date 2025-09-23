import { Dialog, CloseButton, Input, Button } from '@chakra-ui/react';
import { Field } from "@/components/ui/field"
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'

export const UploadCsvDialog = ({ showUploadFile, setShowUploadFile, handleChange, processUpload }: { showUploadFile: boolean, setShowUploadFile: Dispatch<SetStateAction<boolean>>, handleChange: (event: ChangeEvent<HTMLInputElement>) => void, processUpload: () => void }) => {
    return (
        <Dialog.Root open={showUploadFile} onOpenChange={(e) => setShowUploadFile(e.open)}>
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
                    <Dialog.Body>


                        <Field className="pt-3">
                            <Input placeholder="Upload" className="border-black border" type="file" onChange={handleChange} />
                        </Field>


                    </Dialog.Body>
                    <Dialog.Footer>

                        {/* <Button className="border-black border text-red-500">Cancel</Button> */}

                        <Button className="border-black border text-green-300" type="submit" onClick={processUpload}>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
            {/* </form> */}
        </Dialog.Root>
    );
}