import { Suspense, lazy } from "react";
import DebugPanel from "./components/debug-panel";
import { Routes, Route, Navigate, useRoutes } from "react-router-dom";
import MainLayout from "./components/layout/main-layout";
import { AuthProvider, useAuth } from "./contexts/auth-context";
import routes from "tempo-routes";
import { TempoDevtools } from "tempo-devtools";

// Initialize Tempo Devtools
if (import.meta.env.VITE_TEMPO) {
  TempoDevtools.init();
}

// Lazy load components for better performance
const Home = lazy(() => import("./pages/home-page"));
const PropertyGrid = lazy(() => import("./components/property/property-grid"));
const PropertyDetail = lazy(
  () => import("./components/property/property-detail"),
);
const PropertyForm = lazy(() => import("./components/property/property-form"));
const PropertyMap = lazy(() => import("./components/map/property-map"));
const LoginForm = lazy(() => import("./components/auth/login-form"));
const SignupForm = lazy(() => import("./components/auth/signup-form"));
const OwnerDashboard = lazy(
  () => import("./components/dashboard/owner-dashboard"),
);
const SeekerDashboard = lazy(
  () => import("./components/dashboard/seeker-dashboard"),
);
const MessageThread = lazy(
  () => import("./components/messaging/message-thread"),
);
const FAQ = lazy(() => import("./components/faq"));
const Guides = lazy(() => import("./components/guides"));
const TermsOfService = lazy(() => import("./components/legal/terms"));
const PrivacyPolicy = lazy(() => import("./components/legal/privacy"));

// Protected route component
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

// Role-based route component
function RoleRoute({
  children,
  allowedRole,
}: {
  children: JSX.Element;
  allowedRole: "owner" | "seeker";
}) {
  const { userType, loading } = useAuth();

  if (loading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );

  if (userType !== allowedRole) {
    // Redirect to appropriate dashboard based on role
    return (
      <Navigate
        to={userType === "owner" ? "/dashboard" : "/seeker-dashboard"}
        replace
      />
    );
  }

  return children;
}

function AppRoutes() {
  const { userType } = useAuth();

  return (
    <>
      {/* Tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PropertyGrid />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />

          {/* Protected routes */}
          <Route
            path="/list-property"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRole="owner">
                  <PropertyForm />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-property/:id"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRole="owner">
                  <PropertyForm />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route path="/map" element={<PropertyMap />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRole="owner">
                  <OwnerDashboard />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/seeker-dashboard"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRole="seeker">
                  <SeekerDashboard />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages/:id"
            element={
              <ProtectedRoute>
                <MessageThread />
              </ProtectedRoute>
            }
          />

          {/* Redirect to appropriate dashboard if logged in */}
          <Route
            path="/dashboard-redirect"
            element={
              userType === "owner" ? (
                <Navigate to="/dashboard" replace />
              ) : userType === "seeker" ? (
                <Navigate to="/seeker-dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Add this before the catchall route */}
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}

          {/* Catch-all route to handle all other routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="text-lg font-medium">Loading...</p>
            </div>
          </div>
        }
      >
        <>
          <AppRoutes />
          {/* Add debug panel in development */}
          {import.meta.env.DEV && <DebugPanel />}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
