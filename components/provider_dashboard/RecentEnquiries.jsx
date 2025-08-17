// components/dashboard/RecentEnquiries.jsx
'use client'

import { Card } from '@/components/ui/card'

export default function RecentEnquiries({ enquiries }) {
  return (
    <Card className="p-4 shadow-lg rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">Recent Enquiries</h2>
      <div className="space-y-2">
        {enquiries.map(e => (
          <div key={e.id} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
            <div>
              <p className="font-medium">{e.name}</p>
              <p className="text-sm text-gray-500">{e.service} • {e.date}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              e.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
              e.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
              'bg-green-100 text-green-600'
            }`}>
              {e.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
