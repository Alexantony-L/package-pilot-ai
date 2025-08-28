import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, DollarSign, Users, Calendar } from "lucide-react";

interface SearchFormProps {
  onSearch: (searchData: any) => void;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [destination, setDestination] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [preferences, setPreferences] = useState({
    foodIncluded: false,
    accommodationType: "",
    transportIncluded: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      destination,
      currentLocation,
      budget,
      duration,
      groupSize,
      preferences,
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-large border-0">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-foreground font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-ocean" />
                Where do you want to go?
              </Label>
              <Input
                id="destination"
                placeholder="e.g., Ooty, Goa, Kashmir"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border-2 focus:border-ocean transition-smooth"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentLocation" className="text-foreground font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sunset" />
                Current Location
              </Label>
              <Input
                id="currentLocation"
                placeholder="e.g., Mumbai, Delhi, Bangalore"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                className="border-2 focus:border-ocean transition-smooth"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget" className="text-foreground font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-forest" />
                Budget (per person)
              </Label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger className="border-2 focus:border-ocean">
                  <SelectValue placeholder="Select your budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-10k">Under ₹10,000</SelectItem>
                  <SelectItem value="10k-25k">₹10,000 - ₹25,000</SelectItem>
                  <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
                  <SelectItem value="50k-100k">₹50,000 - ₹1,00,000</SelectItem>
                  <SelectItem value="above-100k">Above ₹1,00,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-foreground font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sunset" />
                Duration
              </Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="border-2 focus:border-ocean">
                  <SelectValue placeholder="How long is your trip?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">1-2 days</SelectItem>
                  <SelectItem value="3-5">3-5 days</SelectItem>
                  <SelectItem value="6-10">6-10 days</SelectItem>
                  <SelectItem value="11-15">11-15 days</SelectItem>
                  <SelectItem value="15+">More than 15 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="groupSize" className="text-foreground font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-forest" />
                Group Size
              </Label>
              <Select value={groupSize} onValueChange={setGroupSize}>
                <SelectTrigger className="border-2 focus:border-ocean">
                  <SelectValue placeholder="Number of travelers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Solo traveler</SelectItem>
                  <SelectItem value="2">Couple (2 people)</SelectItem>
                  <SelectItem value="3-4">Small group (3-4 people)</SelectItem>
                  <SelectItem value="5-8">Medium group (5-8 people)</SelectItem>
                  <SelectItem value="8+">Large group (8+ people)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">Accommodation Type</Label>
              <Select 
                value={preferences.accommodationType} 
                onValueChange={(value) => setPreferences(prev => ({ ...prev, accommodationType: value }))}
              >
                <SelectTrigger className="border-2 focus:border-ocean">
                  <SelectValue placeholder="Preferred stay type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="resort">Resort</SelectItem>
                  <SelectItem value="homestay">Homestay</SelectItem>
                  <SelectItem value="guesthouse">Guesthouse</SelectItem>
                  <SelectItem value="any">Any</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.foodIncluded}
                onChange={(e) => setPreferences(prev => ({ ...prev, foodIncluded: e.target.checked }))}
                className="rounded border-2 border-ocean text-ocean focus:ring-ocean"
              />
              <span className="text-sm text-foreground">Food included</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.transportIncluded}
                onChange={(e) => setPreferences(prev => ({ ...prev, transportIncluded: e.target.checked }))}
                className="rounded border-2 border-ocean text-ocean focus:ring-ocean"
              />
              <span className="text-sm text-foreground">Transport included</span>
            </label>
          </div>

          <Button 
            type="submit" 
            variant="search" 
            size="lg" 
            className="w-full"
            disabled={!destination || !currentLocation || !budget}
          >
            Find AI-Verified Travel Packages
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};