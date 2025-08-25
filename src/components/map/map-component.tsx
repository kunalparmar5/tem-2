import { useEffect, useRef, useState } from "react";
import { Property } from "@/types";
import { useProperties } from "@/hooks/use-supabase-data";
import { Loader2 } from "lucide-react";

interface MapComponentProps {
  properties?: Property[];
  onMarkerClick?: (property: Property) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function MapComponent({
  properties: propProperties,
  onMarkerClick,
  center = { lat: 40.7128, lng: -74.006 }, // Default to New York
  zoom = 12,
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: fetchedProperties, loading } = useProperties();
  const properties = propProperties || fetchedProperties;

  // Load Google Maps script
  useEffect(() => {
    if (window.google) {
      setIsLoading(false);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = () => {
      setIsLoading(false);
    };

    script.onerror = () => {
      console.error("Failed to load Google Maps API");
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      window.initMap = () => {};
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Initialize map
  useEffect(() => {
    if (isLoading || !mapRef.current || !window.google) return;

    try {
      const mapOptions = {
        center,
        zoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      };

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
    }
  }, [isLoading, center, zoom]);

  // Add markers when properties or map changes
  useEffect(() => {
    if (!map || !properties || loading || !window.google) return;

    try {
      // Clear existing markers
      markers.forEach((marker) => marker.setMap(null));

      // Create new markers
      const newMarkers = properties.map((property, index) => {
        // For demo purposes, we'll use geocoded coordinates based on location
        // This is a simple mapping to give different cities different coordinates
        let lat = center.lat;
        let lng = center.lng;

        // Simple location-based coordinates
        if (property.location.includes("New York")) {
          lat = 40.7128;
          lng = -74.006;
        } else if (property.location.includes("Los Angeles")) {
          lat = 34.0522;
          lng = -118.2437;
        } else if (property.location.includes("Chicago")) {
          lat = 41.8781;
          lng = -87.6298;
        } else if (property.location.includes("Boston")) {
          lat = 42.3601;
          lng = -71.0589;
        } else if (property.location.includes("Seattle")) {
          lat = 47.6062;
          lng = -122.3321;
        } else {
          // Add some randomness for other locations
          lat = center.lat + (Math.random() - 0.5) * 0.05;
          lng = center.lng + (Math.random() - 0.5) * 0.05;
        }

        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map,
          title: property.title,
          label: (index + 1).toString(),
        });

        if (onMarkerClick) {
          marker.addListener("click", () => {
            onMarkerClick(property);
          });
        }

        return marker;
      });

      setMarkers(newMarkers);
    } catch (error) {
      console.error("Error creating map markers:", error);
    }
  }, [map, properties, loading, center, onMarkerClick]);

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden bg-gray-100">
      {(isLoading || loading) && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      {!window.google && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">Map failed to load</p>
            <p className="text-sm text-muted-foreground">
              Please check your internet connection
            </p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
}
