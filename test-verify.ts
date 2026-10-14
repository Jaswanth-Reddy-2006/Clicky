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

console.log(`\n=== VERIFICATION RESULTS: ${passed} PASSED, ${failed} FAILED ===`);
if (failed > 0) process.exit(1);
