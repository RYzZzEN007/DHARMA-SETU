import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import sikkimHero from '@/assets/sikkim-hero.jpg';
import { Mountain, MapPin, Users, Camera } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Store user data in localStorage for demo purposes
    localStorage.setItem('tourist_name', name || 'Guest Tourist');
    localStorage.setItem('tourist_email', email || 'guest@sikkim.gov.in');
    // Reload to trigger authentication check in App.tsx
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${sikkimHero})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
      </div>

      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Welcome Section */}
          <div className="text-center lg:text-left text-white space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Mountain className="w-5 h-5 text-monastery-golden" />
                <span className="font-medium">Government of Sikkim</span>
              </div>
              
              <h1 className="font-playfair text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-gradient-sunrise block">Welcome to</span>
                <span className="text-monastery-golden">Sacred Sikkim</span>
              </h1>
              
              <p className="text-xl text-gray-200 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {t('login_welcome')} Embark on a spiritual journey through our ancient monasteries, breathtaking landscapes, and rich Buddhist heritage.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <MapPin className="w-8 h-8 text-monastery-golden mx-auto mb-2" />
                <p className="text-sm font-medium">Sacred Sites</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Camera className="w-8 h-8 text-monastery-golden mx-auto mb-2" />
                <p className="text-sm font-medium">Virtual Tours</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Users className="w-8 h-8 text-monastery-golden mx-auto mb-2" />
                <p className="text-sm font-medium">Cultural Heritage</p>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <Card className="monastery-card bg-white/95 backdrop-blur-md border-monastery-golden/30 shadow-elevated">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-playfair text-primary">
                {t('login_title')}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {t('login_description')}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      {t('name')}
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t('enter_name')}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/80 border-monastery-golden/30 focus:border-monastery-golden"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      {t('email')}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('enter_email')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/80 border-monastery-golden/30 focus:border-monastery-golden"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-monastery text-lg py-3 bg-gradient-monastery hover:shadow-golden"
                >
                  {t('begin_journey')}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>{t('login_note')}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-6 left-6 text-white/60 text-sm">
        © 2024 Government of Sikkim Tourism
      </div>
    </div>
  );
};

export default Login;