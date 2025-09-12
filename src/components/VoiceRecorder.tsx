import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX, Settings } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
  onRecordingStateChange: (isRecording: boolean) => void;
}

const VoiceRecorder = ({ onTranscription, onRecordingStateChange }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [volume, setVolume] = useState([0.7]);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const { currentLanguage, t } = useLanguage();
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // Language mappings for speech recognition
  const speechLanguageMap = {
    en: 'en-US',
    hi: 'hi-IN',
    ne: 'ne-NP',
    bho: 'hi-IN', // Fallback to Hindi for Bhojpuri
    si: 'en-US'   // Fallback to English for Sikkimese
  };

  useEffect(() => {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition && !!navigator.mediaDevices);

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = speechLanguageMap[currentLanguage];
      
      recognitionRef.current.onstart = () => {
        setIsRecording(true);
        onRecordingStateChange(true);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
        onRecordingStateChange(false);
      };
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscription(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        onRecordingStateChange(false);
      };
    }

    // Load available voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      // Auto-select appropriate voice for current language
      const languageVoices = voices.filter(voice => 
        voice.lang.toLowerCase().includes(currentLanguage === 'hi' ? 'hi' :
          currentLanguage === 'ne' ? 'ne' : 'en')
      );
      
      if (languageVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(languageVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [currentLanguage, onRecordingStateChange, onTranscription, selectedVoice]);

  const startRecording = async () => {
    if (!isSupported || !recognitionRef.current) return;

    try {
      // Update language before starting
      recognitionRef.current.lang = speechLanguageMap[currentLanguage];
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  const testVoice = () => {
    if (isMuted) return;
    
    const utterance = new SpeechSynthesisUtterance(t('voice_test_message'));
    utterance.volume = volume[0];
    
    if (selectedVoice) {
      const voice = availableVoices.find(v => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {/* Recording Button */}
      <Button
        variant={isRecording ? "destructive" : "outline"}
        size="icon"
        onClick={isRecording ? stopRecording : startRecording}
        className={`transition-all duration-300 ${
          isRecording 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'border-monastery-golden/50 hover:border-monastery-golden'
        }`}
      >
        {isRecording ? (
          <MicOff className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
      </Button>

      {/* Voice Settings Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Settings className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="monastery-card bg-card/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-primary font-playfair">{t('voice_settings')}</DialogTitle>
            <DialogDescription>
              {t('customize_voice_experience')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Volume Control */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-muted-foreground hover:text-primary"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <span className="text-sm font-medium">{t('volume')}</span>
              </div>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={1}
                min={0}
                step={0.1}
                disabled={isMuted}
                className="flex-1"
              />
              <div className="text-xs text-muted-foreground">
                {Math.round(volume[0] * 100)}%
              </div>
            </div>

            {/* Voice Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">{t('voice_selection')}</label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger className="bg-white/80">
                  <SelectValue placeholder={t('select_voice')} />
                </SelectTrigger>
                <SelectContent>
                  {availableVoices
                    .filter(voice => 
                      voice.lang.toLowerCase().includes(
                        currentLanguage === 'hi' ? 'hi' :
                        currentLanguage === 'ne' ? 'ne' : 'en'
                      )
                    )
                    .map((voice) => (
                      <SelectItem key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Test Voice Button */}
            <Button
              onClick={testVoice}
              disabled={isMuted}
              className="w-full btn-monastery"
            >
              {t('test_voice')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VoiceRecorder;