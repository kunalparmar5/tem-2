import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Home,
  Check,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { Property } from "@/types";
import { usePropertyById } from "@/hooks/use-supabase-data";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/lib/supabase";

// Mock data - will be replaced with API calls
const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern Apartment with City View",
    description:
      "A beautiful modern apartment with stunning city views, perfect for young professionals. This recently renovated unit features hardwood floors, stainless steel appliances, and floor-to-ceiling windows that flood the space with natural light. The open floor plan creates a seamless flow between the living area and kitchen, ideal for entertaining. The building offers 24/7 security, a fitness center, and is within walking distance to restaurants, shops, and public transportation.",
    price: 250000,
    location: "Downtown, New York",
    propertyType: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    amenities: ["parking", "gym", "security", "elevator", "air conditioning"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    ],
    ownerId: "user1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Other properties...
];

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: property, loading, error } = usePropertyById(id || "");

  // Log data for debugging
  useEffect(() => {
    console.log("Property detail component received data:", property);
    console.log("Property detail error:", error);
  }, [property, error]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  // Reset active image index when property changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [property]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-lg font-medium">
            Loading property details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center px-4 py-8 md:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Property Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <div className="mt-4 space-y-2">
            <Button variant="outline" onClick={() => navigate("/properties")}>
              Browse Properties
            </Button>

            <div className="p-4 bg-muted rounded-md mt-4 text-left text-sm">
              <p className="font-semibold">Debug Information:</p>
              <p>Property ID: {id}</p>
              <p>
                Error:{" "}
                {error
                  ? typeof error === "object"
                    ? JSON.stringify(error)
                    : String(error)
                  : "No error object"}
              </p>
              <p>
                LocalStorage Check:{" "}
                {localStorage.getItem("properties") ? "Data exists" : "No data"}
              </p>
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Enable mock data mode and reload
                    localStorage.setItem("VITE_USE_MOCK_DATA", "true");
                    window.location.reload();
                  }}
                >
                  Use Mock Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSendMessage = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You must be logged in to send messages.",
      });
      setMessageDialogOpen(false);
      navigate("/login");
      return;
    }

    if (!message.trim()) return;

    setSendingMessage(true);

    try {
      const newMessage = {
        sender_id: user.id,
        receiver_id: property.owner_id,
        property_id: property.id,
        content: message,
        read: false,
      };

      const { error } = await supabase.from("messages").insert([newMessage]);

      if (error) throw error;

      toast({
        title: "Message sent",
        description: "Your message has been sent to the property owner.",
      });

      setMessage("");
      setMessageDialogOpen(false);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description:
          "There was an error sending your message. Please try again.",
      });
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{property.title}</h1>
        <div className="mt-2 flex items-center text-muted-foreground">
          <MapPin className="mr-1 h-5 w-5" />
          <span>{property.location}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="mb-6 overflow-hidden rounded-lg border">
            <AspectRatio ratio={16 / 9}>
              <img
                src={property.images[activeImageIndex]}
                alt={property.title}
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>

          {/* Thumbnail Gallery */}
          {property.images.length > 1 && (
            <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${index === activeImageIndex ? "ring-2 ring-primary" : ""}`}
                >
                  <img
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Property Details Tabs */}
          <Tabs defaultValue="description" className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            <TabsContent
              value="description"
              className="mt-4 rounded-lg border p-4"
            >
              <p className="whitespace-pre-line">{property.description}</p>
            </TabsContent>
            <TabsContent value="details" className="mt-4 rounded-lg border p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-muted-foreground" />
                  <span>Type: </span>
                  <span className="font-medium capitalize">
                    {property.propertyType}
                  </span>
                </div>
                {property.bedrooms !== undefined && (
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-muted-foreground" />
                    <span>Bedrooms: </span>
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                )}
                {property.bathrooms !== undefined && (
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-muted-foreground" />
                    <span>Bathrooms: </span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5 text-muted-foreground" />
                  <span>Area: </span>
                  <span className="font-medium">{property.area} m²</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="amenities"
              className="mt-4 rounded-lg border p-4"
            >
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="capitalize">{amenity}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="videos" className="mt-4 rounded-lg border p-4">
              {property.videos && property.videos.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {property.videos.map((video, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                      <video
                        src={video}
                        controls
                        className="w-full"
                        poster={property.images[0]}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No videos available for this property.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          {/* Price and Contact Card */}
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="mb-4">
                <p className="text-3xl font-bold">
                  ₹{property.price.toLocaleString()}
                </p>
                <Badge variant="outline" className="mt-2 capitalize">
                  {property.propertyType}
                </Badge>
              </div>

              <Separator className="my-4" />

              <div className="mb-6 space-y-2">
                <h3 className="font-semibold">Property Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {property.bedrooms !== undefined && (
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5 text-muted-foreground" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                  )}
                  {property.bathrooms !== undefined && (
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5 text-muted-foreground" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Square className="h-5 w-5 text-muted-foreground" />
                    <span>{property.area} m²</span>
                  </div>
                </div>
              </div>

              <Dialog
                open={messageDialogOpen}
                onOpenChange={setMessageDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="w-full gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Contact Owner
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contact Property Owner</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <p className="text-sm text-muted-foreground">
                      Send a message to the property owner to inquire about this
                      listing.
                    </p>
                    <Textarea
                      placeholder="Hi, I'm interested in this property and would like to know more..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setMessageDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || sendingMessage}
                    >
                      {sendingMessage ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
