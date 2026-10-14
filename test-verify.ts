// Comprehensive Verification Suite for Clicky
import { demoStore } from "./src/lib/store/demo-store";
import { generateKindBotResponse } from "./src/lib/kindbot/engine";
import { GAMES_DATA } from "./src/lib/data/games-data";
import { ACHIEVEMENTS_DATA } from "./src/lib/data/achievements-data";

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    failed++;
  }
}

console.log("=== STARTING CLICKY SYSTEM VERIFICATION ===\n");

// 1. Verify 8 Games and Scenarios
assert(GAMES_DATA.length === 8, "Exactly 8 fully defined games exist");
GAMES_DATA.forEach((g) => {
  assert(
    g.scenarios.length >= 6,
    `Game '${g.title}' has at least 6 scenarios (actual: ${g.scenarios.length})`
  );
  g.scenarios.forEach((s) => {
    assert(s.options.length >= 2, `Scenario '${s.title}' has options`);
    const correctOpts = s.options.filter((o) => o.isCorrect);
    assert(
      correctOpts.length >= 1,
      `Scenario '${s.title}' has at least 1 correct safe option`
    );
  });
});

// 2. Verify Demo Accounts
const parentUser = demoStore.getUserByEmail("parent@clicky.demo");
assert(!!parentUser && parentUser.role === "PARENT", "Parent demo user (Sarah) seeded");

const childUser = demoStore.getUserByEmail("alex@clicky.demo");
assert(!!childUser && childUser.role === "CHILD", "Child demo user (Alex) seeded");

const childProfile = demoStore.getChildProfileByUserId(childUser!.id);
assert(
  !!childProfile && childProfile.parentId === parentUser!.id,
  "Child profile is linked to parent account"
);

// 3. Verify KindBot Intent & Safety Engine
const emergencyReply = generateKindBotResponse("someone is asking to meet me in person");
assert(
  emergencyReply.urgencyLevel === "EMERGENCY" &&
    emergencyReply.content.includes("parent") &&
    emergencyReply.content.includes("911"),
  "KindBot emergency heuristic triggers adult & emergency protection"
);

const photoReply = generateKindBotResponse("someone wants me to send a private photo");
assert(
  photoReply.content.includes("NEVER send private photos") &&
    photoReply.recommendedGameSlug === "privacy-protector",
  "KindBot photo protection triggers correct advice and Privacy Protector link"
);

const scamReply = generateKindBotResponse("I clicked a link for free game coins");
assert(
  scamReply.content.includes("password") &&
    scamReply.recommendedGameSlug === "scam-detective",
  "KindBot scam detection triggers Scam Detective game link"
);

// 4. Verify Game Completion & XP Persistence
const initialXp = childProfile!.xp;
const completion = demoStore.recordGameCompletion(
  childProfile!.id,
  "scam-detective",
  100,
  150
);

assert(
  !!completion && completion.newXp === initialXp + 150,
  "Game completion records and updates child XP"
);

// 5. Verify Parent Overview Real-Time Sync
const parentOverview = demoStore.getParentOverview(parentUser!.id);
assert(
  !!parentOverview && parentOverview.totalXp === completion!.newXp,
  "Parent dashboard immediately synchronizes with child's updated XP"
);
assert(
  parentOverview!.recentActivities[0].gameSlug === "scam-detective",
  "Parent recent activity shows the newly completed mission"
);

// 6. Verify One-Time Pairing Code Workflow
const pairing = demoStore.generatePairingCode(parentUser!.id);
assert(!!pairing && pairing.code.startsWith("CLICKY-"), "Generated valid pairing code format");

const redeemSuccess = demoStore.redeemPairingCode(pairing.code, childProfile!.id);
assert(redeemSuccess.success === true, "Pairing code redeemed successfully");

const redeemReused = demoStore.redeemPairingCode(pairing.code, childProfile!.id);
assert(redeemReused.success === false, "Reused pairing code rejected");

// 7. Verify Safe Friends System & Demo Friends
const alexFriends = demoStore.getFriends(childProfile!.id);
assert(alexFriends.length >= 3, `Alex has at least 3 seeded safe demo friends (actual: ${alexFriends.length})`);
assert(alexFriends.some((f) => f.handle === "CyberWolf"), "Leo (CyberWolf) is present in friends list");
assert(alexFriends.some((f) => f.handle === "PixelPanda"), "Maya (PixelPanda) is present in friends list");
assert(alexFriends.some((f) => f.handle === "StarCoder"), "Sam (StarCoder) is present in friends list");

// 8. Verify Expiring Friend Code Lifecycle
const activeFriendCode = demoStore.getActiveFriendCode(childProfile!.id);
assert(activeFriendCode.code.startsWith("HERO-"), "Active friend code has HERO- prefix");
assert(new Date(activeFriendCode.expiresAt) > new Date(), "Friend code has future expiration timestamp");

const newFriendCode = demoStore.generateFriendCode(childProfile!.id);
assert(newFriendCode.code.startsWith("HERO-"), "Generated new unique friend code");

// 9. Verify Friend Code Redemption
const friendRedeemSuccess = demoStore.redeemFriendCode("WOLF-42", childProfile!.id);
assert(
  friendRedeemSuccess.success === true || friendRedeemSuccess.message.includes("already friends"),
  "Demo friend code redeem handles valid connection"
);

const friendRedeemInvalid = demoStore.redeemFriendCode("XYZ-000", childProfile!.id);
assert(friendRedeemInvalid.success === false, "Unrecognized friend code rejected cleanly");

// 10. Verify Predefined Encouragement Reactions & Asynchronous Challenges
const challenges = demoStore.getFriendChallenges(childProfile!.id);
assert(challenges.length >= 1, "Child has pending asynchronous friend challenges");
const challengeAccepted = demoStore.acceptFriendChallenge(challenges[0].id);
assert(challengeAccepted === true, "Friend challenge accepted successfully");

const cheerSent = demoStore.sendFriendReaction(
  childProfile!.id,
  "friend-maya-demo",
  "Great detective work on that fake gem link!",
  "🌟"
);
assert(cheerSent.text.length > 0 && cheerSent.icon === "🌟", "Safe predefined cheer dispatched");

console.log(`\n=== VERIFICATION RESULTS: ${passed} PASSED, ${failed} FAILED ===`);
if (failed > 0) process.exit(1);

