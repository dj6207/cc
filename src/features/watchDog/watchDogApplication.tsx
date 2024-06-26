import React from 'react';
import { WatchDog } from './watchDog';
import { WatchDogProvider } from '../../context/watchDogContext';

export const WatchDogApplication: React.FC = () => {
    return (
        <WatchDogProvider>
            <WatchDog/>
        </WatchDogProvider>
    )
}