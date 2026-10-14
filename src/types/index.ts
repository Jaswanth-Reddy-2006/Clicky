export type Role = "PARENT" | "CHILD";

export type AgeBand = "EARLY_EXPLORER" | "DIGITAL_NAVIGATOR" | "CYBER_HERO";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  createdAt: string;
}

export interface ChildProfile {
  id: string;
  userId?: string;
  name: string;
  avatar: string;
  ageBand: AgeBand;
  level: number;
  levelTitle: string;
  xp: number;
  currentStreak: number;
  lastActiveAt: string;
  parentId?: string;
}

export interface ScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  safetyLesson: string;
  nextScenarioId?: string; // For branching
}

export interface Scenario {
  id: string;
  gameSlug: string;
  scenarioIndex: number;
  title: string;
  prompt: string;
  characterName?: string;
  characterAvatar?: string;
  characterMessage?: string;
  clue?: string;
  redFlags?: string[];
  options: ScenarioOption[];
  safetyConcept: string;
  xpReward: number;
  difficulty: "EASY" | "MEDIUM" | "CHALLENGING";
  topic: SafetyTopic;
}

export type SafetyTopic =
  | "Scam Awareness"
  | "Cyberbullying"
  | "Fake News & Misinformation"
  | "Privacy & Personal Data"
  | "Safe AI Exploration"
  | "Voice Cloning & Impersonation"
  | "Kindness & Empathy"
  | "Gaming Safety";

export interface GameDefinition {
  slug: string;
  title: string;
  subtitle: string;
  theme: string;
  description: string;
  topic: SafetyTopic;
  iconName: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    badgeBg: string;
  };
  totalScenarios: number;
  badgeSlug: string;
  badgeName: string;
  estimatedMinutes: number;
  scenarios: Scenario[];
}

export interface GameResultRecord {
  id: string;
  sessionId?: string;
  childProfileId: string;
  gameSlug: string;
  scenarioId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  feedback: string;
  createdAt: string;
}

export interface GameSessionRecord {
  id: string;
  childProfileId: string;
  gameSlug: string;
  score: number;
  maxScore: number;
  xpEarned: number;
  isCompleted: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface Achievement {
  slug: string;
  title: string;
  description: string;
  iconName: string;
  category: "GAME" | "MILESTONE" | "STREAK" | "MASTERY";
  xpReward: number;
  unlockedAt?: string;
  isSecret?: boolean;
}

export interface TopicProgress {
  topic: SafetyTopic;
  scorePercentage: number;
  missionsCompleted: number;
  totalAttempts: number;
  lastPracticedAt: string;
  masteryLevel: "Novice" | "Practicing" | "Skilled" | "Guardian";
}

export interface SafetyRecommendation {
  id: string;
  childProfileId: string;
  topic: SafetyTopic;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  gameSlug?: string;
  isDismissed: boolean;
  createdAt: string;
}

export interface KindBotMessage {
  id: string;
  sender: "user" | "kindbot";
  content: string;
  timestamp: string;
  intent?: string;
  suggestedActions?: string[];
  recommendedGameSlug?: string;
  recommendedGameTitle?: string;
  urgencyLevel?: "NORMAL" | "CONCERNING" | "EMERGENCY";
  isDemoResponse?: boolean;
}

export interface PairingCodeRecord {
  id: string;
  code: string;
  parentId: string;
  parentName: string;
  expiresAt: string;
  usedAt?: string;
  createdAt: string;
}

export interface ParentOverviewData {
  parent: User;
  children: ChildProfile[];
  selectedChild: ChildProfile;
  totalCompletedMissions: number;
  totalXp: number;
  estimatedLearningMinutes: number;
  recentAchievements: Achievement[];
  topicProgress: TopicProgress[];
  weeklyActivity: { day: string; minutes: number; score: number }[];
  recommendations: SafetyRecommendation[];
  recentActivities: {
    id: string;
    gameTitle: string;
    topic: SafetyTopic;
    completedAt: string;
    score: number;
    xpEarned: number;
  }[];
}
