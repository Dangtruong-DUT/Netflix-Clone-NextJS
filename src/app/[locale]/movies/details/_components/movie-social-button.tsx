'use client'

import CommentIcon from '@/components/icons/comment'
import ShareIcon from '@/components/icons/share'
import HeartIcon from '@/components/icons/heart'
import { useState } from 'react'
import { toast } from 'sonner'
import { FilmDetailType } from '@/types/film.type'
import { useTranslations } from 'next-intl'
import { ShareMenuDialog } from '@/components/ui/share-menu-dialog'

type Props = {
    informationFilm: FilmDetailType
}

export default function MovieSocialButton({ informationFilm }: Props) {
    const movie = informationFilm
    const t = useTranslations('InformationForm')
    const [isFavorite, setIsFavorite] = useState(false)
    const handleClickFavorite = () => {
        setIsFavorite(!isFavorite)
        toast('Bạn đã ' + (isFavorite ? 'bỏ yêu thích' : 'yêu thích') + ' phim này.')
    }
    const handleClickComment = () => {
        const commentBlock = document.getElementById('comment-block')
        if (commentBlock) {
            commentBlock.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }
    return (
        <>
            <div className='bg-gradient-to-b mb-3 xs:mb-4 rounded-sm xs:rounded'>
                <div className='flex justify-between px-1 xs:p-5 md:px-4 lg:px-0'>
                    <div
                        className='flex flex-col items-center gap-1 xs:gap-2 cursor-pointer group flex-1'
                        onClick={handleClickFavorite}
                    >
                        <HeartIcon
                            className={`w-6 h-6 xs:w-7 xs:h-7 transition-all duration-200 ${
                                isFavorite
                                    ? 'fill-brand stroke-brand'
                                    : 'fill-transparent stroke-white group-hover:stroke-brand!'
                            }`}
                        />
                        {movie.like_count > 0 ? (
                            <strong className='px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand text-center'>
                                {movie.like_count}
                            </strong>
                        ) : (
                            <span className='px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand text-center'>
                                {t('favorite')}
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col items-center gap-1 xs:gap-2 cursor-pointer group flex-1'>
                        <CommentIcon
                            className='w-6 h-6 xs:w-7 xs:h-7 fill-white group-hover:fill-brand! transition-colors'
                            onClick={handleClickComment}
                        />
                        {movie.comments_count > 0 ? (
                            <strong className='px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand! text-center'>
                                {movie.comments_count}
                            </strong>
                        ) : (
                            <span className='px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand! text-center'>
                                {t('rate')}
                            </span>
                        )}
                    </div>
                    <ShareMenuDialog
                        url={
                            typeof window !== 'undefined'
                                ? `${window.location.origin}${movie.film_url ?? ''}`
                                : (movie.film_url ?? '')
                        }
                    >
                        <div className='flex flex-col items-center gap-1 xs:gap-2 cursor-pointer group flex-1'>
                            <ShareIcon className='w-6 h-6 xs:w-7 xs:h-7 fill-white group-hover:fill-brand! transition-colors' />
                            {movie.share_count > 0 ? (
                                <strong className='px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand! text-center'>
                                    {movie.share_count}
                                </strong>
                            ) : (
                                <span className='px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand! text-center'>
                                    {t('share')}
                                </span>
                            )}
                        </div>
                    </ShareMenuDialog>
                </div>
            </div>
        </>
    )
}
