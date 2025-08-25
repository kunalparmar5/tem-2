import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCircle, LogOut, Home, Upload, Map } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const { user, signOut, userType } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">PropertyDirect</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/properties">
            <Button variant="ghost" className="gap-2">
              <Home className="h-4 w-4" />
              Properties
            </Button>
          </Link>
          <Link to="/map">
            <Button variant="ghost" className="gap-2">
              <Map className="h-4 w-4" />
              Map
            </Button>
          </Link>
          {user && userType === "owner" && (
            <Link to="/list-property">
              <Button variant="ghost" className="gap-2">
                <Upload className="h-4 w-4" />
                List Property
              </Button>
            </Link>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar} />
                    <AvatarFallback>
                      {user.user_metadata?.name?.charAt(0) ||
                        user.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user.user_metadata?.name || user.email}
                  {user.user_metadata?.user_type && (
                    <Badge variant="outline" className="ml-2 capitalize">
                      {user.user_metadata.user_type}
                    </Badge>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to={
                      userType === "owner" ? "/dashboard" : "/seeker-dashboard"
                    }
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                {userType === "owner" && (
                  <DropdownMenuItem asChild>
                    <Link to="/list-property">List Property</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
