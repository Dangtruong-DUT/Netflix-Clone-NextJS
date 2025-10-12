'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { FilmDetailType } from '@/types/film.type'
import FavoriteCard from './movie-card/movie-favorite-card' // đường dẫn tới card
import { getMockFilms } from '@/_mock'
import { MovieFavoriteCardHoverInfoProvider } from './movie-card/movie-favorite-hover-card'

interface FavoriteListProps {
    movies?: FilmDetailType[]
    isEditing: boolean
    selectedMovies: string[]
    onSelect: (id: string) => void
}

export default function FavoriteList({ isEditing, selectedMovies, onSelect }: FavoriteListProps) {
    const mockMovies = useMemo(() => getMockFilms(50), [])
    const t = useTranslations('FavoritePage')

    const renderEmptyState = () => (
        <div className='flex flex-col items-center justify-center py-8 w-2/3 mx-auto'>
            <Image
                src='/images/history/empty-watched.png'
                alt='empty-favorite'
                width={250}
                height={250}
                className='opacity-70 mb-4'
            />
            <p className='text-gray-400 text-sm text-center'>{t('noFavorites')}</p>
        </div>
    )

    if (mockMovies.length === 0) return renderEmptyState()

    return (
        <div className='mx-auto w-full min-h-screen'>
            <div className='grid gap-6 px-6 md:px-8 lg:px-14 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                {mockMovies.map((movie) => (
                    <MovieFavoriteCardHoverInfoProvider key={movie.id} movie={movie} disableHover={isEditing}>
                        <FavoriteCard
                            key={movie.id}
                            movie={movie}
                            isEditing={isEditing}
                            isSelected={selectedMovies.includes(movie.id)}
                            onSelect={() => onSelect(movie.id)}
                        />
                    </MovieFavoriteCardHoverInfoProvider>
                ))}
            </div>
        </div>
    )
}
