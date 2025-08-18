import ItemCard from "@/components/provider_dashboard/ItemCard"

export default function ProductsPage() {
  // Dummy data – later you’ll fetch from DB / API
const products = [
  {
    id: 1,
    name: "Premium Red Wine",
    description: "A smooth red wine with rich flavor and aroma.",
    images: ["/dummy.jpg"],
    price: 1200,
    status: "Active",
    productDetails: {
      origin: "France",
      year: 2020,
      volume: "750ml",
    },
  },
  {
    id: 2,
    name: "Classic White Wine",
    description: "Crisp and refreshing white wine, best served chilled.",
    images: ["/dummy.jpg"],
    price: 950,
    status: "Inactive",
    productDetails: {
      origin: "Italy",
      year: 2019,
      volume: "750ml",
    },
  },
  {
    id: 3,
    name: "Craft Beer Pack",
    description: "6-pack of locally brewed craft beer with bold flavors.",
    images: ["/dummy.jpg"],
    price: 650,
    status: "Active",
    productDetails: {
      brewery: "Local Brews",
      style: "IPA",
      volume: "6 x 330ml",
    },
  },
  {
    id: 4,
    name: "Sparkling Champagne",
    description: "Celebrate in style with this premium champagne.",
    images: ["/dummy.jpg"],
    price: 3200,
    status: "Active",
    productDetails: {
      origin: "France",
      year: 2021,
      volume: "750ml",
    },
  },
  {
    id: 5,
    name: "Whiskey Reserve",
    description: "Aged 12 years, this whiskey offers deep, oaky flavors.",
    images: ["/dummy.jpg"],
    price: 2500,
    status: "Inactive",
    productDetails: {
      origin: "Scotland",
      age: "12 years",
      volume: "700ml",
    },
  },
  {
    id: 6,
    name: "Vodka Classic",
    description: "Smooth and clean vodka, perfect for cocktails.",
    images: ["/dummy.jpg"],
    price: 1100,
    status: "Active",
    productDetails: {
      origin: "Russia",
      volume: "750ml",
      purity: "Triple Distilled",
    },
  },
]


  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ItemCard
            key={product.id}
            name={product.name}
            description={product.description}
            images={product.images}
            price={product.price}
            status={product.status}
            productDetails={product.productDetails}
          />
        ))}
      </div>
    </main>
  )
}
