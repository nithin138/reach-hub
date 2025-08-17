// components/dashboard/FunnelSummary.jsx
'use client'

import { Card } from '@/components/ui/card'

export default function FunnelSummary({ data }) {
  return (
    <Card className="p-4 shadow-lg rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">Status Funnel</h2>
      <div className="space-y-3">
        {data.map(f => (
          <div key={f.name} className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
            <span className="font-medium">{f.name}</span>
            <span className="text-lg font-bold">{f.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
