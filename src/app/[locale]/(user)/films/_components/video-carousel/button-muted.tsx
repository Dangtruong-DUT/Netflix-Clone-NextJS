'use client'

import { cn } from '@/lib/utils'
import { toggleMute } from '@/store/features/video.slice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useCallback } from 'react'
import { FaVolumeUp } from 'react-icons/fa'
import { FaVolumeMute } from 'react-icons/fa'

export default function ButtonMuted() {
    const appDispatch = useAppDispatch()

    const isMuted = useAppSelector((state) => state.video.isMuted)
    const onToggle = useCallback(() => {
        appDispatch(toggleMute())
    }, [appDispatch])

    return (
        <button
            onClick={onToggle}
            className={cn(
                'rounded-full flex items-center justify-center bg-black/60 text-white hover:text-brand',
                'size-10 [&_svg]:size-4',
                'sm:size-11 sm:[&_svg]:size-5',
                'md:size-12 md:[&_svg]:size-5',
                'lg:size-13 lg:[&_svg]:size-6',
                'xl:size-14 xl:[&_svg]:size-7',
                '2xl:size-16 2xl:[&_svg]:size-8',
                'hover:bg-black/80 transition-colors'
            )}
        >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
    )
}
