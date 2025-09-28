export type FilmDetailType = {
    id: string
    title: string
    release_date: string
    description: string
    vertical_poster: string
    horizontal_poster: string
    genres: string[]
    trailer_url: string
    age: number
    views_count: number
    rating: number
    year: number
    country: string
    quality: string
    duration_minutes: number
    actors: string[]
    directors: string[]
    category: string
    comments_count: number
    film_url?: string
    watch_duration_minutes: number
    rank: number
    tags?: string[]

    created_at: string
    updated_at: string
}

export type Comment = {
    user: string
    content: string
    date: string
    rating: number
}

export type InformationFilm = {
    id: string
    title: string
    title_other: string
    views: number
    rating: number
    year: number
    age_rating: string
    country: string
    quality: string
    duration: string
    actors: string[]
    director: string
    genre: string
    description: string
    favoriteCount: number
    commentsCount: number
    sharesCount: number
    comments?: Comment[]
}
