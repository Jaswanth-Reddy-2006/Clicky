import { KindBotMessage } from "@/types";

export interface KindBotReply {
  content: string;
  suggestedActions: string[];
  recommendedGameSlug?: string;
  recommendedGameTitle?: string;
  urgencyLevel: "NORMAL" | "CONCERNING" | "EMERGENCY";
  intent: string;
}

export const STARTER_QUESTIONS = [
  "Someone online is asking for my photo. What should I do?",
  "A person in my video game is being mean and calling me names.",
  "I clicked a strange link and now I'm worried my device has a virus.",
  "An AI chatbot told me something that sounds scary or weird.",
  "Someone sent me a message saying they know my mom or dad.",
  "How can I tell if a viral video or news story is fake?",
];

// Context-aware intents and safety heuristics
export function generateKindBotResponse(userMessage: string): KindBotReply {
  const query = userMessage.toLowerCase().trim();

  // 1. Critical Emergency / In-person Danger / Severe Threat
  if (
    query.includes("meet me in person") ||
    query.includes("come to my house") ||
    query.includes("hurting myself") ||
    query.includes("kill") ||
    query.includes("suicide") ||
    query.includes("run away") ||
    query.includes("touch") ||
    query.includes("kidnap")
  ) {
    return {
      content:
        "Alex, I hear you, and your safety is the number one priority right now. Because I am an AI computer program, I cannot protect you directly, but trusted humans can. Please pause what you are doing online right now and talk to your parent, guardian, teacher, or call emergency services (like 911 or the Childhelp National Helpline at 1-800-422-4453). You are not in trouble, and asking for help is the bravest thing you can do.",
      suggestedActions: [
        "Tell your parent or guardian immediately",
        "Keep your device in the family room",
        "Do not go anywhere alone",
        "Call 911 or emergency services if you are in immediate physical danger",
      ],
      urgencyLevel: "EMERGENCY",
      intent: "emergency_assistance",
    };
  }

  // 2. Photo / Private Images / Webcam / Blackmail
  if (
    query.includes("photo") ||
    query.includes("picture") ||
    query.includes("webcam") ||
    query.includes("camera") ||
    query.includes("nude") ||
    query.includes("private picture") ||
    query.includes("show me your")
  ) {
    return {
      content:
        "Stop right there, and take a deep breath. You should NEVER send private photos of yourself, your face, your bedroom, or your body to anyone online—even if they claim to be a friend, a celebrity, or say they will send one back. If someone is pressuring you or threatening you, you did nothing wrong. Do NOT send the picture, do not delete the messages, and show a parent or trusted adult right away.",
      suggestedActions: [
        "Do NOT send any photos or turn on your webcam",
        "Take a screenshot of the request for proof",
        "Block the user who asked",
        "Show your parent, guardian, or school counselor immediately",
      ],
      recommendedGameSlug: "privacy-protector",
      recommendedGameTitle: "Privacy Protector",
      urgencyLevel: "CONCERNING",
      intent: "photo_safety",
    };
  }

  // 3. Cyberbullying / Mean messages / Being excluded
  if (
    query.includes("mean") ||
    query.includes("bully") ||
    query.includes("calling me names") ||
    query.includes("hate") ||
    query.includes("kicked out") ||
    query.includes("toxic") ||
    query.includes("harass") ||
    query.includes("rude")
  ) {
    return {
      content:
        "I'm really sorry someone is being unkind to you. Being on the receiving end of mean comments hurts, but remember: what people say online says everything about them, not about you. You never have to stay in a game lobby or chat with someone who makes you feel bad. Use the built-in mute and block buttons—they take away the bully's microphone instantly!",
      suggestedActions: [
        "Mute or block the person right now",
        "Do not insult them back (that feeds the fire)",
        "Take a screenshot if it's repeated harassment",
        "Talk to a friend, parent, or favorite teacher",
      ],
      recommendedGameSlug: "cyberbullying-heroes",
      recommendedGameTitle: "Cyberbullying Heroes",
      urgencyLevel: "NORMAL",
      intent: "cyberbullying",
    };
  }

  // 4. Clicked a link / Suspicious download / Scams
  if (
    query.includes("link") ||
    query.includes("virus") ||
    query.includes("download") ||
    query.includes("free robux") ||
    query.includes("free v-bucks") ||
    query.includes("gems") ||
    query.includes("password") ||
    query.includes("scam") ||
    query.includes("hacked")
  ) {
    return {
      content:
        "Don't panic! Lots of kids (and adults too!) accidentally click tricky links. The most important thing is what you do next: 1) Close the tab immediately, 2) Do NOT type your password or any codes on that page, and 3) Let a parent know so they can run an antivirus scan. You are NOT in trouble for making an honest mistake.",
      suggestedActions: [
        "Close the suspicious browser tab immediately",
        "Do NOT enter any passwords or verification codes",
        "If you already entered a password, change it right away from an official app",
        "Ask a parent to run a quick virus scan on the device",
      ],
      recommendedGameSlug: "scam-detective",
      recommendedGameTitle: "Scam Detective",
      urgencyLevel: "NORMAL",
      intent: "scam_link_safety",
    };
  }

  // 5. Voice cloning / Phone calls / Impersonation
  if (
    query.includes("voice") ||
    query.includes("call") ||
    query.includes("phone") ||
    query.includes("sounds like mom") ||
    query.includes("sounds like dad") ||
    query.includes("grandma") ||
    query.includes("emergency money") ||
    query.includes("safe word")
  ) {
    return {
      content:
        "That is a very smart thing to ask about. With new AI tools, scammers can copy people's voices to make fake emergency phone calls. Always remember: if anyone calls asking for urgent money, passwords, or gift cards, hang up and call your family member's real number directly. You can also ask for your family's secret safe word!",
      suggestedActions: [
        "Hang up and call your family member's known saved number",
        "Ask the caller for your agreed Family Safe Word",
        "Never give credit card numbers or gift cards over the phone",
        "Talk to an adult in the room before making any decisions",
      ],
      recommendedGameSlug: "voiceguard-rescue",
      recommendedGameTitle: "VoiceGuard Rescue",
      urgencyLevel: "CONCERNING",
      intent: "voice_cloning_impersonation",
    };
  }

  // 6. AI Chatbots / Strange AI answers / Hallucinations
  if (
    query.includes("ai") ||
    query.includes("chatbot") ||
    query.includes("robot") ||
    query.includes("chatgpt") ||
    query.includes("strange answer") ||
    query.includes("hallucinate")
  ) {
    return {
      content:
        "As an AI myself, I have a secret to share: AI models are computer programs that predict words, not all-knowing wizards! AI can sound very confident while being completely wrong, and sometimes it invents made-up facts. Always double-check facts with books, teachers, or reputable websites, and never treat an AI like a human diary for private secrets.",
      suggestedActions: [
        "Verify AI facts with trusted encyclopedia or school sources",
        "Never share your real address or secrets with AI chatbots",
        "Remember that AI does not have real feelings or consciousness",
        "Report inappropriate bot responses to a parent",
      ],
      recommendedGameSlug: "safe-ai-explorer",
      recommendedGameTitle: "Safe AI Explorer",
      urgencyLevel: "NORMAL",
      intent: "ai_literacy",
    };
  }

  // 7. Fake news / Misinformation / Viral rumors
  if (
    query.includes("fake") ||
    query.includes("fact") ||
    query.includes("real or fake") ||
    query.includes("viral") ||
    query.includes("news") ||
    query.includes("rumor") ||
    query.includes("deepfake")
  ) {
    return {
      content:
        "Investigating viral claims is an awesome superpower! When you see a shocking headline or video: 1) Check who posted it, 2) Look for blurry or warped glitches that suggest AI editing, 3) Search if established news channels reported it, and 4) Ask: does this sound too wild to be true? If so, don't share it until you verify!",
      suggestedActions: [
        "Search trusted news outlets to see if real journalists covered it",
        "Look for weird lighting and audio desync in videos",
        "Read past the headline before believing it",
        "Avoid sharing unverified rumors with classmates",
      ],
      recommendedGameSlug: "fake-or-fact",
      recommendedGameTitle: "Fake or Fact",
      urgencyLevel: "NORMAL",
      intent: "misinformation",
    };
  }

  // 8. General / Fallback supportive educational reply
  return {
    content:
      "Hi there! I'm KindBot, your digital safety companion. My mission is to help you explore games, internet apps, and virtual worlds safely and confidently! Whatever you're wondering about—whether it's spotting scams, handling mean chat messages, or protecting your privacy—I'm here to give you helpful tips. What's on your mind today?",
    suggestedActions: [
      "Ask: 'How do I know if a link is safe?'",
      "Ask: 'What should I do if a player is bullying me?'",
      "Ask: 'Can AI chatbots make mistakes?'",
      "Practice a safety game in the Arcade!",
    ],
    recommendedGameSlug: "scam-detective",
    recommendedGameTitle: "Scam Detective",
    urgencyLevel: "NORMAL",
    intent: "general_help",
  };
}
