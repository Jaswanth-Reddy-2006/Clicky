import {
  User,
  ChildProfile,
  TopicProgress,
  SafetyRecommendation,
  Achievement,
  PairingCodeRecord,
  ParentOverviewData,
  SafetyTopic,
  Friend,
  FriendCodeRecord,
  FriendChallenge,
  PredefinedReaction,
} from "@/types";
import { ACHIEVEMENTS_DATA } from "@/lib/data/achievements-data";
import { GAMES_DATA } from "@/lib/data/games-data";
import { getLevelInfo } from "@/lib/utils";

// Initial Seed Data
const INITIAL_USERS: User[] = [
  {
    id: "parent-sarah-demo",
    email: "parent@clicky.demo",
    name: "Sarah Miller",
    role: "PARENT",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    createdAt: "2026-09-01T10:00:00Z",
  },
  {
    id: "child-alex-demo",
    email: "alex@clicky.demo",
    name: "Alex Miller",
    role: "CHILD",
    avatar: "robot-shield",
    createdAt: "2026-09-01T10:05:00Z",
  },
];

const INITIAL_CHILD_PROFILES: ChildProfile[] = [
  {
    id: "profile-alex-demo",
    userId: "child-alex-demo",
    name: "Alex Miller",
    avatar: "robot-shield",
    ageBand: "DIGITAL_NAVIGATOR",
    level: 2,
    levelTitle: "Safety Scout",
    xp: 480,
    currentStreak: 3,
    lastActiveAt: new Date().toISOString(),
    parentId: "parent-sarah-demo",
  },
];

const INITIAL_TOPIC_PROGRESS: Record<string, TopicProgress[]> = {
  "profile-alex-demo": [
    {
      topic: "Scam Awareness",
      scorePercentage: 85,
      missionsCompleted: 4,
      totalAttempts: 5,
      lastPracticedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      masteryLevel: "Skilled",
    },
    {
      topic: "Cyberbullying",
      scorePercentage: 75,
      missionsCompleted: 3,
      totalAttempts: 4,
      lastPracticedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      masteryLevel: "Practicing",
    },
    {
      topic: "Fake News & Misinformation",
      scorePercentage: 65,
      missionsCompleted: 2,
      totalAttempts: 3,
      lastPracticedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      masteryLevel: "Practicing",
    },
    {
      topic: "Privacy & Personal Data",
      scorePercentage: 90,
      missionsCompleted: 5,
      totalAttempts: 5,
      lastPracticedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      masteryLevel: "Guardian",
    },
    {
      topic: "Safe AI Exploration",
      scorePercentage: 70,
      missionsCompleted: 3,
      totalAttempts: 4,
      lastPracticedAt: new Date(Date.now() - 3600000 * 36).toISOString(),
      masteryLevel: "Practicing",
    },
    {
      topic: "Voice Cloning & Impersonation",
      scorePercentage: 55,
      missionsCompleted: 1,
      totalAttempts: 3,
      lastPracticedAt: new Date(Date.now() - 3600000 * 60).toISOString(),
      masteryLevel: "Novice",
    },
    {
      topic: "Kindness & Empathy",
      scorePercentage: 80,
      missionsCompleted: 4,
      totalAttempts: 5,
      lastPracticedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
      masteryLevel: "Skilled",
    },
    {
      topic: "Gaming Safety",
      scorePercentage: 60,
      missionsCompleted: 2,
      totalAttempts: 4,
      lastPracticedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
      masteryLevel: "Practicing",
    },
  ],
};

const INITIAL_UNLOCKED_ACHIEVEMENTS: Record<string, string[]> = {
  "profile-alex-demo": ["first-adventure", "scam-spotter", "kindness-hero", "safety-streak-3"],
};

