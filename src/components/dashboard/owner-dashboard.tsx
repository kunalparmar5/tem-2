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
import {
  Home,
  MessageCircle,
  Plus,
  Edit,
  Trash2,
  Database,
} from "lucide-react";
import { Property } from "@/types";
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
    ownerId: "user1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockMessages = [
  {
    id: "1",
    propertyId: "1",
    propertyTitle: "Modern Apartment with City View",
    senderName: "John Smith",
    message: "Hi, I'm interested in your apartment. Is it still available?",
    date: "2023-06-15T10:30:00Z",
    read: false,
  },
  {
    id: "2",
    propertyId: "1",
    propertyTitle: "Modern Apartment with City View",
    senderName: "Sarah Johnson",
    message:
      "Hello, I would like to schedule a viewing for this weekend. Is that possible?",
    date: "2023-06-14T15:45:00Z",
    read: true,
  },
  {
    id: "3",
    propertyId: "2",
    propertyTitle: "Spacious Family House with Garden",
    senderName: "Michael Brown",
    message:
      "Is the price negotiable? I'm very interested but it's slightly above my budget.",
    date: "2023-06-13T09:15:00Z",
    read: true,
  },
];

export default function OwnerDashboard() {
  const [properties] = useState<Property[]>(mockProperties);
  const [messages] = useState(mockMessages);
  const { dbLink } = useProperties();
  const [showDbLink, setShowDbLink] = useState(false);

  const handleDeleteProperty = (id: string) => {
    // In a real app, this would call an API to delete the property
    console.log("Delete property:", id);
  };

  const handleMarkAsRead = (id: string) => {
    // In a real app, this would call an API to mark the message as read
    console.log("Mark message as read:", id);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Owner Dashboard</h1>
          <div className="mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDbLink(!showDbLink)}
              className="text-xs"
            >
              <Database className="mr-1 h-3 w-3" />
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
        <div className="mt-4 md:mt-0">
          <Link to="/list-property">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              List New Property
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="properties" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="properties" className="gap-2">
            <Home className="h-4 w-4" />
            My Properties
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

        <TabsContent value="properties">
          {properties.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Properties Listed</CardTitle>
                <CardDescription>
                  You haven't listed any properties yet. Click the button below
                  to get started.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/list-property">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    List New Property
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
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
                    <Link to={`/edit-property/${property.id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-destructive"
                      onClick={() => handleDeleteProperty(property.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
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
                  You don't have any messages yet. When someone is interested in
                  your property, their messages will appear here.
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
                        Message from {message.senderName}
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
                  <CardFooter className="flex justify-between">
                    <Link to={`/messages/${message.id}`}>
                      <Button variant="outline" size="sm">
                        Reply
                      </Button>
                    </Link>
                    {!message.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(message.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
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
