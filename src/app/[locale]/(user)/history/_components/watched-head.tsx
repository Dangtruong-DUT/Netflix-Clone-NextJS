'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ArrowLeft, Pause, Trash2, Search, Play } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export default function WatchHistoryHeader() {
    const t = useTranslations('HistoryPage')
    const [isPaused, setIsPaused] = useState(false)
    const [open, setOpen] = useState(false)
    const [actionType, setActionType] = useState<'pause' | 'resume' | 'delete' | null>(null)

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
            toast.success(t('messages.pauseSuccess'), { duration: 4000 })
        } else if (actionType === 'resume') {
            setIsPaused(false)
            toast.success(t('messages.continueSuccess'), { duration: 4000 })
        } else if (actionType === 'delete') {
            toast.success(t('messages.deleteSuccess'), { duration: 4000 })
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
        <div className='mx-auto w-full px-6 md:px-8 lg:px-14 py-10'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-10'>
                <Link href={'/films'} className='flex items-center gap-2 group group-hover:cursor-pointer'>
                    <button className='hover:text-gray-300 transition group-hover:cursor-pointer'>
                        <ArrowLeft className='w-5 h-5' />
                    </button>
                    <h1 className='text-lg md:text-xl font-bold group-hover:cursor-pointer'>{t('title')}</h1>
                </Link>

                <div className='relative w-full sm:w-[220px] md:w-[300px]'>
                    <Search className='absolute left-2 top-1/2 -translate-y-1/2  w-4 h-4' />
                    <input
                        type='text'
                        placeholder={t('searchHistory')}
                        className='w-full  bg-transparent border-b  outline-none pl-9 pr-2 py-1 text-sm font-mono'
                    />
                </div>
            </div>

            <div className='flex flex-col text-sm md:text-base md:max-w-1/2 w-fit'>
                <button
                    onClick={handleToggleHistory}
                    className='px-1 py-2 rounded-tr-[4px] rounded-br-[4px]  flex items-center gap-2 hover:cursor-pointer transition disabled:opacity-50 dark:hover:bg-[#333333]/60 hover:border-l-2 dark:hover:border-[#dcdcdc] hover:bg-muted/90 hover:border-black/50'
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
                    className=' px-1 py-2 rounded-tr-[4px] rounded-br-[4px] flex items-center gap-2 hover:cursor-pointer transition dark:hover:bg-[#333333]/60 hover:border-l-2 dark:hover:border-[#dcdcdc] hover:bg-muted/90 hover:border-black/50'
                >
                    <Trash2 className='w-4 h-4' />
                    <span>{t('deleteallHistory')}</span>
                </button>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className='
                    bg-white/5 dark:bg-white/5 border-t-0 border-b-0 border-r-0
                    border-l-4 border-brand backdrop-blur-md 
                    rounded-lg p-5 md:p-6 
                    text-gray-800 dark:text-gray-100 
                    transition-all duration-200 shadow-lg w-[90%] sm:w-[500px]

                    [&_button.absolute.right-4.top-4]:cursor-pointer 
                    [&_button.absolute.right-4.top-4:hover]:opacity-80 
                    [&_button.absolute.right-4.top-4:hover]:scale-110 
                    [&_button.absolute.right-4.top-4]:transition 
                    [&_button.absolute.right-4.top-4]:duration-200
                    '
                >
                    <DialogHeader className='flex flex-col gap-2 pt-4'>
                        <DialogTitle className='md:text-base text-[12px] text-center md:text-left font-semibold text-white'>
                            {getDialogTitle()}
                        </DialogTitle>
                    </DialogHeader>

                    <DialogFooter className='flex flex-row justify-end gap-2 sm:gap-3 pt-4'>
                        <Button
                            onClick={() => setOpen(false)}
                            className='
                            w-fit px-4 py-1.5 sm:py-2 rounded-[4px] 
                            bg-[#6d6d6e]/70 hover:bg-[#6d6d6e]/40 text-white
                            transition-all duration-200 backdrop-blur-sm text-sm cursor-pointer
                            '
                        >
                            {t('messages.cancel')}
                        </Button>

                        <Button
                            onClick={handleConfirm}
                            className='
                            w-fit px-4 py-1.5 sm:py-2 rounded-[4px]
                            bg-brand hover:bg-brand/90 text-white
                            text-sm font-medium cursor-pointer transition-all duration-200
                            '
                        >
                            {t('messages.confirm')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
