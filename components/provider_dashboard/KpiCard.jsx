// components/dashboard/KpiCard.jsx
'use client'

export default function KpiCard({ icon, title, value }) {
  return (
    <div className="shadow-lg rounded-2xl p-4 flex items-center gap-4 bg-white">
      {icon}
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  )
}
