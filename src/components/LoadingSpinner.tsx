import { ProgressCircle } from '@chakra-ui/react/progress-circle';
import React from 'react'

export const LoadingSpinner = () => {
    return (
        <ProgressCircle.Root value={null}>
            <ProgressCircle.Circle>
                <ProgressCircle.Track />
                <ProgressCircle.Range />
            </ProgressCircle.Circle>
        </ProgressCircle.Root>);
}