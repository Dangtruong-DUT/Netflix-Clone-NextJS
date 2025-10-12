import HistoryBlock from '@/app/[locale]/(user)/(user-layout)/history/_components/history-block'
import WatchHistoryHeader from '@/app/[locale]/(user)/(user-layout)/history/_components/watched-head'
import ScrollToTopButton from '@/components/scroll-to-top'

export default function HistoryPage() {
    return (
        <>
            <div className='mb-4 lg:mb-8'>
                <WatchHistoryHeader />
            </div>
            <HistoryBlock />
            <ScrollToTopButton />
        </>
    )
}
