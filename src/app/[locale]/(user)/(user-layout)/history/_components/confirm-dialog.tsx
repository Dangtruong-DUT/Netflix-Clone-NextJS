'use client'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DialogConfirmProps {
    open: boolean
    title: string
    onClose: () => void
    onConfirm: () => void
    cancelText?: string
    confirmText?: string
}

export default function DialogConfirm({
    open,
    title,
    onClose,
    onConfirm,
    cancelText = 'Cancel',
    confirmText = 'OK'
}: DialogConfirmProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className='
                bg-black dark:bg-black 
                border border-[#333333]
                rounded-none p-6
                text-white 
                shadow-2xl 
                w-[90%] sm:w-[400px]
                '
            >
                <DialogHeader className='flex flex-col gap-4 pb-4'>
                    <DialogTitle
                        className='
                        text-base font-normal text-center
                        text-white
                        '
                    >
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <DialogFooter className='flex flex-row justify-center gap-3 pt-2'>
                    <Button
                        onClick={onClose}
                        className='
                        w-fit px-4 py-1.5 sm:py-2 rounded-[4px] 
                        bg-[#6d6d6e]/70 hover:bg-[#6d6d6e]/40 text-white
                        transition-all duration-200 backdrop-blur-sm text-sm cursor-pointer
                        '
                    >
                        {cancelText}
                    </Button>

                    <Button
                        onClick={onConfirm}
                        className='
                        w-fit px-4 py-1.5 sm:py-2 rounded-[4px]
                        bg-brand hover:bg-brand/90 text-white
                        text-sm font-medium cursor-pointer transition-all duration-200
                        '
                    >
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
