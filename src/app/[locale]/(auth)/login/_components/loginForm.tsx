'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Resolver, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import BrandInput from '@/components/brand-input'
import { useTranslations } from 'next-intl'
import { LoginBody, LoginBodyType } from '@/utils/validation/auth.validation'
import LoginWithGGButton from '@/app/[locale]/(auth)/login/_components/login-with-GG-Button'

export default function LoginForm() {
    const errorMessageT = useTranslations('errorMessages')
    const loginT = useTranslations('LoginPage')

    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody) as Resolver<LoginBodyType>,
        defaultValues: {
            email: '',
            password: '',
            remember: false
        }
    })

    const onSubmit: SubmitHandler<LoginBodyType> = (data) => {
        toast('Login successful (mock)')
        console.log('Form data:', data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 p-6 rounded-lg  opacity-100'>
                <h1 className='text-3xl text-white mb-2 netflix-sans-bold'>{loginT('title')}</h1>

                <FormField
                    control={form.control}
                    name='email'
                    render={({ field, formState }) => (
                        <FormItem className='flex-1 w-full text-left h-24'>
                            <FormControl className='h-fit'>
                                <BrandInput
                                    label={loginT('emailPlaceholder')}
                                    className='h-[48px] md:h-[56px] bg-black/50!'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.email?.message &&
                                    errorMessageT(formState.errors.email.message as 'emailInvalid' | 'emailRequired')}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='password'
                    render={({ field, formState }) => (
                        <FormItem className='flex-1 w-full text-left h-24'>
                            <FormControl className='h-fit'>
                                <BrandInput
                                    type='password'
                                    label={loginT('passwordPlaceholder')}
                                    className='h-[48px] md:h-[56px] bg-black/50!'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.password?.message &&
                                    errorMessageT(
                                        formState.errors.password.message as 'passwordMinLength' | 'passwordRequired'
                                    )}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <Button type='submit' className='bg-brand hover:bg-brand/80 text-white netflix-sans-bold h-48px'>
                    {loginT('signIn')}
                </Button>

                <div className='flex items-center my-6'>
                    <span className='flex-1 border-t border-gray-600'></span>
                    <span className='mx-4 text-gray-400 text-xs md:text-sm netflix-sans-regular'> {loginT('or')} </span>
                    <span className='flex-1 border-t border-gray-600'></span>
                </div>

                <LoginWithGGButton />

                <p>
                    <Link
                        href='/forgotPassword'
                        className=' text-gray-400 netflix-sans-bold no-underline focus: underline-offset-2'
                    >
                        {loginT('forgotPassword')}
                    </Link>
                </p>

                <FormField
                    control={form.control}
                    name='remember'
                    render={({ field }) => (
                        <FormItem>
                            <label className='flex items-center gap-2 netflix-sans-regular'>
                                <input type='checkbox' checked={field.value} onChange={field.onChange} />
                                {loginT('rememberMe')}
                            </label>
                        </FormItem>
                    )}
                />

                <div className='mt-4 netflix-sans-regular'>
                    <p className='text-amber-50'>
                        {loginT('newToNetflix')}{' '}
                        <Link href='/register' className='text-gray-400 netflix-sans-bold font-bold underline'>
                            {loginT('signUpNow')}
                        </Link>
                    </p>
                </div>
            </form>
        </Form>
    )
}
