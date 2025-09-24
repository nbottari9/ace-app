import { Schema } from 'AMPLIFY/data/resource';
import React from 'react'
import { HistoryEntry } from './HistoryEntry';
import { LoadingSpinner } from './LoadingSpinner';
import { SelectionSet } from 'aws-amplify/api';

const selectionSet = ["id", "createdAt", "updatedAt", "value", "reason"] as const
export const History = ({ history }: { history: SelectionSet<Schema["History"]["type"], typeof selectionSet>[] | undefined }) => {

    const sortedHistory = history!.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    return (
        <div className="flex flex-col gap-2">
            {
                history ? (
                    sortedHistory.map((h, idx) => (
                        <HistoryEntry key={idx} reason={h.reason!} value={h.value!} />
                    ))
                ) : (
                    <LoadingSpinner />
                )

            }
        </div>
    );
}