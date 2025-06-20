
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, IndianRupee, Clock, User, LogOut, Sparkles, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Home = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSellNow = () => {
    navigate('/booking');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleMyBookings = () => {
    navigate('/my-bookings');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/lovable-uploads/aae87d4a-dd6b-4b88-ab37-17e617ea0aea.png" 
                  alt="Scrapiz Logo" 
                  className="h-10 w-auto"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-3'}`}>
              <Button 
                variant="outline" 
                onClick={handleProfile}
                size={isMobile ? "sm" : "default"}
                className="border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
              >
                <User className="h-4 w-4 mr-2" />
                {isMobile ? '' : 'Profile'}
              </Button>
              <Button 
                variant="outline" 
                onClick={signOut}
                size={isMobile ? "sm" : "default"}
                className="border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {isMobile ? '' : 'Logout'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-4 right-4 opacity-20">
            <Sparkles className="h-24 w-24 text-white" />
          </div>
          <div className="relative z-10 text-center text-white">
            <h2 className={`font-bold mb-4 ${isMobile ? 'text-2xl' : 'text-4xl'} leading-tight`}>
              Welcome back, <br />
              <span className="text-yellow-300">{user?.user_metadata?.full_name || user?.email?.split('@')[0]}!</span>
            </h2>
            <p className={`mb-8 opacity-90 ${isMobile ? 'text-base' : 'text-xl'} max-w-2xl mx-auto`}>
              Transform your scrap into instant cash with our eco-friendly pickup service
            </p>
            
            {/* Main CTA Button */}
            <Button 
              size="lg" 
              className={`bg-white text-green-700 hover:bg-gray-50 font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl ${
                isMobile ? 'px-12 py-6 text-xl' : 'px-16 py-8 text-2xl'
              } rounded-full border-4 border-white/20`}
              onClick={handleSellNow}
            >
              <IndianRupee className="h-6 w-6 mr-3" />
              SELL NOW
              <Zap className="h-6 w-6 ml-3" />
            </Button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full"></div>
        </div>

        {/* Feature Cards */}
        <div className={`grid gap-6 mb-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center text-blue-800">
                <div className="p-3 bg-blue-500 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                Free Pickup
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <CardDescription className="text-blue-700 font-medium">
                We collect your scrap materials right from your doorstep at zero cost
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center text-emerald-800">
                <div className="p-3 bg-emerald-500 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <IndianRupee className="h-6 w-6 text-white" />
                </div>
                Best Prices
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <CardDescription className="text-emerald-700 font-medium">
                Get competitive rates for your recyclables with instant UPI payments
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center text-orange-800">
                <div className="p-3 bg-orange-500 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                Quick Service
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <CardDescription className="text-orange-700 font-medium">
                Schedule pickups at your convenience with flexible time slots
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className={`grid gap-6 mb-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          <Card 
            className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-r from-purple-50 to-pink-50 border-0 overflow-hidden relative group" 
            onClick={handleMyBookings}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
            <CardHeader className="relative">
              <CardTitle className="text-purple-800 flex items-center">
                <Shield className="h-6 w-6 mr-3 text-purple-600" />
                My Bookings
              </CardTitle>
              <CardDescription className="text-purple-700 font-medium">
                Track your current and past pickup requests with real-time updates
              </CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-r from-teal-50 to-cyan-50 border-0 overflow-hidden relative group" 
            onClick={handleProfile}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-cyan-500/5 group-hover:from-teal-500/10 group-hover:to-cyan-500/10 transition-all duration-300"></div>
            <CardHeader className="relative">
              <CardTitle className="text-teal-800 flex items-center">
                <User className="h-6 w-6 mr-3 text-teal-600" />
                Profile Settings
              </CardTitle>
              <CardDescription className="text-teal-700 font-medium">
                Manage your account, addresses, and notification preferences
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Material Categories Preview */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100">
          <div className="text-center mb-8">
            <h3 className={`font-bold text-gray-800 mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
              We Accept All Types of Scrap
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Turn your waste into wealth with our comprehensive scrap collection service
            </p>
          </div>
          
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-5'}`}>
            {[
              { name: 'Paper & Cardboard', icon: '📄', color: 'from-blue-400 to-blue-600', bg: 'bg-blue-50' },
              { name: 'Plastic Items', icon: '🥤', color: 'from-red-400 to-red-600', bg: 'bg-red-50' },
              { name: 'Metal Scrap', icon: '🔩', color: 'from-gray-400 to-gray-600', bg: 'bg-gray-50' },
              { name: 'Electronics', icon: '📱', color: 'from-purple-400 to-purple-600', bg: 'bg-purple-50' },
              { name: 'Glass Items', icon: '🍶', color: 'from-green-400 to-green-600', bg: 'bg-green-50' },
            ].map((category) => (
              <div 
                key={category.name} 
                className={`${category.bg} p-6 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer group relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className={`relative z-10 mb-4 ${isMobile ? 'text-3xl' : 'text-4xl'} group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <p className={`font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {category.name}
                </p>
                <div className="mt-2 flex items-center justify-center">
                  <IndianRupee className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600 font-medium">Best Rate</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-12 text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
          <h4 className={`font-bold mb-4 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
            Trusted by 10,000+ Happy Customers
          </h4>
          <div className="flex justify-center items-center space-x-6">
            <div className="flex items-center">
              <span className="text-3xl font-bold">4.8</span>
              <div className="ml-2">
                <div className="text-yellow-300">★★★★★</div>
                <div className="text-sm opacity-80">Rating</div>
              </div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-80">Cities</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm opacity-80">Support</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
