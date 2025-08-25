import { useState, useEffect } from "react";
import PropertyCard from "./property-card";
import PropertyFilters from "./property-filters";
import { Property } from "@/types";
import { useProperties } from "@/hooks/use-supabase-data";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PropertyGrid() {
  const [filters, setFilters] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const { data, loading, error, dbLink, totalCount } = useProperties(
    filters,
    currentPage,
    pageSize,
  );
  const [properties, setProperties] = useState<Property[]>([]);
  const [showDbLink, setShowDbLink] = useState(false);
  const totalPages = Math.ceil((totalCount || 0) / pageSize);

  // Update properties when data changes
  useEffect(() => {
    console.log("PropertyGrid received data:", data);
    if (data && data.length > 0) {
      console.log("Setting properties from API data:", data);
      setProperties(data);
    } else if (data !== null) {
      // If data is explicitly empty array, show empty state
      console.log("No properties found from API");
      setProperties([]);
    }
    // If data is null (still loading), keep current state
  }, [data]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    // The useProperties hook will handle the filtering
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Find Your Perfect Property</h1>
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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <PropertyFilters onFilterChange={handleFilterChange} />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-lg font-medium">Loading properties...</p>
              <p className="mt-2 text-sm text-muted-foreground">
                This may take a moment
              </p>
            </div>
          ) : properties.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                No properties found matching your criteria. Try adjusting your
                filters.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center px-4">
                    <span className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
