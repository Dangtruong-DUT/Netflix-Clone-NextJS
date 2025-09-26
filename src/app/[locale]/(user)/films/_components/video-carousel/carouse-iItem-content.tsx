'use client'

import { FilmDetailType } from '@/types/film.type'
import { Info } from 'lucide-react'
import { IoPlaySharp } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import useInView from '@/hooks/ui/useInView'
import { useAppSelector } from '@/store/hooks'
import FilmDetailDialog from '@/components/film-detail-dialog'
import ButtonMuted from '@/app/[locale]/(user)/films/_components/video-carousel/button-muted'
import { useEffect, useRef, useState } from 'react'
import { HERO_VIEW_MODE, useFilmsPageContext } from '@/app/[locale]/(user)/films/context'

interface CarouselItemContentProps {
    video: FilmDetailType
}

export default function CarouselItemContent({ video }: CarouselItemContentProps) {
    const { heroViewMode, setHeroViewMode } = useFilmsPageContext()
    const { ref, isInView } = useInView()
    const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [isOpenFilmDetail, setIsOpenFilmDetail] = useState<boolean>(false)

    const isMuted = useAppSelector((state) => state.video.isMuted)

    const onOpenVideoDetail = () => {
        setIsOpenFilmDetail(true)
        setHeroViewMode(HERO_VIEW_MODE.slides)
    }

    const onCloseVideoDetail = () => {
        setIsOpenFilmDetail(false)
        setHeroViewMode(HERO_VIEW_MODE.videos)
    }

    useEffect(() => {
        if (isInView && heroViewMode === HERO_VIEW_MODE.videos) {
            timeoutRef.current = setTimeout(() => {
                setIsPlayVideo(true)
                videoRef.current?.play().catch(() => {})
            }, 1000)
        } else {
            setIsPlayVideo(false)
            if (videoRef.current) {
                videoRef.current.pause()
                videoRef.current.currentTime = 0
            }
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [isInView, heroViewMode])

    return (
        <div
            className={cn('relative group  aspect-video w-full pt-[56.25%]', 'transition-all duration-500 ease-in-out')}
            ref={ref}
        >
            <Image
                src={video.horizontal_poster}
                alt={video.title}
                fill
                className={cn(
                    'w-full h-full object-cover transition-opacity duration-500 ease-in-out',
                    isPlayVideo ? 'opacity-0 ' : 'opacity-100'
                )}
            />
            <video
                className={cn(
                    'absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out',
                    isPlayVideo ? 'opacity-100' : 'opacity-0'
                )}
                muted={isMuted}
                playsInline
                preload='metadata'
                autoPlay
                ref={videoRef}
                loop
            >
                <source src='https://trailer.vieon.vn/Teaser_HayDeToiToaSang.mp4' type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            <div className='absolute top-0 left-0 w-full h-full max-h-screen z-3'>
                <div className='absolute bottom-0 left-0 p-6 md:p-8 lg:p-12 w-full md:max-w-[50%] max-w-[85%]'>
                    <h2 className='text-white font-black text-xl md:text-3xl lg:text-4xl xl:text-5xl mb-1 sm:mb-3 lg:mb-4 leading-tight'>
                        {video.title.toUpperCase()}
                    </h2>

                    <p className='text-gray-200 text-sm md:text-base lg:text-lg mb-4 lg:mb-6 line-clamp-1 sm:line-clamp-3 leading-relaxed'>
                        {video.description}
                    </p>

                    <div className='flex items-center gap-3'>
                        <Button
                            className={cn(
                                'bg-white text-black hover:text-black hover:bg-gray-200 font-semibold rounded-xs flex items-center gap-2 cursor-pointer',
                                'px-6 md:px-10! py-2 md:py-4! md:h-[48px] text-sm md:text-base!'
                            )}
                        >
                            <IoPlaySharp className='size-4 md:size-6 fill-current' />
                            Play
                        </Button>

                        <Button
                            size='lg'
                            variant='ghost'
                            onClick={onOpenVideoDetail}
                            className={cn(
                                'bg-gray-600/70 hover:bg-gray-600 text-white hover:text-white font-semibold rounded-xs flex items-center gap-2 cursor-pointer',
                                'px-6 md:px-10! py-2 md:py-4! md:h-[48px] text-sm md:text-base'
                            )}
                        >
                            <Info className='size-4 md:size-6 md:w-5 md:h-5' />
                            More Info
                        </Button>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-[30%] right-0 z-3 flex items-center gap-3'>
                <ButtonMuted className='hidden md:flex ' />

                <div
                    className={cn(
                        'right-0 border-l-3 border-brand bg-black/50!',
                        'pr-5 md:pr-20 pl-2 h-5 md:h-8 bg-gradient-to-r to-transparent  flex items-center '
                    )}
                >
                    <span className='text-white text-md md:text-base font-semibold '>T{video.age}</span>
                </div>
            </div>
            <div
                className='absolute bottom-0 left-0 right-0 h-40
             bg-gradient-to-t from-black/90 via-black/60 via-40% to-transparent
             pointer-events-none z-1'
            />
            <div
                className='absolute top-0 left-0 right-0 h-24 md:h-28 
             bg-gradient-to-b from-black/100 via-black/40 to-transparent 
             z-1'
            />
            <FilmDetailDialog
                film={video}
                open={isOpenFilmDetail}
                onOpenChange={setIsOpenFilmDetail}
                onClose={onCloseVideoDetail}
            />
        </div>
    )
}
