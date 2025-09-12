import { ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/hooks/useLanguage';
import { languages } from '@/data/translations';

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  const currentLangData = languages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 bg-white/90 backdrop-blur-sm border-white/20">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLangData?.nativeName}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border-white/20">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={`flex items-center justify-between cursor-pointer ${
              currentLanguage === language.code 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'hover:bg-muted/50'
            }`}
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">{language.nativeName}</span>
              <span className="text-xs text-muted-foreground">{language.name}</span>
            </div>
            {currentLanguage === language.code && (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;