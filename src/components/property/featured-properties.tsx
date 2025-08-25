import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Building,
  Palmtree,
} from "lucide-react";
import PropertyCard from "./property-card";
import { Property } from "@/types";

interface FeaturedPropertiesProps {
  properties?: Property[];
  title?: string;
  description?: string;
}

export default function FeaturedProperties({
  properties = [
    {
      id: "1",
      title: "Modern Apartment with City View",
      description:
        "A beautiful modern apartment with stunning city views, perfect for young professionals.",
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
      description:
        "A spacious family house with a beautiful garden, perfect for families with children.",
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
    {
      id: "4",
      title: "Cozy Studio in City Center",
      description:
        "A cozy studio apartment in the heart of the city, perfect for singles or couples.",
      price: 180000,
      location: "Midtown, Chicago",
      propertyType: "apartment",
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      amenities: ["security", "elevator", "air_conditioning"],
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      ],
      ownerId: "user4",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "5",
      title: "Beachfront Property with Ocean View",
      description:
        "A stunning beachfront property with panoramic ocean views and direct beach access.",
      price: 750000,
      location: "Miami Beach, Florida",
      propertyType: "villa",
      bedrooms: 3,
      bathrooms: 3,
      area: 220,
      amenities: ["parking", "pool", "security", "garden"],
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      ],
      ownerId: "user5",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "6",
      title: "Modern Office Space",
      description:
        "A modern office space in a prime business district, ideal for startups and small businesses.",
      price: 350000,
      location: "Financial District, San Francisco",
      propertyType: "commercial",
      area: 120,
      amenities: ["parking", "security", "elevator", "air_conditioning"],
      images: [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      ],
      ownerId: "user6",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  title = "Featured Properties",
  description = "Discover our handpicked selection of premium properties available without broker fees",
}: FeaturedPropertiesProps) {
  const [activeTab, setActiveTab] = useState("all");

  // Filter properties based on active tab
  const filteredProperties =
    activeTab === "all"
      ? properties
      : properties.filter((property) => property.propertyType === activeTab);

  return (
    <section className="w-full py-12 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground max-w-[700px]">{description}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-8 flex justify-start overflow-auto">
            <TabsTrigger value="all" className="flex items-center gap-2">
              All Properties
            </TabsTrigger>
            <TabsTrigger value="apartment" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Apartments
            </TabsTrigger>
            <TabsTrigger value="house" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Houses
            </TabsTrigger>
            <TabsTrigger value="villa" className="flex items-center gap-2">
              <Palmtree className="h-4 w-4" />
              Villas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="apartment" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="house" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="villa" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" className="rounded-full">
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
}
