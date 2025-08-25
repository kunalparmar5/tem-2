import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home as HomeIcon, Search, Upload } from "lucide-react";

function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80"
            alt="Modern property"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-24 md:px-6 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Find Your Perfect Property,{" "}
              <span className="text-primary">Broker-Free</span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Connect directly with property owners and seekers. No middlemen,
              no broker fees.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/properties">
                <Button size="lg" className="gap-2">
                  <Search className="h-5 w-5" />
                  Browse Properties
                </Button>
              </Link>
              <Link to="/list-property">
                <Button size="lg" variant="outline" className="gap-2">
                  <Upload className="h-5 w-5" />
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Find Properties</h3>
              <p className="text-muted-foreground">
                Browse through our extensive listing of properties with detailed
                filters to find your perfect match.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HomeIcon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Connect Directly</h3>
              <p className="text-muted-foreground">
                Message property owners directly without any intermediaries,
                saving time and broker fees.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">List Your Property</h3>
              <p className="text-muted-foreground">
                Are you a property owner? List your property for free and
                connect with genuine seekers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-lg bg-primary/5 p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join thousands of users who have already found their perfect
                property match without paying broker fees.
              </p>
              <Link to="/signup">
                <Button size="lg" className="gap-2">
                  Create an Account
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
