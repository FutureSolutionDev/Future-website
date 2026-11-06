"use client";
import dynamic from 'next/dynamic';
import { ACTIVE_SEASON as ActiveSeasonName } from '@/Lib/Site';
const RamadanGreeting = dynamic(() => import('./RamadanGreeting'), { ssr: false });
const EidAlFitrGreeting = dynamic(() => import('./EidAlFitrGreeting'), { ssr: false });
const EidAlAdhaGreeting = dynamic(() => import('./EidAlAdhaGreeting'), { ssr: false });

export default function SeasonalGreetings() {
    switch (ActiveSeasonName) {
        case 'Ramadan':
            return <RamadanGreeting />;
        case 'EidAlFitr':
            return <EidAlFitrGreeting />;
        case 'EidAlAdha':
            return <EidAlAdhaGreeting />;
        default:
            return null;
    }
}
