import { FilmDetailType } from '@/types/film.type'
import { useTranslations } from 'next-intl'
import VideoProgressIndicator from '@/app/[locale]/movies/details/_components/video-progress-indicator'
import MovieSocialButton from '@/app/[locale]/movies/details/_components/movie-social-button'
import StarRating from '@/components/star-rating'
import { formatNumber } from '@/utils/formatting/formatNumber'

type Props = {
    informationFilm: FilmDetailType
}

export default function DetailFilm({ informationFilm }: Props) {
    const movie = informationFilm
    const t = useTranslations('InformationForm')

    if (!movie) return null

    return (
        <div className='mx-auto w-full px-6 md:px-8 lg:px-37'>
            <div className='flex flex-col lg:flex-row gap-4 xs:gap-5 sm:gap-6'>
                <div className='flex-1 lg:flex-[3_0_70%] min-w-0 -px-0.5'>
                    <h1 className='text-base xs:text-lg sm:text-xl md:text-2xl  font-semibold mb-1 xs:mb-2 sm:mb-3 break-words'>
                        {movie.title}
                    </h1>
                    <h2 className='text-sm xs:text-base sm:text-lg  mb-2 xs:mb-3 break-words'>{movie.title_other}</h2>
                    <div className='flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4'>
                        <strong className='text-sm xs:text-base '>
                            {formatNumber.format(movie.views_count)} {t('views')}
                        </strong>
                        <div className='flex text-sm items-center gap-1 xs:gap-2  cursor-pointer'>
                            {movie.rating}
                            <StarRating rating={movie.rating} readOnly />
                        </div>
                    </div>
                    <div className='flex flex-wrap font-medium  items-center gap-1 xs:gap-2 text-sm xs:text-base mb-3 xs:mb-4'>
                        <span>
                            {movie.year} | {movie.age} | {movie.country} | {movie.quality}
                        </span>
                    </div>
                    <div className='flex items-center gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4 flex-wrap'>
                        <VideoProgressIndicator />
                        <span className='ml-1 xs:ml-2 xs:text-base flex-shrink-0 text-xs'>
                            {t('still_has')} {movie.duration_minutes}
                        </span>
                    </div>
                    <div className='mb-3 xs:mb-4'>
                        <h2 className='font-semibold mb-1 xs:mb-2 text-base'>{t('description')}</h2>
                        <p className='text-sm xs:text-base leading-relaxed text-justify break-words'>
                            {movie.description}
                        </p>
                    </div>
                </div>

                <div className='lg:w-1/4 flex-shrink-0'>
                    <MovieSocialButton informationFilm={movie} />
                    <div className='text-sm gap-2 '>
                        <div className='items-baseline'>
                            <span className='dark:text-[#b3b3b3] text-gray-700 pr-0.5'>{t('actors')}:</span>
                            <span className='mt-1 font-medium break-words cursor-pointer'>
                                {movie.actors.join(', ')}
                            </span>
                        </div>
                        <div className='items-baseline gap-1'>
                            <span className='dark:text-[#b3b3b3] text-gray-700 pr-0.5'>{t('director')}:</span>
                            <span className='mt-1 font-medium break-words cursor-pointer'>
                                {movie.directors.join(', ')}
                            </span>
                        </div>
                        <div className='items-baseline gap-1'>
                            <span className='dark:text-[#b3b3b3] text-gray-700 pr-0.5'>{t('genre')}:</span>
                            <span className='mt-1 font-medium break-words cursor-pointer'>
                                {movie.genres.join(', ')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
