import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRight, ChevronLeft, Trophy, Star, MapPin, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import touristAvatar from '@/assets/tourist-avatar.jpg';
import { useLanguage } from '@/hooks/useLanguage';

const UserProfileWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userData, setUserData] = useState({
    name: "Tourist",
    email: "guest@sikkim.gov.in",
    avatar: touristAvatar,
    level: "Spiritual Explorer",
    totalPoints: 1250,
    monasteryVisits: 3,
    questsCompleted: 8,
    badges: ["First Visit", "Quest Master", "Culture Explorer"]
  });
  const { t } = useLanguage();

  useEffect(() => {
    // Load user data from localStorage
    const touristName = localStorage.getItem('tourist_name') || 'Tourist';
    const touristEmail = localStorage.getItem('tourist_email') || 'guest@sikkim.gov.in';
    
    setUserData(prev => ({
      ...prev,
      name: touristName,
      email: touristEmail
    }));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('tourist_name');
    localStorage.removeItem('tourist_email');
    window.location.reload(); // This will trigger re-authentication
  };

  const currentLevel = {
    current: "Spiritual Explorer",
    next: 2000,
    description: t('spiritual_seeker_desc') || 'Journey through sacred monasteries'
  };

  const progressPercentage = Math.min((userData.totalPoints / currentLevel.next) * 100, 100);

  return (
    <div className="fixed top-16 right-4 z-40">
      <Card 
        className={`monastery-card bg-card/95 backdrop-blur-md border-monastery-golden/30 transition-all duration-300 ${
          isExpanded ? 'w-80' : 'w-16'
        }`}
      >
        <CardContent className="p-3">
          {isExpanded ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-12 w-12 border-2 border-monastery-golden/50">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-playfair text-lg font-semibold text-primary">{userData.name}</h3>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('progress_to_next_level') || 'Progress to next level'}</span>
                  <span className="font-medium">{userData.totalPoints}/{currentLevel.next}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="text-lg font-bold text-primary">{userData.monasteryVisits}</div>
                  <div className="text-xs text-muted-foreground">{t('visits') || 'Visits'}</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="text-lg font-bold text-secondary">{userData.questsCompleted}</div>
                  <div className="text-xs text-muted-foreground">{t('quests') || 'Quests'}</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="text-lg font-bold text-accent">{userData.badges.length}</div>
                  <div className="text-xs text-muted-foreground">{t('badges') || 'Badges'}</div>
                </div>
              </div>

              {/* Recent Badges */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-primary">{t('recent_badges') || 'Recent Badges'}</h4>
                <div className="flex flex-wrap gap-1">
                  {userData.badges.slice(0, 3).map((badge, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Logout Button */}
              <Button 
                onClick={handleLogout}
                variant="outline" 
                size="sm" 
                className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4" />
                {t('logout') || 'Logout'}
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(true)}
              className="w-full h-full p-3 text-primary hover:text-secondary transition-colors duration-300"
            >
              <Avatar className="h-8 w-8 border border-monastery-golden/30">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="text-xs font-medium">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileWidget;