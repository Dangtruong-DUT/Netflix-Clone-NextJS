import z from 'zod'

export const RegisterEmailBody = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' })
    })
    .strict()
export type RegisterEmailBodyType = z.infer<typeof RegisterEmailBody>

export const RegisterBody = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' }),
        password: z.string().min(8, { message: 'passwordMinLength' })
    })
    .strict()

export const PasswordChangeBody = z
    .object({
        current_password: z.string().min(8, { message: 'passwordMinLength' }),
        new_password: z.string().min(8, { message: 'passwordMinLength' }),
        confirm_password: z.string().min(8, { message: 'passwordMinLength' }),
        sign_out_devices: z.boolean()
    })
    .refine((data) => data.new_password === data.confirm_password, {
        message: 'passwordMismatch',
        path: ['confirm_password']
    })
    .strict()

export type PasswordChangeBodyType = z.infer<typeof PasswordChangeBody>
