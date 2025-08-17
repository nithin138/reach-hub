// components/dashboard/ServicePieChart.jsx
'use client'

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { Card } from '@/components/ui/card'

export default function ServicePieChart({ data }) {
  const colors = ['#3b82f6','#f97316','#22c55e','#8b5cf6','#ef4444']

  return (
    <Card className="p-4 shadow-lg rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">Enquiries by Service</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
