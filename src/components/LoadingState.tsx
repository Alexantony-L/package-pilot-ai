import { Sparkles, Shield, Search, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const LoadingState = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 animate-pulse" />
            <h1 className="text-3xl font-bold">AI is Finding Your Perfect Packages</h1>
          </div>
          <p className="text-white/90">Scanning the web for verified travel deals...</p>
        </div>
      </div>

      {/* Loading Content */}
      <div className="container mx-auto px-4 py-8">
        {/* AI Process Steps */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-soft border animate-pulse">
              <div className="w-10 h-10 bg-ocean rounded-full flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-foreground">Searching Travel Websites</div>
                <div className="text-sm text-muted-foreground">Scanning 100+ travel platforms...</div>
              </div>
              <div className="ml-auto">
                <div className="w-6 h-6 border-2 border-ocean border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-soft border animate-pulse">
              <div className="w-10 h-10 bg-trust rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-foreground">Verifying Agencies</div>
                <div className="text-sm text-muted-foreground">Checking reputation and reviews...</div>
              </div>
              <div className="ml-auto">
                <div className="w-6 h-6 border-2 border-trust border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-soft border animate-pulse">
              <div className="w-10 h-10 bg-sunset rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-foreground">Matching Preferences</div>
                <div className="text-sm text-muted-foreground">Finding packages that match your criteria...</div>
              </div>
              <div className="ml-auto">
                <div className="w-6 h-6 border-2 border-sunset border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Skeleton Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-muted"></div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-muted rounded w-20"></div>
                  <div className="h-8 bg-muted rounded w-24"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
                <div className="h-10 bg-muted rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground">This may take a few moments while we ensure quality results...</p>
        </div>
      </div>
    </div>
  );
};