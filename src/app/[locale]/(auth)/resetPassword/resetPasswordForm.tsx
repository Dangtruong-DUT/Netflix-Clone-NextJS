'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Resolver, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import BrandInput from '@/components/brand-input'
import { useTranslations } from 'next-intl'
import { ChangePasswordBody, ChangePasswordBodyType } from '@/utils/validation/auth.validation'
import Lock from '@/components/icons/lock'

export default function ResetPasswordForm() {
    const errorMessageT = useTranslations('errorMessages')
    const resetPasswordT = useTranslations('ResetPasswordPage')

    const form = useForm<ChangePasswordBodyType>({
        resolver: zodResolver(ChangePasswordBody) as Resolver<ChangePasswordBodyType>,
        defaultValues: {
            email: 'ray8120@gmail.com'
        }
    })

    const onSubmit: SubmitHandler<ChangePasswordBodyType> = (data) => {
        toast('Thay đổi mật khẩu thành công (mock)')
        console.log('Form data:', data)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-4 p-4 sm:p-6 md:p-8 rounded-lg bg-white/20'
            >
                <h1 className='text-2xl sm:text-3xl text-white font-semibold mb-4 text-center netflix-sans-bold'>
                    {resetPasswordT('title')}
                </h1>

                <p className='text-gray-400 text-sm sm:text-base text-left mb-6 netflix-sans-regular'>
                    {resetPasswordT('description')}
                </p>

                <FormField
                    control={form.control}
                    name='email'
                    render={({ field, formState }) => (
                        <FormItem className='w-full'>
                            <FormControl className='h-fit'>
                                <BrandInput
                                    label={'Email'}
                                    value={resetPasswordT('emailLabel', { email: form.getValues('email') })}
                                    className='w-full h-10 sm:h-12 md:h-14 bg-black/50 text-white placeholder-gray-400'
                                    disabled
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='password'
                    render={({ field, formState }) => (
                        <FormItem className='w-full'>
                            <FormControl className='h-fit'>
                                <BrandInput
                                    type='password'
                                    label={resetPasswordT('passwordLabel')}
                                    className='w-full h-10 sm:h-12 md:h-14 bg-black/50 text-white placeholder-gray-400'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-red-500 text-xs sm:text-sm mt-1'>
                                {formState.errors.password?.message &&
                                    errorMessageT(
                                        formState.errors.password.message as
                                            | 'passwordMinLength'
                                            | 'passwordRequired'
                                            | 'passwordInvalid'
                                    )}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field, formState }) => (
                        <FormItem className='w-full'>
                            <FormControl className='h-fit'>
                                <BrandInput
                                    type='password'
                                    label={resetPasswordT('confirmPasswordLabel')}
                                    className='w-full h-10 sm:h-12 md:h-14 bg-black/50 text-white placeholder-gray-400'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-red-500 text-xs sm:text-sm mt-1'>
                                {formState.errors.confirmPassword?.message && errorMessageT('passwordMismatch')}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <Button
                    type='submit'
                    className='bg-white hover:bg-neutral-100 text-black font-semibold netflix-sans-bold h-[40px] w-full px-4 sm:px-6 md:px-8 py-2 transition-colors duration-200 cursor-pointer'
                >
                    {resetPasswordT('save')}
                </Button>
                <Button
                    type='button'
                    className='bg-black hover:bg-black hover:text-white text-white font-semibold netflix-sans-bold h-[40px] w-full px-4 sm:px-6 md:px-8 py-2 duration-200 cursor-pointer'
                >
                    {resetPasswordT('cancel')}
                </Button>
            </form>
        </Form>
    )
}
