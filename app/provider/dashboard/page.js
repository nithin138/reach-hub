'use client'

import { useMemo } from 'react'
import { FaClock, FaCheckCircle, FaSpinner, FaEnvelope } from 'react-icons/fa'

import KpiCard from '@/components/provider_dashboard/KpiCard'
import EnquiryBarChart from '@/components/provider_dashboard/EnquiryBarChart'
import ServicePieChart from '@/components/provider_dashboard/ServicePieChart'
import FunnelSummary from '@/components/provider_dashboard/FunnelSummary'
import RecentEnquiries from '@/components/provider_dashboard/RecentEnquiries'

const dummyEnquiries = [
  { id: 1, name: 'John Doe', service: 'Website Design', date: '2025-08-15', status: 'Pending' },
  { id: 2, name: 'Jane Smith', service: 'SEO Optimization', date: '2025-08-14', status: 'In Progress' },
  { id: 3, name: 'Michael Lee', service: 'App Development', date: '2025-08-13', status: 'Completed' },
  { id: 4, name: 'Sophia Brown', service: 'Digital Marketing', date: '2025-08-17', status: 'Pending' },
  { id: 5, name: 'David Green', service: 'Content Writing', date: '2025-08-16', status: 'Pending' },
  { id: 6, name: 'Alice White', service: 'Website Design', date: '2025-08-12', status: 'Completed' },
  { id: 7, name: 'Robert Gray', service: 'SEO Optimization', date: '2025-08-10', status: 'In Progress' },
  { id: 8, name: 'Emily Black', service: 'App Development', date: '2025-08-09', status: 'Pending' },
]

// Last 30 days helper
const getLast30Days = () => {
  const days = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().split('T')[0])
  }
  return days
}

export default function DashboardPage() {
  const last30Days = useMemo(() => getLast30Days(), [])

  const barData = last30Days.map(date => {
    const enquiriesOnDay = dummyEnquiries.filter(e => e.date === date)
    return {
      date: date.slice(5),
      Pending: enquiriesOnDay.filter(e => e.status === 'Pending').length,
      Completed: enquiriesOnDay.filter(e => e.status === 'Completed').length,
      'In Progress': enquiriesOnDay.filter(e => e.status === 'In Progress').length,
    }
  })

  const serviceCounts = dummyEnquiries.reduce((acc, e) => {
    acc[e.service] = (acc[e.service] || 0) + 1
    return acc
  }, {})
  const pieData = Object.entries(serviceCounts).map(([name, value]) => ({ name, value }))

  const funnelData = [
    { name: 'Total', value: dummyEnquiries.length },
    { name: 'Pending', value: dummyEnquiries.filter(e => e.status === 'Pending').length },
    { name: 'In Progress', value: dummyEnquiries.filter(e => e.status === 'In Progress').length },
    { name: 'Completed', value: dummyEnquiries.filter(e => e.status === 'Completed').length },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard icon={<FaEnvelope className="text-blue-500 text-3xl"/>} title="Total Enquiries" value={funnelData[0].value} />
        <KpiCard icon={<FaClock className="text-orange-500 text-3xl"/>} title="Pending" value={funnelData[1].value} />
        <KpiCard icon={<FaSpinner className="text-blue-400 text-3xl"/>} title="In Progress" value={funnelData[2].value} />
        <KpiCard icon={<FaCheckCircle className="text-green-500 text-3xl"/>} title="Completed" value={funnelData[3].value} />
      </div>

      <EnquiryBarChart data={barData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ServicePieChart data={pieData} />
              <RecentEnquiries enquiries={dummyEnquiries.slice(0,5)} />

        {/* <FunnelSummary data={funnelData} /> */}
      </div>

      {/* <RecentEnquiries enquiries={dummyEnquiries.slice(0,5)} /> */}
    </div>
  )
}
