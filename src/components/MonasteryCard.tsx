import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Monastery } from '@/types/monastery';
import { MapPin, Camera, Zap, ChevronRight } from 'lucide-react';

interface MonasteryCardProps {
  monastery: Monastery;
  className?: string;
}

const MonasteryCard = ({ monastery, className = '' }: MonasteryCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const questProgress = (monastery.questsCompleted || 0) / monastery.questTotal * 100;
  
  const difficultyColors = {
    Novice: 'bg-monastery-green text-white',
    Intermediate: 'bg-monastery-golden text-white',
    Expert: 'bg-monastery-saffron text-white'
  };

  const handleLocationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${monastery.coordinates.lat},${monastery.coordinates.lng}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <Card className={`monastery-card group relative overflow-hidden ${className}`}>
      <div className="relative">
        {/* Monastery Image */}
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          {!imageError ? (
            <img
              src={monastery.image}
              alt={monastery.name}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-monastery text-white">
              <Camera className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Difficulty Badge */}
        <Badge 
          className={`absolute top-3 right-3 ${difficultyColors[monastery.difficulty]} shadow-lg`}
        >
          {monastery.difficulty}
        </Badge>

        {/* Quest Progress Indicator */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 text-white">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Quests
              </span>
              <span>{monastery.questsCompleted || 0}/{monastery.questTotal}</span>
            </div>
            <Progress 
              value={questProgress} 
              className="h-1.5 bg-white/20"
            />
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Monastery Info */}
        <div className="space-y-2">
          <h3 className="font-playfair font-semibold text-xl text-foreground group-hover:text-monastery-golden transition-colors">
            {monastery.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {monastery.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link to={`/monastery/${monastery.id}`} className="block">
            <Button className="btn-monastery w-full group/btn">
              <Camera className="w-4 h-4 mr-2" />
              Explore Virtual Tour
              <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLocationClick}
              className="text-monastery-brown border-monastery-brown hover:bg-monastery-brown hover:text-white"
            >
              <MapPin className="w-4 h-4 mr-1" />
              Locate
            </Button>
            
            <Link to={`/monastery/${monastery.id}?tab=quests`}>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-monastery-saffron border-monastery-saffron hover:bg-monastery-saffron hover:text-white"
              >
                <Zap className="w-4 h-4 mr-1" />
                Start Quest
              </Button>
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        {monastery.visitingHours && (
          <div className="text-xs text-muted-foreground border-t pt-3">
            <span className="font-medium">Hours:</span> {monastery.visitingHours}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonasteryCard;