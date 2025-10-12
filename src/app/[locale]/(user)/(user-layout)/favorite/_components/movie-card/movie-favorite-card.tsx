'use client'

import Image from 'next/image'
import { FilmDetailType } from '@/types/film.type'
import { cn } from '@/lib/utils'
import { formatDuration } from '@/utils/formatting/formatTime'
import { useEffect, useState } from 'react'

interface MovieCardProps {
    movie: FilmDetailType
    className?: string
    isEditing: boolean
    isSelected: boolean
    disableHover?: boolean
    onSelect: () => void
}

export default function FavoriteCard({
    movie,
    className,
    isEditing,
    isSelected,
    disableHover,
    onSelect
}: MovieCardProps) {
    const [mounted, setMounted] = useState(false)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        setMounted(true)
        if (movie.duration_minutes > 0) {
            setProgress(Math.min((movie.watch_duration_minutes / movie.duration_minutes) * 100, 100))
        }
    }, [movie.watch_duration_minutes, movie.duration_minutes])

    return (
        <article
            className={cn(
                'group relative w-[220px] h-[160px] rounded-[4px] overflow-hidden transition-all duration-200',
                isEditing && 'opacity-50',
                disableHover && 'pointer-events-none'
            )}
        >
            {isEditing && (
                <input
                    type='checkbox'
                    checked={isSelected}
                    onChange={onSelect}
                    className='absolute top-2 right-2 w-5 h-5 z-30'
                />
            )}
            <div className='relative h-[70%]'>
                <Image
                    src={movie.horizontal_poster}
                    alt={movie.title}
                    fill
                    className={cn('object-cover transition-all duration-200', isEditing && 'brightness-75')}
                />

                {mounted && movie.watch_duration_minutes > 0 && progress > 0 && (
                    <div className='absolute bottom-0 left-0 w-full h-[2px] bg-gray-300 dark:bg-[#808080]'>
                        <div
                            className='h-full bg-[#F50723] transition-all duration-300'
                            style={{ width: `${progress.toFixed(0)}%` }}
                        />
                    </div>
                )}
            </div>

            <div className='absolute w-full p-2 px-4 bg-[#2a2a2a] text-white'>
                <h3 className='text-sm font-medium truncate leading-tight flex-1 text-gray-900 dark:text-white'>
                    {movie.title}
                </h3>
                <p className='text-[10px] opacity-80'>{formatDuration(movie.duration_minutes)}</p>
            </div>
        </article>
    )
}
