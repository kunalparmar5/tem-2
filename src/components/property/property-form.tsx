import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/lib/supabase";
import { usePropertyById } from "@/hooks/use-supabase-data";
import ImageUpload from "./image-upload";
import VideoUpload from "./video-upload";
import { Property } from "@/types";

const propertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  location: z.string().min(5, "Location must be at least 5 characters"),
  propertyType: z.enum(["apartment", "house", "villa", "land", "commercial"]),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  area: z.coerce.number().positive("Area must be a positive number"),
  amenities: z.array(z.string()).default([]),
  images: z
    .array(z.string())
    .min(1, "At least one image is required")
    .default([]),
  videos: z.array(z.string()).default([]),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  property?: Property; // For editing existing property
}

export default function PropertyForm({ property }: PropertyFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: fetchedProperty, loading: propertyLoading } = id
    ? usePropertyById(id)
    : { data: null, loading: false };

  // Initialize form with existing property data if editing
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      location: "",
      propertyType: "apartment",
      bedrooms: undefined,
      bathrooms: undefined,
      area: undefined,
      amenities: [],
      images: [],
      videos: [],
    },
  });

  // Update form when property data is fetched
  useEffect(() => {
    if (fetchedProperty) {
      form.reset({
        title: fetchedProperty.title,
        description: fetchedProperty.description,
        price: fetchedProperty.price,
        location: fetchedProperty.location,
        propertyType: fetchedProperty.property_type,
        bedrooms: fetchedProperty.bedrooms,
        bathrooms: fetchedProperty.bathrooms,
        area: fetchedProperty.area,
        amenities: fetchedProperty.amenities,
        images: fetchedProperty.images,
        videos: fetchedProperty.videos || [],
      });
    } else if (property) {
      form.reset({
        title: property.title,
        description: property.description,
        price: property.price,
        location: property.location,
        propertyType: property.propertyType,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        amenities: property.amenities,
        images: property.images,
        videos: property.videos || [],
      });
    }
  }, [fetchedProperty, property, form]);

  const onSubmit = async (data: PropertyFormValues) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You must be logged in to list a property.",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create a unique ID for the property if it's a new listing
      const propertyId =
        id ||
        `prop_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      const propertyData = {
        id: propertyId,
        title: data.title,
        description: data.description,
        price: data.price,
        location: data.location,
        property_type: data.propertyType,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: data.area,
        amenities: data.amenities,
        images: data.images,
        videos: data.videos,
        owner_id: user.id || "default_owner",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      try {
        // Always save to localStorage first for immediate access
        let existingProperties = [];
        try {
          existingProperties = JSON.parse(
            localStorage.getItem("properties") || "[]",
          );
          // Validate that it's an array
          if (!Array.isArray(existingProperties)) {
            console.error(
              'localStorage "properties" is not an array, resetting',
            );
            existingProperties = [];
          }
        } catch (e) {
          console.error("Error parsing localStorage properties:", e);
          // Reset if corrupted
          existingProperties = [];
        }

        if (id) {
          // Update existing property in localStorage
          const updatedProperties = existingProperties.map((p) =>
            p.id === id ? propertyData : p,
          );
          localStorage.setItem("properties", JSON.stringify(updatedProperties));
        } else {
          // Add new property to localStorage
          existingProperties.push(propertyData);
          localStorage.setItem(
            "properties",
            JSON.stringify(existingProperties),
          );
        }

        // Log for debugging
        console.log("Saved property to localStorage:", propertyData);

        // Then try to save to Supabase
        let result;
        if (id) {
          // Update existing property
          result = await supabase
            .from("properties")
            .update(propertyData)
            .eq("id", id);
        } else {
          // Create new property
          result = await supabase.from("properties").insert([propertyData]);
        }

        if (result.error) {
          console.warn(
            "Supabase error, using local storage fallback:",
            result.error,
          );
          // Fallback to localStorage if database connection fails
          const existingProperties = JSON.parse(
            localStorage.getItem("properties") || "[]",
          );

          if (id) {
            // Update existing property in localStorage
            const updatedProperties = existingProperties.map((p) =>
              p.id === id ? propertyData : p,
            );
            localStorage.setItem(
              "properties",
              JSON.stringify(updatedProperties),
            );
          } else {
            // Add new property to localStorage
            existingProperties.push(propertyData);
            localStorage.setItem(
              "properties",
              JSON.stringify(existingProperties),
            );
          }
        }
      } catch (error) {
        console.error(
          "Error with database, using local storage fallback:",
          error,
        );
        // Fallback to localStorage if database connection fails
        const existingProperties = JSON.parse(
          localStorage.getItem("properties") || "[]",
        );

        if (id) {
          // Update existing property in localStorage
          const updatedProperties = existingProperties.map((p) =>
            p.id === id ? propertyData : p,
          );
          localStorage.setItem("properties", JSON.stringify(updatedProperties));
        } else {
          // Add new property to localStorage
          existingProperties.push(propertyData);
          localStorage.setItem(
            "properties",
            JSON.stringify(existingProperties),
          );
        }
      }

      toast({
        title: id ? "Property updated" : "Property listed",
        description: id
          ? "Your property has been updated successfully."
          : "Your property has been listed successfully.",
      });

      // Redirect to dashboard after successful submission
      navigate("/dashboard");
    } catch (error) {
      console.error("Property submission error:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description:
          "There was an error saving your property. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const amenitiesList = [
    { id: "parking", label: "Parking" },
    { id: "pool", label: "Swimming Pool" },
    { id: "gym", label: "Gym" },
    { id: "security", label: "Security" },
    { id: "elevator", label: "Elevator" },
    { id: "garden", label: "Garden" },
    { id: "air_conditioning", label: "Air Conditioning" },
    { id: "heating", label: "Heating" },
    { id: "balcony", label: "Balcony" },
    { id: "furnished", label: "Furnished" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <h1 className="mb-8 text-3xl font-bold">
        {property ? "Edit Property" : "List Your Property"}
      </h1>

      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Modern Apartment with City View"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (₹)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g. 250000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Downtown, New York"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area (m²)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 85" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 2"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Leave empty for commercial or land
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 1"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Leave empty for commercial or land
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your property in detail..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Amenities</FormLabel>
                      <FormDescription>
                        Select all amenities that apply to your property
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
                      {amenitiesList.map((amenity) => (
                        <FormField
                          key={amenity.id}
                          control={form.control}
                          name="amenities"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={amenity.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(amenity.id)}
                                    onCheckedChange={(checked) => {
                                      const currentValues = field.value || [];
                                      if (checked) {
                                        field.onChange([
                                          ...currentValues,
                                          amenity.id,
                                        ]);
                                      } else {
                                        field.onChange(
                                          currentValues.filter(
                                            (value) => value !== amenity.id,
                                          ),
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {amenity.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Images</FormLabel>
                    <FormControl>
                      <ImageUpload
                        images={field.value || []}
                        onChange={field.onChange}
                        maxImages={5}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload up to 5 images of your property. The first image
                      will be used as the main image.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="videos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Videos</FormLabel>
                    <FormControl>
                      <VideoUpload
                        videos={field.value || []}
                        onChange={field.onChange}
                        maxVideos={2}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload up to 2 videos of your property to showcase it
                      better.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading
                    ? "Saving..."
                    : property
                      ? "Update Property"
                      : "List Property"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
