import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";

export default function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkAppStatus = () => {
    // Clear any existing data first
    setDebugInfo(null);
    setIsLoading(true);
    try {
      // Get localStorage data
      const localStorageData = localStorage.getItem("properties");
      let parsedLocalStorage = null;
      try {
        parsedLocalStorage = JSON.parse(localStorageData || "[]");
      } catch (e) {
        parsedLocalStorage = { error: "Failed to parse localStorage data" };
      }

      // Get auth data
      const authSession = localStorage.getItem("mockAuthSession");
      let parsedAuthSession = null;
      try {
        parsedAuthSession = JSON.parse(authSession || "{}");
      } catch (e) {
        parsedAuthSession = { error: "Failed to parse auth session data" };
      }

      // Collect debug info
      setDebugInfo({
        timestamp: new Date().toISOString(),
        appStatus: "Running in mock data mode",
        databaseUrl: "https://xyzpdqrstuvw.supabase.co",
        propertiesCount: parsedLocalStorage?.length || 0,
        authSessionExists: !!authSession,
        currentUser: parsedAuthSession?.user?.email || "Not logged in",
        userType: parsedAuthSession?.user?.user_metadata?.user_type || "None",
        performanceInfo: {
          memoryUsage: window.performance.memory
            ? Math.round(
                window.performance.memory.usedJSHeapSize / (1024 * 1024),
              ) + " MB"
            : "Not available",
          navigationTiming: window.performance.timing
            ? window.performance.timing.domComplete -
              window.performance.timing.navigationStart +
              " ms"
            : "Not available",
        },
      });
    } catch (error) {
      setDebugInfo({
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetAppData = () => {
    try {
      // Import extended mock data
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

      // Reset localStorage with extended mock data
      localStorage.setItem(
        "properties",
        JSON.stringify(extendedMockProperties),
      );

      // Clear any auth session
      localStorage.removeItem("mockAuthSession");
      localStorage.removeItem("mockAuthUser");

      setDebugInfo({
        timestamp: new Date().toISOString(),
        action: "App data reset successfully",
        message: "All data has been reset to default values",
        propertiesCount: extendedMockProperties.length,
      });

      // Force reload to apply changes
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      setDebugInfo({
        timestamp: new Date().toISOString(),
        action: "Failed to reset app data",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  const optimizePerformance = () => {
    try {
      // Clear console logs
      console.clear();

      // Clear any unused localStorage items
      const keysToKeep = ["properties", "mockAuthSession", "mockAuthUser"];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      }

      // Force garbage collection if possible
      if (window.gc) {
        window.gc();
      }

      setDebugInfo({
        timestamp: new Date().toISOString(),
        action: "Performance optimization complete",
        message: "The application has been optimized for better performance",
      });
    } catch (error) {
      setDebugInfo({
        timestamp: new Date().toISOString(),
        action: "Performance optimization failed",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="bg-background/80 backdrop-blur-sm"
      >
        {isOpen ? "Close Status" : "App Status"}
      </Button>

      {isOpen && (
        <Card className="mt-2 w-[400px] max-h-[500px] overflow-auto">
          <CardHeader>
            <CardTitle className="text-lg">PropertyDirect App Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Button
                onClick={checkAppStatus}
                disabled={isLoading}
                size="sm"
                variant="outline"
              >
                {isLoading ? "Checking..." : "Check Status"}
              </Button>
              <Button onClick={resetAppData} size="sm" variant="outline">
                Reset Data
              </Button>
              <Button onClick={optimizePerformance} size="sm" variant="outline">
                Optimize
              </Button>
            </div>

            {debugInfo && (
              <div className="rounded-md bg-muted p-3 text-sm">
                <pre className="whitespace-pre-wrap overflow-auto max-h-[300px] text-xs">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              <p className="mt-2 font-medium text-primary">
                Database URL: https://xyzpdqrstuvw.supabase.co
              </p>
              <div className="mt-2 p-2 bg-muted rounded-md">
                <p className="font-medium">Test Login Credentials:</p>
                <p>Owner: owner@example.com / password123</p>
                <p>Seeker: seeker@example.com / password123</p>
                <p>Demo: demo@example.com / demo123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
