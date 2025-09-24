import { DMSans } from '@/app/fonts';
import React from 'react'

export const HistoryPointsPill = ({ value }: { value: number }) => {
    return (
        <div className="">
            {
                value < 0 ? (
                    <div className={`bg-red-400 rounded-full pr-2 pl-2 ${DMSans.className}`}>{value}</div>
                ) : (
                    <div className={`${DMSans.className} rounded-full bg-green-400 pr-2 pl-2`}>+{value}</div>
                )
            }
        </div>
    );
}