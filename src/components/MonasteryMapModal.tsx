import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Navigation, MapPin, Route } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface MonasteryMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  monastery: {
    id: string;
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

const MonasteryMapModal = ({ isOpen, onClose, monastery }: MonasteryMapModalProps) => {
  const { t } = useLanguage();

  const openGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${monastery.coordinates.lat},${monastery.coordinates.lng}&travelmode=driving`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[70vh] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-playfair text-xl">
              {t('locate')} - {monastery.name}
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={openGoogleMaps}>
                <Navigation className="w-4 h-4 mr-1" />
                Get Directions
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 relative">
          {/* Demo Map Interface */}
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
            {/* Map Background */}
            <div className="absolute inset-0 opacity-30">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                {/* Mountain ranges */}
                <path d="M0,200 Q100,150 200,180 T400,160" fill="#8B7355" opacity="0.6"/>
                <path d="M0,220 Q150,170 300,190 T400,180" fill="#A0956B" opacity="0.5"/>
                
                {/* Roads */}
                <path d="M50,250 Q150,200 250,220 T380,200" stroke="#666" strokeWidth="3" fill="none" strokeDasharray="5,5"/>
                <path d="M100,280 Q200,230 300,250" stroke="#888" strokeWidth="2" fill="none"/>
                
                {/* Trees */}
                {Array.from({length: 15}).map((_, i) => (
                  <circle key={i} cx={50 + i * 25} cy={240 + Math.sin(i) * 20} r="3" fill="#2D5016" opacity="0.7"/>
                ))}
              </svg>
            </div>

            {/* Main Map Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-md text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-monastery rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-playfair font-bold text-monastery-brown mb-2">
                    {monastery.name}
                  </h3>
                  <p className="text-muted-foreground">
                    Located in the heart of Sikkim's sacred valleys
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4 text-monastery-golden" />
                    <span>Coordinates: {monastery.coordinates.lat}°N, {monastery.coordinates.lng}°E</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Route className="w-4 h-4 text-monastery-brown" />
                    <span>Accessible by road from Gangtok</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button onClick={openGoogleMaps} className="w-full">
                    <Navigation className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Get turn-by-turn directions to the monastery
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 bg-white/80 rounded-lg p-3 shadow-lg">
              <div className="text-xs font-medium text-monastery-brown">Sikkim Tourism</div>
              <div className="text-xs text-muted-foreground">Sacred Heritage Route</div>
            </div>

            <div className="absolute bottom-4 right-4 bg-white/80 rounded-lg p-2 shadow-lg">
              <div className="text-xs text-muted-foreground">Demo Map View</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MonasteryMapModal;