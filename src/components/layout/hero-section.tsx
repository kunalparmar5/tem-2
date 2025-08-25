import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  onSearch?: (searchTerm: string) => void;
}

const HeroSection = ({
  title = "Find Your Dream Home, Directly from Owners",
  subtitle = "Connect with property owners without broker fees and find the perfect place to call home",
  backgroundImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
  onSearch = () => {},
}: HeroSectionProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="relative w-full h-[500px] bg-gray-100">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">{subtitle}</p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-2xl flex flex-col sm:flex-row gap-2"
        >
          <div className="flex-grow">
            <Input
              type="text"
              placeholder="Enter location, property type, or keywords"
              className="h-12 bg-white/90 text-black placeholder:text-gray-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="h-12 px-6 bg-primary hover:bg-primary/90"
          >
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </form>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          <div className="text-center">
            <p className="text-3xl font-bold">1000+</p>
            <p className="text-sm">Properties</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">0%</p>
            <p className="text-sm">Broker Fees</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">24/7</p>
            <p className="text-sm">Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
