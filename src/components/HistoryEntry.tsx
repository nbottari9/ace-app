import { DMSans } from '@/app/fonts';
import React from 'react'
import { HistoryPointsPill } from './HistoryPointsPill';

export const HistoryEntry = ({ reason, value }: { reason: string, value: number }) => {
    return (
        <div className="flex justify-between bg-neutral-300 p-2">
            <div className={`${DMSans.className}`}>{reason}</div>
            <HistoryPointsPill value={value} />
        </div>
    );
}