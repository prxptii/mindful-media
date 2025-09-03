import React from 'react';
import { Calendar, TrendingUp, Award, Settings, Share2, Leaf, Book, Music } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function ProfileScreen() {
  const weeklyData = [
    { day: 'Mon', reading: 45, music: 20, games: 10 },
    { day: 'Tue', reading: 60, music: 30, games: 15 },
    { day: 'Wed', reading: 30, music: 45, games: 20 },
    { day: 'Thu', reading: 75, music: 25, games: 5 },
    { day: 'Fri', reading: 40, music: 50, games: 25 },
    { day: 'Sat', reading: 90, music: 60, games: 30 },
    { day: 'Sun', reading: 55, music: 35, games: 15 }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Bookworm',
      description: 'Read for 7 days straight',
      icon: Book,
      color: 'bg-primary/10 text-primary',
      earned: true,
      date: '2 days ago'
    },
    {
      id: 2,
      title: 'Melody Keeper',
      description: 'Listen to music mindfully for 5 hours',
      icon: Music,
      color: 'bg-accent/10 text-accent',
      earned: true,
      date: '1 week ago'
    },
    {
      id: 3,
      title: 'Nature\'s Friend',
      description: 'Complete 30 days of mindful activities',
      icon: Leaf,
      color: 'bg-chart-4/10 text-chart-4',
      earned: false,
      progress: 18
    }
  ];

  const stats = [
    { label: 'Total Hours', value: '127', change: '+12%', period: 'this month' },
    { label: 'Current Streak', value: '7', change: 'days', period: 'in a row' },
    { label: 'Activities', value: '143', change: '+8', period: 'this week' },
    { label: 'Mindful Score', value: '8.2', change: '+0.3', period: 'this month' }
  ];

  const maxValue = Math.max(...weeklyData.flatMap(d => [d.reading, d.music, d.games]));

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="text-center lg:flex lg:items-center lg:text-left lg:space-x-8">
        <Avatar className="w-24 h-24 lg:w-32 lg:h-32 mx-auto lg:mx-0 mb-4 lg:mb-0">
          <AvatarImage src="/api/placeholder/128/128" alt="Profile" />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl lg:text-3xl">A</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-medium text-foreground mb-2">Alex Chen</h1>
          <p className="text-lg text-muted-foreground mb-4">Mindful since January 2024</p>
          <div className="flex justify-center lg:justify-start space-x-3">
            <Button variant="outline" className="rounded-xl">
              <Settings size={18} className="mr-2" />
              Settings
            </Button>
            <Button variant="outline" className="rounded-xl">
              <Share2 size={18} className="mr-2" />
              Share Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="rounded-3xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl lg:text-4xl font-medium text-foreground mb-2">{stat.value}</div>
              <div className="text-sm lg:text-base text-muted-foreground mb-2">{stat.label}</div>
              <div className="text-xs lg:text-sm text-primary">{stat.change} {stat.period}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Weekly Progress Chart */}
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <TrendingUp className="text-primary" size={24} />
                <span>This Week's Journey</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Legend */}
                <div className="flex justify-center lg:justify-start space-x-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                    <span className="text-muted-foreground">Reading</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-accent"></div>
                    <span className="text-muted-foreground">Music</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-chart-2"></div>
                    <span className="text-muted-foreground">Games</span>
                  </div>
                </div>

                {/* Chart */}
                <div className="flex items-end justify-between h-48 lg:h-64 px-4">
                  {weeklyData.map((day, index) => (
                    <div key={day.day} className="flex flex-col items-center space-y-3">
                      <div className="flex flex-col-reverse items-center space-y-reverse space-y-1 h-40 lg:h-56">
                        {/* Reading bar */}
                        <div
                          className="w-6 lg:w-8 bg-primary rounded-t-lg transition-all duration-500 hover:opacity-80"
                          style={{ height: `${(day.reading / maxValue) * 100}%` }}
                        />
                        {/* Music bar */}
                        <div
                          className="w-6 lg:w-8 bg-accent transition-all duration-500 hover:opacity-80"
                          style={{ height: `${(day.music / maxValue) * 100}%` }}
                        />
                        {/* Games bar */}
                        <div
                          className="w-6 lg:w-8 bg-chart-2 rounded-b-lg transition-all duration-500 hover:opacity-80"
                          style={{ height: `${(day.games / maxValue) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Summary */}
          <Card className="rounded-3xl bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Calendar className="text-primary" size={24} />
                <span>January Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-medium text-primary mb-2">127</div>
                  <div className="text-muted-foreground">Total Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-medium text-accent mb-2">23</div>
                  <div className="text-muted-foreground">Active Days</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-muted-foreground text-center text-lg">
                  You've been 15% more mindful than last month! 🌱
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Sidebar */}
        <div className="space-y-8">

          {/* Achievements */}
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Award className="text-accent" size={24} />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-5 rounded-3xl border-2 transition-all duration-300 ${
                    achievement.earned
                      ? 'border-primary/20 bg-primary/5'
                      : 'border-border bg-muted/30'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${achievement.color}`}>
                      <achievement.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-foreground">{achievement.title}</h3>
                        {achievement.earned && (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            Earned
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.description}
                      </p>
                      {achievement.earned ? (
                        <p className="text-xs text-primary">{achievement.date}</p>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span>{achievement.progress}/30 days</span>
                          </div>
                          <Progress 
                            value={(achievement.progress! / 30) * 100} 
                            className="h-3"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}