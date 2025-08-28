import { useState, useEffect } from "react";
import { PackageCard } from "@/components/PackageCard";
import { LoadingState } from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Filter, MapPin, Users, Calendar, Sparkles, AlertCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { TravelSearchService, type ScrapedPackage } from "@/services/TravelSearchService";
import { useToast } from "@/components/ui/use-toast";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [packages, setPackages] = useState<ScrapedPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("recommended");
  const [filterBy, setFilterBy] = useState("all");
  const searchParams = location.state || {};

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Start the search when component mounts
    if (searchParams.destination) {
      performSearch();
    } else {
      // If no search params, redirect to home
      navigate("/");
    }
  }, []);

  const performSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Starting AI-powered search with params:', searchParams);
      
      const results = await TravelSearchService.searchTravelPackages(searchParams);
      
      if (results.length === 0) {
        setError("No packages found for your search criteria. Please try different parameters.");
        toast({
          title: "No results found",
          description: "Try adjusting your search criteria for better results.",
          variant: "destructive",
        });
      } else {
        setPackages(results);
        toast({
          title: "Search Complete!",
          description: `Found ${results.length} verified travel packages.`,
        });
      }
    } catch (err) {
      console.error('Search error:', err);
      setError("Failed to search for packages. Please try again.");
      toast({
        title: "Search Error",
        description: "Something went wrong. Please try searching again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
        // Keep recommended order (verification level priority)
        sorted.sort((a, b) => {
          const levelOrder = { premium: 3, verified: 2, basic: 1 };
          return levelOrder[b.agency.verificationLevel] - levelOrder[a.agency.verificationLevel];
        });
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

  // Show loading state while searching
  if (loading) {
    return <LoadingState />;
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Search Failed</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <div className="space-y-3">
            <Button onClick={performSearch} variant="default" className="w-full">
              Try Again
            </Button>
            <Button onClick={() => navigate("/")} variant="outline" className="w-full">
              New Search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const sortedPackages = getSortedPackages();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-8">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
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

        {/* Load More - only show if we have packages */}
        {sortedPackages.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={performSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search for More Packages"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
