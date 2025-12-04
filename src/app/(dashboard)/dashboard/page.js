export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Statistik Cards */}
      {[
        { title: 'Total Karyawan', value: '124', color: 'bg-blue-500' },
        { title: 'Hadir Hari Ini', value: '118', color: 'bg-green-500' },
        { title: 'Izin / Sakit', value: '6', color: 'bg-orange-500' },
      ].map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
          <p className={`text-3xl font-bold mt-2 ${stat.color.replace('bg-', 'text-')}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}