'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Resolver, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import BrandInput from '@/components/brand-input';
import { useTranslations } from 'next-intl';
import { LoginBody, LoginBodyType } from '@/utils/validation/auth.validation';

export default function LoginForm() {
  const errorMessageT = useTranslations('errorMessageslogin');
  const loginT = useTranslations('LoginPage');

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody) as Resolver<LoginBodyType>,
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit: SubmitHandler<LoginBodyType> = (data) => {
    toast('Login successful (mock)');
    console.log('Form data:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-opa">
        {/* Tiêu đề và mô tả */}
        <h1 className="text-3xl font-bold text-white text-center mb-2 netflix-sans-bold">{loginT('title')}</h1>
        <p className="text-gray-300 text-center mb-6 netflix-sans-regular">{loginT('description')}</p>

        {/* Email */}
        <FormField
          control={form.control}
          name='email'
          render={({ field, formState }) => (
            <FormItem className='flex-1 w-full text-left h-24'>
              <FormControl className='h-fit'>
                <BrandInput 
                    label={loginT('emailPlaceholder')}
                    className='h-[48px] md:h-[56px] bg-black/50!'
                    {...field} />
              </FormControl>
              <FormMessage>
                {formState.errors.email?.message &&
                  errorMessageT(formState.errors.email.message as 'emailInvalid' | 'emailRequired')}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Password */}
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
                    {...field} />
              </FormControl>
              <FormMessage>
                {formState.errors.password?.message &&
                  errorMessageT(formState.errors.password.message as 'passwordInvalid' | 'passwordRequired')}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button type='submit' className="bg-brand hover:bg-brand/80 text-white netflix-sans-bold h-48px">
          {loginT('signIn')}
        </Button>

        <p className='text-center  focus: underline'><Link href="/forgotPassword" className="text-gray-500">{loginT('forgotPassword')}</Link></p>

        {/* Remember me */}
        <FormField
          control={form.control}
          name='remember'
          render={({ field }) => (
            <FormItem >
              <label className="flex items-center gap-2 netflix-sans-regular">
                <input type='checkbox' checked={field.value} onChange={field.onChange} />
                {loginT('rememberMe')}
              </label>
            </FormItem>
          )}
        />

        

        {/* New to Netflix and Sign up now */}
        <div className="mt-4 netflix-sans-regular">
          <p className="text-gray-300">{loginT('newToNetflix')} <Link href="/register" className="text-brand underline">{loginT('signUpNow')}</Link></p>
        </div>
      </form>
    </Form>
  );
}