import Image from 'next/image'
import { FilmDetailType } from '@/types/film.type'
import { useTranslations } from 'next-intl'
import { timeAgo } from '@/utils/formatting/formatTime'
import RatingForm from '@/app/[locale]/movies/details/_components/rating-form'
import StarRating from '@/components/star-rating'
import { useLocale } from 'next-intl'

type Props = {
    informationFilm: FilmDetailType
}

export default function CommentBlock({ informationFilm }: Props) {
    const movie = informationFilm
    const t = useTranslations('InformationForm')
    const locale = useLocale()

    return (
        <div className='mx-auto w-full px-6 md:px-8 lg:px-14'>
            <h2 className='text-lg font-semibold mb-3'>
                {t('rate')} ({movie.comments_count})
            </h2>
            <RatingForm />
            {movie.comments_count > 0 ? (
                <div className='flex flex-col gap-3'>
                    {movie.comments?.map((comment, index) => (
                        <div key={index} className='pb-4'>
                            <div className='flex items-center justify-between mb-2'>
                                <div className='flex items-center gap-2'>
                                    <p className='font-medium text-base'>{comment.user}</p>
                                    <StarRating rating={comment.rating} className='pointer-events-none' readOnly />
                                    <span className='text-xs text-gray-500 pt-[6px]'>
                                        {timeAgo({ locale, date: comment.rated_at })}
                                    </span>
                                </div>
                            </div>
                            <p className='text-gray-300'>{comment.content}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center py-8 w-2/3 mx-auto'>
                    <Image
                        src='/images/detail-film/comment-blocked.png'
                        alt='No comments'
                        width={250}
                        height={250}
                        className='opacity-70 mb-4'
                    />
                    <p className='text-gray-400 text-sm text-center'>{t('noCommentsMessage')}</p>
                </div>
            )}
        </div>
    )
}
