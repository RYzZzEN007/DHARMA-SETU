import { useState, useEffect, useRef } from 'react';
import { Camera, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import QrScanner from 'qr-scanner';

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

const QRScannerComponent = ({ onScan, onClose }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializeScanner();
    return () => {
      if (scannerRef.current) {
        scannerRef.current.destroy();
      }
    };
  }, []);

  const initializeScanner = async () => {
    try {
      const hasCamera = await QrScanner.hasCamera();
      if (!hasCamera) {
        toast({
          title: "No Camera Found",
          description: "This device doesn't have a camera available for QR scanning.",
          variant: "destructive",
        });
        return;
      }

      if (videoRef.current) {
        scannerRef.current = new QrScanner(
          videoRef.current,
          (result) => {
            console.log('QR Code detected:', result.data);
            handleQRDetected(result.data);
          },
          {
            highlightScanRegion: true,
            highlightCodeOutline: true,
            maxScansPerSecond: 5,
          }
        );
        
        setHasPermission(true);
      }
    } catch (error) {
      console.error('Failed to initialize QR scanner:', error);
      setHasPermission(false);
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to scan QR codes.",
        variant: "destructive",
      });
    }
  };

  const handleQRDetected = (data: string) => {
    setIsScanning(false);
    if (scannerRef.current) {
      scannerRef.current.stop();
    }
    
    toast({
      title: "QR Code Detected!",
      description: "Processing the discovered content...",
    });
    
    // Check if it's a URL and redirect
    if (data.startsWith('http://') || data.startsWith('https://')) {
      setTimeout(() => {
        window.open(data, '_blank');
      }, 1000);
    }
    
    onScan(data);
  };

  const startScanning = async () => {
    if (!scannerRef.current) {
      await initializeScanner();
    }
    
    if (scannerRef.current && hasPermission) {
      try {
        await scannerRef.current.start();
        setIsScanning(true);
        toast({
          title: "QR Scanner Active",
          description: "Point your camera at a QR code to scan it.",
        });
      } catch (error) {
        console.error('Failed to start QR scanner:', error);
        toast({
          title: "Scanner Error",
          description: "Failed to start the camera. Please check permissions.",
          variant: "destructive",
        });
      }
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
    }
    setIsScanning(false);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-monastery text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">QR Code Scanner</h3>
              <p className="text-sm text-white/80">Scan monastery quest codes</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Scanner Area */}
        <div className="p-6 space-y-4">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-square">
            {hasPermission === false ? (
              <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                <div className="space-y-3">
                  <Camera className="w-12 h-12 mx-auto text-white/60" />
                  <p className="text-sm">Camera permission required to scan QR codes</p>
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                />
                {!isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Button
                      onClick={startScanning}
                      className="btn-monastery"
                      size="lg"
                      disabled={!hasPermission}
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Start Scanner
                    </Button>
                  </div>
                )}
                
                {isScanning && (
                  <div className="absolute inset-4 border-2 border-white rounded-lg">
                    <div className="absolute inset-0 border-4 border-monastery-golden/60 rounded-lg animate-pulse">
                      {/* Corner indicators */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg"></div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {isScanning && (
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Position the QR code within the scanner frame
              </p>
              <Button
                onClick={stopScanning}
                variant="outline"
                size="sm"
              >
                Stop Scanning
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScannerComponent;