import z from 'zod'

export const RegisterEmailBody = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' })
    })
    .strict()
<<<<<<< HEAD
export type RegisterBodyType = z.infer<typeof RegisterBody>

export const LoginBody = z
  .object({
    email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' }),
    password: z
      .string()
      .min(1, { message: 'passwordRequired' })
      .min(8, { message: 'passwordInvalid' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)/, { message: 'passwordInvalid' }),
    remember: z.boolean(),
  })
  .strict();

export type LoginBodyType = z.infer<typeof LoginBody>;
=======
export type RegisterEmailBodyType = z.infer<typeof RegisterEmailBody>

export const RegisterBody = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' }),
        password: z.string().min(8, { message: 'passwordMinLength' })
    })
    .strict()
>>>>>>> 51a49f0ae8767a03a0e226ee3bddfe42ab917ebd
