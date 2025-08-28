import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchForm } from "@/components/SearchForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Shield, MapPin, Users, Star, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-travel.jpg";

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (searchData: unknown) => {
    // Navigate to results page with search data
console.log(searchData);

    navigate("/results", { state: searchData });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Header */}
          <div className="mb-12">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Travel Discovery
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="bg-gradient-to-r from-sunset to-ocean bg-clip-text text-transparent block">
                Travel Adventure
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover verified travel packages from trusted agencies. Our AI scans the web to find 
              the best deals, checks agency credibility, and matches your perfect getaway.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="w-5 h-5 text-trust" />
                <span>AI-Verified Agencies</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Star className="w-5 h-5 text-sunset" />
                <span>Best Price Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-5 h-5 text-ocean" />
                <span>1000+ Destinations</span>
              </div>
            </div>
          </div>

          {/* Search Form */}
          <SearchForm onSearch={handleSearch} />

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center text-white">
              <div className="text-3xl font-bold text-sunset mb-2">500+</div>
              <div className="text-white/80">Verified Agencies</div>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl font-bold text-ocean mb-2">50K+</div>
              <div className="text-white/80">Happy Travelers</div>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl font-bold text-trust mb-2">99.9%</div>
              <div className="text-white/80">Scam-Free Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How Our AI Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI technology ensures you get the best and safest travel experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-smooth shadow-medium">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Smart Search</h3>
              <p className="text-muted-foreground">
                AI analyzes your preferences and scans thousands of packages across multiple platforms
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-trust rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-smooth shadow-medium">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Verification</h3>
              <p className="text-muted-foreground">
                Every agency is verified for legitimacy, reviews, and reputation to ensure your safety
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-sunset rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-smooth shadow-medium">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Best Match</h3>
              <p className="text-muted-foreground">
                Get personalized recommendations that perfectly match your budget and preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of travelers who trust our AI to find their perfect getaway
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-lg px-8 py-3"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
