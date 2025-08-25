// Mock data for properties when Supabase connection fails
export const mockProperties = [
  {
    id: "1",
    title: "Modern Apartment with City View",
    description:
      "A beautiful modern apartment with stunning city views, perfect for young professionals. This recently renovated unit features hardwood floors, stainless steel appliances, and floor-to-ceiling windows that flood the space with natural light. The open floor plan creates a seamless flow between the living area and kitchen, ideal for entertaining.",
    price: 250000,
    location: "Downtown, New York",
    property_type: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    amenities: ["parking", "gym", "security", "elevator", "air_conditioning"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    ],
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-tour-of-a-wooden-house-with-a-pool-32473-large.mp4",
    ],
    owner_id: "user1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Spacious Family House with Garden",
    description:
      "A spacious family house with a beautiful garden, perfect for families with children. This home features a large backyard with mature trees, a modern kitchen with granite countertops, and a finished basement that can be used as a playroom or home office. Located in a quiet neighborhood with excellent schools nearby.",
    price: 450000,
    location: "Suburbs, Boston",
    property_type: "house",
    bedrooms: 4,
    bathrooms: 2,
    area: 180,
    amenities: ["parking", "garden", "security", "heating", "furnished"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
    ],
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-modern-house-with-pool-32472-large.mp4",
    ],
    owner_id: "user2",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Luxury Villa with Pool",
    description:
      "An exclusive luxury villa with a private pool and stunning views. This magnificent property offers the ultimate in luxury living with high ceilings, marble floors, and floor-to-ceiling windows that showcase panoramic views. The gourmet kitchen features top-of-the-line appliances, and the master suite includes a spa-like bathroom and walk-in closet.",
    price: 950000,
    location: "Beverly Hills, Los Angeles",
    property_type: "villa",
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    amenities: [
      "parking",
      "pool",
      "security",
      "gym",
      "garden",
      "air_conditioning",
      "elevator",
    ],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-tour-of-a-wooden-house-with-a-pool-32473-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-modern-house-with-pool-32472-large.mp4",
    ],
    owner_id: "user3",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
