import Image from 'next/image'
import { InformationFilm } from '@/types/film.type'
import { useTranslations } from 'next-intl'
import StarRating from '@/app/[locale]/movies/details/_components/star-rating'

type Props = {
    informationFilm: InformationFilm
}

export default function CommentBlock({ informationFilm }: Props) {
    const movie = informationFilm
    const t = useTranslations('InformationForm')

    return (
        <div className='max-w-[95%] mx-auto dark:bg-black bg-white p-8 rounded-2xl'>
            <p className='text-lg font-semibold mb-3'>
                {t('comment')} ({movie.commentsCount})
            </p>

            {movie.commentsCount > 0 ? (
                <div className='flex flex-col gap-3'>
                    {movie.comments?.map((comment, index) => (
                        <div key={index} className='p-3 bg-white dark:bg-black'>
                            <div className='flex items-center justify-between mb-2'>
                                <div className='flex items-center gap-2'>
                                    <p className='font-medium text-base'>{comment.user}</p>
                                    <StarRating value={comment.rating} size={16} className='pointer-events-none' />
                                    <span className='text-xs text-gray-500'>{comment.date}</span>
                                </div>
                            </div>
                            <p className='text-gray-700 dark:text-gray-300'>{comment.content}</p>
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
                    <p className='text-gray-500 dark:text-gray-400 text-sm text-center'>{t('noCommentsMessage')}</p>
                </div>
            )}
        </div>
    )
}
