'use client';

import { useActionState } from 'react';
import { loginAction, type LoginState } from '@/app/(auth)/login/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    loginAction,
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">ایمیل</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          dir="ltr"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">رمز عبور</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          dir="ltr"
        />
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'در حال ورود...' : 'ورود'}
      </Button>
    </form>
  );
}