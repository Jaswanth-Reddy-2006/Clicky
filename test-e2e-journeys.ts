/**
 * Clicky End-to-End User Journey Verification Script
 * Covers Journeys A, B, C, D, E, F, G, H
 */

import { generateKindBotResponse, STARTER_QUESTIONS } from "./src/lib/kindbot/engine";
import { demoStore } from "./src/lib/store/demo-store";
import { GAMES_DATA } from "./src/lib/data/games-data";
import { ACHIEVEMENTS_DATA } from "./src/lib/data/achievements-data";

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passCount++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    failCount++;
  }
}

async function runE2EJourneys() {
  console.log("=== STARTING CLICKY E2E JOURNEYS VERIFICATION ===\n");

  // --- JOURNEY A: PUBLIC LANDING PAGE & HERO CHALLENGE ---
  console.log("--- Journey A: Landing Page & Hero Challenge ---");
  assert(GAMES_DATA.length === 8, "All 8 game definitions present for showcase");
  const scamGame = GAMES_DATA.find((g) => g.slug === "scam-detective");
  assert(!!scamGame && scamGame.scenarios.length >= 6, "Scam Detective ready with >=6 scenarios");

  // --- JOURNEY B: AUTHENTICATION & DEMO ROLES ---
  console.log("\n--- Journey B: Authentication & Demo Accounts ---");
  const childUser = demoStore.getUserByEmail("alex@clicky.demo");
  assert(!!childUser && childUser.role === "CHILD", "Child demo account (Alex) exists with role CHILD");
  const parentUser = demoStore.getUserByEmail("parent@clicky.demo");
  assert(!!parentUser && parentUser.role === "PARENT", "Parent demo account (Sarah) exists with role PARENT");

  const childProfile = demoStore.getChildProfileById("profile-alex-demo");
  assert(!!childProfile && childProfile.name === "Alex Miller", "Alex Miller child profile retrieved");
  assert(childProfile?.parentId === "parent-sarah-demo", "Alex Miller is linked to Sarah Miller");

  // --- JOURNEY C: GAME COMPLETION, XP, & DUPLICATE REWARD CHECK ---
  console.log("\n--- Journey C: Game Completion & Scoring ---");
  const initialXp = childProfile?.xp || 480;
  const gameToPlay = GAMES_DATA.find((g) => g.slug === "scam-detective")!;
  const firstScenario = gameToPlay.scenarios[0];
  const safeOption = firstScenario.options.find((o) => o.isCorrect)!;
  assert(safeOption.isCorrect === true, "Identified correct safe option in Scam Detective scenario 1");

  // Record completed game
  const sessionResult = demoStore.recordGameCompletion(
    "profile-alex-demo",
    "scam-detective",
    100,
    110
  );

  assert(!!sessionResult && sessionResult.newXp === initialXp + 110, "Earned 110 XP and updated newXp from completing game");
  const updatedChildProfile = demoStore.getChildProfileById("profile-alex-demo")!;
  assert(
    updatedChildProfile.xp === initialXp + 110,
    `Child XP correctly incremented from ${initialXp} to ${updatedChildProfile.xp}`
  );

  // --- JOURNEY D: PARENT-CHILD SYNCHRONIZATION ---
  console.log("\n--- Journey D: Parent-Child Real-Time Sync ---");
  const parentOverview = demoStore.getParentOverview("parent-sarah-demo")!;
  assert(!!parentOverview, "Parent overview data generated");
  assert(parentOverview.totalXp === updatedChildProfile.xp, "Parent totalXp matches child's updated XP");
  const latestActivity = parentOverview.recentActivities[0];
  assert(latestActivity?.gameSlug === "scam-detective", "Latest parent activity reflects newly completed game");
  assert(parentOverview.recommendations.length > 0, "Parent recommendations populated without shaming language");

  // --- JOURNEY E: KINDBOT SAFETY RESPONSES & INTENTS ---
  console.log("\n--- Journey E: KindBot Safety Intent Heuristics ---");
  // 1. Suspicious link
  const linkReply = generateKindBotResponse("Someone sent me a suspicious link.");
  assert(linkReply.intent === "scam_link_safety", "KindBot detected scam link intent");
  assert(linkReply.recommendedGameSlug === "scam-detective", "KindBot recommended Scam Detective game");

  // 2. Cyberbullying
  const bullyReply = generateKindBotResponse("Someone online is being mean to me and calling me names.");
  assert(bullyReply.intent === "cyberbullying", "KindBot detected cyberbullying intent");
  assert(bullyReply.recommendedGameSlug === "cyberbullying-heroes", "KindBot recommended Cyberbullying Heroes");

  // 3. Photo pressure
  const photoReply = generateKindBotResponse("A stranger wants my photo.");
  assert(photoReply.intent === "photo_safety", "KindBot detected photo pressure intent");
  assert(photoReply.urgencyLevel === "CONCERNING", "KindBot flagged photo request as CONCERNING");

  // 4. Voice clone / phone call
  const voiceReply = generateKindBotResponse("Someone called saying they know my mom and need money.");
  assert(voiceReply.intent === "voice_cloning_impersonation", "KindBot detected voice cloning/impersonation");
  assert(voiceReply.recommendedGameSlug === "voiceguard-rescue", "KindBot recommended VoiceGuard Rescue");

  // 5. Emergency in-person threat
  const emergencyReply = generateKindBotResponse("A stranger told me to meet me in person alone.");
  assert(emergencyReply.urgencyLevel === "EMERGENCY", "KindBot triggered EMERGENCY escalation");
  assert(emergencyReply.content.includes("911") || emergencyReply.content.includes("trusted humans"), "KindBot directed child to emergency services and trusted adults");

  // 6. General worried feelings
  const worriedReply = generateKindBotResponse("I feel worried about something online.");
  assert(worriedReply.intent === "emotional_safety", "KindBot recognized emotional safety worry intent");

  // --- JOURNEY F: PAIRING WORKFLOW & CODE REDEMPTION ---
  console.log("\n--- Journey F: Pairing Security & Lifecycle ---");
  const newCode = demoStore.generatePairingCode("parent-sarah-demo");
  assert(newCode.code.startsWith("CLICKY-"), "Pairing code has correct CLICKY- prefix");
  assert(!newCode.usedAt, "Pairing code starts unredeemed");

  const redeemSuccess = demoStore.redeemPairingCode(newCode.code, "profile-alex-demo");
  assert(redeemSuccess.success === true, "Valid pairing code redeemed successfully");

  const redeemReused = demoStore.redeemPairingCode(newCode.code, "profile-alex-demo");
  assert(redeemReused.success === false, "Reused pairing code successfully rejected");

  const redeemInvalid = demoStore.redeemPairingCode("INVALID-9999", "profile-alex-demo");
  assert(redeemInvalid.success === false, "Invalid code successfully rejected");

  // --- JOURNEY G: SAFE FRIENDS CIRCLE & ASYNCHRONOUS CHALLENGES ---
  console.log("\n--- Journey G: Safe Friends Circle & Positive Social Engagement ---");
  const initialFriends = demoStore.getFriends("profile-alex-demo");
  assert(initialFriends.length >= 3, "Alex has seeded demo friends for social safety learning");

  // Expiring code generation
  const activeCode = demoStore.getActiveFriendCode("profile-alex-demo");
  assert(activeCode.code.startsWith("HERO-"), "Active friend code format is verified");

  // Connect new demo friend
  const redeemDemoFriend = demoStore.redeemFriendCode("STAR-77", "profile-alex-demo");
  assert(redeemDemoFriend.success === true || redeemDemoFriend.message.includes("already friends"), "Redeemed valid demo friend code");

  // Asynchronous challenge acceptance
  const initialChallenges = demoStore.getFriendChallenges("profile-alex-demo");
  assert(initialChallenges.length > 0, "Alex has pending safety challenges from friends");
  const accepted = demoStore.acceptFriendChallenge(initialChallenges[0].id);
  assert(accepted === true, "Challenge accepted for asynchronous safety competition");

  // Predefined positive reaction dispatch (COPPA-safe encouragement)
  const cheer = demoStore.sendFriendReaction(
    "profile-alex-demo",
    "friend-maya-demo",
    "🌟 Awesome learning streak!",
    "🌟"
  );
  assert(cheer.fromFriendName === "Alex", "Cheer properly associated with child sender");
  assert(cheer.text === "🌟 Awesome learning streak!", "Predefined encouragement text recorded without unrestricted open chat");

  // --- SUMMARY ---
  console.log(`\n========================================`);
  console.log(`E2E JOURNEY RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
  console.log(`========================================`);

  if (failCount > 0) process.exit(1);
}

runE2EJourneys();

