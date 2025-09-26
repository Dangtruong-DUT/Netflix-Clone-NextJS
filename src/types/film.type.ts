export type TrendingItem = {
    id: string
    title: string
    release_year: number
    maturity_rating: string
    genres: string[]
    description: string
    vertical_poster: string
    horizontal_poster: string
    rank: number
}

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
}
