import { useState, useEffect } from "react";
import { PackageCard } from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Filter, MapPin, Users, Calendar, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

// Mock data for demonstration
const mockPackages = [
  {
    id: "1",
    title: "Magical Ooty Hill Station Experience with Tea Gardens",
    destination: "Ooty, Tamil Nadu",
    duration: "4 Days / 3 Nights",
    price: 15999,
    originalPrice: 19999,
    agency: {
      name: "Himalayan Adventures",
      location: "Bangalore, Karnataka",
      rating: 4.8,
      verified: true,
      verificationLevel: "premium" as const,
    },
    inclusions: {
      food: true,
      accommodation: "Resort",
      transport: true,
      sightseeing: true,
    },
    highlights: [
      "Stay in premium hill resort with valley views",
      "Visit famous tea gardens and chocolate factory",
      "Nilgiri Mountain Railway joy ride",
      "Ooty Lake boating and local sightseeing",
    ],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bookingUrl: "https://example.com/book/1",
  },
  {
    id: "2",
    title: "Complete Ooty Package with Coonoor & Kotagiri",
    destination: "Ooty, Tamil Nadu",
    duration: "5 Days / 4 Nights",
    price: 22500,
    originalPrice: 28000,
    agency: {
      name: "South India Tours",
      location: "Chennai, Tamil Nadu",
      rating: 4.6,
      verified: true,
      verificationLevel: "verified" as const,
    },
    inclusions: {
      food: true,
      accommodation: "Hotel",
      transport: true,
      sightseeing: true,
    },
    highlights: [
      "Cover Ooty, Coonoor, and Kotagiri hill stations",
      "Visit Doddabetta Peak - highest point in Nilgiris",
      "Sim's Park and Botanical Gardens tour",
      "Local tribal village experience",
    ],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bookingUrl: "https://example.com/book/2",
  },
  {
    id: "3",
    title: "Budget-Friendly Ooty Getaway for Families",
    destination: "Ooty, Tamil Nadu",
    duration: "3 Days / 2 Nights",
    price: 9999,
    agency: {
      name: "Family Travel Co.",
      location: "Coimbatore, Tamil Nadu",
      rating: 4.3,
      verified: true,
      verificationLevel: "basic" as const,
    },
    inclusions: {
      food: false,
      accommodation: "Guesthouse",
      transport: true,
      sightseeing: true,
    },
    highlights: [
      "Budget-friendly family accommodation",
      "All major sightseeing spots covered",
      "Flexible meal arrangements",
      "Child-friendly activities included",
    ],
    image: "https://images.unsplash.com/photo-1587899897387-091795e5c39c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bookingUrl: "https://example.com/book/3",
  },
];

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [packages] = useState(mockPackages);
  const [sortBy, setSortBy] = useState("recommended");
  const [filterBy, setFilterBy] = useState("all");
  const searchParams = location.state || {};

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleBackToSearch = () => {
    navigate("/");
  };

  const getSortedPackages = () => {
    let sorted = [...packages];
    
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.agency.rating - a.agency.rating);
        break;
      default:
        // Keep recommended order
        break;
    }
    
    if (filterBy !== "all") {
      if (filterBy === "verified") {
        sorted = sorted.filter(pkg => pkg.agency.verified);
      } else if (filterBy === "budget") {
        sorted = sorted.filter(pkg => pkg.price < 15000);
      } else if (filterBy === "premium") {
        sorted = sorted.filter(pkg => pkg.price > 20000);
      }
    }
    
    return sorted;
  };

  const sortedPackages = getSortedPackages();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-8">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={handleBackToSearch}
            className="mb-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
          
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <h1 className="text-3xl font-bold">AI-Verified Travel Packages</h1>
          </div>
          
          {searchParams.destination && (
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>To: {searchParams.destination}</span>
              </div>
              {searchParams.duration && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{searchParams.duration} days</span>
                </div>
              )}
              {searchParams.groupSize && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{searchParams.groupSize} travelers</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 text-foreground">
            <span className="font-medium">Found {sortedPackages.length} packages</span>
            <Badge variant="secondary" className="bg-forest text-white">
              AI Verified
            </Badge>
          </div>
          
          <div className="flex gap-3">
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[140px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Packages</SelectItem>
                <SelectItem value="verified">AI Verified Only</SelectItem>
                <SelectItem value="budget">Budget Friendly</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPackages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Packages
          </Button>
        </div>
      </div>
    </div>
  );
}
