import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

const nav = [
  { href: '/dashboard', label: 'داشبورد' },
  { href: '/brand', label: 'مدیریت برند' },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  return (
    <div className="min-h-screen bg-[#F4F4F4]" dir="rtl">
      <aside className="fixed inset-y-0 right-0 w-64 border-l border-[#E8E8E8] bg-white p-4">
        <h2 className="text-lg font-semibold text-[#111111]">پرهام</h2>
        <nav className="mt-6 space-y-1 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-[#111111] hover:bg-[#F4F4F4]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="mr-64 p-6">{children}</main>
    </div>
  );
}