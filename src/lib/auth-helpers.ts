import { supabase } from "./supabase";
import { mockProperties } from "./mock-data";

// Mock user data for when Supabase connection fails
const mockUsers = [
  {
    id: "user1",
    email: "owner@example.com",
    password: "password123",
    user_metadata: {
      name: "John Owner",
      user_type: "owner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JohnOwner",
    },
  },
  {
    id: "user2",
    email: "seeker@example.com",
    password: "password123",
    user_metadata: {
      name: "Sarah Seeker",
      user_type: "seeker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahSeeker",
    },
  },
  {
    id: "user3",
    email: "test@example.com",
    password: "test123",
    user_metadata: {
      name: "Test User",
      user_type: "seeker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TestUser",
    },
  },
  {
    id: "demo_user",
    email: "demo@example.com",
    password: "demo123",
    user_metadata: {
      name: "Demo User",
      user_type: "seeker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser",
    },
  },
];

// Helper function to handle authentication with fallback to mock data
export async function signInWithFallback(email: string, password: string) {
  try {
    // First try Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.warn("Supabase auth error, using mock auth:", error);
      throw error;
    }

    return { data, error: null };
  } catch (err) {
    console.log("Using mock authentication");

    // Fallback to mock authentication
    const mockUser = mockUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (mockUser) {
      // Create a mock session
      const mockSession = {
        access_token: "mock-token-" + Date.now(),
        refresh_token: "mock-refresh-" + Date.now(),
        expires_at: Date.now() + 3600,
        user: mockUser,
      };

      // Store in localStorage to persist the session
      localStorage.setItem("mockAuthSession", JSON.stringify(mockSession));
      localStorage.setItem("mockAuthUser", JSON.stringify(mockUser));

      return {
        data: { session: mockSession, user: mockUser },
        error: null,
      };
    } else {
      return {
        data: null,
        error: { message: "Invalid login credentials" },
      };
    }
  }
}

// Helper function to check if user is authenticated with fallback
export async function getSessionWithFallback() {
  try {
    // Check for mock session first for reliability
    const mockSessionStr = localStorage.getItem("mockAuthSession");
    const mockUserStr = localStorage.getItem("mockAuthUser");

    if (mockSessionStr && mockUserStr) {
      console.log("Using mock session from localStorage");
      const mockSession = JSON.parse(mockSessionStr);
      const mockUser = JSON.parse(mockUserStr);

      return {
        data: { session: mockSession },
        error: null,
      };
    }

    // If no mock session, try Supabase session
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      throw error || new Error("No session found");
    }

    return { data, error: null };
  } catch (err) {
    console.log("No active session found");
    return {
      data: { session: null },
      error: null,
    };
  }
}

// Helper function to sign out with fallback
export async function signOutWithFallback() {
  try {
    // First try Supabase signout
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    return { error: null };
  } catch (err) {
    // Clear mock auth data
    localStorage.removeItem("mockAuthSession");
    localStorage.removeItem("mockAuthUser");

    return { error: null };
  }
}

// Helper function to sign up with fallback
export async function signUpWithFallback(
  email: string,
  password: string,
  userData: any,
) {
  try {
    // First try Supabase signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (err) {
    console.log("Using mock signup");

    // Create a new mock user
    const newMockUser = {
      id: `user${Date.now()}`,
      email,
      password,
      user_metadata: userData,
    };

    // Create a mock session
    const mockSession = {
      access_token: "mock-token-" + Date.now(),
      refresh_token: "mock-refresh-" + Date.now(),
      expires_at: Date.now() + 3600,
      user: newMockUser,
    };

    // Store in localStorage
    localStorage.setItem("mockAuthSession", JSON.stringify(mockSession));
    localStorage.setItem("mockAuthUser", JSON.stringify(newMockUser));

    return {
      data: { session: mockSession, user: newMockUser },
      error: null,
    };
  }
}
