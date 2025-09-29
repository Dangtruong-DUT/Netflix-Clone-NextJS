'use client'

import { useState, useEffect } from 'react';
import Header from '@/components/header';

export default function StickyHeaderWrapper({ buttonClassName }) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            if (currentScrollPos > prevScrollPos && currentScrollPos > 100) {
                setIsHeaderVisible(false);
            } else {
                setIsHeaderVisible(true);
            }

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <Header
            className={`transition-transform duration-300 fixed top-0 left-0 w-full z-50 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
            buttonClassName={buttonClassName}
        />
    );
}