import z from 'zod'

export const RegisterEmailBody = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' })
    })
    .strict()
export type RegisterBodyType = z.infer<typeof RegisterBody>

export type RegisterEmailBodyType = z.infer<typeof RegisterEmailBody>

export const RegisterBody = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' }),
        password: z.string().min(8, { message: 'passwordMinLength' })
    })
    .strict()

export const LoginBody = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' }),
        password: z
            .string()
            .min(1, { message: 'passwordRequired' })
            .min(8, { message: 'passwordMinLength' })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)+$/, { message: 'passwordInvalid' }),
        remember: z.boolean()
    })
    .strict()

export type LoginBodyType = z.infer<typeof LoginBody>

export const ChangePasswordBody = z
    .object({
        email: z.string(),
        password: z.string().min(8, { message: 'passwordMinLength' }),
        confirmPassword: z.string().min(1, { message: 'passwordRequired' })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'passwordMismatch',
        path: ['confirmPassword']
    })
    .strict()
export type ChangePasswordBodyType = z.infer<typeof ChangePasswordBody>
