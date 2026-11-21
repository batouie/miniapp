import type { Metadata } from 'next';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'داشبورد',
  description: 'نمای کلی مرکز فرماندهی برند شخصی',
};

export default async function DashboardPage() {
  const session = await auth();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-[#111111]">
          خوش آمدید، {session?.user?.name ?? 'کاربر'}
        </h1>
        <p className="mt-1 text-sm text-[#858585]">
          نمای کلی فعالیت‌های برند شخصی شما
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="مشتریان" value="۰" />
        <StatCard title="پروژه‌های فعال" value="۰" />
        <StatCard title="درآمد ماه" value="۰" />
        <StatCard title="محتوای منتشرشده" value="۰" />
      </div>

      <div className="rounded-2xl border border-[#E8E8E8] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#111111]">فعالیت‌های اخیر</h2>
        <p className="mt-2 text-sm text-[#858585]">
          به‌زودی فعالیت‌های اخیر شما اینجا نمایش داده می‌شود.
        </p>
      </div>
    </section>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E8E8E8] bg-white p-4">
      <p className="text-sm text-[#858585]">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-[#111111]">{value}</p>
    </div>
  );
}