import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const {
    id,
    title,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    propertyType,
    images,
  } = property;

  return (
    <Link to={`/properties/${id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <AspectRatio ratio={16 / 9}>
          <img
            src={
              images[0] ||
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
            }
            alt={title}
            className="h-full w-full object-cover"
          />
        </AspectRatio>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="outline" className="capitalize">
              {propertyType}
            </Badge>
            <p className="font-bold text-lg">₹{price.toLocaleString()}</p>
          </div>
          <h3 className="mb-1 line-clamp-1 text-lg font-semibold">{title}</h3>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            <p className="line-clamp-1 text-sm">{location}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          {bedrooms !== undefined && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span className="text-sm">{bedrooms}</span>
            </div>
          )}
          {bathrooms !== undefined && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span className="text-sm">{bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span className="text-sm">{area} m²</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
