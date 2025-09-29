export type FilmDetailType = {
    id: string
    title: string
    title_other: string
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

    comments?: Comment[]
    like_count: number
    share_count: number

    isVip?: boolean
}

export type Comment = {
    user: string
    content: string
    rated_at: string
    rating: number
}
