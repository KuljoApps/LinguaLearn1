import Image from 'next/image';
import * as React from 'react';

const KuljoAppsLogo = ({ width = 64, height = 64, className }: { width?: number; height?: number; className?: string }) => (
    <Image
        src="/kuljo-apps-logo.png"
        alt="Kuljo Apps Logo"
        width={width}
        height={height}
        className={className}
    />
);

export default KuljoAppsLogo;
