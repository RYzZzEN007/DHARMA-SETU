import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Maximize, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  monastery: {
    id: string;
    name: string;
    streetViewId?: string;
  };
}

const VirtualTourModal = ({ isOpen, onClose, monastery }: VirtualTourModalProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[80vh] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-playfair text-xl">
              {t('virtual_tour')} - {monastery.name}
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RotateCw className="w-4 h-4 mr-1" />
                Reset View
              </Button>
              <Button variant="outline" size="sm">
                <Maximize className="w-4 h-4 mr-1" />
                Fullscreen
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 relative bg-gradient-monastery">
          {/* 360° Tour Content */}
          {monastery.id === 'rumtek' ? (
            <iframe
              src="https://momento360.com/e/u/ba152d835d3f4445a0418fd599a09661?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=large&display-plan=false"
              className="w-full h-full border-0"
              allowFullScreen
              title={`${monastery.name} 360° Virtual Tour`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-monastery-brown to-monastery-golden">
              <div className="text-center text-white space-y-4 p-8">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <RotateCw className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-playfair font-bold">360° Virtual Tour</h3>
                <p className="text-white/90 max-w-md">
                  Immersive virtual tour for {monastery.name} is coming soon. 
                  Experience the monastery in stunning 360° detail.
                </p>
                <div className="flex justify-center space-x-2 mt-6">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-monastery-brown">
                    <ZoomIn className="w-4 h-4 mr-2" />
                    Zoom In
                  </Button>
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-monastery-brown">
                    <ZoomOut className="w-4 h-4 mr-2" />
                    Zoom Out
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Tour Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/50 backdrop-blur-md rounded-lg px-4 py-2 flex items-center space-x-3">
              <span className="text-white text-sm font-medium">Use mouse/touch to explore</span>
              <div className="w-px h-4 bg-white/30" />
              <span className="text-white/70 text-xs">Click and drag to look around</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VirtualTourModal;