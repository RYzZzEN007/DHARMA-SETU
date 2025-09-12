import { Monastery, Quest, MonkStory } from '@/types/monastery';
import rumtekImage from '@/assets/rumtek-monastery.jpg';
import pemayangtseImage from '@/assets/pemayangtse-monastery.jpg';
import encheyImage from '@/assets/enchey-monastery.jpg';

export const monasteries: Monastery[] = [
  {
    id: 'rumtek',
    name: 'Rumtek Dharma Chakra Centre',
    description: 'The largest monastery in Sikkim, seat of the Karmapa',
    image: rumtekImage,
    coordinates: { lat: 27.3029, lng: 88.5598 },
    questTotal: 12,
    questsCompleted: 0,
    streetViewId: 'CAoSLEFGMVFpcE5_VnBia3U1Skt',
    difficulty: 'Expert',
    history: 'Built in the 1960s by the 16th Karmapa, this monastery is the seat of the Kagyu lineage.',
    significance: 'Houses precious relics including the Black Hat of the Karmapa.',
    festivals: ['Losar', 'Buddha Purnima', 'Karmapa\'s Birthday'],
    visitingHours: '6:00 AM - 6:00 PM'
  },
  {
    id: 'pemayangtse',
    name: 'Pemayangtse Monastery',
    description: 'Perfect Sublime Lotus monastery, 350 years old',
    image: pemayangtseImage,
    coordinates: { lat: 27.2086, lng: 88.2494 },
    questTotal: 10,
    questsCompleted: 0,
    streetViewId: 'CAoSLEFGMVFpcE5_VnBia3U1Skt',
    difficulty: 'Intermediate',
    history: 'Founded in 1705 by Lama Lhatsun Chempo, one of the oldest monasteries in Sikkim.',
    significance: 'Known for its seven-tiered painted wooden sculpture depicting heaven.',
    festivals: ['Cham Dance', 'Losar', 'Drupka Teshi'],
    visitingHours: '7:00 AM - 5:00 PM'
  },
  {
    id: 'enchey',
    name: 'Enchey Monastery',
    description: 'The Solitary Temple above Gangtok',
    image: encheyImage,
    coordinates: { lat: 27.3389, lng: 88.6065 },
    questTotal: 8,
    questsCompleted: 0,
    streetViewId: 'CAoSLEFGMVFpcE5_VnBia3U1Skt',
    difficulty: 'Novice',
    history: 'Built in 1909 by Lama Druptob Karpo, meaning "solitary temple".',
    significance: 'Famous for its annual Cham dance performed during winter.',
    festivals: ['Cham Dance', 'Pang Lhabsol', 'Losar'],
    visitingHours: '6:00 AM - 6:00 PM'
  },
  {
    id: 'tashiding',
    name: 'Tashiding Monastery',
    description: 'The sacred center of Sikkim Buddhism',
    image: pemayangtseImage, // Placeholder - will generate more images later
    coordinates: { lat: 27.3167, lng: 88.2833 },
    questTotal: 15,
    questsCompleted: 0,
    streetViewId: 'CAoSLEFGMVFpcE5_VnBia3U1Skt',
    difficulty: 'Expert',
    history: 'Built in 1717, considered the most sacred monastery in Sikkim.',
    significance: 'Houses the sacred Bumchu ceremony waters.',
    festivals: ['Bumchu', 'Losar', 'Saga Dawa'],
    visitingHours: '6:00 AM - 5:00 PM'
  },
  {
    id: 'dubdi',
    name: 'Dubdi Monastery',
    description: 'The first monastery built in Sikkim (1701)',
    image: rumtekImage, // Placeholder
    coordinates: { lat: 27.2939, lng: 88.2428 },
    questTotal: 9,
    questsCompleted: 0,
    streetViewId: 'CAoSLEFGMVFpcE5_VnBia3U1Skt',
    difficulty: 'Intermediate',
    history: 'The oldest monastery in Sikkim, built by Lhatsun Chempo in 1701.',
    significance: 'Where the first Chogyal was crowned.',
    festivals: ['Pang Lhabsol', 'Losar'],
    visitingHours: '7:00 AM - 5:00 PM'
  },
  {
    id: 'ralang',
    name: 'Ralang Monastery',
    description: 'Hidden gem monastery with rich Kagyu tradition',
    image: encheyImage, // Placeholder
    coordinates: { lat: 27.2469, lng: 88.5031 },
    questTotal: 11,
    questsCompleted: 0,
    streetViewId: 'CAoSLEFGMVFpcE5_VnBia3U1Skt',
    difficulty: 'Intermediate',
    history: 'Built in the 18th century, known for its Kagyu teachings.',
    significance: 'Famous for its ancient manuscripts and artifacts.',
    festivals: ['Kagyu Monlam', 'Losar'],
    visitingHours: '6:00 AM - 6:00 PM'
  }
];

export const demoQuests: Quest[] = [
  {
    id: 'RUM_001',
    monasteryId: 'rumtek',
    type: 'Historical Facts',
    content: 'Did you know? This monastery houses a precious Black Hat that belonged to the 16th Karmapa, considered one of Buddhism\'s most sacred relics.',
    location: 'Main prayer hall entrance',
    points: 10,
    difficulty: 'Easy'
  },
  {
    id: 'RUM_007',
    monasteryId: 'rumtek',
    type: 'Local Legends',
    content: 'Legend says that mysterious lights appear above this monastery during important Buddhist festivals, witnessed by many locals but never fully explained.',
    location: 'Observatory point',
    points: 25,
    difficulty: 'Hard'
  },
  {
    id: 'PEM_003',
    monasteryId: 'pemayangtse',
    type: 'Architectural Details',
    content: 'The seven-tiered wooden sculpture here depicts the heavenly palace of Guru Rinpoche and took 5 years to complete.',
    location: 'Upper floor shrine room',
    points: 15,
    difficulty: 'Medium'
  }
];

export const monkStories: MonkStory[] = [
  {
    id: 'story_rumtek_1',
    monasteryId: 'rumtek',
    title: 'The Arrival of the 16th Karmapa',
    content: 'Long ago, when the 16th Karmapa arrived in Sikkim, he chose this exact location for the monastery after a series of prophetic dreams. The hill was said to resemble a sleeping snow lion, an auspicious sign in Tibetan Buddhism.',
    category: 'History'
  },
  {
    id: 'story_pemayangtse_1',
    monasteryId: 'pemayangtse',
    title: 'The Perfect Lotus Vision',
    content: 'This monastery was built on a site chosen by a sacred bird that appeared to Lama Lhatsun Chempo in a vision. The bird dropped a lotus petal that bloomed into a perfect flower, giving the monastery its name - Perfect Sublime Lotus.',
    category: 'Legend'
  }
];