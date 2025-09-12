import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfile } from '@/types/monastery';
import { monasteries } from '@/data/monasteries';
import { 
  Trophy, 
  MapPin, 
  Zap, 
  Calendar, 
  Star, 
  Award,
  Target,
  Book,
  Camera,
  Heart,
  Share2,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Demo user data
  const user: UserProfile = {
    id: 'demo-user',
    displayName: 'Cultural Explorer',
    email: 'demo@monasteryverse.com',
    level: 'Cultural Explorer',
    totalPoints: 150,
    visitedMonasteries: ['rumtek', 'pemayangtse', 'enchey', 'dubdi'],
    completedQuests: ['RUM_001', 'RUM_007', 'PEM_003'],
    achievements: ['First Steps', 'Story Listener', 'Virtual Pilgrim', 'Cultural Ambassador'],
    joinedDate: new Date('2024-01-15')
  };

  const levelThresholds = {
    'Novice Seeker': { points: 0, next: 100, color: 'bg-monastery-brown' },
    'Cultural Explorer': { points: 100, next: 300, color: 'bg-monastery-golden' },
    'Digital Pilgrim': { points: 300, next: 750, color: 'bg-monastery-saffron' },
    'Heritage Guardian': { points: 750, next: 1500, color: 'bg-accent' },
    'Monastery Master': { points: 1500, next: 1500, color: 'bg-gradient-monastery' }
  };

  const currentLevel = levelThresholds[user.level];
  const progressPercentage = Math.min((user.totalPoints / currentLevel.next) * 100, 100);
  const nextLevelPoints = currentLevel.next - user.totalPoints;

  const visitedMonasteriesData = monasteries.filter(m => 
    user.visitedMonasteries.includes(m.id)
  );

  const achievements = [
    { id: 'first-steps', name: 'First Steps', description: 'Visited your first monastery', icon: '👣', earned: true },
    { id: 'story-listener', name: 'Story Listener', description: 'Heard 5 monastery stories', icon: '📖', earned: true },
    { id: 'virtual-pilgrim', name: 'Virtual Pilgrim', description: 'Completed 10 quests', icon: '🎯', earned: true },
    { id: 'cultural-ambassador', name: 'Cultural Ambassador', description: 'Visited 4 different monasteries', icon: '🏛️', earned: true },
    { id: 'heritage-protector', name: 'Heritage Protector', description: 'Completed all quests in 3 monasteries', icon: '🛡️', earned: false },
    { id: 'master-explorer', name: 'Master Explorer', description: 'Visited all monasteries', icon: '🗺️', earned: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-monastery text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link to="/">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-monastery-brown">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-monastery-brown">
              <Share2 className="w-4 h-4 mr-2" />
              Share Profile
            </Button>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Avatar */}
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage src="/placeholder.svg" alt={user.displayName} />
              <AvatarFallback className="bg-white text-monastery-brown text-2xl font-bold">
                {user.displayName[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              {/* User Info */}
              <div>
                <h1 className="font-playfair text-3xl font-bold">{user.displayName}</h1>
                <p className="text-white/80">Joined {user.joinedDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}</p>
              </div>

              {/* Level Badge */}
              <Badge className="bg-white text-monastery-brown text-lg px-4 py-2">
                {user.level}
              </Badge>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.visitedMonasteries.length}</div>
                  <div className="text-sm text-white/80">Monasteries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.completedQuests.length}</div>
                  <div className="text-sm text-white/80">Quests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.achievements.length}</div>
                  <div className="text-sm text-white/80">Achievements</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.totalPoints}</div>
                  <div className="text-sm text-white/80">Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="monasteries">Monasteries</TabsTrigger>
            <TabsTrigger value="quests">Quests</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Level Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-monastery-golden" />
                    <span>Level Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-monastery-golden">
                      Level {Object.keys(levelThresholds).indexOf(user.level) + 1}
                    </div>
                    <div className="text-lg font-playfair">{user.level}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to next level</span>
                      <span>{user.totalPoints}/{currentLevel.next} points</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    {nextLevelPoints > 0 && (
                      <p className="text-sm text-muted-foreground text-center">
                        {nextLevelPoints} more points to reach the next level
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-monastery-brown" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 bg-muted/50 rounded-lg">
                      <Camera className="w-4 h-4 text-monastery-saffron" />
                      <div className="flex-1 text-sm">
                        <div className="font-medium">Completed quest at Rumtek</div>
                        <div className="text-muted-foreground">2 hours ago</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-2 bg-muted/50 rounded-lg">
                      <Book className="w-4 h-4 text-monastery-golden" />
                      <div className="flex-1 text-sm">
                        <div className="font-medium">Listened to monastery story</div>
                        <div className="text-muted-foreground">1 day ago</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-2 bg-muted/50 rounded-lg">
                      <MapPin className="w-4 h-4 text-monastery-brown" />
                      <div className="flex-1 text-sm">
                        <div className="font-medium">Visited Pemayangtse Monastery</div>
                        <div className="text-muted-foreground">3 days ago</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`${
                  achievement.earned 
                    ? 'bg-gradient-to-br from-monastery-golden/10 to-monastery-saffron/10 border-monastery-golden/30' 
                    : 'opacity-50'
                }`}>
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div>
                      <h3 className="font-playfair font-semibold">{achievement.name}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <Badge className="bg-monastery-golden text-white">
                        <Trophy className="w-3 h-3 mr-1" />
                        Earned
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Monasteries Tab */}
          <TabsContent value="monasteries" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {visitedMonasteriesData.map((monastery) => (
                <Card key={monastery.id} className="overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={monastery.image}
                      alt={monastery.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-playfair font-semibold">{monastery.name}</h3>
                        <p className="text-sm text-muted-foreground">{monastery.description}</p>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        Visited
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Quest Progress</span>
                        <span>{monastery.questsCompleted || 0}/{monastery.questTotal}</span>
                      </div>
                      <Progress value={((monastery.questsCompleted || 0) / monastery.questTotal) * 100} />
                    </div>
                    
                    <Link to={`/monastery/${monastery.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Camera className="w-4 h-4 mr-2" />
                        Revisit
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Quests Tab */}
          <TabsContent value="quests" className="space-y-6">
            <div className="grid gap-4">
              {user.completedQuests.map((questId, index) => (
                <Card key={questId}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-monastery-golden rounded-full flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">Quest Completed</h4>
                          <p className="text-sm text-muted-foreground">Heritage quest #{questId}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-monastery-green text-white">
                          +15 points
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;