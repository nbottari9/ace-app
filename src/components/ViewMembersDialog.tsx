import { CloseButton } from '@chakra-ui/react';
import { Dialog } from '@chakra-ui/react/dialog';
import React, { Dispatch, SetStateAction } from 'react'
import { Schema } from 'AMPLIFY/data/resource';
import { DMSans } from '@/app/fonts';
import { LoadingSpinner } from './LoadingSpinner';

export const ViewMembersDialog = ({ showViewMembers, setShowViewMembers, members }: { showViewMembers: boolean, setShowViewMembers: Dispatch<SetStateAction<boolean>>, members: Schema["Member"]["type"][] | undefined }) => {
    return (
        <Dialog.Root open={showViewMembers} onOpenChange={(e) => setShowViewMembers(e.open)}>

            <Dialog.Trigger />
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton />
                    </Dialog.CloseTrigger>
                    <Dialog.Header>
                        <Dialog.Title className="text-xl font-bold">
                            All Members
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body className="flex flex-col gap-2 overflow-scroll">
                        {
                            members ? (members!.map((member, idx) => (
                                <div key={idx} className={`flex justify-between p-4 bg-neutral-300 ${DMSans.className}`}>
                                    <div className={`${DMSans.className}`}>{member.name}</div>
                                    <div className={`${DMSans.className}`}>{member.points}</div>
                                </div>)))
                                : (<LoadingSpinner />)
                        }
                    </Dialog.Body>
                    <Dialog.Footer>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>

        </Dialog.Root>
    );
}