'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('ایمیل معتبر نیست'),
  password: z.string().min(6, 'رمز عبور حداقل ۶ کاراکتر است'),
});

export type LoginState = { error?: string } | undefined;

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'اطلاعات نامعتبر' };
  }

  try {
    await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'ایمیل یا رمز عبور اشتباه است' };
    }
    throw error;
  }
}