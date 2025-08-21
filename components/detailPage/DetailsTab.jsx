import { CheckCircle } from "lucide-react";

// Tab Components
export default function DetailsTab({ title, description, features, specifications, type }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {type === 'service' ? "What's Included" : "Features & Benefits"}
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {type === 'service' ? 'Service Details' : 'Product Specifications'}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(specifications).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 mb-1">{key}</span>
              <span className="text-gray-900 font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}