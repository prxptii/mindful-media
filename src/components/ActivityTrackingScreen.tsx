import React, { useState, useEffect } from 'react';
import { BookOpen, Music, Gamepad2, Headphones, Coffee, Pause, Play, Square, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

type ActivityType = 'reading' | 'music' | 'games' | 'audiobook' | 'other';

interface Activity {
  type: ActivityType;
  icon: any;
  label: string;
  color: string;
  bgColor: string;
}

export function ActivityTrackingScreen() {
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [activityTitle, setActivityTitle] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const activities: Activity[] = [
    {
      type: 'reading',
      icon: BookOpen,
      label: 'Reading',
      color: 'text-primary',
      bgColor: 'bg-primary/10 border-primary/20'
    },
    {
      type: 'music',
      icon: Music,
      label: 'Music',
      color: 'text-accent',
      bgColor: 'bg-accent/10 border-accent/20'
    },
    {
      type: 'audiobook',
      icon: Headphones,
      label: 'Audiobook',
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10 border-chart-4/20'
    },
    {
      type: 'games',
      icon: Gamepad2,
      label: 'Games',
      color: 'text-chart-2',
      bgColor: 'bg-chart-2/10 border-chart-2/20'
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const startTracking = () => {
    setIsTracking(true);
  };

  const pauseTracking = () => {
    setIsTracking(false);
  };

  const stopTracking = () => {
    setIsTracking(false);
    // Here you would save the activity
    console.log('Saved activity:', {
      type: selectedActivity,
      title: activityTitle,
      duration: seconds
    });
    
    // Reset for next activity
    setSelectedActivity(null);
    setSeconds(0);
    setActivityTitle('');
    setShowCustomInput(false);
  };

  const selectedActivityData = activities.find(a => a.type === selectedActivity);

  if (selectedActivity && selectedActivityData) {
    return (
      <div className="py-8 space-y-8">
        {/* Header */}
        <div className="text-center lg:text-left">
          <Button
            variant="ghost"
            onClick={() => setSelectedActivity(null)}
            className="mb-4 text-muted-foreground rounded-xl"
          >
            ← Back to Activities
          </Button>
          <h1 className="text-3xl lg:text-4xl font-medium text-foreground">
            {selectedActivityData.label} Session
          </h1>
        </div>

        {/* Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Timer Circle - Left Side */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Outer decorative circle */}
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 lg:p-12">
                {/* Inner timer circle */}
                <div className="w-full h-full rounded-full bg-card border-2 border-primary/20 flex flex-col items-center justify-center shadow-lg">
                  <selectedActivityData.icon 
                    className={`${selectedActivityData.color} mb-6`} 
                    size={60} 
                  />
                  <div className="text-center">
                    <div className="text-5xl lg:text-6xl font-medium text-foreground mb-4">
                      {formatTime(seconds)}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      {isTracking ? 'In Progress' : seconds > 0 ? 'Paused' : 'Ready to Start'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating progress dots */}
              {isTracking && (
                <div className="absolute inset-0 animate-pulse">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-4 h-4 ${selectedActivityData.bgColor.split(' ')[0]} rounded-full`}
                      style={{
                        top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 8)}%`,
                        left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 8)}%`,
                        transform: 'translate(-50%, -50%)',
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Controls - Right Side */}
          <div className="space-y-6">
            {/* Activity Title Input */}
            {!showCustomInput ? (
              <Card className="rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground text-lg">What are you {selectedActivityData.label.toLowerCase()}?</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCustomInput(true)}
                      className="text-primary rounded-xl"
                    >
                      <Plus size={16} className="mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="rounded-3xl">
                <CardContent className="p-6 space-y-4">
                  <Label htmlFor="activity-title" className="text-lg">Activity Title</Label>
                  <Input
                    id="activity-title"
                    value={activityTitle}
                    onChange={(e) => setActivityTitle(e.target.value)}
                    placeholder={`Enter ${selectedActivityData.label.toLowerCase()} title...`}
                    className="rounded-xl text-lg p-4"
                  />
                </CardContent>
              </Card>
            )}

            {/* Control Buttons */}
            <div className="flex flex-col space-y-4">
              {!isTracking ? (
                <Button
                  onClick={startTracking}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-8 py-6 text-xl font-medium shadow-lg w-full"
                >
                  <Play size={24} className="mr-3" />
                  {seconds > 0 ? 'Resume' : 'Start'}
                </Button>
              ) : (
                <Button
                  onClick={pauseTracking}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl px-8 py-6 text-xl font-medium shadow-lg w-full"
                >
                  <Pause size={24} className="mr-3" />
                  Pause
                </Button>
              )}
              
              {seconds > 0 && (
                <Button
                  onClick={stopTracking}
                  variant="outline"
                  className="rounded-2xl px-8 py-6 text-xl font-medium w-full"
                >
                  <Square size={24} className="mr-3" />
                  Finish
                </Button>
              )}
            </div>

            {/* Session Stats */}
            {seconds > 0 && (
              <Card className="rounded-3xl bg-muted/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">Session Duration</p>
                    <p className="text-3xl font-medium text-foreground">{formatTime(seconds)}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl font-medium text-foreground mb-2">Track Activity</h1>
        <p className="text-lg text-muted-foreground">What mindful activity would you like to track?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Selection - Takes up 2/3 on desktop */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {activities.map((activity) => (
              <Card
                key={activity.type}
                className={`${activity.bgColor} rounded-3xl cursor-pointer transition-all duration-300 hover:scale-105 border-2`}
                onClick={() => setSelectedActivity(activity.type)}
              >
                <CardContent className="p-8 text-center">
                  <activity.icon 
                    className={`${activity.color} mx-auto mb-4`} 
                    size={48} 
                  />
                  <h3 className="text-lg font-medium text-foreground">{activity.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Custom Activity */}
          <Card className="rounded-3xl border-2 border-dashed border-border cursor-pointer hover:border-primary transition-colors">
            <CardContent className="p-8 text-center">
              <Plus className="text-muted-foreground mx-auto mb-4" size={48} />
              <h3 className="text-lg font-medium text-muted-foreground">Add Custom Activity</h3>
              <p className="text-sm text-muted-foreground mt-2">Create your own mindful tracking category</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Summary - Sidebar on desktop */}
        <div className="space-y-6">
          <Card className="rounded-3xl bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="text-xl">Today's Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-medium text-primary mb-1">45m</p>
                  <p className="text-muted-foreground">Reading</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-medium text-accent mb-1">30m</p>
                  <p className="text-muted-foreground">Music</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-medium text-chart-2 mb-1">15m</p>
                  <p className="text-muted-foreground">Games</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="rounded-3xl">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">This Week's Total</p>
              <p className="text-2xl font-medium text-foreground">8h 32m</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}