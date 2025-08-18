import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import Image from "next/image"

export default function ItemCard({
  name,
  description,
  images = [],
  price,
  status,
}) {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
      {/* Image Section */}
      {images.length > 0 && (
        <div className="relative w-full h-48">
          <Image
            src={images[0]}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content Section */}
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{name}</h2>
            <p className="text-sm text-gray-500">₹{price}</p>
          </div>

          {/* Dropdown Menu for actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

        <Badge variant={status === "Active" ? "default" : "destructive"}>
          {status}
        </Badge>
      </CardContent>
    </Card>
  )
}
