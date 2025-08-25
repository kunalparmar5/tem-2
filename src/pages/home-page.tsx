import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/layout/hero-section";
import FeaturedProperties from "@/components/property/featured-properties";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Shield, DollarSign } from "lucide-react";

export default function HomePage() {
  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
    // In a real implementation, this would navigate to search results
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} />

      {/* Featured Properties Section */}
      <FeaturedProperties />

      {/* How It Works Section */}
      <section className="w-full py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Our platform connects property owners directly with potential
              buyers and renters, eliminating the need for brokers and their
              fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Directly</h3>
              <p className="text-muted-foreground">
                Browse listings and connect directly with property owners
                without any intermediaries.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-muted-foreground">
                Our verification process ensures all users and properties are
                legitimate and trustworthy.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Money</h3>
              <p className="text-muted-foreground">
                Eliminate broker fees and commissions, saving thousands on your
                property transaction.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link to="/about">
              <Button variant="outline" className="gap-2">
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Hear from property owners and seekers who have successfully used
              our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=john"
                  alt="John D."
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">John D.</h4>
                  <p className="text-sm text-muted-foreground">
                    Property Owner
                  </p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "I sold my apartment within two weeks of listing it here. The
                direct communication with buyers made the process so much
                smoother, and I saved thousands in broker fees!"
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
                  alt="Sarah M."
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah M.</h4>
                  <p className="text-sm text-muted-foreground">
                    Property Seeker
                  </p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "Found my dream home and was able to negotiate directly with the
                owner. The process was transparent and I felt much more
                confident without a broker pushing me to decide."
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
                  alt="Michael T."
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Michael T.</h4>
                  <p className="text-sm text-muted-foreground">
                    Property Owner
                  </p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "As a landlord with multiple properties, this platform has made
                it so much easier to find reliable tenants without paying hefty
                broker commissions every time."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-primary-foreground/80 max-w-[700px] mx-auto mb-8">
            Join thousands of users who are already saving money and finding
            their dream properties without broker fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties">
              <Button variant="secondary" size="lg">
                Browse Properties
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-primary-foreground hover:bg-primary-foreground/10"
              >
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
