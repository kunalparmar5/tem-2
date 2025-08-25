export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: "apartment" | "house" | "villa" | "land" | "commercial";
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  amenities: string[];
  images: string[];
  videos?: string[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  userType: "owner" | "seeker";
  phone?: string;
  avatar?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  propertyId: string;
  content: string;
  read: boolean;
  createdAt: string;
}
