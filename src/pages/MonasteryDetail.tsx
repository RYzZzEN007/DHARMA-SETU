import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { monasteries, demoQuests, monkStories } from '@/data/monasteries';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import QRScannerComponent from '@/components/QRScanner';
import VirtualTourModal from '@/components/VirtualTourModal';
import MonasteryMapModal from '@/components/MonasteryMapModal';
import monkAvatar from '/lovable-uploads/189bac6c-05ee-4b5a-9b09-e5b609298d78.png';
import { 
  ArrowLeft, 
  Camera, 
  MessageCircle, 
  QrCode, 
  MapPin, 
  Clock, 
  Star, 
  Volume2,
  Play,
  Pause,
  RotateCw,
  Maximize,
  Zap,
  Trophy,
  BookOpen,
  X
} from 'lucide-react';

const MonasteryDetail = () => {
  const { monasteryId } = useParams();
  const { t } = useLanguage();
  const monastery = monasteries.find(m => m.id === monasteryId);
  
  const [activeTab, setActiveTab] = useState('tour');
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{type: 'user' | 'monk', content: string}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isMonkSpeaking, setIsMonkSpeaking] = useState(false);
  const [questsCompleted, setQuestsCompleted] = useState(0);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  // Enhanced Gemini API chatbot functionality
  const [isTyping, setIsTyping] = useState(false);

  const generateGeminiResponse = async (userMessage: string) => {
    try {
      // For now, we'll use enhanced pre-written responses with voice synthesis
      // In production, you'd integrate with Gemini API via Supabase Edge Function
      const enhancedResponses = [
        `${t('monk_greeting')} ${monastery.history} This sacred place holds deep significance in our Buddhist tradition, where countless monks have meditated and found enlightenment.`,
        
        `Ah, let me share the wisdom of this holy site... ${monkStories.find(s => s.monasteryId === monastery.id)?.content || 'Long ago, this monastery was blessed by great masters who saw visions of protective deities choosing this very location.'} The energy here is truly transformative.`,
        
        `The architecture you see embodies our deepest spiritual teachings. Each pillar represents the Noble Eightfold Path, each prayer flag carries mantras to the heavens. When you observe closely, you'll notice how every element serves both aesthetic and spiritual purposes.`,
        
        `During our sacred festivals like ${monastery.festivals?.[0] || 'Losar'}, this monastery comes alive with ancient chants, mask dances, and the resonating sound of long horns. The spiritual energy during these times is overwhelming - pilgrims travel from distant lands to witness these blessed ceremonies.`,
        
        `You know, young friend, this monastery has witnessed centuries of prayers, tears of joy, and moments of enlightenment. The walls themselves seem to vibrate with accumulated spiritual merit. Many visitors report feeling a profound sense of peace here, as if the Buddha himself walked these grounds.`
      ];
      
      const response = enhancedResponses[Math.floor(Math.random() * enhancedResponses.length)];
      
      // Add voice synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.rate = 0.8;
        utterance.pitch = 0.9;
        utterance.volume = 0.7;
        
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
          voice.name.includes('Daniel') || 
          voice.name.includes('Alex') || 
          voice.lang.includes('en-')
        );
        if (preferredVoice) utterance.voice = preferredVoice;
        
        utterance.onstart = () => setIsMonkSpeaking(true);
        utterance.onend = () => setIsMonkSpeaking(false);
        
        setTimeout(() => window.speechSynthesis.speak(utterance), 500);
      }
      
      return response;
    } catch (error) {
      return `Forgive me, dear friend. In this moment of technological challenge, let me share from my heart... The essence of ${monastery.name} lies not just in its physical beauty, but in the centuries of devotion that have blessed this sacred ground.`;
    }
  };

  useEffect(() => {
    // Welcome message from monk
    if (monastery) {
      setChatMessages([{
        type: 'monk',
        content: `Welcome, traveler, to ${monastery.name}. I am here to share the ancient wisdom and stories of this sacred place. What would you like to know about our monastery?`
      }]);
    }
  }, [monastery]);

  if (!monastery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Monastery Not Found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    setChatMessages(prev => [...prev, { type: 'user', content: currentMessage }]);
    setCurrentMessage('');
    setIsTyping(true);
    
    // Simulate monk thinking and generating response
    setTimeout(async () => {
      setIsMonkSpeaking(true);
      
      try {
        const response = await generateGeminiResponse(currentMessage);
        setChatMessages(prev => [...prev, { type: 'monk', content: response }]);
      } catch (error) {
        setChatMessages(prev => [...prev, { 
          type: 'monk', 
          content: `My apologies, dear friend. Let me share what I know from my years of meditation here at ${monastery.name}...` 
        }]);
      } finally {
        setIsMonkSpeaking(false);
        setIsTyping(false);
      }
    }, 1500);
  };

  const handleQuestComplete = () => {
    setIsQRScannerOpen(true);
  };

  const handleQRScan = (data: string) => {
    setIsQRScannerOpen(false);
    setQuestsCompleted(prev => prev + 1);
    // Show completion notification
  };

  const closeChatInterface = () => {
    setIsChatVisible(false);
    window.speechSynthesis?.cancel();
  };

  const openChatInterface = () => {
    setIsChatVisible(true);
  };

  const questProgress = (questsCompleted / monastery.questTotal) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('back_to_monasteries') || 'Back to Monasteries'}
                </Button>
              </Link>
              <div>
                <h1 className="font-playfair text-xl md:text-2xl font-bold">{monastery.name}</h1>
                <p className="text-sm text-muted-foreground">{monastery.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge className={`${
                monastery.difficulty === 'Novice' ? 'bg-monastery-green' :
                monastery.difficulty === 'Intermediate' ? 'bg-monastery-golden' : 
                'bg-monastery-saffron'
              } text-white`}>
                {monastery.difficulty}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMapOpen(true)}
              >
                <MapPin className="w-4 h-4 mr-1" />
                Locate
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setIsVirtualTourOpen(true)}>
            <div className="aspect-video bg-gradient-monastery relative">
              <img
                src={monastery.image}
                alt={monastery.name}
                className="w-full h-full object-cover"
              />
              
              {/* 360° Tour Overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/20 transition-colors">
                <div className="text-white text-center space-y-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    <Camera className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{t('virtual_tour')}</h3>
                    <p className="text-white/90 mb-4">Click to explore in 360°</p>
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <Play className="w-4 h-4" />
                      <span className="text-sm font-medium">Start Tour</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Monastery Information Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tour">{t('virtual_tour')}</TabsTrigger>
              <TabsTrigger value="history">{t('history')}</TabsTrigger>
              <TabsTrigger value="festivals">{t('festivals')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tour" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('monastery_info')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {monastery.significance || t('default_monastery_desc')}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-monastery-golden" />
                      <span><strong>{t('visiting_hours')}:</strong> {monastery.visitingHours}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-monastery-brown" />
                      <span><strong>{t('location')}:</strong> Sikkim, India</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>{t('significance')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {monastery.history || t('default_history_desc')}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="festivals">
              <Card>
                <CardHeader>
                  <CardTitle>{t('festivals')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {monastery.festivals?.map((festival, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <Trophy className="w-5 h-5 text-monastery-golden" />
                        <span className="font-medium">{festival}</span>
                      </div>
                    )) || (
                      <p className="text-muted-foreground">{t('festivals_coming_soon')}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - 3D Monk Avatar & Floating Chat */}
        <div className="space-y-6 relative">
          {/* Sitting Meditation Monk with Floating Chat */}
          <div className="relative h-96 flex flex-col items-center justify-end">
            {/* Floating Chat Interface - positioned above monk */}
            {isChatVisible && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 z-20 mb-4">
                <div className="floating-chat-bubble bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-monastery-golden/30 p-4 space-y-3">
                  {/* Chat Header with Close Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-monastery-green rounded-full animate-pulse"></div>
                      <h3 className="font-playfair text-sm font-semibold text-monastery-brown">
                        {isTyping ? 'Monk is contemplating...' : 'Wisdom Keeper'}
                      </h3>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Volume2 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={closeChatInterface}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                {/* Chat Messages */}
                <div className="h-32 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-monastery-golden/30">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                          message.type === 'user'
                            ? 'bg-monastery-brown text-white rounded-br-sm'
                            : 'bg-monastery-golden/20 text-monastery-brown rounded-bl-sm'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-monastery-golden/20 text-monastery-brown px-3 py-2 rounded-xl text-xs">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-monastery-brown rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-monastery-brown rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-monastery-brown rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Questions */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Ask me about:</p>
                  <div className="flex space-x-2 overflow-x-auto pb-1">
                    {[
                      "Founding story",
                      "Sacred significance", 
                      "Local legends",
                      "Meditation practices"
                    ].map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 px-3 flex-shrink-0 border-monastery-golden/50 hover:bg-monastery-golden/10"
                        onClick={() => {
                          setCurrentMessage(`Tell me about the ${question.toLowerCase()}`);
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="flex space-x-2 pt-2 border-t border-monastery-golden/20">
                  <input
                    type="text"
                    placeholder={t('ask_monk') || 'Ask the wise monk...'}
                    className="flex-1 px-3 py-2 text-xs border border-monastery-golden/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-monastery-golden/50 bg-white/50"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isTyping}
                  />
                  <Button 
                    size="sm" 
                    onClick={handleSendMessage}
                    className="h-8 px-3 bg-monastery-golden hover:bg-monastery-golden/80"
                    disabled={isTyping || !currentMessage.trim()}
                  >
                    <MessageCircle className="w-3 h-3" />
                  </Button>
                </div>

                {/* Chat Bubble Pointer */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/95 border-b border-r border-monastery-golden/30 rotate-45"></div>
              </div>
            </div>
            )}

            {/* Sitting Meditation Monk */}
            <div className="relative z-10 transform transition-all duration-1000">
              <div className={`monk-meditation-container ${isMonkSpeaking ? 'monk-speaking' : 'monk-meditating'}`}>
                <div className="relative">
                  <div 
                    className="cursor-pointer"
                    onClick={!isChatVisible ? openChatInterface : undefined}
                  >
                    <img
                      src={monkAvatar}
                      alt="Wise Meditation Monk"
                      className="w-40 h-40 rounded-full object-cover shadow-2xl border-4 border-monastery-golden transform-gpu meditation-pose hover:scale-105 transition-transform"
                    />
                    
                    {/* Meditation Aura */}
                    <div className="absolute inset-0 rounded-full bg-monastery-golden/20 animate-pulse meditation-aura"></div>
                  </div>
                  
                  {/* Speaking Indicator */}
                  {isMonkSpeaking && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-monastery-saffron rounded-full animate-pulse flex items-center justify-center">
                      <Volume2 className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  {/* Wisdom Energy */}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-monastery-golden rounded-full animate-bounce wisdom-energy" style={{animationDelay: '0s'}}></div>
                  <div className="absolute -top-2 left-1/3 transform -translate-x-1/2 w-2 h-2 bg-monastery-saffron rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                  <div className="absolute -top-3 right-1/3 transform translate-x-1/2 w-2 h-2 bg-monastery-green rounded-full animate-bounce" style={{animationDelay: '0.6s'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quest System */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-monastery-saffron" />
                  <span>Heritage Quests</span>
                </span>
                <Badge variant="outline" className="progress-glow">
                  {questsCompleted}/{monastery.questTotal}
                </Badge>
              </CardTitle>
              <Progress value={questProgress} className="h-2" />
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-saffron rounded-full flex items-center justify-center mx-auto animate-quest-pulse">
                  <QrCode className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Scan QR Quest</h3>
                  <p className="text-sm text-muted-foreground">
                    Find QR codes around the monastery to unlock hidden stories
                  </p>
                </div>
              </div>

              <Button 
                className="btn-saffron w-full" 
                size="lg"
                onClick={handleQuestComplete}
              >
                <Camera className="w-5 h-5 mr-2" />
                {t('qr_scanner')}
              </Button>

              {/* Recent Quests */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Available Quests:</h4>
                {demoQuests
                  .filter(q => q.monasteryId === monastery.id)
                  .slice(0, 3)
                  .map((quest, index) => (
                    <div key={quest.id} className="p-2 bg-muted/50 rounded text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            quest.difficulty === 'Easy' ? 'border-monastery-green' :
                            quest.difficulty === 'Medium' ? 'border-monastery-golden' :
                            'border-monastery-saffron'
                          }`}
                        >
                          {quest.difficulty}
                        </Badge>
                        <span className="font-medium">{quest.points} pts</span>
                      </div>
                      <p className="text-muted-foreground">{quest.type}</p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {isQRScannerOpen && (
        <QRScannerComponent 
          onScan={handleQRScan}
          onClose={() => setIsQRScannerOpen(false)}
        />
      )}

      {/* Floating Action to Re-open Chat */}
      {!isChatVisible && (
        <div 
          className="fixed bottom-8 right-8 cursor-pointer z-40"
          onClick={openChatInterface}
        >
          <div className="w-16 h-16 bg-gradient-monastery rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
        </div>
      )}

      {/* Virtual Tour Modal */}
      <VirtualTourModal 
        isOpen={isVirtualTourOpen} 
        onClose={() => setIsVirtualTourOpen(false)} 
        monastery={monastery} 
      />

      {/* Map Modal */}
      <MonasteryMapModal 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
        monastery={monastery} 
      />

      {/* QR Scanner Modal */}
      {isQRScannerOpen && (
        <QRScannerComponent 
          onClose={() => setIsQRScannerOpen(false)} 
          onScan={handleQRScan} 
        />
      )}
    </div>
  );
};

export default MonasteryDetail;