export type Language = 'en' | 'hi' | 'ne' | 'bho' | 'si';

export const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी' },
  { code: 'si', name: 'Sikkimese', nativeName: 'སུ་ཁ་པོ།' }
];

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Login & Auth
    login_welcome: "Discover the spiritual heart of the Himalayas.",
    login_title: "Begin Your Journey",
    login_description: "Enter your details to explore Sikkim's sacred monasteries",
    name: "Full Name",
    email: "Email Address", 
    enter_name: "Enter your full name",
    enter_email: "Enter your email address",
    begin_journey: "Begin Your Journey",
    login_note: "Your information helps us personalize your spiritual journey",
    
    // User Profile & Auth
    logout: "Logout",
    progress_to_next_level: "Progress to next level",
    visits: "Visits",
    quests: "Quests",
    badges: "Badges",
    recent_badges: "Recent Badges",
    locate: "Locate",
    location: "Location",
    default_monastery_desc: "This monastery represents a significant center of Buddhist learning and spiritual practice in Sikkim.",
    default_history_desc: "This monastery has a rich history spanning several centuries, serving as a beacon of Buddhist wisdom and cultural preservation in the Himalayas.",
    festivals_coming_soon: "Festival information coming soon...",
    
    // Voice & Audio
    voice_settings: "Voice Settings",
    customize_voice_experience: "Customize your voice and audio experience",
    volume: "Volume",
    voice_selection: "Voice Selection", 
    select_voice: "Select a voice",
    test_voice: "Test Voice",
    voice_test_message: "This is how the monk's voice will sound during conversations.",
    type_message: "Type your message...",
    
    // Navigation & UI
    'welcome_to': 'Welcome to',
    'monastery_verse': 'MonasteryVerse',
    'learn_more': 'Learn More',
    'start_exploring': 'Start Exploring',
    'view_profile': 'View Profile',
    
    // Hero section
    'spiritual_journey': 'Your Spiritual Journey Through Sikkim\'s Sacred Heritage Begins Here',
    'sacred_sites': 'Sacred Sites',
    'cultural_quests': 'Cultural Quests',
    'stories': 'Stories',
    
    // Features
    'virtual_tours': '360° Virtual Tours',
    'virtual_tours_desc': 'Explore monasteries with immersive panoramic views and guided experiences',
    'ai_monk_wisdom': 'AI Monk Wisdom',
    'ai_monk_desc': 'Learn from digital monks sharing ancient stories and cultural insights',
    'heritage_quests': 'Heritage Quests',
    'heritage_quests_desc': 'Discover hidden stories through QR code quests and cultural challenges',
    
    // Monastery details
    'sacred_monasteries': 'Sacred Monasteries of Sikkim',
    'virtual_tour': 'Virtual Tour',
    'chat_with_monk': 'Chat with Monk',
    'qr_scanner': 'QR Scanner',
    'quest_progress': 'Quest Progress',
    'recent_stories': 'Recent Stories',
    'monastery_info': 'Monastery Information',
    'visiting_hours': 'Visiting Hours',
    'festivals': 'Major Festivals',
    'significance': 'Significance',
    'history': 'History',
    'close': 'Close',
    
    // Chat
    'ask_monk': 'Ask the monk about monastery history, Buddhist teachings, or local culture...',
    'monk_greeting': 'Namaste! I am here to guide you through the sacred wisdom of this monastery. What would you like to learn?'
  },
  
  hi: {
    // Login & Auth
    login_welcome: "हिमालय के आध्यात्मिक हृदय की खोज करें।",
    login_title: "अपनी यात्रा शुरू करें",
    login_description: "सिक्किम के पवित्र मठों का अन्वेषण करने के लिए अपना विवरण दर्ज करें",
    name: "पूरा नाम",
    email: "ईमेल पता",
    enter_name: "अपना पूरा नाम दर्ज करें",
    enter_email: "अपना ईमेल पता दर्ज करें", 
    begin_journey: "अपनी यात्रा शुरू करें",
    login_note: "आपकी जानकारी आपकी आध्यात्मिक यात्रा को व्यक्तिगत बनाने में मदद करती है",
    
    // User Profile & Auth
    logout: "लॉग आउट",
    progress_to_next_level: "अगले स्तर की प्रगति",
    visits: "यात्राएं",
    quests: "खोजें",
    badges: "बैज",
    recent_badges: "हाल के बैज",
    locate: "स्थान",
    back_to_monasteries: "मठों पर वापस जाएं",
    location: "स्थान",
    default_monastery_desc: "यह मठ सिक्किम में बौद्ध शिक्षा और आध्यात्मिक अभ्यास का एक महत्वपूर्ण केंद्र है।",
    default_history_desc: "इस मठ का एक समृद्ध इतिहास है जो कई शताब्दियों तक फैला है, जो हिमालय में बौद्ध ज्ञान और सांस्कृतिक संरक्षण के प्रकाश स्तंभ के रूप में काम करता है।",
    festivals_coming_soon: "त्योहार की जानकारी जल्द आएगी...",
    
    // Voice & Audio
    voice_settings: "आवाज़ सेटिंग्स",
    customize_voice_experience: "अपनी आवाज़ और ऑडियो अनुभव को अनुकूलित करें",
    volume: "वॉल्यूम",
    voice_selection: "आवाज़ चयन",
    select_voice: "एक आवाज़ चुनें", 
    test_voice: "आवाज़ परीक्षण",
    voice_test_message: "बातचीत के दौरान भिक्षु की आवाज़ इस तरह सुनाई देगी।",
    type_message: "अपना संदेश टाइप करें...",
    
    // Navigation & UI
    'welcome_to': 'आपका स्वागत है',
    'monastery_verse': 'मठवर्स',
    'learn_more': 'और जानें',
    'start_exploring': 'अन्वेषण शुरू करें',
    'view_profile': 'प्रोफाइल देखें',
    
    // Hero section
    'spiritual_journey': 'सिक्किम की पवित्र विरासत के माध्यम से आपकी आध्यात्मिक यात्रा यहाँ शुरू होती है',
    'sacred_sites': 'पवित्र स्थल',
    'cultural_quests': 'सांस्कृतिक खोज',
    'stories': 'कहानियाँ',
    
    // Features
    'virtual_tours': '360° आभासी भ्रमण',
    'virtual_tours_desc': 'मठों का भ्रमण करें व्यापक दृश्यों और निर्देशित अनुभवों के साथ',
    'ai_monk_wisdom': 'AI भिक्षु ज्ञान',
    'ai_monk_desc': 'डिजिटल भिक्षुओं से सीखें जो प्राचीन कहानियाँ और सांस्कृतिक अंतर्दृष्टि साझा करते हैं',
    'heritage_quests': 'विरासत खोज',
    'heritage_quests_desc': 'QR कोड खोजों और सांस्कृतिक चुनौतियों के माध्यम से छुपी कहानियाँ खोजें',
    
    // Monastery details
    'sacred_monasteries': 'सिक्किम के पवित्र मठ',
    'virtual_tour': 'आभासी भ्रमण',
    'chat_with_monk': 'भिक्षु से बात करें',
    'qr_scanner': 'QR स्कैनर',
    'quest_progress': 'खोज प्रगति',
    'recent_stories': 'हाल की कहानियाँ',
    'monastery_info': 'मठ की जानकारी',
    'visiting_hours': 'दर्शन समय',
    'festivals': 'मुख्य त्योहार',
    'significance': 'महत्व',
    'history': 'इतिहास',
    'close': 'बंद करें',
    
    // Chat
    'ask_monk': 'भिक्षु से मठ के इतिहास, बौद्ध शिक्षाओं, या स्थानीय संस्कृति के बारे में पूछें...',
    'monk_greeting': 'नमस्ते! मैं इस मठ के पवित्र ज्ञान के माध्यम से आपका मार्गदर्शन करने के लिए यहाँ हूँ। आप क्या सीखना चाहते हैं?'
  },
  
  ne: {
    // Navigation & UI
    'welcome_to': 'स्वागत छ',
    'monastery_verse': 'गुम्बाभर्स',
    'begin_journey': 'यात्रा सुरु गर्नुहोस्',
    'learn_more': 'थप जान्नुहोस्',
    'start_exploring': 'अन्वेषण सुरु गर्नुहोस्',
    'view_profile': 'प्रोफाइल हेर्नुहोस्',
    logout: "लग आउट",
    progress_to_next_level: "अर्को स्तरको प्रगति",
    visits: "भ्रमणहरू",
    quests: "खोजहरू",
    badges: "बैजहरू",
    recent_badges: "भर्खरका बैजहरू",
    locate: "स्थान",
    back_to_monasteries: "गुम्बाहरूमा फर्कनुहोस्",
    location: "स्थान",
    default_monastery_desc: "यो गुम्बा सिक्किममा बौद्ध शिक्षा र आध्यात्मिक अभ्यासको महत्वपूर्ण केन्द्र प्रतिनिधित्व गर्छ।",
    default_history_desc: "यो गुम्बाको धनी इतिहास छ जुन धेरै शताब्दीहरूमा फैलिएको छ, हिमालयमा बौद्ध ज्ञान र सांस्कृतिक संरक्षणको प्रकाश स्तम्भको रूपमा सेवा गर्दै।",
    festivals_coming_soon: "चाडपर्वको जानकारी छिट्टै आउँदैछ...",
    
    // Hero section
    'spiritual_journey': 'सिक्किमको पवित्र सम्पदाको माध्यमबाट तपाईंको आध्यात्मिक यात्रा यहाँ सुरु हुन्छ',
    'sacred_sites': 'पवित्र स्थानहरू',
    'cultural_quests': 'सांस्कृतिक खोजहरू',
    'stories': 'कथाहरू',
    
    // Features
    'virtual_tours': '360° भर्चुअल टुर',
    'virtual_tours_desc': 'मठहरूको भ्रमण गर्नुहोस् व्यापक दृश्यहरू र निर्देशित अनुभवहरूको साथ',
    'ai_monk_wisdom': 'AI भिक्षु ज्ञान',
    'ai_monk_desc': 'डिजिटल भिक्षुहरूबाट सिक्नुहोस् जसले पुराना कथाहरू र सांस्कृतिक अन्तर्दृष्टि साझा गर्छन्',
    'heritage_quests': 'सम्पदा खोजहरू',
    'heritage_quests_desc': 'QR कोड खोजहरू र सांस्कृतिक चुनौतीहरूको माध्यमबाट लुकेका कथाहरू पत्ता लगाउनुहोस्',
    
    // Monastery details
    'sacred_monasteries': 'सिक्किमका पवित्र मठहरू',
    'virtual_tour': 'भर्चुअल टुर',
    'chat_with_monk': 'भिक्षुसँग कुरा गर्नुहोस्',
    'qr_scanner': 'QR स्क्यानर',
    'quest_progress': 'खोज प्रगति',
    'recent_stories': 'भर्खरका कथाहरू',
    'monastery_info': 'मठको जानकारी',
    'visiting_hours': 'भ्रमण समय',
    'festivals': 'मुख्य चाडपर्वहरू',
    'significance': 'महत्व',
    'history': 'इतिहास',
    'close': 'बन्द गर्नुहोस्',
    
    // Chat
    'ask_monk': 'भिक्षुलाई मठको इतिहास, बौद्ध शिक्षाहरू, वा स्थानीय संस्कृतिको बारेमा सोध्नुहोस्...',
    'monk_greeting': 'नमस्ते! म यस मठको पवित्र ज्ञानको माध्यमबाट तपाईंको मार्गदर्शन गर्न यहाँ छु। तपाईं के सिक्न चाहनुहुन्छ?'
  },
  
  bho: {
    // Navigation & UI
    'welcome_to': 'स्वागत बा',
    'monastery_verse': 'मठवर्स',
    'begin_journey': 'यात्रा शुरू करीं',
    'learn_more': 'अउर जानीं',
    'start_exploring': 'खोज शुरू करीं',
    'view_profile': 'प्रोफाइल देखीं',
    logout: "लॉग आउट",
    progress_to_next_level: "अगिला स्तर के प्रगति",
    visits: "यात्रा",
    quests: "खोज",
    badges: "बैज",
    recent_badges: "हाल के बैज",
    locate: "जगह",
    back_to_monasteries: "मठ सभ में वापस जाईं",
    location: "जगह",
    default_monastery_desc: "ई मठ सिक्किम में बौद्ध शिक्षा अउर आध्यात्मिक अभ्यास के एगो महत्वपूर्ण केंद्र बा।",
    default_history_desc: "एकर मठ के एगो समृद्ध इतिहास बा जे कई शताब्दी तक फैलल बा, हिमालय में बौद्ध ज्ञान अउर सांस्कृतिक संरक्षण के प्रकाश स्तंभ के रूप में काम करत।",
    festivals_coming_soon: "त्योहार के जानकारी जल्दी आई...",
    
    // Hero section
    'spiritual_journey': 'सिक्किम के पवित्र विरासत के जरिये रउआ के आध्यात्मिक यात्रा इहाँ शुरू होखेला',
    'sacred_sites': 'पवित्र जगह',
    'cultural_quests': 'सांस्कृतिक खोज',
    'stories': 'कहानी',
    
    // Features
    'virtual_tours': '360° वर्चुअल टूर',
    'virtual_tours_desc': 'मठ सभ के घूमीं विस्तृत दृश्य अउर मार्गदर्शित अनुभव के साथे',
    'ai_monk_wisdom': 'AI भिक्षु ज्ञान',
    'ai_monk_desc': 'डिजिटल भिक्षु से सीखीं जे पुरान कहानी अउर सांस्कृतिक समझ बाँटेला',
    'heritage_quests': 'विरासत खोज',
    'heritage_quests_desc': 'QR कोड खोज अउर सांस्कृतिक चुनौती के जरिये छुपल कहानी खोजीं',
    
    // Monastery details
    'sacred_monasteries': 'सिक्किम के पवित्र मठ',
    'virtual_tour': 'वर्चुअल टूर',
    'chat_with_monk': 'भिक्षु से बात करीं',
    'qr_scanner': 'QR स्कैनर',
    'quest_progress': 'खोज प्रगति',
    'recent_stories': 'हाल के कहानी',
    'monastery_info': 'मठ के जानकारी',
    'visiting_hours': 'दर्शन समय',
    'festivals': 'मुख्य त्योहार',
    'significance': 'महत्व',
    'history': 'इतिहास',
    'close': 'बंद करीं',
    
    // Chat
    'ask_monk': 'भिक्षु से मठ के इतिहास, बौद्ध शिक्षा, भा स्थानीय संस्कृति के बारे में पूछीं...',
    'monk_greeting': 'नमस्ते! हम इ मठ के पवित्र ज्ञान के जरिये रउआ के मार्गदर्शन करे खातिर इहाँ बानी। रउआ का सीखे चाहत बानी?'
  },
  
  si: {
    // Navigation & UI
    'welcome_to': 'བཀྲ་ཤིས་བདེ་ལེགས།',
    'monastery_verse': 'དགོན་པའི་ཚིག',
    'begin_journey': 'ལམ་འགྲོ་འཕེལ།',
    'learn_more': 'མང་པོ་སློབ།',
    'start_exploring': 'འཚོལ་འདྲི་འཕེལ།',
    'view_profile': 'རང་གི་སྐུ་པར་ལྟ།',
    logout: "ཕྱིར་འཐོན།",
    progress_to_next_level: "རིམ་པ་གཞན་པའི་འཕེལ་རིམ།",
    visits: "འཆར་བ།",
    quests: "འཚོལ་ཞིབ།",
    badges: "རྟགས།",
    recent_badges: "ཉེ་བའི་རྟགས།",
    locate: "གནས་ས།",
    back_to_monasteries: "དགོན་པ་ཁག་ལ་ལོག",
    location: "གནས་ས།",
    default_monastery_desc: "འདི་དགོན་པ་འབྲས་ལྗོངས་ནང་ནང་པའི་སློབ་ཁྲིད་དང་སེམས་ཀྱི་སྒོམ་པའི་གལ་ཆེའི་ལྟེ་བ་ཞིག་ཡིན།",
    default_history_desc: "འདི་དགོན་པའི་ལོ་རྒྱུས་ཕྱུག་པོ་ཞིག་ལྡན་ཞིང་དུས་རབས་མང་པོར་ཁྱབ་ཡོད་པ་དང་། གངས་རིའི་ནང་པའི་ཤེས་རབ་དང་རིག་གནས་སྲུང་སྐྱོབ་ཀྱི་མར་མེ་ལྟ་བུ།",
    festivals_coming_soon: "དུས་ཆེན་གྱི་གནས་ཚུལ་མ་འོངས་པར་འབྱོར་གྱི་ཡོད།",
    
    // Hero section
    'spiritual_journey': 'འབྲས་ལྗོངས་ཀྱི་དམ་པའི་རིགས་རུས་ནས་ནང་པའི་ལམ་འདི་འགྲོ་འཕེལ།',
    'sacred_sites': 'དམ་པའི་གནས།',
    'cultural_quests': 'རིག་གནས་འཚོལ།',
    'stories': 'གཏམ་རྒྱུད།',
    
    // Features
    'virtual_tours': '360° རྟོག་གེའི་བསྐོར་ལམ།',
    'virtual_tours_desc': 'དགོན་པ་རྣམས་སྐོར་ཞིང་མཐའ་དག་མཐོང་སྣང་དང་ལམ་སྟོན་ཉམས་མྱོང་ལྡན།',
    'ai_monk_wisdom': 'རིག་གསར་གྲྭ་པའི་ཤེས་རབ།',
    'ai_monk_desc': 'འཁོར་ལོས་སྒྱུར་བའི་གྲྭ་པ་ནས་སློབ་པ་རྙིང་པའི་གཏམ་རྒྱུད་དང་རིག་གནས་ཤེས་རབ།',
    'heritage_quests': 'རིགས་རུས་འཚོལ་ཞིབ།',
    'heritage_quests_desc': 'QR རྟགས་འཚོལ་དང་རིག་གནས་དཀའ་གནད་ནས་སྦས་པའི་གཏམ་རྒྱུད་རྙེད།',
    
    // Monastery details
    'sacred_monasteries': 'འབྲས་ལྗོངས་ཀྱི་དམ་པའི་དགོན་པ།',
    'virtual_tour': 'རྟོག་གེའི་བསྐོར་ལམ།',
    'chat_with_monk': 'གྲྭ་པ་དང་སྐད་ཆ།',
    'qr_scanner': 'QR བཤེར་འདེམ།',
    'quest_progress': 'འཚོལ་འདྲིའི་འཕེལ་རིམ།',
    'recent_stories': 'ཉེ་བའི་གཏམ་རྒྱུད།',
    'monastery_info': 'དགོན་པའི་གནས་ཚུལ།',
    'visiting_hours': 'འཆར་དུས།',
    'festivals': 'གཙོ་བོའི་དུས་ཆེན།',
    'significance': 'གལ་ཆེའི་དོན།',
    'history': 'ལོ་རྒྱུས།',
    'close': 'འགོག',
    
    // Chat
    'ask_monk': 'གྲྭ་པ་ལ་དགོན་པའི་ལོ་རྒྱུས། ནང་པའི་བཀའ་དང་ས་གནས་རིག་གནས་སྐོར་དྲི།',
    'monk_greeting': 'བཀྲ་ཤིས་བདེ་ལེགས! ངས་དགོན་པ་འདིའི་དམ་པའི་ཤེས་རབ་ནས་ཁྱེད་རང་ལ་ལམ་སྟོན་ཞུ་རྒྱུ་ཡིན། ཅི་སློབ་འདོད།'
  }
};