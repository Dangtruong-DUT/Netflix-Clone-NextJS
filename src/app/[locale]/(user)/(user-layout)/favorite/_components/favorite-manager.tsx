'use client'

import { useState } from 'react'
import FavoriteHead from './favorite-head'
import FavoriteList from './list-favorite-films'
import { getMockFilms } from '@/_mock'
import { FilmDetailType } from '@/types/film.type'

export default function FavoriteManager() {
    const [isEditing, setIsEditing] = useState(false)
    const [selectedMovies, setSelectedMovies] = useState<string[]>([])

    const movies: FilmDetailType[] = getMockFilms(50)

    const handleSelect = (id: string) => {
        setSelectedMovies((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]))
    }

    const handleSelectAll = () => {
        if (selectedMovies.length === movies.length) {
            setSelectedMovies([])
        } else {
            setSelectedMovies(movies.map((m) => m.id))
        }
    }

    return (
        <>
            <FavoriteHead
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                selectedMovies={selectedMovies}
                setSelectedMovies={setSelectedMovies}
                onSelectAll={handleSelectAll}
                allSelected={selectedMovies.length === movies.length}
            />
            <FavoriteList
                isEditing={isEditing}
                selectedMovies={selectedMovies}
                onSelect={handleSelect}
                movies={movies}
            />
        </>
    )
}
