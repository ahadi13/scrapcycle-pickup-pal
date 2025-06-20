
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ab06ee427ad941dcb0d31eabdddd7aba',
  appName: 'ScrapIZ',
  webDir: 'dist',
  server: {
    url: 'https://ab06ee42-7ad9-41dc-b0d3-1eabdddd7aba.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#10b981',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'light',
      backgroundColor: '#059669'
    }
  }
};

export default config;
