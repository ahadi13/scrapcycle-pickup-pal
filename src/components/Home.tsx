
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Recycle, Truck, DollarSign, Clock, User, LogOut } from 'lucide-react';
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

  const handleMyBookings = () =>  {
    navigate('/my-bookings');
  };

  const handleAdminDashboard = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Recycle className="h-8 w-8 text-green-600 mr-2" />
              <h1 className="text-2xl font-bold text-green-800">ScrapIZ</h1>
            </div>
            <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-4'}`}>
              <Button 
                variant="outline" 
                onClick={handleProfile}
                size={isMobile ? "sm" : "default"}
              >
                <User className="h-4 w-4 mr-2" />
                {isMobile ? '' : 'Profile'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleAdminDashboard}
                size={isMobile ? "sm" : "default"}
                className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
              >
                <User className="h-4 w-4 mr-2" />
                {isMobile ? 'Admin' : 'Admin Dashboard'}
              </Button>
              <Button 
                variant="outline" 
                onClick={signOut}
                size={isMobile ? "sm" : "default"}
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
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className={`font-bold text-gray-900 mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
            Welcome back, {user?.user_metadata?.full_name || user?.email}!
          </h2>
          <p className={`text-gray-600 mb-8 ${isMobile ? 'text-base' : 'text-lg'}`}>
            Turn your scrap into cash with our hassle-free pickup service
          </p>
          
          {/* Main CTA Button */}
          <Button 
            size="lg" 
            className={`bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-200 active:scale-95 ${
              isMobile ? 'px-12 py-6 text-xl' : 'px-8 py-4 text-lg'
            }`}
            onClick={handleSellNow}
          >
            <DollarSign className="h-6 w-6 mr-2" />
            SELL NOW
          </Button>
        </div>

        {/* Feature Cards */}
        <div className={`grid gap-6 mb-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          <Card className="hover:shadow-lg transition-all duration-200 active:scale-95">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-6 w-6 text-green-600 mr-2" />
                Free Pickup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We collect your scrap materials right from your doorstep at no extra cost
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 active:scale-95">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-6 w-6 text-green-600 mr-2" />
                Best Prices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get competitive rates for your recyclable materials with instant payments
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 active:scale-95">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-6 w-6 text-green-600 mr-2" />
                Quick Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Schedule pickups at your convenience with our flexible time slots
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 active:scale-95" 
            onClick={handleMyBookings}
          >
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>Track your current and past pickup requests</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 active:scale-95" 
            onClick={handleProfile}
          >
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your account and preferences</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Material Categories Preview */}
        <div className="mt-12 text-center">
          <h3 className={`font-bold text-gray-900 mb-6 ${isMobile ? 'text-xl' : 'text-2xl'}`}>We Accept</h3>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-5'}`}>
            {[
              { name: 'Paper & Cardboard', icon: '📄' },
              { name: 'Plastic', icon: '🥤' },
              { name: 'Metal', icon: '🔩' },
              { name: 'Electronics', icon: '📱' },
              { name: 'Glass', icon: '🍶' },
            ].map((category) => (
              <div key={category.name} className="bg-white p-4 rounded-lg shadow-sm text-center transition-all duration-200 active:scale-95">
                <div className={`mb-2 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>{category.icon}</div>
                <p className={`font-medium text-gray-700 ${isMobile ? 'text-xs' : 'text-sm'}`}>{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
