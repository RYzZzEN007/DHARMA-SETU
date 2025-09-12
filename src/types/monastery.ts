export interface Monastery {
  id: string;
  name: string;
  description: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  questTotal: number;
  questsCompleted?: number;
  streetViewId: string;
  difficulty: 'Novice' | 'Intermediate' | 'Expert';
  history?: string;
  significance?: string;
  festivals?: string[];
  visitingHours?: string;
}

export interface Quest {
  id: string;
  monasteryId: string;
  type: 'Historical Facts' | 'Architectural Details' | 'Local Legends' | 'Spiritual Practices' | 'Cultural Traditions';
  content: string;
  location: string;
  points: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isCompleted?: boolean;
}

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  level: 'Novice Seeker' | 'Cultural Explorer' | 'Digital Pilgrim' | 'Heritage Guardian' | 'Monastery Master';
  totalPoints: number;
  visitedMonasteries: string[];
  completedQuests: string[];
  achievements: string[];
  joinedDate: Date;
}

export interface MonkStory {
  id: string;
  monasteryId: string;
  title: string;
  content: string;
  audioUrl?: string;
  category: 'History' | 'Legend' | 'Architecture' | 'Spiritual' | 'Festival';
}