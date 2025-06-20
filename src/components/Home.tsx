
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, IndianRupee, Clock, User, LogOut, Sparkles, Shield, Zap, ArrowRight, Star, Users, MapPin } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-25 via-green-25 to-teal-25 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-green-100/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <img 
                  src="/lovable-uploads/aae87d4a-dd6b-4b88-ab37-17e617ea0aea.png" 
                  alt="Scrapiz Logo" 
                  className="relative h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Scrapiz
                </h1>
                <p className="text-sm text-gray-500">Eco-friendly scrap collection</p>
              </div>
            </div>
            <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-3'}`}>
              <Button 
                variant="outline" 
                onClick={handleProfile}
                size={isMobile ? "sm" : "default"}
                className="border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200 hover:shadow-md"
              >
                <User className="h-4 w-4 mr-2" />
                {isMobile ? '' : 'Profile'}
              </Button>
              <Button 
                variant="outline" 
                onClick={signOut}
                size={isMobile ? "sm" : "default"}
                className="border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200 hover:shadow-md"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {isMobile ? '' : 'Logout'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Hero Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 via-emerald-600/90 to-teal-600/90 rounded-3xl"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] rounded-3xl"></div>
          
          <div className="relative p-8 md:p-12 text-center text-white">
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}!
              </div>
              <h2 className={`font-bold mb-6 leading-tight ${isMobile ? 'text-3xl' : 'text-5xl'}`}>
                Turn Your <span className="text-yellow-300">Scrap</span> into
                <br />
                <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">Instant Cash</span>
              </h2>
              <p className={`mb-8 opacity-90 ${isMobile ? 'text-lg' : 'text-xl'} max-w-3xl mx-auto leading-relaxed`}>
                India's most trusted eco-friendly scrap collection service. Get the best rates with doorstep pickup in just a few taps.
              </p>
            </div>
            
            {/* Enhanced CTA Button */}
            <div className="space-y-4">
              <Button 
                size="lg" 
                className={`group relative overflow-hidden bg-white text-green-700 hover:bg-gray-50 font-bold transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-2xl ${
                  isMobile ? 'px-12 py-6 text-xl' : 'px-20 py-8 text-3xl'
                } rounded-2xl`}
                onClick={handleSellNow}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="relative flex items-center">
                  <IndianRupee className="h-8 w-8 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  <span>SELL NOW</span>
                  <ArrowRight className="h-8 w-8 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Button>
              
              <div className="flex items-center justify-center space-x-6 text-white/80 text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-300 mr-1" />
                  <span>4.8/5 Rating</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>10k+ Happy Users</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>50+ Cities</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Feature Cards */}
        <div className={`grid gap-8 mb-16 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          {[
            {
              icon: Truck,
              title: 'Free Doorstep Pickup',
              description: 'No hidden charges. We collect your scrap materials right from your doorstep at absolutely zero cost.',
              gradient: 'from-blue-500 to-cyan-500',
              bg: 'from-blue-50 to-cyan-50',
              iconBg: 'bg-blue-500'
            },
            {
              icon: IndianRupee,
              title: 'Best Market Rates',
              description: 'Get competitive prices for your recyclables with instant UPI payments and transparent pricing.',
              gradient: 'from-emerald-500 to-green-500',
              bg: 'from-emerald-50 to-green-50',
              iconBg: 'bg-emerald-500'
            },
            {
              icon: Clock,
              title: 'Quick & Reliable',
              description: 'Schedule pickups at your convenience with flexible time slots and real-time tracking.',
              gradient: 'from-orange-500 to-red-500',
              bg: 'from-orange-50 to-red-50',
              iconBg: 'bg-orange-500'
            }
          ].map((feature, index) => (
            <Card key={index} className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-gradient-to-br ${feature.bg} overflow-hidden relative`}>
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              
              <CardHeader className="relative pb-4">
                <div className={`inline-flex p-4 ${feature.iconBg} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-gray-600 font-medium text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Quick Actions */}
        <div className={`grid gap-8 mb-16 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          <Card 
            className="group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border-0 overflow-hidden relative" 
            onClick={handleMyBookings}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full -translate-y-12 translate-x-12"></div>
            
            <CardHeader className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex p-3 bg-purple-500 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <ArrowRight className="h-6 w-6 text-purple-400 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
              <CardTitle className="text-2xl font-bold text-purple-800 mb-2">My Bookings</CardTitle>
              <CardDescription className="text-purple-700 font-medium text-lg">
                Track your current and past pickup requests with real-time updates and detailed history
              </CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 border-0 overflow-hidden relative" 
            onClick={handleProfile}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-cyan-500/5 group-hover:from-teal-500/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full -translate-y-12 translate-x-12"></div>
            
            <CardHeader className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex p-3 bg-teal-500 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <ArrowRight className="h-6 w-6 text-teal-400 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
              <CardTitle className="text-2xl font-bold text-teal-800 mb-2">Profile Settings</CardTitle>
              <CardDescription className="text-teal-700 font-medium text-lg">
                Manage your account details, saved addresses, and notification preferences
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Enhanced Material Categories */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-green-100/50 mb-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-6">
              <Sparkles className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 font-semibold">We Accept All Types</span>
            </div>
            <h3 className={`font-bold text-gray-800 mb-4 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
              Turn Any Scrap into Cash
            </h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              From paper to electronics, we accept it all. Get instant quotes and doorstep pickup for maximum convenience.
            </p>
          </div>
          
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-5'}`}>
            {[
              { name: 'Paper & Books', icon: '📄', price: '₹12-18/kg', gradient: 'from-blue-400 to-blue-600', bg: 'from-blue-50 to-blue-100' },
              { name: 'Plastic Bottles', icon: '🥤', price: '₹8-15/kg', gradient: 'from-red-400 to-red-600', bg: 'from-red-50 to-red-100' },
              { name: 'Metal Scrap', icon: '🔩', price: '₹25-45/kg', gradient: 'from-gray-400 to-gray-600', bg: 'from-gray-50 to-gray-100' },
              { name: 'Electronics', icon: '📱', price: '₹50-500/pc', gradient: 'from-purple-400 to-purple-600', bg: 'from-purple-50 to-purple-100' },
              { name: 'Glass Items', icon: '🍶', price: '₹2-5/kg', gradient: 'from-green-400 to-green-600', bg: 'from-green-50 to-green-100' },
            ].map((category, index) => (
              <div 
                key={category.name} 
                className={`group relative bg-gradient-to-br ${category.bg} p-6 rounded-2xl text-center transition-all duration-500 transform hover:scale-110 hover:shadow-2xl cursor-pointer overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -translate-y-8 translate-x-8"></div>
                
                <div className="relative z-10">
                  <div className={`mb-4 ${isMobile ? 'text-4xl' : 'text-5xl'} group-hover:scale-125 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <p className={`font-bold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
                    {category.name}
                  </p>
                  <div className="flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
                    <IndianRupee className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-700 font-bold">{category.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Trust Section */}
        <div className="text-center bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.05" fill-rule="evenodd"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/svg%3E')]"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Star className="h-5 w-5 text-yellow-300 mr-2" />
              <span className="font-semibold">Trusted Nationwide</span>
            </div>
            
            <h4 className={`font-bold mb-8 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
              Join 10,000+ Happy Customers Across India
            </h4>
            
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-4xl md:text-5xl font-bold">4.8</span>
                  <Star className="h-6 w-6 text-yellow-300 ml-1" />
                </div>
                <div className="text-yellow-300 mb-1">★★★★★</div>
                <div className="text-sm opacity-80">Average Rating</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
                <div className="text-sm opacity-80">Cities Covered</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-80">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
