
-- Create enum types
CREATE TYPE public.material_category AS ENUM (
  'paper_cardboard',
  'plastic', 
  'metal',
  'electronics',
  'glass'
);

CREATE TYPE public.booking_status AS ENUM (
  'scheduled',
  'agent_on_way',
  'in_progress',
  'completed',
  'cancelled'
);

CREATE TYPE public.payment_method AS ENUM (
  'upi',
  'cash'
);

CREATE TYPE public.app_language AS ENUM (
  'english',
  'hindi'
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  pin_code TEXT,
  location_lat DECIMAL,
  location_lng DECIMAL,
  preferred_language app_language DEFAULT 'english',
  push_notifications_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create addresses table for multiple address management
CREATE TABLE public.addresses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL, -- e.g., "Home", "Office"
  address_line TEXT NOT NULL,
  area TEXT,
  city TEXT NOT NULL,
  pin_code TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  material_category material_category NOT NULL,
  quantity_estimation TEXT NOT NULL,
  pickup_address_id UUID REFERENCES public.addresses(id) NOT NULL,
  pickup_date DATE NOT NULL,
  time_slot TEXT NOT NULL, -- e.g., "9:00 AM - 11:00 AM"
  special_instructions TEXT,
  status booking_status DEFAULT 'scheduled',
  payment_method payment_method,
  estimated_price DECIMAL(10,2),
  final_price DECIMAL(10,2),
  agent_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create booking_photos table for material photos
CREATE TABLE public.booking_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  photo_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for booking photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('booking-photos', 'booking-photos', true);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_photos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for addresses
CREATE POLICY "Users can view own addresses" ON public.addresses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses" ON public.addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses" ON public.addresses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses" ON public.addresses
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for bookings
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for booking_photos
CREATE POLICY "Users can view own booking photos" ON public.booking_photos
  FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM public.bookings WHERE id = booking_id)
  );

CREATE POLICY "Users can insert own booking photos" ON public.booking_photos
  FOR INSERT WITH CHECK (
    auth.uid() = (SELECT user_id FROM public.bookings WHERE id = booking_id)
  );

-- Storage policies for booking photos
CREATE POLICY "Users can upload booking photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'booking-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view booking photos" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'booking-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', new.email)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
