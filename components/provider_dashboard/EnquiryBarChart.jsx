'use client'

import { useState, useMemo } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { Card } from '@/components/ui/card'

export default function EnquiryBarChart({ data }) {
  const [statusFilter, setStatusFilter] = useState('All')
  const statuses = ['All', 'Pending', 'In Progress', 'Completed', 'Rejected']

  const statusColors = {
    All: '#3b82f6',          // Blue
    Pending: '#facc15',      // Yellow
    'In Progress': '#f59e0b',// Orange/Yellow
    Completed: '#22c55e',    // Green
    Rejected: '#ef4444'      // Red
  }

  const chartData = useMemo(() => {
    return data.map(day => ({
      date: day.date,
      Total: (day.Pending || 0) + (day['In Progress'] || 0) + (day.Completed || 0) + (day.Rejected || 0),
      Pending: day.Pending || 0,
      'In Progress': day['In Progress'] || 0,
      Completed: day.Completed || 0,
      Rejected: day.Rejected || 0,
    }))
  }, [data])

  return (
    <Card className="p-4 shadow-lg rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">Enquiries in Last 30 Days</h2>

      {/* Status Switch */}
      <div className="flex gap-2 mb-4">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
              ${statusFilter === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          {statusFilter === 'All' ? (
            <Bar
              dataKey="Total"
              fill={statusColors.All}
              isAnimationActive={true}
              animationDuration={500}
            />
          ) : (
            <Bar
              dataKey={statusFilter}
              fill={statusColors[statusFilter]}
              isAnimationActive={true}
              animationDuration={500}
            />
          )}
        </BarChart>
      </ResponsiveContainer>

      {/* Always visible color index / legend */}
      <div className="flex flex-wrap gap-4 mt-4">
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-sm font-medium">{status}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
