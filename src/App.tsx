import React, { useState } from 'react';
import { Home, Activity, Users, User, BookOpen, Leaf, Moon, Sun } from 'lucide-react';
import { Button } from './components/ui/button';
import { WelcomeScreen } from './components/WelcomeScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ActivityTrackingScreen } from './components/ActivityTrackingScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { CommunityScreen } from './components/CommunityScreen';

type Screen = 'welcome' | 'dashboard' | 'activity' | 'community' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen('dashboard');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'activity':
        return <ActivityTrackingScreen />;
      case 'community':
        return <CommunityScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'activity', icon: Activity, label: 'Track Activity' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  // Full screen welcome for onboarding
  if (!hasCompletedOnboarding && currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-background">
        <WelcomeScreen onComplete={handleCompleteOnboarding} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Leaf className="text-primary-foreground" size={20} />
              </div>
              <h1 className="text-xl font-medium text-foreground hidden sm:block">
                Mindful Media Hub
              </h1>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map(({ id, icon: Icon, label }) => (
                <Button
                  key={id}
                  variant={currentScreen === id ? "default" : "ghost"}
                  onClick={() => setCurrentScreen(id as Screen)}
                  className="flex items-center space-x-2 rounded-xl transition-all duration-300"
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Button>
              ))}
            </nav>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="rounded-xl"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {renderScreen()}
        </div>
      </main>

      {/* Mobile Navigation - Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border">
        <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setCurrentScreen(id as Screen)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 min-w-[44px] ${
                currentScreen === id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile bottom padding */}
      <div className="md:hidden h-20"></div>
    </div>
  );
}