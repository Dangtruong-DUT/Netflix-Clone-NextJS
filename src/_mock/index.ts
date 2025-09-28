import { FilmDetailType } from '@/types/film.type'

export const filmDetail: FilmDetailType = {
    id: '1',
    title: 'Tiêu Minh Minh',
    release_date: '2025-01-01',
    description:
        'Say mê võ hiệp, Tiêu Minh Minh (Thành Nghị) hóa thân thành Tiêu Thu Thủy, từ kiếm khách trẻ tuổi đến đại hiệp nghĩa khí, bảo vệ đất nước.',
    vertical_poster: '/images/home/inception-vertical.jpg',
    horizontal_poster: '/images/hero_video_poster.png',
    genres: ['Phim cổ trang', 'Hành động'],
    trailer_url: '/videos/teaser_Camuchammat.mp4',
    age: 13,

    views_count: 2704011,
    rating: 4.8,
    year: 2025,
    country: 'Trung Quốc',
    quality: 'Full HD',
    actors: [
        'Thành Nghị',
        'Cổ Lực Na Trát',
        'Lý Khải Hinh',
        'Trương Trí Lâm',
        'Từ Chấn Hiên',
        'Lữ Tụng Hiên',
        'Trần Ngọc Kỳ'
    ],
    directors: ['Nhậm Hải Đào', 'Lâm Phong'],
    category: 'Phim cổ trang',
    comments_count: 464,
    duration_minutes: 120,
    watch_duration_minutes: 10,
    rank: 1,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
}

const now = new Date()
const twoMonthAgo = new Date()
twoMonthAgo.setMonth(now.getMonth() - 2)

export const getMockFilms = (number: number): FilmDetailType[] => {
    return Array(number)
        .fill(filmDetail)
        .map((item, index) => ({
            ...item,
            id: (index + 1).toString() + 'filmDetail',
            release_date: index % 2 === 0 ? now.toISOString() : twoMonthAgo.toISOString(),
            rank: Math.max(0, Math.floor(Math.random() * 20))
        }))
}

export const getMockFilmsWithRank = (number: number): FilmDetailType[] => {
    return Array(number)
        .fill(filmDetail)
        .map((item, index) => ({
            ...item,
            id: (index + 1).toString() + 'filmDetail',
            rank: index + 1,
            release_date: index % 2 === 0 ? now.toISOString() : twoMonthAgo.toISOString()
        }))
}
