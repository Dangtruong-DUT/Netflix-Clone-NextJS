'use client'

import { Play, Plus, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FilmDetailType } from '@/types/film.type'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleMute } from '@/store/features/video.slice'
import { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'
import { useMouseEnter } from '@/hooks/ui/useMouseEnter'

interface MovieCardContextProps {
    movie: FilmDetailType
}

const MovieCardContext = createContext<MovieCardContextProps | null>(null)

const useMovieCardContext = () => {
    const context = useContext(MovieCardContext)
    if (!context) {
        throw new Error('useMovieCardContext must be used within a <MovieCardHoverInfoProvider />')
    }
    return context
}

interface MovieCardProviderProps {
    movie: FilmDetailType
    children: React.ReactNode
}

export function MovieCardHoverInfoProvider({ movie, children }: MovieCardProviderProps) {
    const [open, setOpen] = useState(false)

    const { ref: triggerRef, hovered } = useMouseEnter<HTMLDivElement>(1000)

    useEffect(() => {
        if (hovered) setOpen(hovered)
    }, [hovered])

    const handleOnOpenChange = (open: boolean) => {
        if (!open) setOpen(open)
    }
    return (
        <MovieCardContext value={{ movie }}>
            <TooltipProvider delayDuration={2000} skipDelayDuration={500}>
                <Tooltip onOpenChange={handleOnOpenChange} open={open}>
                    <TooltipTrigger asChild>
                        <div ref={triggerRef}>{children}</div>
                    </TooltipTrigger>

                    <TooltipContent
                        side='top'
                        align='center'
                        sideOffset={-200}
                        className='w-100! p-0 bg-zinc-900 border-zinc-700 shadow-2xl '
                        shownArrow={false}
                    >
                        <TooltipFilmInfoContent movie={movie} />
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </MovieCardContext>
    )
}

interface TooltipContentProps {
    movie: FilmDetailType
}
function TooltipFilmInfoContent({ movie }: TooltipContentProps) {
    const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false)
    const isMuted = useAppSelector((state) => state.video.isMuted)
    const appDispatch = useAppDispatch()
    const handleToggleMute = () => {
        appDispatch(toggleMute())
    }

    useEffect(() => {
        setTimeout(() => {
            setIsPlayVideo(true)
        }, 1000)
    }, [open])

    return (
        <div className='relative overflow-hidden '>
            <div className='relative h-44 overflow-hidden'>
                <Image
                    src={movie.horizontal_poster}
                    alt={movie.title}
                    fill
                    className={cn('w-full h-full object-cover', {
                        'opacity-0': isPlayVideo,
                        'opacity-100': !isPlayVideo
                    })}
                />
                <video
                    muted={isMuted}
                    className={cn('w-full h-full object-cover', {
                        'opacity-100': isPlayVideo,
                        'opacity-0': !isPlayVideo
                    })}
                    autoPlay
                    loop
                    playsInline
                >
                    <source src={movie.trailer_url} type='video/mp4' />
                    Your browser does not support the video tag.
                </video>

                <div className='absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent' />

                <Button
                    size='sm'
                    variant='ghost'
                    className='absolute bottom-3 right-3 bg-zinc-800/50 cursor-pointer hover:text-white hover:bg-zinc-700 text-white rounded-full w-8 h-8 p-0 z-10'
                    onClick={handleToggleMute}
                >
                    {isMuted ? <VolumeX className='w-4 h-4' /> : <Volume2 className='w-4 h-4' />}
                </Button>
                <div className='absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-t from-neutral-950 via-transparent' />
            </div>
            <div className='bg-neutral-950 px-2 pb-2'>
                <div className=' flex items-center gap-3  '>
                    <Button
                        size='sm'
                        className='bg-white text-black hover:bg-gray-200 hover:text-black rounded-xs px-4 py-2 flex-1 text-sm font-semibold '
                    >
                        <Play className='w-4 h-4 fill-current mr-2' />
                        Xem ngay
                    </Button>

                    <Button
                        size='sm'
                        variant='ghost'
                        className='bg-gray-600/70 hover:bg-gray-600 text-white hover:text-white rounded-xs border flex-1 border-gray-400  px-4 py-2 text-sm font-semibold cursor-pointer'
                    >
                        <Plus className='w-4 h-4 mr-2' />
                        Danh sách
                    </Button>

                    <Button
                        size='sm'
                        variant='ghost'
                        className='bg-gray-700/70 hover:bg-gray-700 flex-1 rounded-xs hover:text-white text-white border border-gray-500 px-4 py-2 text-sm font-semibold cursor-pointer'
                    >
                        Chi tiết
                    </Button>
                </div>
                <div className='mt-2 flex items-center justify-center gap-2 text-white text-sm mx-auto  '>
                    <span>{movie.year}</span>
                    <span>|</span>
                    <span>T{movie.age}</span>
                    <span>|</span>
                    <span>{movie.country}</span>
                    <span>|</span>
                    <span>{movie.quality}</span>
                </div>
            </div>
        </div>
    )
}

interface MovieCardHoverInfoProps {
    movie?: FilmDetailType
    className?: string
    size?: 'sm' | 'md' | 'lg'
    showProgress?: boolean
}

export function MovieCard({ movie, className, size = 'md', showProgress = false }: MovieCardHoverInfoProps) {
    const sizeClasses = {
        sm: 'w-48',
        md: 'w-55',
        lg: 'w-80'
    }
    const { movie: movieFromContext } = useMovieCardContext()
    const movieView = movie || movieFromContext

    const progress = Math.min(Math.max(movieView.watch_duration_minutes / movieView.duration_minutes, 0), 1)

    return (
        <article className={cn('relative cursor-pointer  ', sizeClasses[size], className)}>
            <div className='relative w-full aspect-video overflow-hidden '>
                <Image
                    src={movieView.horizontal_poster}
                    alt={movieView.title}
                    fill
                    className='w-full h-full object-cover transition-transform duration-300 '
                />
            </div>
            {showProgress && (
                <div className='relative w-[60.55%] mx-auto h-1 mt-2 bg-white/35'>
                    <div style={{ width: `${progress * 100}%` }} className='absolute top-0 left-0 h-full bg-red-500' />
                </div>
            )}
            <span className='sr-only'>{movieView.title}</span>
        </article>
    )
}
