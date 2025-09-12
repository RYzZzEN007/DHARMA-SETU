import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import MonasteryCard from '@/components/MonasteryCard';
import UserProfileWidget from '@/components/UserProfileWidget';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { monasteries } from '@/data/monasteries';
import { useLanguage } from '@/hooks/useLanguage';
import heroImage from '@/assets/hero-monastery.jpg';
import { ChevronDown, Mountain, Heart, Users } from 'lucide-react';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToMonasteries = () => {
    document.getElementById('monasteries')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Language Switcher */}
      <div className="fixed top-4 right-20 z-40">
        <LanguageSwitcher />
      </div>
      
      {/* User Profile Widget */}
      <UserProfileWidget />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Himalayan Monasteries"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        {/* Prayer Flags Animation */}
        <div className="absolute top-20 left-0 right-0 h-20">
          <div className="prayer-flags flex justify-between items-start px-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`w-8 h-6 opacity-80 ${
                  ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-white'][i % 5]
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 text-center space-y-8 px-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="space-y-4">
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {t('welcome_to')}{' '}
              <span className="text-gradient-sunrise font-dancing block mt-2">
                {t('monastery_verse')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              {t('spiritual_journey')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="btn-monastery text-lg px-8 py-4"
              onClick={scrollToMonasteries}
            >
              <Mountain className="w-5 h-5 mr-2" />
              {t('begin_journey')}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-white border-white hover:bg-white hover:text-monastery-brown text-lg px-8 py-4"
            >
              <Heart className="w-5 h-5 mr-2" />
              {t('learn_more')}
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-12 text-white/90 text-sm md:text-base">
            <div className="text-center">
              <div className="font-bold text-2xl md:text-3xl font-playfair">{monasteries.length}</div>
              <div>{t('sacred_sites')}</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl md:text-3xl font-playfair">60+</div>
              <div>{t('cultural_quests')}</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl md:text-3xl font-playfair">1000+</div>
              <div>{t('stories')}</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white hover:text-monastery-golden transition-colors duration-300"
          onClick={scrollToMonasteries}
        >
          <ChevronDown className="w-6 h-6" />
        </Button>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
            Discover Sikkim's Spiritual Heritage
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Immerse yourself in the rich Buddhist culture of Sikkim through virtual monastery tours, 
            ancient stories, and gamified quests. Connect with centuries of wisdom while preserving 
            these sacred traditions for future generations.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-monastery rounded-full flex items-center justify-center mx-auto">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-semibold">360° Virtual Tours</h3>
              <p className="text-muted-foreground">
                Explore monasteries with immersive panoramic views and guided experiences
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-saffron rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-semibold">AI Monk Wisdom</h3>
              <p className="text-muted-foreground">
                Learn from digital monks sharing ancient stories and cultural insights
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-sunrise rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-semibold">Heritage Quests</h3>
              <p className="text-muted-foreground">
                Discover hidden stories through QR code quests and cultural challenges
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Monasteries Grid Section */}
      <section id="monasteries" className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
              Sacred Monasteries of Sikkim
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each monastery holds centuries of wisdom, breathtaking architecture, 
              and stories waiting to be discovered. Choose your spiritual destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {monasteries.map((monastery, index) => (
              <div
                key={monastery.id}
                className={`transition-all duration-500 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <MonasteryCard monastery={monastery} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-monastery text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold">
            Ready to Begin Your Digital Pilgrimage?
          </h2>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            Join thousands of cultural explorers discovering Sikkim's monasteries. 
            Earn achievements, unlock stories, and become a guardian of heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-monastery-brown hover:bg-white/90 text-lg px-8 py-4"
            >
              Start Exploring
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-white border-white hover:bg-white/10 text-lg px-8 py-4"
            >
              View Profile
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-monastery-brown text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-playfair text-xl font-semibold">MonasteryVerse</h3>
            <p className="text-white/80">
              Preserving Sikkim's spiritual heritage through digital innovation 
              and cultural storytelling.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#monasteries" className="hover:text-monastery-golden transition-colors">Monasteries</a></li>
              <li><a href="/profile" className="hover:text-monastery-golden transition-colors">Profile</a></li>
              <li><a href="#" className="hover:text-monastery-golden transition-colors">About</a></li>
              <li><a href="#" className="hover:text-monastery-golden transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Heritage Partners</h4>
            <p className="text-white/80">
              In collaboration with local monasteries and cultural institutions 
              to preserve Sikkim's Buddhist heritage.
            </p>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>&copy; 2024 MonasteryVerse. Preserving heritage, inspiring souls.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;