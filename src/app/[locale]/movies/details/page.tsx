import Header from '@/components/header'
import DetailFilmForm from './_components/detail-film-form'
import { movies } from './_mock/index'

export default function MovieDetailPage() {
    return (
        <>
            <Header />
            <div className='w-full dark:bg-black bg-white'>
                <DetailFilmForm informationFilm={movies} />
            </div>
        </>
    )
}
