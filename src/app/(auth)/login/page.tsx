import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { LoginForm } from '@/components/forms/login-form';

export const metadata: Metadata = {
  title: 'ورود | پرهام کماند سنتر',
  description: 'ورود به مرکز فرماندهی برند شخصی',
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect('/dashboard');

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4F4F4] p-4">
      <section className="w-full max-w-sm rounded-2xl border border-[#E8E8E8] bg-white p-8 shadow-sm">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-[#111111]">مرکز فرماندهی</h1>
          <p className="mt-1 text-sm text-[#858585]">ورود به حساب کاربری</p>
        </header>
        <LoginForm />
      </section>
    </main>
  );
}