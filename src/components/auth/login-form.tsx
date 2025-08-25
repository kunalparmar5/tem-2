import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/auth-context";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, userType } = useAuth();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      console.log("Attempting login with:", data.email);

      // Direct login for demo credentials - no API call needed
      if (data.email === "demo@example.com" && data.password === "demo123") {
        // Create a mock user for demo login
        const demoUser = {
          id: "demo_user",
          email: "demo@example.com",
          user_metadata: {
            name: "Demo User",
            user_type: "seeker",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser",
          },
        };

        // Store in localStorage to persist the session
        localStorage.setItem("mockAuthUser", JSON.stringify(demoUser));
        localStorage.setItem(
          "mockAuthSession",
          JSON.stringify({
            access_token: "mock-token-" + Date.now(),
            refresh_token: "mock-refresh-" + Date.now(),
            expires_at: Date.now() + 3600,
            user: demoUser,
          }),
        );

        toast({
          title: "Demo Login Successful",
          description: "Welcome to the demo account!",
        });

        navigate("/seeker-dashboard");
        setIsLoading(false);
        return;
      }

      // Direct login for test credentials - no API call needed
      if (
        (data.email === "owner@example.com" &&
          data.password === "password123") ||
        (data.email === "seeker@example.com" && data.password === "password123")
      ) {
        // Find the matching mock user
        const mockUser = [
          {
            id: "user1",
            email: "owner@example.com",
            user_metadata: {
              name: "John Owner",
              user_type: "owner",
              avatar:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=JohnOwner",
            },
          },
          {
            id: "user2",
            email: "seeker@example.com",
            user_metadata: {
              name: "Sarah Seeker",
              user_type: "seeker",
              avatar:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahSeeker",
            },
          },
        ].find((u) => u.email === data.email);

        if (mockUser) {
          // Store in localStorage to persist the session
          localStorage.setItem("mockAuthUser", JSON.stringify(mockUser));
          localStorage.setItem(
            "mockAuthSession",
            JSON.stringify({
              access_token: "mock-token-" + Date.now(),
              refresh_token: "mock-refresh-" + Date.now(),
              expires_at: Date.now() + 3600,
              user: mockUser,
            }),
          );

          toast({
            title: "Login Successful",
            description: `Welcome back, ${mockUser.user_metadata.name}!`,
          });

          if (mockUser.user_metadata.user_type === "owner") {
            navigate("/dashboard");
          } else {
            navigate("/seeker-dashboard");
          }

          setIsLoading(false);
          return;
        }
      }

      const { data: authData, error } = await signIn(data.email, data.password);

      if (error) {
        console.error("Login error:", error);
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
        return;
      }

      console.log("Login successful:", authData);

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });

      // Redirect based on user type
      const userType = authData?.user?.user_metadata?.user_type;
      console.log("User type for redirect:", userType);

      if (userType === "owner") {
        navigate("/dashboard");
      } else if (userType === "seeker") {
        navigate("/seeker-dashboard");
      } else {
        // Default to dashboard redirect
        navigate("/dashboard-redirect");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div className="mt-4 rounded-md bg-muted p-3 text-sm">
                <p className="font-medium">Demo Credentials:</p>
                <p>Email: owner@example.com</p>
                <p>Password: password123</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Or use demo@example.com / demo123 for instant access
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            <Link
              to="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
