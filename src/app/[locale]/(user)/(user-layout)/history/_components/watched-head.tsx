'use client'

import { ArrowLeft, Pause, Play, Trash2, Search, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { toast } from 'sonner'
import DialogConfirm from '@/app/[locale]/(user)/(user-layout)/history/_components/confirm-dialog'

export default function WatchHistoryHead() {
    const t = useTranslations('HistoryPage')
    const [isPaused, setIsPaused] = useState(false)
    const [open, setOpen] = useState(false)
    const [actionType, setActionType] = useState<'pause' | 'resume' | 'delete' | null>(null)
    const [searchValue, setSearchValue] = useState('')

    const handleToggleHistory = () => {
        setActionType(isPaused ? 'resume' : 'pause')
        setOpen(true)
    }

    const handleDeleteAll = () => {
        setActionType('delete')
        setOpen(true)
    }

    const handleConfirm = () => {
        if (actionType === 'pause') {
            setIsPaused(true)
            toast.success(t('messages.pauseSuccess'))
        } else if (actionType === 'resume') {
            setIsPaused(false)
            toast.success(t('messages.continueSuccess'))
        } else if (actionType === 'delete') {
            toast.success(t('messages.deleteSuccess'))
        }
        setOpen(false)
        setActionType(null)
    }

    const getDialogTitle = () => {
        switch (actionType) {
            case 'pause':
                return t('messages.confirmPause')
            case 'resume':
                return t('messages.confirmResume')
            case 'delete':
                return t('messages.confirmDelete')
            default:
                return ''
        }
    }

    return (
        <div className='w-full px-6 md:px-10 lg:px-16 py-4'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <Link
                    href={'/films'}
                    className='flex items-center gap-2 text-black dark:text-white transition group w-fit'
                >
                    <ArrowLeft className='w-5 h-5 transition-transform' />
                    <h1 className='text-lg md:text-xl font-semibold'>{t('title')}</h1>
                </Link>

                <div
                    className='
                        flex flex-col sm:flex-row md:flex-row
                        sm:items-start md:items-center md:justify-end
                        gap-3 md:gap-4 w-full md:w-auto
                    '
                >
                    <div className='relative group w-full sm:w-[300px] md:w-[420px] mx-auto md:mx-0'>
                        <Search
                            className='
                                absolute left-1.5 md:left-2 top-1/2 -translate-y-1/2
                                w-4 h-4 md:w-5 md:h-5
                                text-gray-500 dark:text-gray-400 transition-all duration-300
                                group-hover:text-black dark:group-hover:text-white
                                group-focus-within:text-black dark:group-focus-within:text-white
                            '
                        />

                        <input
                            type='text'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder={t('searchHistory')}
                            className='
                                w-full bg-transparent text-gray-900 dark:text-white text-sm
                                border-b border-gray-400/30 dark:border-gray-500/30
                                outline-none py-2 pl-10 pr-8
                                focus:border-transparent peer
                            '
                        />

                        {searchValue && (
                            <button
                                onClick={() => setSearchValue('')}
                                className='
                                    absolute right-2 top-1/2 -translate-y-1/2
                                    text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white
                                    transition-all duration-200 opacity-90 hover:opacity-100
                                '
                                aria-label='Clear search'
                            >
                                <X className='w-4 h-4 md:w-5 md:h-5' />
                            </button>
                        )}

                        <span
                            className='
                                absolute left-1/2 bottom-0 h-[1.5px]
                                bg-black dark:bg-white
                                w-0 group-focus-within:w-full
                                transition-all duration-300 ease-out origin-center transform -translate-x-1/2
                            '
                        />
                    </div>

                    <div
                        className='
                            flex items-center justify-center md:justify-end
                            gap-2 sm:mt-2 md:mt-0
                        '
                    >
                        <button
                            onClick={handleToggleHistory}
                            className='flex items-center justify-center gap-2 px-3 py-2 rounded-full
                                hover:bg-black/10 dark:hover:bg-white/20 text-sm transition whitespace-nowrap
                                text-gray-800 dark:text-gray-200 cursor-pointer'
                        >
                            {isPaused ? (
                                <>
                                    <Play className='w-4 h-4' />
                                    <span>{t('continueHistory')}</span>
                                </>
                            ) : (
                                <>
                                    <Pause className='w-4 h-4' />
                                    <span>{t('pauseHistory')}</span>
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleDeleteAll}
                            className='flex items-center justify-center gap-2 px-3 py-2 rounded-full
                                hover:bg-black/10 dark:hover:bg-white/20 text-sm transition whitespace-nowrap
                                text-gray-800 dark:text-gray-200 cursor-pointer'
                        >
                            <Trash2 className='w-4 h-4' />
                            <span>{t('deleteallHistory')}</span>
                        </button>
                    </div>
                </div>
            </div>

            <DialogConfirm
                open={open}
                title={getDialogTitle()}
                onClose={() => setOpen(false)}
                onConfirm={handleConfirm}
                cancelText={t('messages.cancel')}
                confirmText={t('messages.confirm')}
            />
        </div>
    )
}
