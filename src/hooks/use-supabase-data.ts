import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";
import { mockProperties } from "@/lib/mock-data";

// Generic hook for fetching data from Supabase
export function useSupabaseData<T>(
  fetchFunction: (...args: any[]) => Promise<{ data: T | null; error: any }>,
  dependencies: any[] = [],
  ...args: any[]
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await fetchFunction(...args);
        if (error) throw error;
        setData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, ...dependencies]);

  return { data, error, loading };
}

// Specific hooks for different data types
export function useProperties(
  filters?: any,
  page: number = 1,
  pageSize: number = 10,
) {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dbLink, setDbLink] = useState<string | null>(
    "https://xyzpdqrstuvw.supabase.co",
  );
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);

      try {
        // Try Supabase first
        console.log("Attempting to fetch properties from Supabase...");

        let query = supabase.from("properties").select("*", { count: "exact" });

        // Apply filters
        if (filters?.location) {
          query = query.ilike("location", `%${filters.location}%`);
        }
        if (filters?.propertyType) {
          query = query.eq("property_type", filters.propertyType);
        }
        if (filters?.priceRange) {
          query = query
            .gte("price", filters.priceRange[0])
            .lte("price", filters.priceRange[1]);
        }
        if (filters?.bedrooms) {
          query = query.gte("bedrooms", filters.bedrooms);
        }
        if (filters?.bathrooms) {
          query = query.gte("bathrooms", filters.bathrooms);
        }
        if (filters?.area && filters.area[0] > 0) {
          query = query.gte("area", filters.area[0]);
        }
        if (filters?.area && filters.area[1] < 1000) {
          query = query.lte("area", filters.area[1]);
        }
        if (filters?.amenities && filters.amenities.length > 0) {
          query = query.contains("amenities", filters.amenities);
        }

        // Apply pagination
        const startIndex = (page - 1) * pageSize;
        query = query.range(startIndex, startIndex + pageSize - 1);

        const { data: supabaseData, error: supabaseError, count } = await query;

        if (supabaseError) {
          throw supabaseError;
        }

        console.log(
          "Successfully fetched properties from Supabase:",
          supabaseData?.length,
        );
        // Transform Supabase data to match frontend interface
        const transformedData =
          supabaseData?.map((property) => ({
            ...property,
            propertyType: property.property_type,
            ownerId: property.owner_id,
            createdAt: property.created_at,
            updatedAt: property.updated_at,
          })) || [];
        setData(transformedData);
        setTotalCount(count || 0);
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to mock data:", err);
        setError(err);

        // Fallback to mock data
        const extendedMockProperties = [
          ...mockProperties,
          {
            id: "4",
            title: "Commercial Space in Business District",
            description:
              "Prime commercial space located in the heart of the business district.",
            price: 750000,
            location: "Financial District, Chicago",
            property_type: "commercial",
            area: 200,
            amenities: ["parking", "security"],
            images: [
              "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
            ],
            owner_id: "user4",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "5",
            title: "Cozy Studio in Historic Building",
            description:
              "A charming studio apartment in a historic building with character.",
            price: 180000,
            location: "Old Town, Philadelphia",
            property_type: "apartment",
            bedrooms: 1,
            bathrooms: 1,
            area: 45,
            amenities: ["security"],
            images: [
              "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
            ],
            owner_id: "user5",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "6",
            title: "Waterfront Property with Dock",
            description:
              "Beautiful waterfront property with private dock and amazing sunset views.",
            price: 850000,
            location: "Lakeside, Seattle",
            property_type: "house",
            bedrooms: 3,
            bathrooms: 2,
            area: 210,
            amenities: ["parking", "security"],
            images: [
              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            ],
            owner_id: "user6",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];

        let filteredProperties = [...extendedMockProperties];

        // Apply filters to mock data
        if (filters) {
          if (filters.location) {
            const locationLower = filters.location.toLowerCase();
            filteredProperties = filteredProperties.filter((p) =>
              p.location.toLowerCase().includes(locationLower),
            );
          }

          if (filters.propertyType) {
            filteredProperties = filteredProperties.filter(
              (p) =>
                p.propertyType === filters.propertyType ||
                p.property_type === filters.propertyType,
            );
          }

          if (filters.priceRange) {
            filteredProperties = filteredProperties.filter(
              (p) =>
                p.price >= filters.priceRange[0] &&
                p.price <= filters.priceRange[1],
            );
          }

          if (filters.bedrooms) {
            filteredProperties = filteredProperties.filter(
              (p) => p.bedrooms >= filters.bedrooms,
            );
          }

          if (filters.bathrooms) {
            filteredProperties = filteredProperties.filter(
              (p) => p.bathrooms >= filters.bathrooms,
            );
          }

          if (filters.area && filters.area[0] > 0) {
            filteredProperties = filteredProperties.filter(
              (p) => p.area >= filters.area[0],
            );
          }

          if (filters.area && filters.area[1] < 1000) {
            filteredProperties = filteredProperties.filter(
              (p) => p.area <= filters.area[1],
            );
          }

          if (filters.amenities && filters.amenities.length > 0) {
            filteredProperties = filteredProperties.filter((p) =>
              filters.amenities.every((amenity: string) =>
                p.amenities.includes(amenity),
              ),
            );
          }
        }

        setTotalCount(filteredProperties.length);

        // Apply pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedProperties = filteredProperties.slice(
          startIndex,
          endIndex,
        );

        setData(paginatedProperties);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters, page, pageSize]);

  return { data, error, loading, dbLink, totalCount, page, pageSize };
}

