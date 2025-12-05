import Link from "next/link";
import { logout } from "@/actions/auth";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Karyawan", href: "/dashboard/employees" },
    { name: "Kehadiran", href: "/dashboard/attendance" },
    { name: "Pengaturan", href: "/dashboard/settings" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-wider text-blue-500">
          HRIS<span className="text-white">Pro</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        {/* GUNAKAN FORM UNTUK SERVER ACTION */}
        <form action={logout}>
          <button
            type="submit"
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-slate-800 rounded-lg transition"
          >
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
