'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { FilmDetailType } from '@/types/film.type'
import { Play, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import TooltipComponent from '@/components/tool-tip'

interface WatchHistoryCardProps {
    movie: FilmDetailType
    className?: string
}

export default function WatchHistoryCard({ movie, className }: WatchHistoryCardProps) {
    const t = useTranslations('HistoryPage')

    const progress = Math.min((movie.watch_duration_minutes / movie.duration_minutes) * 100, 100).toFixed(0)

    const isNew = React.useMemo(() => {
        if (!movie.release_date) return false
        const releaseDate = new Date(movie.release_date)
        const now = new Date()
        const diffDays = (now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24)
        return diffDays <= 30
    }, [movie.release_date])

    const [visibleGenres, setVisibleGenres] = React.useState<string[]>([])

    React.useEffect(() => {
        if (typeof window === 'undefined') return
        const isMobile = window.innerWidth < 640
        setVisibleGenres(movie.genres.slice(0, isMobile ? 1 : 2))
    }, [movie.genres])

    return (
        <article
            className={cn(
                'group relative overflow-hidden transition-all duration-300 shadow-md',
                'bg-[#f2f2f2]/50 dark:bg-[#1a1a1a]',
                'w-[120px] xs:w-[120px] sm:w-[135px] md:w-[150px] lg:w-[170px] xl:w-[200px] 2xl:w-[230px]',
                'h-[165px] xs:h-[150px] sm:h-[180px] md:h-[190px] lg:h-[205px] xl:h-[215px] 2xl:h-[230px]',
                'flex flex-col',
                className
            )}
        >
            <div className='relative w-full h-[40%] lg:h-[45%] overflow-hidden'>
                <Image
                    src={movie.horizontal_poster}
                    alt={movie.title}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-110'
                    sizes='(max-width: 480px) 110px, (max-width: 640px) 120px, (max-width: 768px) 135px, (max-width: 1024px) 150px, (max-width: 1280px) 170px, 200px'
                />
            </div>

            <div className='w-full h-[1.5px] bg-gray-300/70 dark:bg-[#808080]/50 rounded-full overflow-hidden'>
                <div
                    className='h-full bg-[#F50723] transition-all duration-300'
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className='flex flex-col h-[60%] lg:h-[55%] p-1.5 sm:p-2 lg:p-2.5'>
                <div className='flex items-center justify-between mb-1 sm:mb-2 min-h-[24px]'>
                    <div className='flex gap-1 sm:gap-2'>
                        <TooltipComponent
                            text={t('tooltip.play')}
                            tooltipClassName='absolute dark:bg-[#2a2a2a] bg-white dark:text-white text-black/80 border-1 dark:border-white border-black px-2 py-1 text-[9px] whitespace-nowrap z-[1000] pointer-events-none'
                        >
                            <Button
                                size='sm'
                                variant='ghost'
                                className='dark:bg-white dark:text-gray-900 bg-gray-900 text-white rounded-full 
                           w-6 h-6 lg:w-8 lg:h-8 hover:bg-gray-900/95 dark:hover:bg-gray-100 
                           p-0 flex-shrink-0'
                            >
                                <Play className='w-3 h-3 md:w-4 md:h-4 dark:fill-gray-900 fill-white stroke-none' />
                            </Button>
                        </TooltipComponent>

                        <TooltipComponent
                            text={t('tooltip.addToList')}
                            tooltipClassName='absolut dark:bg-[#2a2a2a] bg-white dark:text-white text-black/80 border-1 dark:border-white border-black px-2 py-1 text-[9px] whitespace-nowrap z-[1000] pointer-events-none'
                        >
                            <Button
                                size='sm'
                                variant='ghost'
                                className='bg-gray-200 dark:bg-[#2a2a2a] hover:bg-gray-300 dark:hover:bg-[#414141] 
                           border border-gray-400 dark:border-white/50 rounded-full 
                           w-6 h-6 lg:w-8 lg:h-8 p-0 flex-shrink-0'
                            >
                                <Plus className='w-3 h-3 md:w-4 md:h-4 text-gray-800 dark:text-white' />
                            </Button>
                        </TooltipComponent>
                    </div>
                </div>

                <div className='mb-1.5 sm:mb-2 min-h-0 h-fit overflow-hidden'>
                    <h1
                        className='font-medium text-[11px] sm:text-[12px] md:text-[13px] 
                       text-gray-900 dark:text-white truncate whitespace-nowrap 
                       overflow-hidden w-full leading-snug tracking-wide'
                        title={movie.title}
                    >
                        {movie.title}
                    </h1>
                </div>

                <div className='flex items-center gap-1 mb-1 lg:mb-1.5 text-[8px] sm:text-[10px] lg:text-[11px]'>
                    {isNew && <span className='text-[#46D369] font-bold flex-shrink-0'>New</span>}
                    <Badge className='border-gray-400 dark:border-[#bcbcbc] bg-gray-100 dark:bg-[#1a1a1a] font-light text-gray-900 dark:text-white px-1 py-0 rounded-none flex-shrink-0'>
                        T{movie.age}
                    </Badge>
                    <span className='text-gray-700 dark:text-[#bcbcbc] flex-shrink-0'>{movie.year}</span>
                    <Badge
                        variant='outline'
                        className='text-gray-800 dark:text-[#e5e5e5] border border-gray-400 dark:border-[#bcbcbc] font-light rounded-[4px] bg-transparent px-1 py-0 flex-shrink-0'
                    >
                        {movie.quality}
                    </Badge>
                </div>

                <div className='flex flex-nowrap items-center gap-1 text-gray-600 dark:text-gray-400 text-[9px] md:text-[10px] lg:text-[12px] overflow-hidden'>
                    {visibleGenres.map((genre, i) => (
                        <React.Fragment key={genre}>
                            <span className='truncate'>{genre}</span>
                            {i < visibleGenres.length - 1 && <span>•</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </article>
    )
}
