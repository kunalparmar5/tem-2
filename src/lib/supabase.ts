import { createClient } from "@supabase/supabase-js";

// Use a public demo Supabase instance for this project
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://xyzpdqrstuvw.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5enBkcXJzdHV2dyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjk5OTk5OTk5LCJleHAiOjIwMTQ3NDgzOTl9.EXAMPLE_KEY_REPLACE_WITH_ACTUAL";
const enableQueryLogging = true;

// Create Supabase client with debug option
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: (...args) => {
      // Log queries if enabled
      if (enableQueryLogging) {
        console.log("Supabase Query:", args[0]);
      }
      return fetch(...args);
    },
  },
});

// Verify connection on init
supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
    console.log("Supabase connection verified, user signed in");
  } else if (event === "SIGNED_OUT") {
    console.log("User signed out");
  }
});

// Enable backend integration by default
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === "true";

if (useMockData) {
  console.log("Mock data mode enabled - Supabase will be used as fallback");
} else {
  console.log(
    "Backend integration enabled - Using Supabase as primary data source",
  );
}

// Ensure database tables exist and seed with initial data if needed
const ensureDatabaseSetup = async () => {
  try {
    // Check if properties table exists and has data
    const { count, error } = await supabase
      .from("properties")
      .select("count", { count: "exact", head: true });
    if (error) {
      console.error("Supabase connection error:", error);
      // Initialize localStorage with mock data as fallback
      initializeLocalStorage();
    } else {
      console.log(
        `Supabase connection successful. Properties table has ${count} records.`,
      );

      // If no records in database, initialize localStorage
      if (count === 0) {
        console.log("No properties in database, initializing localStorage");
        initializeLocalStorage();
      }
    }

    // If no properties exist in the database, seed with initial data
    if (!error && count === 0) {
      console.log("No properties in database, seeding initial data...");
      await seedInitialData();
    }
  } catch (err) {
    console.error("Error setting up database:", err);
    initializeLocalStorage();
  }
};

// Run database setup
ensureDatabaseSetup();

// Function to seed database with initial property data
async function seedInitialData() {
  const initialProperties = [
    {
      id: "1",
      title: "Modern Apartment with City View",
      description: "A beautiful modern apartment with stunning city views.",
      price: 250000,
      location: "Downtown, New York",
      property_type: "apartment",
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      amenities: ["parking", "gym", "security"],
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      ],
      owner_id: "user1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Spacious Family House with Garden",
      description: "A spacious family house with a beautiful garden.",
      price: 450000,
      location: "Suburbs, Boston",
      property_type: "house",
      bedrooms: 4,
      bathrooms: 2,
      area: 180,
      amenities: ["parking", "garden", "security"],
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      ],
      owner_id: "user2",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const { error } = await supabase.from("properties").insert(initialProperties);
  if (error) {
    console.error("Error seeding database:", error);
  } else {
    console.log("Successfully seeded database with initial properties");
  }
}

// Function to initialize localStorage with mock data
function initializeLocalStorage() {
  try {
    // Check if localStorage already has properties
    const existing = localStorage.getItem("properties");
    if (!existing || existing === "[]") {
      // Add mock data to localStorage
      const mockProperties = [
        {
          id: "1",
          title: "Modern Apartment with City View",
          description: "A beautiful modern apartment with stunning city views.",
          price: 250000,
          location: "Downtown, New York",
          property_type: "apartment",
          bedrooms: 2,
          bathrooms: 1,
          area: 85,
          amenities: ["parking", "gym", "security"],
          images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
          ],
          owner_id: "user1",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Spacious Family House with Garden",
          description: "A spacious family house with a beautiful garden.",
          price: 450000,
          location: "Suburbs, Boston",
          property_type: "house",
          bedrooms: 4,
          bathrooms: 2,
          area: 180,
          amenities: ["parking", "garden", "security"],
          images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
          ],
          owner_id: "user2",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      localStorage.setItem("properties", JSON.stringify(mockProperties));
      console.log("Initialized localStorage with mock properties");
    }
  } catch (e) {
    console.error("Error initializing localStorage:", e);
  }
}
