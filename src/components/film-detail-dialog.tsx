'use client'

import { Play, Plus, ThumbsUp, X, Volume2, VolumeX } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FilmDetailType } from '@/types/film.type'
import { DialogTitle } from '@radix-ui/react-dialog'
import StarRating from '@/components/star-rating'
import { formatNumber } from '@/utils/formatting/formatNumber'
import MovieCard from '@/components/movie-card'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleMute } from '@/store/features/video.slice'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface FilmDetailDialogProps {
    film: FilmDetailType | null
    isLoading?: boolean
    open: boolean
    onOpenChange: (open: boolean) => void
    onClose?: () => void
}

export default function FilmDetailDialog({ film, open, onOpenChange, onClose }: FilmDetailDialogProps) {
    const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false)
    const isMuted = useAppSelector((state) => state.video.isMuted)
    const appDispatch = useAppDispatch()
    const handleToggleMute = () => {
        appDispatch(toggleMute())
    }

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setIsPlayVideo(true)
            }, 1000)
        } else {
            setIsPlayVideo(false)
        }
    }, [open])

    if (!film) return null

    const handleOnOpenChange = (open: boolean) => {
        if (!open) {
            onClose?.()
        }
        onOpenChange(open)
    }

    const handleBtnClose = () => {
        onClose?.()
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={handleOnOpenChange}>
            <DialogContent
                className='max-w-4xl! p-0 bg-zinc-900 border-0 max-h-[90vh] overflow-y-auto'
                showCloseButton={false}
            >
                <DialogHeader className='hidden'>
                    <DialogTitle>{film.title}</DialogTitle>
                </DialogHeader>
                <div className='relative h-[400px] md:h-[500px] overflow-hidden'>
                    <Image
                        src={film.horizontal_poster}
                        alt={film.title}
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
                        <source src={film.trailer_url} type='video/mp4' />
                        Your browser does not support the video tag.
                    </video>

                    <div className='absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent' />

                    <Button
                        variant='ghost'
                        size='sm'
                        className='absolute top-4 right-4 bg-zinc-800/80 hover:bg-zinc-700 text-white hover:text-white rounded-full w-10 h-10 p-0 cursor-pointer '
                        onClick={handleBtnClose}
                    >
                        <X className='w-5 h-5 cursor-pointer' />
                    </Button>

                    <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8'>
                        <h1 className='text-white font-black text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight'>
                            {film.title.toUpperCase()}
                        </h1>
                        <div className='flex items-center justify-between mb-4'>
                            <div className='flex items-center gap-3'>
                                <Button
                                    size='lg'
                                    className='bg-white text-black hover:bg-gray-200 font-semibold px-10! py-3! rounded-xs flex items-center gap-2 cursor-pointer'
                                >
                                    <Play className='w-5 h-5 fill-current' />
                                    Play
                                </Button>

                                <Button
                                    size='sm'
                                    variant='ghost'
                                    className='bg-zinc-600/70 hover:bg-zinc-600 text-white hover:text-white border border-gray-600 rounded-full w-10 h-10 p-0 cursor-pointer'
                                >
                                    <Plus className='w-5 h-5' />
                                </Button>

                                <Button
                                    size='sm'
                                    variant='ghost'
                                    className='bg-zinc-600/70 hover:bg-zinc-600 text-white hover:text-white border border-gray-600 rounded-full w-10 h-10 p-0 cursor-pointer '
                                >
                                    <ThumbsUp className='w-5 h-5' />
                                </Button>
                            </div>
                            <Button
                                variant='ghost'
                                size='sm'
                                className=' bg-zinc-800/80 hover:bg-zinc-700 text-white/50 hover:text-white rounded-full border border-white/50 w-10 h-10 p-0 curser-pointer z-10 cursor-pointer'
                                onClick={handleToggleMute}
                            >
                                {isMuted ? <VolumeX className='w-5 h-5' /> : <Volume2 className='w-5 h-5' />}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='p-6 md:p-8 space-y-6'>
                    <div className='flex flex-col md:flex-row gap-6'>
                        <div className='flex-1 space-y-4'>
                            <div className='flex items-center gap-3 text-sm'>
                                <span className='text-white'>{film.year}</span>
                                <Badge variant='outline' className='text-white border-gray-500 text-xs '>
                                    {film.quality}
                                </Badge>
                                <Badge className='bg-red-600  text-white  text-xs font-bold'>T{film.age}</Badge>
                            </div>
                            <div className='flex items-center gap-3 text-white text-sm'>
                                <div>
                                    <span>{formatNumber.format(film.views_count)} views</span>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <span>{film.rating.toFixed(1)}</span>{' '}
                                    <StarRating rating={film.rating} className='[&_svg]:size-4' />
                                </div>
                            </div>
                            <p className='text-white text-base leading-relaxed'>{film.description}</p>
                        </div>

                        <div className='md:w-1/3 space-y-4 text-sm'>
                            <div>
                                <span className='text-gray-400'>Cast: </span>
                                <span className='text-white'>
                                    {film.actors.slice(0, 3).join(', ')}
                                    {film.actors.length > 3 && ', more'}
                                </span>
                            </div>

                            <div>
                                <span className='text-gray-400'>Genres: </span>
                                <span className='text-white'>{film.genres.join(', ')}</span>
                            </div>

                            <div>
                                <span className='text-gray-400'>This show is: </span>
                                <span className='text-white'>{film.category}, Suspenseful, Exiting</span>
                            </div>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <h2 className='text-white text-xl font-semibold'>More Like This</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 @container'>
                            {Array.from({ length: 6 }, (_, i) => (
                                <MovieCard key={i} movie={film} />
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
