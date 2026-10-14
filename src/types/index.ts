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

export type GameplayMode =
  | "CLUE_INSPECTION"
  | "RESPONSE_ASSEMBLY"
  | "EVIDENCE_INVESTIGATION"
  | "PERMISSION_CONFIG"
  | "AI_PROMPT_LAB"
  | "AUDIO_VOICE_VERIFY"
  | "BRANCHING_NARRATIVE"
  | "INVENTORY_TRADE_GUARD"
  | "DECISION_CHOICE";

export interface ScenarioInteractiveData {
  mode: GameplayMode;
  // Mode 1: CLUE_INSPECTION (Scam Detective)
  inspectableElements?: {
    id: string;
    label: string;
    text: string;
    isSuspicious: boolean;
    feedback: string;
  }[];
  // Mode 2: RESPONSE_ASSEMBLY (Cyberbullying Heroes)
  responseBlocks?: {
    id: string;
    text: string;
    category: "support" | "boundary" | "de-escalate" | "harmful";
    isSafe: boolean;
  }[];
  targetResponseGoal?: string;
  // Mode 3: EVIDENCE_INVESTIGATION (Fake or Fact)
  evidenceCards?: {
    id: string;
    title: string;
    source: string;
    reliability: "HIGH" | "SUSPICIOUS" | "FAKE";
    details: string;
    isVerified: boolean;
  }[];
  // Mode 4: PERMISSION_CONFIG (Privacy Protector)
  permissionToggles?: {
    id: string;
    name: string;
    iconName: string;
    requested: boolean;
    isNecessary: boolean;
    riskExplanation: string;
  }[];
  // Mode 5: AI_PROMPT_LAB (Safe AI Explorer)
  promptTokens?: {
    id: string;
    text: string;
    isSafe: boolean;
    reason?: string;
  }[];
  aiResponseChecks?: {
    claim: string;
    isAccurate: boolean;
    explanation: string;
  }[];
  // Mode 6: AUDIO_VOICE_VERIFY (VoiceGuard Rescue)
  audioAnalysis?: {
    callerName: string;
    voiceSampleDuration: string;
    waveformType: "synthetic_jitter" | "natural_authentic";
    suspiciousClues: string[];
    safeWordPrompt: string;
    expectedSafeWord: string;
    providedOptions: string[];
  };
  // Mode 7: BRANCHING_NARRATIVE (Kindness Kingdom)
  dialogueBranches?: {
    step: number;
    situation: string;
    speaker: string;
    choices: {
      id: string;
      text: string;
      empathyDelta: number;
      reactionText: string;
      nextStep?: number;
    }[];
  }[];
  // Mode 8: INVENTORY_TRADE_GUARD (Gamer Safety Quest)
  tradeItems?: {
    id: string;
    name: string;
    rarity: string;
    icon: string;
    isSafe: boolean;
    description: string;
    redFlag?: string;
  }[];
  tradeLink?: string;
  isTradeSuspicious?: boolean;
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
  interactiveData?: ScenarioInteractiveData;
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
  gameplayMode?: GameplayMode;
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
    gameSlug: string;
    gameTitle: string;
    topic: SafetyTopic;
    completedAt: string;
    score: number;
    xpEarned: number;
  }[];
}

export interface Friend {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  level: number;
  levelTitle: string;
  badgeCount: number;
  currentStreak: number;
  status: "online" | "exploring" | "offline";
  lastActiveAt: string;
  friendshipDate: string;
  mutualAdventures: number;
}

export interface FriendCodeRecord {
  id: string;
  code: string;
  childProfileId: string;
  createdAt: string;
  expiresAt: string;
  usedCount: number;
  maxUses: number;
}

export interface FriendChallenge {
  id: string;
  fromFriendId: string;
  fromFriendName: string;
  fromFriendAvatar: string;
  toChildId: string;
  gameSlug: string;
  gameTitle: string;
  targetScore: number;
  xpReward: number;
  status: "PENDING" | "ACCEPTED" | "COMPLETED";
  createdAt: string;
  completedAt?: string;
}

export interface PredefinedReaction {
  id: string;
  fromFriendId: string;
  fromFriendName: string;
  toFriendId: string;
  text: string;
  icon: string;
  timestamp: string;
}

