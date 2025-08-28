import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Users, Calendar, Utensils, Car, Home, Shield, Star, ExternalLink } from "lucide-react";

interface Package {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice?: number;
  agency: {
    name: string;
    location: string;
    rating: number;
    verified: boolean;
    verificationLevel: "premium" | "verified" | "basic";
  };
  inclusions: {
    food: boolean;
    accommodation: string;
    transport: boolean;
    sightseeing: boolean;
  };
  highlights: string[];
  image: string;
  bookingUrl: string;
}

interface PackageCardProps {
  package: Package;
}

export const PackageCard = ({ package: pkg }: PackageCardProps) => {
  const getVerificationBadge = () => {
    const { verified, verificationLevel } = pkg.agency;
    
    if (!verified) return null;
    
    const badgeProps = {
      premium: { className: "bg-gradient-trust text-white", text: "AI Premium Verified" },
      verified: { className: "bg-trust text-white", text: "AI Verified" },
      basic: { className: "bg-forest-light text-white", text: "Verified" }
    };
    
    return (
      <Badge {...badgeProps[verificationLevel]} className="flex items-center gap-1">
        <Shield className="w-3 h-3" />
        {badgeProps[verificationLevel].text}
      </Badge>
    );
  };

  const discount = pkg.originalPrice 
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-large transition-smooth bg-gradient-card border-0 overflow-hidden">
      <div className="relative">
        <img 
          src={pkg.image} 
          alt={pkg.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
        />
        {discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-sunset text-white">
            {discount}% OFF
          </Badge>
        )}
        <div className="absolute top-3 right-3">
          {getVerificationBadge()}
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-lg text-foreground group-hover:text-ocean transition-smooth line-clamp-2">
            {pkg.title}
          </h3>
          <div className="text-right shrink-0">
            <div className="text-2xl font-bold text-ocean">₹{pkg.price.toLocaleString()}</div>
            {pkg.originalPrice && (
              <div className="text-sm text-muted-foreground line-through">
                ₹{pkg.originalPrice.toLocaleString()}
              </div>
            )}
            <div className="text-xs text-muted-foreground">per person</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {pkg.destination}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {pkg.duration}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {pkg.inclusions.food && (
            <Badge variant="secondary" className="text-xs">
              <Utensils className="w-3 h-3 mr-1" />
              Meals
            </Badge>
          )}
          {pkg.inclusions.transport && (
            <Badge variant="secondary" className="text-xs">
              <Car className="w-3 h-3 mr-1" />
              Transport
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs">
            <Home className="w-3 h-3 mr-1" />
            {pkg.inclusions.accommodation}
          </Badge>
          {pkg.inclusions.sightseeing && (
            <Badge variant="secondary" className="text-xs">
              Sightseeing
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm text-foreground">Highlights</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {pkg.highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-ocean rounded-full mt-2 shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t pt-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm text-foreground">{pkg.agency.name}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {pkg.agency.location}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-sunset text-sunset" />
              <span className="text-sm font-medium">{pkg.agency.rating}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          variant="trust" 
          className="w-full group" 
          onClick={() => window.open(pkg.bookingUrl, '_blank')}
        >
          View Package Details
          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-smooth" />
        </Button>
      </CardFooter>
    </Card>
  );
};