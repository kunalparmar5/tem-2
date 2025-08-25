import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Search, X } from "lucide-react";
import { Property } from "@/types";

// Mock data - will be replaced with API calls
const mockSavedProperties: Property[] = [
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

const mockMessages = [
  {
    id: "1",
    propertyId: "1",
    propertyTitle: "Modern Apartment with City View",
    receiverName: "Jane Doe",
    message: "Hi, I'm interested in your apartment. Is it still available?",
    date: "2023-06-15T10:30:00Z",
    read: true,
  },
  {
    id: "2",
    propertyId: "3",
    propertyTitle: "Luxury Villa with Pool",
    receiverName: "Robert Williams",
    message:
      "Hello, I would like to schedule a viewing for this weekend. Is that possible?",
    date: "2023-06-14T15:45:00Z",
    read: false,
  },
];

export default function SeekerDashboard() {
  const [savedProperties, setSavedProperties] =
    useState<Property[]>(mockSavedProperties);
  const [messages] = useState(mockMessages);

  const handleRemoveSaved = (id: string) => {
    // In a real app, this would call an API to remove the saved property
    setSavedProperties(savedProperties.filter((p) => p.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Seeker Dashboard</h1>
        <Link to="/properties">
          <Button className="gap-2">
            <Search className="h-4 w-4" />
            Browse Properties
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="saved" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="saved" className="gap-2">
            <Heart className="h-4 w-4" />
            Saved Properties
          </TabsTrigger>
          <TabsTrigger value="messages" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Messages
            {messages.filter((m) => !m.read).length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {messages.filter((m) => !m.read).length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="saved">
          {savedProperties.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Saved Properties</CardTitle>
                <CardDescription>
                  You haven't saved any properties yet. Browse properties and
                  click the heart icon to save them for later.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/properties">
                  <Button className="gap-2">
                    <Search className="h-4 w-4" />
                    Browse Properties
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedProperties.map((property) => (
                <Card key={property.id}>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">
                      {property.title}
                    </CardTitle>
                    <CardDescription>{property.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold text-lg">
                      ₹{property.price.toLocaleString()}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {property.propertyType}
                      </Badge>
                      {property.bedrooms && (
                        <Badge variant="outline">
                          {property.bedrooms} beds
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link to={`/properties/${property.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                      onClick={() => handleRemoveSaved(property.id)}
                    >
                      <X className="h-4 w-4" />
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="messages">
          {messages.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Messages</CardTitle>
                <CardDescription>
                  You don't have any messages yet. When you contact property
                  owners, your conversations will appear here.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <Card
                  key={message.id}
                  className={message.read ? "" : "border-primary bg-primary/5"}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        Message to {message.receiverName}
                      </CardTitle>
                      <Badge variant="outline">
                        {new Date(message.date).toLocaleDateString()}
                      </Badge>
                    </div>
                    <CardDescription>
                      Regarding: {message.propertyTitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{message.message}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/messages/${message.id}`}>
                      <Button variant="outline" size="sm">
                        View Conversation
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
