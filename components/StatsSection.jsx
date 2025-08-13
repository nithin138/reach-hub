export default function StatsSection() {
  const stats = [
    { number: "98%", label: "Customer Satisfaction", gradient: "from-blue-400 to-purple-400" },
    { number: "24/7", label: "Support Available", gradient: "from-emerald-400 to-teal-400" },
    { number: "1M+", label: "Services Completed", gradient: "from-orange-400 to-red-400" },
    { number: "4.9★", label: "Average Rating", gradient: "from-pink-400 to-yellow-400" },
  ];

  return (
    <section className="relative py-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative p-6 rounded-2xl bg-gray-50 border border-gray-200 shadow-md transform transition-transform duration-500 hover:scale-105 hover:-translate-y-1"
            >
              {/* Gradient accent overlay */}
              <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-30 blur-lg transition duration-500`}></div>

              <div className="relative z-10">
                <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
