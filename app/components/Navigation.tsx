'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

const Navigation = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <nav className="w-full h-16 flex flex-row justify-between items-center bg-blue-500 shadow-sm shadow-black">
            <div className="flex flex-row justify-center items-center mx-4">
                <div className="mr-4">
                    <Image src="/icons/earth.svg" alt="Earth" width={48} height={48}
                        style={{ filter: 'invert(1) brightness(1)' }} />
                </div>
                <p className="text-white text-2xl font-bold font-mono">Planet Emu</p>
            </div>
            <Link
                className="mx-4"
                href="https://github.com/danmcfan/smart-farm"
                target="_blank"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Image src="/icons/github.svg" alt="GitHub" width={48} height={48} style={{
                    filter: 'invert(1) brightness(1)',
                    transition: 'filter 0.3s ease',
                    ...(isHovered && { filter: 'invert(1) brightness(0.75)' }),
                }} />
            </Link>
        </nav>
    );
};

export default Navigation;