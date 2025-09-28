'use client'

import CommentIcon from '@/components/icons/comment'
import ShareIcon from '@/components/icons/share'
import HeartIcon from '@/components/icons/heart'
import { useState } from 'react'
import { toast } from 'sonner'
import { InformationFilm } from '@/types/film.type'
import { useTranslations } from 'next-intl'

type Props = {
    informationFilm: InformationFilm
}

export default function MovieSocialButton({ informationFilm }: Props) {
    const movie = informationFilm
    const t = useTranslations('InformationForm')
    const [isFavorite, setIsFavorite] = useState(false)
    const handleClickFavorite = () => {
        setIsFavorite(!isFavorite)
        toast('Bạn đã ' + (isFavorite ? 'bỏ yêu thích' : 'yêu thích') + ' phim này.')
    }
    return (
        <div className='bg-gradient-to-b text-black mb-3 xs:mb-4 dark:text-white rounded-sm xs:rounded'>
            <div className='flex justify-between px-1 xs:p-5 md:px-4 lg:px-0'>
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
                            {t('rate')}
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
    )
}
