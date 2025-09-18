import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useId } from 'react'

interface BrandInputProps extends Omit<React.ComponentProps<'input'>, 'placeholder'> {
    wrapperClassName?: string
    label: string
}

export default function BrandInput(props: BrandInputProps) {
    const { className, wrapperClassName, label, ...rest } = props
    const fieldID = useId()

    return (
        <div className={cn('relative w-full h-fit', wrapperClassName)}>
            <Input
                id={fieldID}
                placeholder=' '
                className={cn(
                    'peer w-full rounded-md border border-white/40  px-4 pt-[22px] pb-[14px] text-white focus:border-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 caret-white selection:bg-blue-600 selection:text-white transition-all duration-200 ',
                    className
                )}
                {...rest}
            />
            <label
                htmlFor={fieldID}
                className={cn(
                    'absolute left-4 top-1/2 -translate-y-1/2 text-base text-white/70 pointer-events-none',
                    'transition-all duration-200 ease-in-out',
                    ' peer-placeholder-shown:text-base ',
                    ' peer-focus:text-xs  peer-focus:top-1 peer-focus:translate-y-0',
                    'peer-[:not(:placeholder-shown)]:top-1  peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs '
                )}
            >
                {label}
            </label>
        </div>
    )
}