const INITIAL_RECOMMENDATIONS: Record<string, SafetyRecommendation[]> = {
  "profile-alex-demo": [
    {
      id: "rec-1",
      childProfileId: "profile-alex-demo",
      topic: "Voice Cloning & Impersonation",
      title: "Practice Family Safe Word Verification",
      description:
        "Alex missed a scenario regarding suspicious caller verification. Playing VoiceGuard Rescue will help practice using secret family verification phrases.",
      priority: "HIGH",
      gameSlug: "voiceguard-rescue",
      isDismissed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: "rec-2",
      childProfileId: "profile-alex-demo",
      topic: "Gaming Safety",
      title: "Review Fake Mod & Installer Risks",
      description:
        "Alex encountered a challenge involving executable downloads disguised as gaming mods. A quick refresher in Gamer Safety Quest will reinforce safe downloading rules.",
      priority: "MEDIUM",
      gameSlug: "gamer-safety-quest",
      isDismissed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: "rec-3",
      childProfileId: "profile-alex-demo",
      topic: "Privacy & Personal Data",
      title: "Praise Alex's Strong Privacy Vault Habits",
      description:
        "Alex achieved a 90% score in Privacy Protector! Celebrate their cautious instincts when managing personal data.",
      priority: "LOW",
      gameSlug: "privacy-protector",
      isDismissed: false,
      createdAt: new Date().toISOString(),
    },
  ],
};

