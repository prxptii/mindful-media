import React from 'react';
import { BookOpen, Music, Gamepad2, Target, TrendingUp, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function DashboardScreen() {
  const todayProgress = {
    reading: { current: 45, goal: 60, color: 'stroke-primary' },
    music: { current: 30, goal: 45, color: 'stroke-accent' },
    games: { current: 15, goal: 30, color: 'stroke-chart-4' }
  };

  const quickActions = [
    { icon: BookOpen, label: 'Read', color: 'bg-primary', textColor: 'text-primary-foreground' },
    { icon: Music, label: 'Listen', color: 'bg-accent', textColor: 'text-accent-foreground' },
    { icon: Gamepad2, label: 'Play', color: 'bg-chart-4', textColor: 'text-foreground' },
    { icon: Target, label: 'Goals', color: 'bg-muted', textColor: 'text-foreground' }
  ];

  const recentActivities = [
    { type: 'book', title: 'The Midnight Library', duration: '45 min', time: '2 hours ago' },
    { type: 'music', title: 'Bon Iver - Re: Stacks', duration: '23 min', time: '3 hours ago' },
    { type: 'book', title: 'Atomic Habits', duration: '30 min', time: 'Yesterday' }
  ];

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl font-medium text-foreground mb-2">Good morning, Alex</h1>
        <p className="text-lg text-muted-foreground">Ready for another mindful day?</p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Today's Mindful Goal */}
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20 rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl lg:text-2xl font-medium text-foreground">Today's Mindful Goal</h2>
                  <p className="text-muted-foreground text-lg">2 hours of offline time</p>
                </div>
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <Target className="text-primary" size={28} />
                </div>
              </div>
              
              {/* Progress Ring Visualization */}
              <div className="flex items-center justify-center lg:justify-start space-x-8 lg:space-x-12">
                {Object.entries(todayProgress).map(([key, { current, goal, color }]) => {
                  const percentage = (current / goal) * 100;
                  return (
                    <div key={key} className="flex flex-col items-center">
                      <div className="relative w-20 h-20 lg:w-24 lg:h-24">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="stroke-muted"
                            strokeWidth="3"
                            fill="none"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className={color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                            strokeDasharray={`${percentage}, 100`}
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm lg:text-base font-medium">{current}m</span>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground mt-2 capitalize">{key}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map(({ icon: Icon, label, color, textColor }) => (
                <Button
                  key={label}
                  variant="ghost"
                  className={`${color} ${textColor} rounded-3xl h-24 lg:h-28 flex flex-col space-y-3 hover:scale-105 transition-transform duration-300 shadow-sm`}
                >
                  <Icon size={28} />
                  <span className="text-sm">{label}</span>
                </Button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Today's Inspiration */}
          <Card className="rounded-3xl overflow-hidden">
            <div className="relative h-48 lg:h-56">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1650124483886-8b832fd009e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcGxhbnQlMjBuYXR1cmV8ZW58MXx8fHwxNzU2ODIwODc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Mindful inspiration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-accent/60" />
              <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                <div>
                  <p className="text-white font-medium mb-2 text-lg">"Reading is to the mind what exercise is to the body."</p>
                  <p className="text-white/80">— Joseph Addison</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">Recent Activity</h3>
              <Button variant="ghost" size="sm" className="text-primary rounded-xl">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <Card key={index} className="rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        {activity.type === 'book' ? (
                          <BookOpen className="text-primary" size={20} />
                        ) : (
                          <Music className="text-accent" size={20} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.duration} · {activity.time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Community Highlights */}
          <Card className="rounded-3xl bg-muted/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="text-primary" size={20} />
                <h3 className="font-medium text-foreground">Community Highlights</h3>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Sarah just finished "The Seven Husbands of Evelyn Hugo" and loved it!
              </p>
              <Button variant="outline" size="sm" className="rounded-xl w-full">
                Join Discussion
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}