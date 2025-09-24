'use client'

import StarRating from './star-rating'
import CommentIcon from '@/components/icons/comment'
import ShareIcon from '@/components/icons/share'
import HeartIcon from '@/components/icons/heart'
import { InformationFilm } from '@/types/film.type'
import { useTranslations } from 'next-intl'
import VideoProgressIndicator from '@/app/[locale]/movies/details/_components/video-progress-indicator'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
    informationFilm: InformationFilm
}

export default function DetailFilmForm({ informationFilm }: Props) {
    const movie = informationFilm
    const t = useTranslations('InformationForm')

    if (!movie) return null

    const [isFavorite, setIsFavorite] = useState(false)

    const handleClickFavorite = () => {
        setIsFavorite(!isFavorite)
        toast('Bạn đã ' + (isFavorite ? 'bỏ yêu thích' : 'yêu thích') + ' phim này.')
    }

    return (
        <div className='mx-auto w-full max-w-[90%] dark:bg-black/50 bg-white/50 text-black dark:text-white'>
            <div className='flex flex-col lg:flex-row gap-4 xs:gap-5 sm:gap-6'>
                <div className='flex-1 lg:flex-[3_0_75%] min-w-0'>
                    <h3 className='text-base xs:text-lg sm:text-xl md:text-2xl dark:text-white text-black font-semibold mb-1 xs:mb-2 sm:mb-3 break-words'>
                        {movie.title}
                    </h3>
                    <p className='text-sm xs:text-base sm:text-lg dark:text-white text-black mb-2 xs:mb-3 break-words'>
                        {movie.title_other}
                    </p>
                    <div className='flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4'>
                        <div className='text-sm xs:text-base dark:text-white text-black'>
                            {movie.views.toLocaleString('vi-VN', { useGrouping: true })} {t('views')}
                        </div>
                        <div className='flex items-center gap-1 xs:gap-2 dark:text-white text-black cursor-pointer'>
                            <StarRating value={movie.rating} />
                        </div>
                    </div>
                    <div className='flex flex-wrap font-medium dark:text-white text-black items-center gap-1 xs:gap-2 text-sm xs:text-base mb-3 xs:mb-4'>
                        <span>
                            {movie.year} | {movie.age_rating} | {movie.country} | {movie.quality}
                        </span>
                    </div>
                    <div className='flex items-center gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4 flex-wrap'>
                        <VideoProgressIndicator />
                        <span className='ml-1 xs:ml-2 text-sm xs:text-base flex-shrink-0'>
                            {t('still_has')} {movie.duration}
                        </span>
                    </div>
                    <div className='mb-3 xs:mb-4'>
                        <h4 className='font-semibold mb-1 xs:mb-2 text-sm xs:text-base'>{t('description')}</h4>
                        <p className='text-sm xs:text-base leading-relaxed text-justify break-words'>
                            {movie.description}
                        </p>
                    </div>
                </div>

                <div className='lg:flex-[1_0_25%] flex-shrink-0 xl:pl-14'>
                    <div className='bg-gradient-to-b text-black mb-3 xs:mb-4 dark:text-white rounded-sm xs:rounded'>
                        <div className='flex justify-between p-2 xs:p-3'>
                            <div
                                className='flex flex-col items-center gap-1 xs:gap-2 cursor-pointer group flex-1'
                                onClick={handleClickFavorite}
                            >
                                <HeartIcon
                                    className={`w-6 h-6 xs:w-7 xs:h-7 transition-all duration-200 ${
                                        isFavorite
                                            ? 'fill-brand stroke-brand'
                                            : 'fill-transparent stroke-black dark:stroke-white group-hover:stroke-brand!'
                                    }`}
                                />
                                {movie.favoriteCount > 0 ? (
                                    <div className='px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand text-center'>
                                        {movie.favoriteCount}
                                    </div>
                                ) : (
                                    <div className='px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand text-center'>
                                        {t('favorite')}
                                    </div>
                                )}
                            </div>
                            <div className='flex flex-col items-center gap-1 xs:gap-2 cursor-pointer group flex-1'>
                                <CommentIcon
                                    className='w-6 h-6 xs:w-7 xs:h-7 fill-black dark:fill-white group-hover:fill-brand! transition-colors'
                                    onClick={() => {}}
                                />
                                {movie.commentsCount > 0 ? (
                                    <div className='px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand! text-center'>
                                        {movie.commentsCount}
                                    </div>
                                ) : (
                                    <div className='px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand! text-center'>
                                        {t('comment')}
                                    </div>
                                )}
                            </div>
                            <div className='flex flex-col items-center gap-1 xs:gap-2 cursor-pointer group flex-1'>
                                <ShareIcon
                                    className='w-6 h-6 xs:w-7 xs:h-7 fill-black dark:fill-white group-hover:fill-brand! transition-colors'
                                    onClick={() => {}}
                                />
                                {movie.sharesCount > 0 ? (
                                    <div className='px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand! text-center'>
                                        {movie.sharesCount}
                                    </div>
                                ) : (
                                    <div className='px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand! text-center'>
                                        {t('share')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='p-2 xs:p-3 sm:p-4 text-xs xs:text-sm dark:text-white text-black space-y-2 xs:space-y-3'>
                        <div>
                            <div className='dark:text-[#b3b3b3] text-gray-700'>{t('actors')}:</div>
                            <div className='mt-1 font-medium break-words cursor-pointer'>{movie.actors.join(', ')}</div>
                        </div>
                        <div>
                            <div className='dark:text-[#b3b3b3] text-gray-700'>{t('director')}:</div>
                            <div className='mt-1 font-medium break-words cursor-pointer'>{movie.director}</div>
                        </div>
                        <div>
                            <div className='dark:text-[#b3b3b3] text-gray-700'>{t('genre')}:</div>
                            <div className='mt-1 font-medium break-words cursor-pointer'>{movie.genre}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
