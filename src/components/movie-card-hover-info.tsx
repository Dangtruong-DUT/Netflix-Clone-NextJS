'use client'

import { Play, Plus, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TiInfoLarge } from 'react-icons/ti'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FilmDetailType } from '@/types/film.type'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleMute } from '@/store/features/video.slice'
import { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'
import { useMouseEnter } from '@/hooks/ui/useMouseEnter'
import { isNewMovieRelease } from '@/helper/movie'

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
        <div className='relative   bg-neutral-900 shadow-2xl'>
            <div className='relative h-48 overflow-hidden '>
                <Image
                    src={movie.horizontal_poster}
                    alt={movie.title}
                    fill
                    className={cn(
                        'object-cover transition-opacity duration-500 ease-in-out',
                        isPlayVideo ? 'opacity-0' : 'opacity-100'
                    )}
                />
                <video
                    muted={isMuted}
                    className={cn(
                        'absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out',
                        isPlayVideo ? 'opacity-100' : 'opacity-0'
                    )}
                    autoPlay
                    loop
                    playsInline
                >
                    <source src={movie.trailer_url} type='video/mp4' />
                    Your browser does not support the video tag.
                </video>

                <div className='absolute inset-0 bg-gradient-to-t from-neutral-900/85 via-neutral-900/20 to-transparent' />

                <Button
                    size='icon'
                    variant='ghost'
                    className='absolute bottom-3 right-3 h-8 w-8 rounded-full bg-neutral-900/70 p-0 text-white hover:bg-neutral-800/90 transition-colors cursor-pointer hover:text-white    '
                    onClick={handleToggleMute}
                >
                    {isMuted ? <VolumeX className='h-4 w-4' /> : <Volume2 className='h-4 w-4' />}
                </Button>
            </div>

            <div className='px-4 py-3'>
                <h3 className='truncate text-lg font-semibold text-white tracking-tight'>{movie.title}</h3>

                <div className='mt-1.5 flex flex-wrap items-center gap-1.5 text-xs text-neutral-300 font-medium'>
                    <span>{movie.year}</span>
                    <span className='text-neutral-500'>•</span>
                    <span className='px-1.5 py-0.5 bg-neutral-800 rounded text-white'>T{movie.age}</span>
                    <span className='text-neutral-500'>•</span>
                    <span>{movie.country}</span>
                    <span className='text-neutral-500'>•</span>
                    <span className='px-1.5 py-0.5 bg-neutral-800 rounded text-white'>{movie.quality}</span>
                </div>

                <div className='mt-3 grid grid-cols-3 gap-2'>
                    <Button
                        size='sm'
                        className='rounded-md bg-brand px-3 py-2 text-xs font-medium text-white hover:bg-brand/90  transition-colors cursor-pointer'
                    >
                        <Play className='mr-1 h-3.5 w-3.5 fill-current' />
                        Xem ngay
                    </Button>
                    <Button
                        size='sm'
                        variant='outline'
                        className='rounded-md border-neutral-700 bg-neutral-800/30 px-3 py-2 text-xs font-medium text-neutral-200 hover:bg-neutral-700/50 hover:text-white transition-colors cursor-pointer'
                    >
                        <Plus className='mr-1 h-3.5 w-3.5' />
                        Danh sách
                    </Button>
                    <Button
                        size='sm'
                        variant='outline'
                        className='rounded-md border-neutral-700 bg-neutral-800/30 px-3 py-2 text-xs font-medium text-neutral-200 hover:bg-neutral-700/50 hover:text-white transition-colors cursor-pointer'
                    >
                        <TiInfoLarge className='mr-1 h-3.5 w-3.5' />
                        Chi tiết
                    </Button>
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
    const isRecentlyAdded = isNewMovieRelease(movieView.release_date)
    const isInTop10 = movieView.rank > 0 && movieView.rank <= 10
    return (
        <article className={cn('relative cursor-pointer  ', sizeClasses[size], className)}>
            <div className='relative w-full aspect-video overflow-hidden '>
                {isInTop10 && (
                    <div
                        className='absolute z-10 right-0 top-0 
      bg-red-600 text-white font-bold 
      flex items-center flex-col justify-center 
      [clip-path:polygon(0_0,100%_0,100%_100%,0_80%)] 
      overflow-hidden
      text-[10px] sm:text-[12px] md:text-[13px] lg:text-[15px]
      p-[2px] sm:p-[3px] md:p-[4px] lg:p-[6px] 
      pb-[5px] sm:pb-[6px] md:pb-[7px] lg:pb-[8px]'
                    >
                        <span>TOP</span>
                        <span>10</span>
                    </div>
                )}

                <Image
                    src={movieView.horizontal_poster}
                    alt={movieView.title}
                    fill
                    className='w-full h-full object-cover transition-transform duration-300 '
                />

                {isRecentlyAdded && (
                    <div
                        className='absolute bottom-0 left-1/2 -translate-x-1/2 
      whitespace-nowrap w-max 
      bg-red-600 text-white 
      text-[8px] sm:text-[9px] md:text-[10px] lg:text-[12px] 
      px-1 sm:px-2 md:px-3 lg:px-4 
      py-[1px] sm:py-[2px] md:py-[3px] lg:py-[4px] 
      rounded-t-xs font-medium backdrop-blur-sm'
                    >
                        Recently Added
                    </div>
                )}
            </div>

            {showProgress && (
                <div className='relative w-[60.55%] mx-auto h-1 mt-2 bg-white/35 '>
                    <div style={{ width: `${progress * 100}%` }} className='absolute top-0 left-0 h-full bg-red-500' />
                </div>
            )}
            <span className='sr-only'>{movieView.title}</span>
        </article>
    )
}