const INITIAL_PAIRING_CODES: PairingCodeRecord[] = [
  {
    id: "code-sample-1",
    code: "CLICKY-7890",
    parentId: "parent-sarah-demo",
    parentName: "Sarah Miller",
    expiresAt: new Date(Date.now() + 86400000 * 2).toISOString(),
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_FRIENDS: Record<string, Friend[]> = {
  "profile-alex-demo": [
    {
      id: "friend-leo-demo",
      name: "Leo",
      handle: "CyberWolf",
      avatar: "cyber-wolf",
      level: 4,
      levelTitle: "Safety Champion",
      badgeCount: 6,
      currentStreak: 5,
      status: "online",
      lastActiveAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      friendshipDate: "2026-09-10T14:00:00Z",
      mutualAdventures: 8,
    },
    {
      id: "friend-maya-demo",
      name: "Maya",
      handle: "PixelPanda",
      avatar: "pixel-panda",
      level: 3,
      levelTitle: "Cyber Guardian",
      badgeCount: 5,
      currentStreak: 7,
      status: "exploring",
      lastActiveAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      friendshipDate: "2026-09-15T09:30:00Z",
      mutualAdventures: 5,
    },
    {
      id: "friend-sam-demo",
      name: "Sam",
      handle: "StarCoder",
      avatar: "star-coder",
      level: 2,
      levelTitle: "Safety Scout",
      badgeCount: 3,
      currentStreak: 2,
      status: "offline",
      lastActiveAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      friendshipDate: "2026-09-20T11:15:00Z",
      mutualAdventures: 3,
    },
  ],
};

const INITIAL_FRIEND_CODES: FriendCodeRecord[] = [
  {
    id: "fcode-alex-1",
    code: "HERO-4921",
    childProfileId: "profile-alex-demo",
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
    usedCount: 0,
    maxUses: 3,
  },
];

const INITIAL_FRIEND_CHALLENGES: FriendChallenge[] = [
  {
    id: "chal-1",
    fromFriendId: "friend-maya-demo",
    fromFriendName: "Maya (PixelPanda)",
    fromFriendAvatar: "pixel-panda",
    toChildId: "profile-alex-demo",
    gameSlug: "scam-detective",
    gameTitle: "Scam Detective",
    targetScore: 90,
    xpReward: 50,
    status: "PENDING",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "chal-2",
    fromFriendId: "friend-leo-demo",
    fromFriendName: "Leo (CyberWolf)",
    fromFriendAvatar: "cyber-wolf",
    toChildId: "profile-alex-demo",
    gameSlug: "gamer-safety-quest",
    gameTitle: "Gamer Safety Quest",
    targetScore: 85,
    xpReward: 60,
    status: "PENDING",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

const INITIAL_PREDEFINED_REACTIONS: PredefinedReaction[] = [
  {
    id: "react-1",
    fromFriendId: "friend-maya-demo",
    fromFriendName: "Maya",
    toFriendId: "profile-alex-demo",
    text: "Great detective work on that fake gem link!",
    icon: "🌟",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "react-2",
    fromFriendId: "friend-leo-demo",
    fromFriendName: "Leo",
    toFriendId: "profile-alex-demo",
    text: "3-day safety streak! Keep it going!",
    icon: "🔥",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
];

// In-Memory state for Server/Edge functions
let users = [...INITIAL_USERS];
let childProfiles = [...INITIAL_CHILD_PROFILES];
let topicProgress = { ...INITIAL_TOPIC_PROGRESS };
let unlockedAchievements = { ...INITIAL_UNLOCKED_ACHIEVEMENTS };
let recommendations = { ...INITIAL_RECOMMENDATIONS };
let pairingCodes = [...INITIAL_PAIRING_CODES];
let friendsMap = { ...INITIAL_FRIENDS };
let friendCodes = [...INITIAL_FRIEND_CODES];
let friendChallenges = [...INITIAL_FRIEND_CHALLENGES];
let friendReactions = [...INITIAL_PREDEFINED_REACTIONS];
let completedGamesHistory: {
  id: string;
  childProfileId: string;
  gameSlug: string;
  gameTitle: string;
  topic: SafetyTopic;
  score: number;
  xpEarned: number;
  completedAt: string;
}[] = [
  {
    id: "act-1",
    childProfileId: "profile-alex-demo",
    gameSlug: "scam-detective",
    gameTitle: "Scam Detective",
    topic: "Scam Awareness",
    score: 95,
    xpEarned: 150,
    completedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "act-2",
    childProfileId: "profile-alex-demo",
    gameSlug: "privacy-protector",
    gameTitle: "Privacy Protector",
    topic: "Privacy & Personal Data",
    score: 100,
    xpEarned: 160,
    completedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "act-3",
    childProfileId: "profile-alex-demo",
    gameSlug: "cyberbullying-heroes",
    gameTitle: "Cyberbullying Heroes",
    topic: "Cyberbullying",
    score: 85,
    xpEarned: 120,
    completedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

export const demoStore = {
  getUsers: () => users,

  getUserByEmail: (email: string) =>
    users.find((u) => u.email.toLowerCase() === email.toLowerCase()),

  getUserById: (id: string) => users.find((u) => u.id === id),

  getChildProfiles: () => childProfiles,

  getChildProfileByUserId: (userId: string) =>
    childProfiles.find((cp) => cp.userId === userId),

  getChildProfileById: (id: string) =>
    childProfiles.find((cp) => cp.id === id),

  getChildrenForParent: (parentId: string) =>
    childProfiles.filter((cp) => cp.parentId === parentId),

  createChildProfile: (
    parentId: string,
    data: { name: string; ageBand: ChildProfile["ageBand"]; avatar: string }
  ): ChildProfile => {
    const newProfile: ChildProfile = {
      id: `profile-${Date.now()}`,
      userId: `child-user-${Date.now()}`,
      name: data.name,
      avatar: data.avatar || "robot-shield",
      ageBand: data.ageBand || "DIGITAL_NAVIGATOR",
      level: 1,
      levelTitle: "Curious Explorer",
      xp: 0,
      currentStreak: 1,
      lastActiveAt: new Date().toISOString(),
      parentId,
    };
    childProfiles.push(newProfile);
    topicProgress[newProfile.id] = [];
    unlockedAchievements[newProfile.id] = ["first-adventure"];
    recommendations[newProfile.id] = [];
    return newProfile;
  },

  generatePairingCode: (parentId: string): PairingCodeRecord => {
    const parent = users.find((u) => u.id === parentId);
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const code = `CLICKY-${randomDigits}`;
    const record: PairingCodeRecord = {
      id: `code-${Date.now()}`,
      code,
      parentId,
      parentName: parent ? parent.name : "Parent",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
      createdAt: new Date().toISOString(),
    };
    pairingCodes.push(record);
    return record;
  },

  redeemPairingCode: (codeStr: string, childProfileId: string) => {
    const codeRecord = pairingCodes.find(
      (c) => c.code.toUpperCase() === codeStr.toUpperCase().trim()
    );
    if (!codeRecord) {
      return { success: false, error: "Invalid pairing code. Please double check with your parent." };
    }
    if (codeRecord.usedAt) {
      return { success: false, error: "This pairing code has already been redeemed." };
    }
    if (new Date(codeRecord.expiresAt) < new Date()) {
      return { success: false, error: "This pairing code has expired. Please ask your parent for a fresh code." };
    }

    const child = childProfiles.find((cp) => cp.id === childProfileId);
    if (!child) {
      return { success: false, error: "Child profile not found." };
    }

    codeRecord.usedAt = new Date().toISOString();
    child.parentId = codeRecord.parentId;

    return {
      success: true,
      parentName: codeRecord.parentName,
      message: `Successfully linked with ${codeRecord.parentName}!`,
    };
  },

  recordGameCompletion: (
    childProfileId: string,
    gameSlug: string,
    score: number,
    xpEarned: number
  ) => {
    const child = childProfiles.find((cp) => cp.id === childProfileId);
    if (!child) return null;

    const gameDef = GAMES_DATA.find((g) => g.slug === gameSlug);
    if (!gameDef) return null;

    // 1. Update XP and Level
    child.xp += xpEarned;
    const levelInfo = getLevelInfo(child.xp);
    child.level = levelInfo.level;
    child.levelTitle = levelInfo.title;
    child.lastActiveAt = new Date().toISOString();

    // 2. Unlock Game Badge if not already unlocked
    if (!unlockedAchievements[childProfileId]) {
      unlockedAchievements[childProfileId] = [];
    }
    if (!unlockedAchievements[childProfileId].includes(gameDef.badgeSlug)) {
      unlockedAchievements[childProfileId].push(gameDef.badgeSlug);
    }
    if (child.xp >= 500 && !unlockedAchievements[childProfileId].includes("five-missions")) {
      unlockedAchievements[childProfileId].push("five-missions");
    }

    // 3. Update Topic Progress
    if (!topicProgress[childProfileId]) {
      topicProgress[childProfileId] = [];
    }
    let topicItem = topicProgress[childProfileId].find(
      (tp) => tp.topic === gameDef.topic
    );
    if (!topicItem) {
      topicItem = {
        topic: gameDef.topic,
        scorePercentage: score,
        missionsCompleted: 1,
        totalAttempts: 1,
        lastPracticedAt: new Date().toISOString(),
        masteryLevel: score >= 80 ? "Skilled" : "Practicing",
      };
      topicProgress[childProfileId].push(topicItem);
    } else {
      topicItem.missionsCompleted += 1;
      topicItem.totalAttempts += 1;
      topicItem.scorePercentage = Math.round(
        (topicItem.scorePercentage * (topicItem.totalAttempts - 1) + score) /
          topicItem.totalAttempts
      );
      topicItem.lastPracticedAt = new Date().toISOString();
      if (topicItem.scorePercentage >= 90) topicItem.masteryLevel = "Guardian";
      else if (topicItem.scorePercentage >= 75) topicItem.masteryLevel = "Skilled";
      else topicItem.masteryLevel = "Practicing";
    }

    // 4. Record Activity
    completedGamesHistory.unshift({
      id: `act-${Date.now()}`,
      childProfileId,
      gameSlug,
      gameTitle: gameDef.title,
      topic: gameDef.topic,
      score,
      xpEarned,
      completedAt: new Date().toISOString(),
    });

    // 5. Update or Refresh Recommendations if needed
    if (score < 70) {
      if (!recommendations[childProfileId]) recommendations[childProfileId] = [];
      recommendations[childProfileId].unshift({
        id: `rec-${Date.now()}`,
        childProfileId,
        topic: gameDef.topic,
        title: `Practice Opportunity: ${gameDef.title}`,
        description: `Alex scored ${score}% on ${gameDef.title}. Reviewing this mission will help reinforce safe decisions in ${gameDef.topic}.`,
        priority: "HIGH",
        gameSlug: gameDef.slug,
        isDismissed: false,
        createdAt: new Date().toISOString(),
      });
    }

    return {
      child,
      badgeUnlocked: gameDef.badgeSlug,
      newXp: child.xp,
      newLevel: child.level,
      levelTitle: child.levelTitle,
    };
  },

  getParentOverview: (parentId: string, requestedChildId?: string): ParentOverviewData | null => {
    const parent = users.find((u) => u.id === parentId);
    if (!parent) return null;

    const children = childProfiles.filter((cp) => cp.parentId === parentId);
    if (children.length === 0) {
      // Default to seeded demo child if not linked
      const demoChild = childProfiles[0];
      return {
        parent,
        children: [demoChild],
        selectedChild: demoChild,
        totalCompletedMissions: 24,
        totalXp: demoChild.xp,
        estimatedLearningMinutes: 185,
        recentAchievements: ACHIEVEMENTS_DATA.filter((a) =>
          (unlockedAchievements[demoChild.id] || []).includes(a.slug)
        ),
        topicProgress: topicProgress[demoChild.id] || [],
        weeklyActivity: [
          { day: "Mon", minutes: 25, score: 90 },
          { day: "Tue", minutes: 30, score: 85 },
          { day: "Wed", minutes: 20, score: 75 },
          { day: "Thu", minutes: 35, score: 95 },
          { day: "Fri", minutes: 15, score: 70 },
          { day: "Sat", minutes: 40, score: 92 },
          { day: "Sun", minutes: 20, score: 88 },
        ],
        recommendations: recommendations[demoChild.id] || [],
        recentActivities: completedGamesHistory.filter(
          (act) => act.childProfileId === demoChild.id
        ),
      };
    }

    const selectedChild =
      children.find((c) => c.id === requestedChildId) || children[0];
    const childTopicProg = topicProgress[selectedChild.id] || [];
    const totalCompletedMissions = childTopicProg.reduce(
      (sum, tp) => sum + tp.missionsCompleted,
      0
    );
    const childAchievements = ACHIEVEMENTS_DATA.filter((a) =>
      (unlockedAchievements[selectedChild.id] || []).includes(a.slug)
    );
    const childActivities = completedGamesHistory.filter(
      (act) => act.childProfileId === selectedChild.id
    );

    return {
      parent,
      children,
      selectedChild,
      totalCompletedMissions: totalCompletedMissions || 15,
      totalXp: selectedChild.xp,
      estimatedLearningMinutes: Math.round((totalCompletedMissions || 15) * 8.5),
      recentAchievements: childAchievements,
      topicProgress: childTopicProg,
      weeklyActivity: [
        { day: "Mon", minutes: 25, score: 90 },
        { day: "Tue", minutes: 30, score: 85 },
        { day: "Wed", minutes: 20, score: 75 },
        { day: "Thu", minutes: 35, score: 95 },
        { day: "Fri", minutes: 15, score: 70 },
        { day: "Sat", minutes: 40, score: 92 },
        { day: "Sun", minutes: 20, score: 88 },
      ],
      recommendations: recommendations[selectedChild.id] || [],
      recentActivities: childActivities,
    };
  },

  getFriends: (childProfileId: string = "profile-alex-demo"): Friend[] => {
    return friendsMap[childProfileId] || [];
  },

  getFriendCodes: (childProfileId: string = "profile-alex-demo"): FriendCodeRecord[] => {
    return friendCodes.filter((fc) => fc.childProfileId === childProfileId);
  },

  getActiveFriendCode: (childProfileId: string = "profile-alex-demo"): FriendCodeRecord => {
    const existing = friendCodes.find(
      (fc) =>
        fc.childProfileId === childProfileId &&
        new Date(fc.expiresAt) > new Date() &&
        fc.usedCount < fc.maxUses
    );
    if (existing) return existing;

    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let codeStr = "HERO-";
    for (let i = 0; i < 4; i++) {
      codeStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const newCode: FriendCodeRecord = {
      id: `fcode-${Date.now()}`,
      code: codeStr,
      childProfileId,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
      usedCount: 0,
      maxUses: 3,
    };
    friendCodes.unshift(newCode);
    return newCode;
  },

  generateFriendCode: (childProfileId: string): FriendCodeRecord => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let codeStr = "HERO-";
    for (let i = 0; i < 4; i++) {
      codeStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const newCode: FriendCodeRecord = {
      id: `fcode-${Date.now()}`,
      code: codeStr,
      childProfileId,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
      usedCount: 0,
      maxUses: 3,
    };
    friendCodes.unshift(newCode);
    return newCode;
  },

  redeemFriendCode: (
    rawCode: string,
    childProfileId: string = "profile-alex-demo"
  ): { success: boolean; message: string; friend?: Friend } => {
    const code = rawCode.trim().toUpperCase();
    if (!code) {
      return { success: false, message: "Please enter a valid friend code." };
    }

    const demoCatalog: Record<string, Friend> = {
      "PANDA-88": {
        id: "friend-maya-extra",
        name: "Maya",
        handle: "PixelPanda",
        avatar: "pixel-panda",
        level: 3,
        levelTitle: "Cyber Guardian",
        badgeCount: 5,
        currentStreak: 7,
        status: "online",
        lastActiveAt: new Date().toISOString(),
        friendshipDate: new Date().toISOString(),
        mutualAdventures: 5,
      },
      "WOLF-42": {
        id: "friend-leo-extra",
        name: "Leo",
        handle: "CyberWolf",
        avatar: "cyber-wolf",
        level: 4,
        levelTitle: "Safety Champion",
        badgeCount: 6,
        currentStreak: 5,
        status: "online",
        lastActiveAt: new Date().toISOString(),
        friendshipDate: new Date().toISOString(),
        mutualAdventures: 8,
      },
      "STAR-77": {
        id: "friend-sam-extra",
        name: "Sam",
        handle: "StarCoder",
        avatar: "star-coder",
        level: 2,
        levelTitle: "Safety Scout",
        badgeCount: 3,
        currentStreak: 2,
        status: "exploring",
        lastActiveAt: new Date().toISOString(),
        friendshipDate: new Date().toISOString(),
        mutualAdventures: 3,
      },
      "ROBOT-99": {
        id: "friend-kai-extra",
        name: "Kai",
        handle: "ByteBuddy",
        avatar: "robot-shield",
        level: 5,
        levelTitle: "Digital Sentinel",
        badgeCount: 8,
        currentStreak: 12,
        status: "online",
        lastActiveAt: new Date().toISOString(),
        friendshipDate: new Date().toISOString(),
        mutualAdventures: 10,
      },
    };

    const foundCodeRecord = friendCodes.find((fc) => fc.code === code);
    if (foundCodeRecord) {
      if (foundCodeRecord.childProfileId === childProfileId) {
        return { success: false, message: "You cannot add yourself as a friend!" };
      }
      if (new Date(foundCodeRecord.expiresAt) < new Date()) {
        return { success: false, message: "This friend code has expired. Request a new one!" };
      }
      if (foundCodeRecord.usedCount >= foundCodeRecord.maxUses) {
        return { success: false, message: "This friend code has reached its maximum connections." };
      }
      foundCodeRecord.usedCount++;
      const newFriend: Friend = {
        id: `friend-${Date.now()}`,
        name: "Avery",
        handle: "CyberFalcon",
        avatar: "falcon-shield",
        level: 3,
        levelTitle: "Cyber Guardian",
        badgeCount: 4,
        currentStreak: 4,
        status: "online",
        lastActiveAt: new Date().toISOString(),
        friendshipDate: new Date().toISOString(),
        mutualAdventures: 2,
      };
      if (!friendsMap[childProfileId]) friendsMap[childProfileId] = [];
      friendsMap[childProfileId].push(newFriend);
      return { success: true, message: `Connected with Avery (@CyberFalcon)!`, friend: newFriend };
    }

    if (demoCatalog[code]) {
      const template = demoCatalog[code];
      const currentList = friendsMap[childProfileId] || [];
      const alreadyFriend = currentList.some((f) => f.handle.toLowerCase() === template.handle.toLowerCase());
      if (alreadyFriend) {
        return { success: false, message: `You are already friends with ${template.name} (@${template.handle})!` };
      }
      const newFriend = { ...template, id: `friend-${Date.now()}`, friendshipDate: new Date().toISOString() };
      if (!friendsMap[childProfileId]) friendsMap[childProfileId] = [];
      friendsMap[childProfileId].push(newFriend);
      return { success: true, message: `Connected with ${newFriend.name} (@${newFriend.handle})!`, friend: newFriend };
    }

    if ((code.startsWith("HERO-") || code.startsWith("SAFE-")) && code.length >= 8) {
      const newFriend: Friend = {
        id: `friend-${Date.now()}`,
        name: "Robin",
        handle: `EchoHero${code.replace(/[^0-9]/g, "").slice(-3) || "9"}`,
        avatar: "pixel-panda",
        level: 2,
        levelTitle: "Safety Scout",
        badgeCount: 3,
        currentStreak: 3,
        status: "online",
        lastActiveAt: new Date().toISOString(),
        friendshipDate: new Date().toISOString(),
        mutualAdventures: 1,
      };
      if (!friendsMap[childProfileId]) friendsMap[childProfileId] = [];
      friendsMap[childProfileId].push(newFriend);
      return { success: true, message: `Connected with ${newFriend.name} (@${newFriend.handle})!`, friend: newFriend };
    }

    return { success: false, message: "Friend code not recognized. Try HERO-4921, PANDA-88, or WOLF-42." };
  },

  getFriendChallenges: (childProfileId: string = "profile-alex-demo"): FriendChallenge[] => {
    return friendChallenges.filter((fc) => fc.toChildId === childProfileId);
  },

  acceptFriendChallenge: (challengeId: string): boolean => {
    const chal = friendChallenges.find((c) => c.id === challengeId);
    if (chal) {
      chal.status = "ACCEPTED";
      return true;
    }
    return false;
  },

  getFriendReactions: (childProfileId: string = "profile-alex-demo"): PredefinedReaction[] => {
    return friendReactions.filter((r) => r.toFriendId === childProfileId);
  },

  sendFriendReaction: (
    fromChildId: string = "profile-alex-demo",
    toFriendId: string,
    reactionText: string,
    icon: string
  ): PredefinedReaction => {
    const child = childProfiles.find((c) => c.id === fromChildId);
    const newReaction: PredefinedReaction = {
      id: `react-${Date.now()}`,
      fromFriendId: fromChildId,
      fromFriendName: child?.name?.split(" ")[0] || "Alex",
      toFriendId,
      text: reactionText,
      icon,
      timestamp: new Date().toISOString(),
    };
    friendReactions.unshift(newReaction);
    return newReaction;
  },

  resetDemoData: () => {
    users = [...INITIAL_USERS];
    childProfiles = [...INITIAL_CHILD_PROFILES];
    topicProgress = { ...INITIAL_TOPIC_PROGRESS };
    unlockedAchievements = { ...INITIAL_UNLOCKED_ACHIEVEMENTS };
    recommendations = { ...INITIAL_RECOMMENDATIONS };
    pairingCodes = [...INITIAL_PAIRING_CODES];
    friendsMap = { ...INITIAL_FRIENDS };
    friendCodes = [...INITIAL_FRIEND_CODES];
    friendChallenges = [...INITIAL_FRIEND_CHALLENGES];
    friendReactions = [...INITIAL_PREDEFINED_REACTIONS];
    return true;
  },
};
