'use client'
import { getMockFilms } from '@/_mock'
import HistoryBlock from '@/app/[locale]/(user)/history/_components/history-block'
import WatchHistoryHeader from '@/app/[locale]/(user)/history/_components/watched-head'
import { useEffect, useState } from 'react'
import { FilmDetailType } from '@/types/film.type'

export default function HistoryPage() {
    const [history, setHistory] = useState<FilmDetailType[]>([])

    useEffect(() => {
        const data = getMockFilms(50)
        setHistory(data)
    }, [])

    return (
        <>
            <WatchHistoryHeader />
            <HistoryBlock movies={history} />
        </>
    )
}