export function usePropertyById(id: string) {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dbLink, setDbLink] = useState<string | null>(
    "https://xyzpdqrstuvw.supabase.co",
  );

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        console.log(`Fetching property by ID: ${id}`);

        // Try Supabase first
        const { data: supabaseData, error: supabaseError } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

        if (supabaseError) {
          throw supabaseError;
        }

        if (supabaseData) {
          console.log("Found property in Supabase:", supabaseData);
          // Transform Supabase data to match frontend interface
          const transformedProperty = {
            ...supabaseData,
            propertyType: supabaseData.property_type,
            ownerId: supabaseData.owner_id,
            createdAt: supabaseData.created_at,
            updatedAt: supabaseData.updated_at,
          };
          setData(transformedProperty);
          return;
        }
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to mock data:", err);
        setError(err);

        // Fallback to mock data - transform to match frontend interface
        const extendedMockProperties = [
          ...mockProperties.map((property) => ({
            ...property,
            propertyType: property.property_type,
            ownerId: property.owner_id,
            createdAt: property.created_at,
            updatedAt: property.updated_at,
          })),
          {
            id: "4",
            title: "Commercial Space in Business District",
            description:
              "Prime commercial space located in the heart of the business district.",
            price: 750000,
            location: "Financial District, Chicago",
            property_type: "commercial",
            propertyType: "commercial",
            area: 200,
            amenities: ["parking", "security"],
            images: [
              "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
            ],
            owner_id: "user4",
            ownerId: "user4",
            created_at: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "5",
            title: "Cozy Studio in Historic Building",
            description:
              "A charming studio apartment in a historic building with character.",
            price: 180000,
            location: "Old Town, Philadelphia",
            property_type: "apartment",
            propertyType: "apartment",
            bedrooms: 1,
            bathrooms: 1,
            area: 45,
            amenities: ["security"],
            images: [
              "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
            ],
            owner_id: "user5",
            ownerId: "user5",
            created_at: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "6",
            title: "Waterfront Property with Dock",
            description:
              "Beautiful waterfront property with private dock and amazing sunset views.",
            price: 850000,
            location: "Lakeside, Seattle",
            property_type: "house",
            propertyType: "house",
            bedrooms: 3,
            bathrooms: 2,
            area: 210,
            amenities: ["parking", "security"],
            images: [
              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            ],
            owner_id: "user6",
            ownerId: "user6",
            created_at: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];

        // Try to find the property in the extended mock data
        const mockProperty = extendedMockProperties.find((p) => p.id === id);

        if (mockProperty) {
          console.log("Found property in mock data:", mockProperty);
          setData(mockProperty);
        } else {
          // If not found in mock data, try localStorage as fallback
          try {
            const storedData = localStorage.getItem("properties") || "[]";
            const localProperties = JSON.parse(storedData);
            const property = localProperties.find((p: any) => p.id === id);

            if (property) {
              console.log("Found property in localStorage:", property);
              setData(property);
            } else {
              setError(new Error(`Property with ID ${id} not found`));
            }
          } catch (localError) {
            console.error("Error with property lookup:", localError);
            setError(new Error(`Property with ID ${id} not found`));
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return { data, error, loading, dbLink };
}

export function useSavedProperties() {
  const { user } = useAuth();
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dbLink, setDbLink] = useState<string | null>(
    "https://xyzpdqrstuvw.supabase.co",
  );

  useEffect(() => {
    const fetchSavedProperties = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data: supabaseData, error: supabaseError } = await supabase
          .from("saved_properties")
          .select("property_id, properties(*)")
          .eq("user_id", user.id);

        if (supabaseError) throw supabaseError;
        setData(supabaseData);
      } catch (err) {
        console.warn("Error fetching saved properties from Supabase:", err);
        setError(err);
        // For saved properties, we don't have a good mock fallback
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, [user]);

  return { data, error, loading, dbLink };
}

export function useMessages() {
  const { user } = useAuth();
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dbLink, setDbLink] = useState<string | null>(
    "https://xyzpdqrstuvw.supabase.co",
  );

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data: supabaseData, error: supabaseError } = await supabase
          .from("messages")
          .select("*")
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order("created_at", { ascending: false });

        if (supabaseError) throw supabaseError;
        setData(supabaseData);
      } catch (err) {
        console.warn("Error fetching messages from Supabase:", err);
        setError(err);
        // For messages, we don't have a good mock fallback
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user]);

  return { data, error, loading, dbLink };
}

export function useUserProfile() {
  const { user } = useAuth();
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dbLink, setDbLink] = useState<string | null>(
    "https://xyzpdqrstuvw.supabase.co",
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data: supabaseData, error: supabaseError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (supabaseError) throw supabaseError;
        setData(supabaseData);
      } catch (err) {
        console.warn("Error fetching user profile from Supabase:", err);
        setError(err);
        // Use user metadata as fallback
        setData(user.user_metadata || null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  return { data, error, loading, dbLink };
}
