'use client'

import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface TooltipProps {
    text: string
    children: React.ReactNode
    tooltipClassName?: string
}

const TooltipComponent: React.FC<TooltipProps> = ({ text, children, tooltipClassName }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const offsetX = 10
            const offsetY = 10
            let x = e.clientX - rect.left + offsetX
            let y = e.clientY - rect.top + offsetY

            const tooltipWidth = 150
            const tooltipHeight = 30
            if (x + tooltipWidth > window.innerWidth) {
                x = window.innerWidth - tooltipWidth - 10
            }
            if (y + tooltipHeight > window.innerHeight) {
                y = window.innerHeight - tooltipHeight - 10
            }

            setPosition({ x, y })
        }
    }

    return (
        <div
            ref={containerRef}
            className='relative inline-block'
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <div className='cursor-pointer'>{children}</div>
            {isVisible && (
                <div
                    data-testid='tooltip'
                    className={cn(
                        'absolute bg-[#2a2a2a] text-white border-1 border-white px-2 py-1 text-[9px] whitespace-nowrap z-[1000] pointer-events-none',
                        tooltipClassName
                    )}
                    style={{ left: `${position.x}px`, top: `${position.y}px` }}
                >
                    {text}
                </div>
            )}
        </div>
    )
}

export default TooltipComponent
