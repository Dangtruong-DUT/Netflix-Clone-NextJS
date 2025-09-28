import StarRating from './star-rating'
import { InformationFilm } from '@/types/film.type'
import { useTranslations } from 'next-intl'
import VideoProgressIndicator from '@/app/[locale]/movies/details/_components/video-progress-indicator'
import MovieSocialButton from '@/app/[locale]/movies/details/_components/movie-social-button'

type Props = {
    informationFilm: InformationFilm
}

export default function DetailFilmForm({ informationFilm }: Props) {
    const movie = informationFilm
    const t = useTranslations('InformationForm')

    if (!movie) return null

    return (
        <div className='mx-auto w-full px-6 md:px-8 lg:px-37 dark:bg-black/50 bg-white/50 text-black dark:text-white'>
            <div className='flex flex-col lg:flex-row gap-4 xs:gap-5 sm:gap-6'>
                <div className='flex-1 lg:flex-[3_0_70%] min-w-0 -px-0.5'>
                    <h1 className='text-base xs:text-lg sm:text-xl md:text-2xl dark:text-white text-black font-semibold mb-1 xs:mb-2 sm:mb-3 break-words'>
                        {movie.title}
                    </h1>
                    <h1 className='text-sm xs:text-base sm:text-lg dark:text-white text-black mb-2 xs:mb-3 break-words'>
                        {movie.title_other}
                    </h1>
                    <div className='flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4'>
                        <div className='text-sm xs:text-base dark:text-white text-black'>
                            {movie.views.toLocaleString('vi-VN', { useGrouping: true })} {t('views')}
                        </div>
                        <div className='flex items-center gap-1 xs:gap-2 dark:text-white text-black cursor-pointer'>
                            {movie.rating}
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
                        <h2 className='font-semibold mb-1 xs:mb-2 text-sm xs:text-base'>{t('description')}</h2>
                        <p className='text-sm xs:text-base leading-relaxed text-justify break-words'>
                            {movie.description}
                        </p>
                    </div>
                </div>

                <div className='lg:w-1/4 flex-shrink-0'>
                    <MovieSocialButton informationFilm={movie} />
                    <div className='text-xs xs:text-sm dark:text-white text-black'>
                        <div>
                            <div className='dark:text-[#b3b3b3] text-gray-700'>{t('actors')}:</div>
                            <div className='mt-1 font-medium break-words cursor-pointer'>
                                {movie.actors.join(', ')}
                            </div>
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