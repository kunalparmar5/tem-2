import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";
import MapComponent from "./map-component";
import { useProperties } from "@/hooks/use-supabase-data";

// Mock data - will be replaced with API calls
const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern Apartment with City View",
    description: "A beautiful modern apartment with stunning city views.",
    price: 250000,
    location: "Downtown, New York",
    propertyType: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    amenities: ["parking", "gym", "security"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    ],
    ownerId: "user1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Spacious Family House with Garden",
    description: "A spacious family house with a beautiful garden.",
    price: 450000,
    location: "Suburbs, Boston",
    propertyType: "house",
    bedrooms: 4,
    bathrooms: 2,
    area: 180,
    amenities: ["parking", "garden", "security"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    ],
    ownerId: "user2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Luxury Villa with Pool",
    description:
      "An exclusive luxury villa with a private pool and stunning views.",
    price: 950000,
    location: "Beverly Hills, Los Angeles",
    propertyType: "villa",
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    amenities: ["parking", "pool", "security", "gym"],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    ],
    ownerId: "user3",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function PropertyMap() {
  const { data, loading, dbLink } = useProperties();
  const [properties] = useState<Property[]>(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [showDbLink, setShowDbLink] = useState(false);

  // Use fetched properties if available, otherwise use mock data
  const displayProperties = data || properties;

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    // You could also navigate to the property detail page
    // navigate(`/properties/${property.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Property Map</h1>
        <div className="mt-4 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDbLink(!showDbLink)}
            className="text-xs"
          >
            {showDbLink ? "Hide Database Link" : "Show Database Link"}
          </Button>
          {showDbLink && dbLink && (
            <div className="mt-2 rounded-md bg-muted p-2 text-xs">
              <p>
                Database URL:{" "}
                <a
                  href={dbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  {dbLink}
                </a>
              </p>
              <p className="mt-1 text-muted-foreground">
                Note: Properties are also stored in localStorage as a fallback
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-[600px] overflow-hidden">
            <CardContent className="p-0">
              <MapComponent
                properties={displayProperties}
                onMarkerClick={handlePropertyClick}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Properties on Map</h2>

          {displayProperties.map((property, index) => (
            <Card
              key={property.id}
              className={`overflow-hidden cursor-pointer ${selectedProperty?.id === property.id ? "border-primary" : ""}`}
              onClick={() => handlePropertyClick(property)}
            >
              <div className="flex">
                <div className="h-24 w-24 flex-shrink-0">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary text-center text-xs text-white">
                      {index + 1}
                    </div>
                    <h3 className="line-clamp-1 font-medium">
                      {property.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {property.location}
                  </p>
                  <p className="mt-1 font-semibold">
                    ₹{property.price.toLocaleString()}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
