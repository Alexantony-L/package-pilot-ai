import { useState, useEffect } from "react";
import { LoadingState } from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Filter, MapPin, Users, Calendar, Sparkles, AlertCircle ,ExternalLink, Phone, Mail, Globe} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { TravelSearchService, type ScrapedPackage } from "@/services/TravelSearchService";
import { useToast } from "@/components/ui/use-toast";
import {PackageCard} from "./PackageCard"
export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [packages, setPackages] = useState([]);
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
      console.log('Starting AI-powered search with params:', {searchParams});
         const response = await fetch("https://tour-package-tracker.vercel.app/api/travel-guide", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(searchParams),
});

if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

const results = await response.json();


      console.log("verifiedPackages",results)
      // return verifiedPackages;
      // const results = await TravelSearchService.searchTravelPackages(searchParams);
      console.log('Search results:------>', results);
      setPackages(results)
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

  // const getSortedPackages = () => {
  //   // let sorted = [...packages];
    
  //   switch (sortBy) {
  //     case "price-low":
  //       sorted.sort((a, b) => a.price - b.price);
  //       break;
  //     case "price-high":
  //       sorted.sort((a, b) => b.price - a.price);
  //       break;
  //     case "rating":
  //       sorted.sort((a, b) => b.agency.rating - a.agency.rating);
  //       break;
  //     default:
  //       // Keep recommended order (verification level priority)
  //       // sorted.sort((a, b) => {
  //       //   const levelOrder = { premium: 3, verified: 2, basic: 1 };
  //       //   return levelOrder[b.agency.verificationLevel] - levelOrder[a.agency.verificationLevel];
  //       // });
  //       break;
  //   }
    
  //   // if (filterBy !== "all") {
  //   //   if (filterBy === "verified") {
  //   //     sorted = sorted.filter(pkg => pkg.agency.verified);
  //   //   } else if (filterBy === "budget") {
  //   //     sorted = sorted.filter(pkg => pkg.price < 15000);
  //   //   } else if (filterBy === "premium") {
  //   //     sorted = sorted.filter(pkg => pkg.price > 20000);
  //   //   }
  //   // }
    
  //   return sorted;
  // };

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

  // const sortedPackages = getSortedPackages();

  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {packages.map((pkg, index) => (
    <PackageCard key={index} package={pkg} />
  ))}
</div>
  );
}
