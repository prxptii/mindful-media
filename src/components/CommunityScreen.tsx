import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Calendar, Users, BookOpen, Music, Gamepad2, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface CommunityPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  activity: {
    type: 'reading' | 'music' | 'games';
    title: string;
    duration: string;
  };
  message: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isLiked: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  attendees: number;
  maxAttendees: number;
  type: 'reading' | 'music' | 'mindfulness';
}

export function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      user: { name: 'Sarah Chen', avatar: '/api/placeholder/40/40', initials: 'SC' },
      activity: { type: 'reading', title: 'The Seven Husbands of Evelyn Hugo', duration: '2h 15m' },
      message: 'What an incredible journey! This book had me laughing, crying, and everything in between. The storytelling is absolutely masterful. 📚✨',
      likes: 24,
      comments: 8,
      timeAgo: '2 hours ago',
      isLiked: false
    },
    {
      id: '2',
      user: { name: 'Marcus Rodriguez', avatar: '/api/placeholder/40/40', initials: 'MR' },
      activity: { type: 'music', title: 'Bon Iver - For Emma, Forever Ago', duration: '37m' },
      message: 'Sometimes you need an album that just understands your soul. This rainy afternoon called for some introspective folk. 🎵',
      likes: 18,
      comments: 5,
      timeAgo: '4 hours ago',
      isLiked: true
    },
    {
      id: '3',
      user: { name: 'Emma Thompson', avatar: '/api/placeholder/40/40', initials: 'ET' },
      activity: { type: 'games', title: 'Stardew Valley', duration: '1h 30m' },
      message: 'There\'s something so therapeutic about tending to virtual crops and building relationships in this cozy world. Perfect for unwinding! 🌱',
      likes: 31,
      comments: 12,
      timeAgo: '6 hours ago',
      isLiked: false
    }
  ]);

  const events: Event[] = [
    {
      id: '1',
      title: 'Virtual Book Club: "Atomic Habits"',
      description: 'Join us for a discussion about building better habits and breaking bad ones.',
      date: 'Jan 25',
      time: '7:00 PM',
      attendees: 12,
      maxAttendees: 20,
      type: 'reading'
    },
    {
      id: '2',
      title: 'Mindful Music Listening Session',
      description: 'A guided session focusing on active listening and musical appreciation.',
      date: 'Jan 27',
      time: '2:00 PM',
      attendees: 8,
      maxAttendees: 15,
      type: 'music'
    },
    {
      id: '3',
      title: 'Digital Detox Challenge',
      description: 'Week-long challenge to reduce screen time and increase mindful activities.',
      date: 'Feb 1',
      time: 'All Day',
      attendees: 45,
      maxAttendees: 100,
      type: 'mindfulness'
    }
  ];

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'reading': return BookOpen;
      case 'music': return Music;
      case 'games': return Gamepad2;
      default: return BookOpen;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'reading': return 'text-primary bg-primary/10';
      case 'music': return 'text-accent bg-accent/10';
      case 'games': return 'text-chart-2 bg-chart-2/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'reading': return 'bg-primary/10 text-primary border-primary/20';
      case 'music': return 'bg-accent/10 text-accent border-accent/20';
      case 'mindfulness': return 'bg-chart-4/10 text-chart-4 border-chart-4/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl font-medium text-foreground mb-2">Community</h1>
        <p className="text-lg text-muted-foreground">Connect with fellow mindful media enthusiasts</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto lg:mx-0 grid-cols-2 rounded-2xl bg-muted/30 p-1">
          <TabsTrigger value="feed" className="rounded-xl text-base py-3">Feed</TabsTrigger>
          <TabsTrigger value="events" className="rounded-xl text-base py-3">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Feed - 2/3 width on desktop */}
            <div className="lg:col-span-2 space-y-6">
              {/* Share Box */}
              <Card className="rounded-3xl border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">A</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-muted-foreground text-lg">
                      Share your mindful moment...
                    </div>
                    <Button className="rounded-xl">
                      <Plus size={18} className="mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Feed Posts */}
              {posts.map((post) => {
                const ActivityIcon = getActivityIcon(post.activity.type);
                return (
                  <Card key={post.id} className="rounded-3xl">
                    <CardContent className="p-8">
                      {/* User Header */}
                      <div className="flex items-center space-x-4 mb-6">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={post.user.avatar} alt={post.user.name} />
                          <AvatarFallback>{post.user.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground text-lg">{post.user.name}</h3>
                          <p className="text-muted-foreground">{post.timeAgo}</p>
                        </div>
                      </div>

                      {/* Activity Badge */}
                      <div className="mb-6">
                        <Badge className={`${getActivityColor(post.activity.type)} border-0 py-2 px-4 rounded-xl text-sm`}>
                          <ActivityIcon size={16} className="mr-2" />
                          {post.activity.title} • {post.activity.duration}
                        </Badge>
                      </div>

                      {/* Message */}
                      <p className="text-foreground mb-6 leading-relaxed text-lg">{post.message}</p>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-6 border-t border-border/50">
                        <div className="flex items-center space-x-8">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center space-x-2 transition-colors ${
                              post.isLiked ? 'text-accent' : 'text-muted-foreground hover:text-accent'
                            }`}
                          >
                            <Heart size={20} className={post.isLiked ? 'fill-current' : ''} />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                            <MessageCircle size={20} />
                            <span>{post.comments}</span>
                          </button>
                        </div>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <Share2 size={20} />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Sidebar - 1/3 width on desktop */}
            <div className="space-y-6">
              <Card className="rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10">
                <CardContent className="p-6 text-center">
                  <Users className="mx-auto mb-4 text-primary" size={32} />
                  <h3 className="font-medium text-foreground mb-2">Active Members</h3>
                  <p className="text-2xl font-medium text-primary mb-1">1,247</p>
                  <p className="text-sm text-muted-foreground">online now</p>
                </CardContent>
              </Card>

              <Card className="rounded-3xl">
                <CardContent className="p-6">
                  <h3 className="font-medium text-foreground mb-4">Trending Activities</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">#AtomicHabits</span>
                      <span className="text-sm text-primary">124 posts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">#VinylCollection</span>
                      <span className="text-sm text-primary">89 posts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">#MindfulGaming</span>
                      <span className="text-sm text-primary">67 posts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-8">
          <div className="space-y-8">
            {/* Events Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <h2 className="text-2xl font-medium text-foreground">Upcoming Events</h2>
              <Button variant="outline" className="rounded-xl">
                <Calendar size={18} className="mr-2" />
                My Events
              </Button>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="rounded-3xl">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-xl font-medium text-foreground">{event.title}</h3>
                            <Badge className={`${getEventTypeColor(event.type)} border`}>
                              {event.type}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {event.description}
                          </p>
                          
                          {/* Event Details */}
                          <div className="space-y-2 text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <span>{event.date} at {event.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users size={16} />
                              <span>{event.attendees}/{event.maxAttendees} attending</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Join Button */}
                    <Button className="w-full rounded-2xl bg-primary hover:bg-primary/90 py-6">
                      Join Event
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {/* Create Event */}
              <Card className="rounded-3xl border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-8 text-center flex flex-col justify-center min-h-[300px]">
                  <Plus className="text-muted-foreground mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-medium text-muted-foreground mb-2">Create Event</h3>
                  <p className="text-muted-foreground">
                    Host your own mindful gathering and bring the community together
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}