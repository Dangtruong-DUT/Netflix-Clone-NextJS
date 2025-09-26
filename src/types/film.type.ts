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
