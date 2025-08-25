import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Home, IndianRupee, Bed, Bath, Square } from "lucide-react";

interface PropertyFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function PropertyFilters({
  onFilterChange,
}: PropertyFiltersProps) {
  // Track active filters
  const [filters, setFilters] = useState<{ [key: string]: any }>({});
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [area, setArea] = useState([0, 1000]);
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setAmenities([...amenities, amenity]);
    } else {
      setAmenities(amenities.filter((a) => a !== amenity));
    }
  };

  // Apply filters automatically when any filter changes
  useEffect(() => {
    const newFilters: { [key: string]: any } = {};

    if (location) newFilters.location = location;
    if (propertyType) newFilters.propertyType = propertyType;
    if (priceRange[0] > 0 || priceRange[1] < 1000000)
      newFilters.priceRange = priceRange;
    if (bedrooms) newFilters.bedrooms = parseInt(bedrooms);
    if (bathrooms) newFilters.bathrooms = parseInt(bathrooms);
    if (area[0] > 0 || area[1] < 1000) newFilters.area = area;
    if (amenities.length > 0) newFilters.amenities = amenities;

    setFilters(newFilters);

    const debounceTimeout = setTimeout(() => {
      onFilterChange({
        location,
        propertyType,
        priceRange,
        bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
        bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
        area,
        amenities,
      });
    }, 500); // 500ms debounce

    return () => clearTimeout(debounceTimeout);
  }, [
    location,
    propertyType,
    priceRange,
    bedrooms,
    bathrooms,
    area,
    amenities,
    onFilterChange,
  ]);

  const handleApplyFilters = () => {
    onFilterChange({
      location,
      propertyType,
      priceRange,
      bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
      bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
      area,
      amenities,
    });
  };

  const handleResetFilters = () => {
    setLocation("");
    setPropertyType("");
    setPriceRange([0, 1000000]);
    setBedrooms("");
    setBathrooms("");
    setArea([0, 1000]);
    setAmenities([]);
    onFilterChange({});
  };

  return (
    <div className="space-y-6 rounded-lg border bg-card p-6 shadow-sm sticky top-4">
      <div className="space-y-2">
        <h3 className="font-medium flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filters
          <Badge variant="outline" className="ml-2">
            {Object.keys(filters).length > 0 ? "Active" : "None"}
          </Badge>
        </h3>
        <p className="text-sm text-muted-foreground">
          Narrow down your property search
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-1">
            <MapPin className="h-4 w-4" /> Location
            <Badge variant="outline" className="ml-1 text-xs">
              Popular Search
            </Badge>
          </Label>
          <div className="relative">
            <Input
              id="location"
              placeholder="City, neighborhood, or address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </div>
          {location && (
            <div className="text-xs text-primary">
              Searching for properties in:{" "}
              <span className="font-semibold">{location}</span>
            </div>
          )}
          <div className="mt-1 flex flex-wrap gap-1">
            {[
              "New York",
              "Boston",
              "Los Angeles",
              "Chicago",
              "Seattle",
              "Philadelphia",
            ].map((city) => (
              <Badge
                key={city}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setLocation(city)}
              >
                {city}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="property-type" className="flex items-center gap-1">
            <Home className="h-4 w-4" /> Property Type
          </Label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger id="property-type">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-1">
              <IndianRupee className="h-4 w-4" /> Price Range
            </Label>
            <span className="text-sm text-muted-foreground">
              ₹{priceRange[0].toLocaleString()} - ₹
              {priceRange[1].toLocaleString()}
            </span>
          </div>
          <Slider
            defaultValue={[0, 1000000]}
            max={1000000}
            step={10000}
            value={priceRange}
            onValueChange={setPriceRange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bedrooms" className="flex items-center gap-1">
            <Bed className="h-4 w-4" /> Bedrooms
          </Label>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger id="bedrooms">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms" className="flex items-center gap-1">
            <Bath className="h-4 w-4" /> Bathrooms
          </Label>
          <Select value={bathrooms} onValueChange={setBathrooms}>
            <SelectTrigger id="bathrooms">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-1">
              <Square className="h-4 w-4" /> Area (m²)
            </Label>
            <span className="text-sm text-muted-foreground">
              {area[0]} - {area[1]} m²
            </span>
          </div>
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            step={10}
            value={area}
            onValueChange={setArea}
          />
        </div>

        <div className="space-y-2">
          <Label>Amenities</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="parking"
                checked={amenities.includes("parking")}
                onCheckedChange={(checked) =>
                  handleAmenityChange("parking", checked as boolean)
                }
              />
              <label htmlFor="parking" className="text-sm">
                Parking
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pool"
                checked={amenities.includes("pool")}
                onCheckedChange={(checked) =>
                  handleAmenityChange("pool", checked as boolean)
                }
              />
              <label htmlFor="pool" className="text-sm">
                Pool
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="gym"
                checked={amenities.includes("gym")}
                onCheckedChange={(checked) =>
                  handleAmenityChange("gym", checked as boolean)
                }
              />
              <label htmlFor="gym" className="text-sm">
                Gym
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="security"
                checked={amenities.includes("security")}
                onCheckedChange={(checked) =>
                  handleAmenityChange("security", checked as boolean)
                }
              />
              <label htmlFor="security" className="text-sm">
                Security
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          onClick={handleApplyFilters}
          className="bg-primary hover:bg-primary/90"
        >
          Apply Filters
        </Button>
        <Button variant="outline" onClick={handleResetFilters}>
          Reset All Filters
        </Button>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Filters apply automatically as you select them
        </div>
      </div>
    </div>
  );
}
