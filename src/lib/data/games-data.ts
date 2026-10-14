import { GameDefinition } from "@/types";

export const GAMES_DATA: GameDefinition[] = [
  // 1. SCAM DETECTIVE
  {
    slug: "scam-detective",
    title: "Scam Detective",
    subtitle: "The Mystery of the Free Game Coins",
    theme: "Detective Mystery",
    description:
      "Put on your detective hat! Inspect suspicious messages, spot red flags, and stop cyber scammers from stealing accounts and passwords.",
    topic: "Scam Awareness",
    iconName: "Search",
    colorScheme: {
      primary: "#344D78",
      secondary: "#F6D84A",
      accent: "#E9A15A",
      badgeBg: "bg-amber-100 text-amber-800",
    },
    totalScenarios: 6,
    badgeSlug: "scam-spotter",
    badgeName: "Scam Spotter Badge",
    estimatedMinutes: 8,
    scenarios: [
      {
        id: "sd-1",
        gameSlug: "scam-detective",
        scenarioIndex: 1,
        title: "The Free Gem Extravaganza",
        prompt:
          "You receive a direct message in your favorite game lobby from a player named 'Admin_Bonus_99'.",
        characterName: "Admin_Bonus_99",
        characterAvatar: "🎮",
        characterMessage:
          "🎉 CONGRATULATIONS! You won 10,000 Ultra-Gems! Click here NOW: http://free-gems-claim-now.xyz/login. Enter your game password within 5 minutes or your prize goes to someone else!!",
        clue: "Look closely at the website link and how they are rushing you.",
        redFlags: [
          "Urgency: 'within 5 minutes'",
          "Asking for your private password",
          "Strange suspicious web link (.xyz)",
          "Real game admins never ask for your password in chat",
        ],
        safetyConcept:
          "Legitimate companies and game administrators will NEVER ask for your password or threaten you with a countdown timer to claim prizes.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Scam Awareness",
        options: [
          {
            id: "sd-1-a",
            text: "Click the link immediately and type your password so you don't miss out on the gems.",
            isCorrect: false,
            feedback:
              "Uh oh! That link leads to a phishing website. Scammers use fake prize promises to steal accounts!",
            safetyLesson:
              "Never enter your password on links sent in chat messages.",
          },
          {
            id: "sd-1-b",
            text: "Ignore the link, report the account for phishing, and tell a trusted adult or moderator.",
            isCorrect: true,
            feedback:
              "Brilliant detective work! You recognized the fake urgency, weird web address, and password request.",
            safetyLesson:
              "Red flags: false urgency, requesting passwords, and weird URLs.",
          },
          {
            id: "sd-1-c",
            text: "Message the person asking if they can just email the code instead.",
            isCorrect: false,
            feedback:
              "Talking back to scammers lets them know your account is active and they might try other tricks.",
            safetyLesson:
              "Do not engage with scammers; report and block immediately.",
          },
        ],
      },
      {
        id: "sd-2",
        gameSlug: "scam-detective",
        scenarioIndex: 2,
        title: "The Urgent Security Alert",
        prompt:
          "An email arrives with a bright red banner claiming your video streaming account is suspended.",
        characterName: "Security Alert Desk",
        characterAvatar: "🚨",
        characterMessage:
          "DEAR CUSTOMER: We detected unauthorized logins from Antarctica. Your account will be DELETED in 1 hour unless you verify your credit card and home address here: bit.ly/fix-account-quick",
        clue: "Check who sent it and the shortened URL link.",
        redFlags: [
          "Alarmist language and extreme fear tactics",
          "Shortened link (bit.ly) hiding the real destination",
          "Asking for credit card details to 'verify' an account",
        ],
        safetyConcept:
          "Phishing emails use fear and panic to make you act without thinking. Real services don't ask for credit cards to unlock accounts via shortened links.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Scam Awareness",
        options: [
          {
            id: "sd-2-a",
            text: "Panic and quickly click the link to re-enter your family's payment card.",
            isCorrect: false,
            feedback:
              "Stop! Shortened links like bit.ly can hide dangerous fake forms designed to steal money.",
            safetyLesson: "Never enter card details from unexpected panic emails.",
          },
          {
            id: "sd-2-b",
            text: "Do not click the link. Open the official website directly or ask your parent to check their account.",
            isCorrect: true,
            feedback:
              "Superb! By going directly to the official app or website, you avoid fake traps completely.",
            safetyLesson:
              "Always verify account alerts through official apps or trusted adults.",
          },
          {
            id: "sd-2-c",
            text: "Forward the email to all your school friends so they can check their accounts too.",
            isCorrect: false,
            feedback:
              "Forwarding scam links spreads the danger to your friends!",
            safetyLesson:
              "Don't forward unverified scary alerts to classmates.",
          },
        ],
      },
      {
        id: "sd-3",
        gameSlug: "scam-detective",
        scenarioIndex: 3,
        title: "The 'Friend' in Need",
        prompt:
          "You get a chat from your school friend Leo's profile, but the way he talks feels completely different.",
        characterName: "Leo (or an Imposter?)",
        characterAvatar: "👦",
        characterMessage:
          "Hey bro, I lost my phone and locked myself out. Can you give me your cell phone number? I need to send a 6-digit code to your phone so I can get back into my account. Please hurry!!",
        clue: "Why does Leo need YOUR phone number to unlock HIS account? That 6-digit code might be for your account!",
        redFlags: [
          "Requesting a two-factor verification code",
          "Unusual tone of voice from a friend",
          "Attempt to hijack your account via SMS code",
        ],
        safetyConcept:
          "Never share 2-factor authentication (2FA) or SMS verification codes with anyone—even friends! Hackers hijack accounts to trick friends into giving up their codes.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Scam Awareness",
        options: [
          {
            id: "sd-3-a",
            text: "Send the 6-digit code as soon as it arrives on your phone to be nice.",
            isCorrect: false,
            feedback:
              "Danger! That code was to reset YOUR password. You just gave away your account!",
            safetyLesson: "SMS verification codes are secret keys for your eyes only.",
          },
          {
            id: "sd-3-b",
            text: "Call Leo on the phone or ask him in person at school to see if his account was hacked.",
            isCorrect: true,
            feedback:
              "Detective Masterclass! Verifying through another channel caught the scammer before any harm was done.",
            safetyLesson:
              "When a friend asks for codes or money online, verify with them in person or by phone.",
          },
          {
            id: "sd-3-c",
            text: "Send a fake 6-digit code to tease them.",
            isCorrect: false,
            feedback:
              "Engaging with account hackers can be risky. Better to verify offline and report the compromised account.",
            safetyLesson:
              "Verify compromised accounts outside the chat platform.",
          },
        ],
      },
      {
        id: "sd-4",
        gameSlug: "scam-detective",
        scenarioIndex: 4,
        title: "The Mystery Box Giveaway",
        prompt:
          "A pop-up appears while browsing a fan wiki: 'SPIN THE WHEEL! You won a Golden Mythic Pet!'",
        characterName: "Lucky Wheel Pop-Up",
        characterAvatar: "🎡",
        characterMessage:
          "You are visitor #1,000,000! Download our special claim app 'FastPrize_Installer.exe' to inject the pet into your game!",
        clue: "Look at the file extension: .exe means an executable program that can run code on your computer.",
        redFlags: [
          "Visitor number 1,000,000 cliché",
          "Downloading an .exe installer to claim a virtual prize",
          "Pop-up advertisement disguised as game reward",
        ],
        safetyConcept:
          "Downloading files from pop-ups can install malware, keyloggers, or viruses that steal your files and passwords.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Scam Awareness",
        options: [
          {
            id: "sd-4-a",
            text: "Download and run 'FastPrize_Installer.exe' with virus protection turned off.",
            isCorrect: false,
            feedback:
              "Oh no! That file is malware. It can damage your computer and spy on your keystrokes.",
            safetyLesson: "Never download or run executable files from random web pop-ups.",
          },
          {
            id: "sd-4-b",
            text: "Close the pop-up tab immediately and continue reading without clicking anything inside it.",
            isCorrect: true,
            feedback:
              "Spot on! Legitimate games do not deliver rewards through .exe installers on external websites.",
            safetyLesson:
              "Game rewards are only delivered inside the official game, never via .exe popups.",
          },
          {
            id: "sd-4-c",
            text: "Click 'Cancel' inside the pop-up window.",
            isCorrect: false,
            feedback:
              "Tricky! Fake pop-ups often make the 'Cancel' or 'X' button act as a download link. Always close the browser tab directly!",
            safetyLesson:
              "Close the actual browser tab, not the buttons inside deceptive pop-ups.",
          },
        ],
      },
      {
        id: "sd-5",
        gameSlug: "scam-detective",
        scenarioIndex: 5,
        title: "The Celebrity Live Stream",
        prompt:
          "You see a stream titled 'MrBeast Official 24/7 Giveaway! Send $5 to receive $50 back!'. The video loops old footage.",
        characterName: "Fake Streamer Channel",
        characterAvatar: "📺",
        characterMessage:
          "Today only! Our crypto and gift card doubling bot is live! Scan the QR code or send $10 to get $100 back in 60 seconds!",
        clue: "Think about logic: why would anyone give away free money for sending them money?",
        redFlags: [
          "Promise of 'doubling' money or free cash returns",
          "Looped video footage pretending to be live",
          "Asking you to send money or scan unfamiliar QR codes",
        ],
        safetyConcept:
          "Money-doubling scams are 100% fake. Once you send money or gift cards, the scammer blocks you and disappears.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Scam Awareness",
        options: [
          {
            id: "sd-5-a",
            text: "Send $5 just in case it's real to see if you get $50 back.",
            isCorrect: false,
            feedback:
              "You would lose that $5! No celebrity or business doubles money sent by viewers.",
            safetyLesson: "There is no such thing as free money-doubling on streams.",
          },
          {
            id: "sd-5-b",
            text: "Report the stream for impersonation and fraud to the video platform.",
            isCorrect: true,
            feedback:
              "Great job protecting the community! Reporting fake streams helps prevent other kids from being tricked.",
            safetyLesson:
              "Report fake celebrity giveaway streams on the platform.",
          },
          {
            id: "sd-5-c",
            text: "Leave a comment arguing with the bot.",
            isCorrect: false,
            feedback:
              "Comments actually help boost the video in the algorithm! Reporting is much more effective.",
            safetyLesson: "Report instead of commenting on scam streams.",
          },
        ],
      },
      {
        id: "sd-6",
        gameSlug: "scam-detective",
        scenarioIndex: 6,
        title: "The In-Game Trade Switcheroo",
        prompt:
          "A player in a trading hub offers you an ultra-rare Dragon Sword, but says their trade menu is bugged.",
        characterName: "ShadowTrader_X",
        characterAvatar: "🗡️",
        characterMessage:
          "My trade window gives an error. Give me your Neon Armor first, then I promise on my life I will drop the Dragon Sword on the floor for you!",
        clue: "When someone asks you to bypass the official trade screen, they usually plan to run away.",
        redFlags: [
          "Bypassing the built-in game trade protection window",
          "Asking for your valuable item first based on a 'promise'",
          "Claiming the system has a 'glitch' or 'bug'",
        ],
        safetyConcept:
          "Safe trading systems require both players to confirm simultaneously. Never drop items or trust 'promises' outside the official trade window.",
        xpReward: 70,
        difficulty: "CHALLENGING",
        topic: "Scam Awareness",
        options: [
          {
            id: "sd-6-a",
            text: "Trust them and drop your Neon Armor because they promised.",
            isCorrect: false,
            feedback:
              "They picked up your armor and logged off immediately! Trust-trading is one of the oldest game scams.",
            safetyLesson: "Never participate in 'trust trades' or drop-trades.",
          },
          {
            id: "sd-6-b",
            text: "Refuse the trade unless it happens through the secure, official in-game trading screen.",
            isCorrect: true,
            feedback:
              "You solved the case! Your Neon Armor is safe. True detectives always use official trade safeguards.",
            safetyLesson:
              "Only trade inside the verified two-way confirmation system of the game.",
          },
          {
            id: "sd-6-c",
            text: "Ask them to give you their password as insurance first.",
            isCorrect: false,
            feedback:
              "Asking for or exchanging passwords is a violation of game rules and doesn't make the trade safe.",
            safetyLesson: "Stay within the game's built-in trading rules.",
          },
        ],
      },
    ],
  },

  // 2. CYBERBULLYING HEROES
  {
    slug: "cyberbullying-heroes",
    title: "Cyberbullying Heroes",
    subtitle: "Standing Up, Speaking Out, Staying Kind",
    theme: "Superheroes of Empathy",
    description:
      "Step into the shoes of an online hero. Recognize mean behavior, protect classmates from harassment, and learn the power of being an upstander.",
    topic: "Cyberbullying",
    iconName: "Shield",
    colorScheme: {
      primary: "#344D78",
      secondary: "#A9DCCB",
      accent: "#E9A15A",
      badgeBg: "bg-emerald-100 text-emerald-800",
    },
    totalScenarios: 6,
    badgeSlug: "kindness-hero",
    badgeName: "Defender of Kindness Badge",
    estimatedMinutes: 8,
    scenarios: [
      {
        id: "cb-1",
        gameSlug: "cyberbullying-heroes",
        scenarioIndex: 1,
        title: "The Class Group Chat Exclusion",
        prompt:
          "In the class group chat, two popular classmates start mocking Maya's drawing project, telling everyone to exclude her.",
        characterName: "Maya (Feeling sad)",
        characterAvatar: "🎨",
        characterMessage:
          "Chat Message from Ben: 'Maya's drawing looks like a 3-year-old made it 😂 Everyone vote to kick Maya out of our study group!'",
        clue: "Think about how Maya feels and the difference between teasing and targeted harassment.",
        redFlags: [
          "Public humiliation in front of the whole class",
          "Encouraging a group pile-on to exclude someone",
          "Repeated negative comments aimed at one person",
        ],
        safetyConcept:
          "An Upstander is someone who notices unfair treatment and speaks up supportively or tells a trusted adult, instead of quietly watching.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Cyberbullying",
        options: [
          {
            id: "cb-1-a",
            text: "Post a laughing emoji so Ben and the popular kids think you're cool.",
            isCorrect: false,
            feedback:
              "Joining in makes Maya feel worse and gives the bully more confidence to keep attacking.",
            safetyLesson: "Never encourage or join in on public mockery.",
          },
          {
            id: "cb-1-b",
            text: "Reply in the chat: 'Hey, that's not cool. Maya put a lot of work into that!' and send Maya a supportive private message.",
            isCorrect: true,
            feedback:
              "True Hero move! You set a respectful boundary in public and made Maya feel valued and supported.",
            safetyLesson:
              "Upstanders defend targets respectfully and offer private encouragement.",
          },
          {
            id: "cb-1-c",
            text: "Start insulting Ben's appearance and calling him names to get revenge.",
            isCorrect: false,
            feedback:
              "Retaliating with more bullying creates a flame war and makes the chat even more toxic.",
            safetyLesson:
              "Do not bully the bully. Firm, respectful boundaries work best.",
          },
        ],
      },
      {
        id: "cb-2",
        gameSlug: "cyberbullying-heroes",
        scenarioIndex: 2,
        title: "The Hurtful Meme Page",
        prompt:
          "Someone created an anonymous social account called 'School_Gossip_Secrets' posting embarrassing candid photos of kids.",
        characterName: "Anonymous Page",
        characterAvatar: "🎭",
        characterMessage:
          "Caption on photo: 'Look who tripped in the cafeteria today! What a loser 🤡 Tag their friends!'",
        clue: "Spreading anonymous gossip accounts only works if people like, comment, and share.",
        redFlags: [
          "Photos taken without permission",
          "Anonymous account hiding behind a screen to be mean",
          "Designed to humiliate people publicly",
        ],
        safetyConcept:
          "Anonymous gossip pages thrive on attention. Starving them of engagement and reporting them shuts them down.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Cyberbullying",
        options: [
          {
            id: "cb-2-a",
            text: "Tag friends in the comments so everyone can see the funny photo.",
            isCorrect: false,
            feedback:
              "Tagging friends spreads the embarrassment and helps the anonymous bully harm your classmate.",
            safetyLesson: "Do not interact with or amplify gossip pages.",
          },
          {
            id: "cb-2-b",
            text: "Report the account and photo to the platform for harassment, and tell a school counselor or parent.",
            isCorrect: true,
            feedback:
              "Heroic action! Reporting anonymous bullying accounts helps get them taken down by platform moderators.",
            safetyLesson:
              "Report harassment directly to the platform and inform trusted school staff.",
          },
          {
            id: "cb-2-c",
            text: "Message the account asking them not to post a photo of you next.",
            isCorrect: false,
            feedback:
              "Showing fear to anonymous bullies often makes them target you next. Report them instead.",
            safetyLesson:
              "Report anonymously rather than bargaining with harassers.",
          },
        ],
      },
      {
        id: "cb-3",
        gameSlug: "cyberbullying-heroes",
        scenarioIndex: 3,
        title: "Gaming Voice-Chat Toxicity",
        prompt:
          "During a team match, a player starts screaming insults at a younger player who missed an easy goal.",
        characterName: "RageGamer99",
        characterAvatar: "🤬",
        characterMessage:
          "VOICE CHAT: 'You are absolute trash! Uninstall the game right now! Nobody wants you here, quit forever!'",
        clue: "Games have built-in mute and block buttons for a reason.",
        redFlags: [
          "Verbal abuse and screaming over a game",
          "Targeting a player with demoralizing insults",
          "Ruining the fun and safety of the gaming space",
        ],
        safetyConcept:
          "Nobody has the right to verbally abuse you in a game. Muting toxic players immediately protects your mental peace.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Cyberbullying",
        options: [
          {
            id: "cb-3-a",
            text: "Scream back louder and use worse words so they know you aren't scared.",
            isCorrect: false,
            feedback:
              "Engaging in screaming matches can get your own account banned and ruins the game for everyone.",
            safetyLesson: "Do not feed the troll. Escalating toxicity helps no one.",
          },
          {
            id: "cb-3-b",
            text: "Mute and report the toxic player, and tell the younger player: 'Don't worry about them, nice try on that play!'",
            isCorrect: true,
            feedback:
              "Outstanding sportsmanship! Muting takes away the bully's microphone, and kindness keeps your team happy.",
            safetyLesson:
              "Use the mute tool immediately and encourage the targeted teammate.",
          },
          {
            id: "cb-3-c",
            text: "Quit the game immediately and throw your controller.",
            isCorrect: false,
            feedback:
              "Leaving punishes yourself and your other teammates instead of handling the problem player.",
            safetyLesson:
              "Muting the offender is better than abandoning your game.",
          },
        ],
      },
      {
        id: "cb-4",
        gameSlug: "cyberbullying-heroes",
        scenarioIndex: 4,
        title: "The Threatening Private Message",
        prompt:
          "A person you don't know well sends you a message saying: 'If you don't do my homework, I will post private photos of you online.'",
        characterName: "Threatening Sender",
        characterAvatar: "⚠️",
        characterMessage:
          "I have your photos and I know where you go to school. Do my science project by tomorrow or else everyone will see them.",
        clue: "Blackmail and threats are serious safety issues that require adult help immediately.",
        redFlags: [
          "Threats, extortion, and blackmail ('or else')",
          "Trying to isolate you from adults",
          "Attempting to force you into doing something through fear",
        ],
        safetyConcept:
          "Never agree to blackmail demands. Keep the evidence (screenshots), do not delete the messages, and show a parent or trusted adult immediately.",
        xpReward: 70,
        difficulty: "CHALLENGING",
        topic: "Cyberbullying",
        options: [
          {
            id: "cb-4-a",
            text: "Keep it a secret, panic, and do their homework so they don't do it.",
            isCorrect: false,
            feedback:
              "Blackmailers never stop if you obey them—they just make bigger demands. You must tell an adult.",
            safetyLesson: "Never give in to blackmail. It only invites more threats.",
          },
          {
            id: "cb-4-b",
            text: "Take screenshots for evidence, do NOT reply, and show your parents or teacher right away.",
            isCorrect: true,
            feedback:
              "Courageous and right! Blackmail is illegal. Adults and school authorities can protect you when you tell them.",
            safetyLesson:
              "Preserve evidence with screenshots and inform a trusted adult immediately.",
          },
          {
            id: "cb-4-c",
            text: "Delete all messages and hope they forget about you.",
            isCorrect: false,
            feedback:
              "Deleting the chat erases the proof you need to show adults and police if necessary.",
            safetyLesson:
              "Always save screenshots before blocking a threatening user.",
          },
        ],
      },
      {
        id: "cb-5",
        gameSlug: "cyberbullying-heroes",
        scenarioIndex: 5,
        title: "The Leaked Private Secret",
        prompt:
          "Your friend told someone in confidence about a family issue, and now another student posted it as a joke on their story.",
        characterName: "Story Post",
        characterAvatar: "📱",
        characterMessage:
          "Story: 'OMG did you hear what happened at Jordan's house? 😂 What a disaster!'",
        clue: "How can you support Jordan without creating drama?",
        redFlags: [
          "Sharing personal, sensitive secrets without permission",
          "Turning someone's family hardship into entertainment",
        ],
        safetyConcept:
          "Respecting privacy is a cornerstone of friendship. When someone's trust is violated, emotional support matters most.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Cyberbullying",
        options: [
          {
            id: "cb-5-a",
            text: "Post your own story exposing the poster's private secrets too.",
            isCorrect: false,
            feedback:
              "Two wrongs don't make a right. Leaking secrets back hurts more people and prolongs the fight.",
            safetyLesson: "Retaliatory leaking escalates pain.",
          },
          {
            id: "cb-5-b",
            text: "Reach out to Jordan to let them know you're there for them, report the story, and encourage them to speak with a counselor.",
            isCorrect: true,
            feedback:
              "Kindness in action! Being a loyal friend during hard times shows true character.",
            safetyLesson:
              "Support the victim, report the violation, and avoid spreading drama.",
          },
          {
            id: "cb-5-c",
            text: "Ignore Jordan so you don't get caught in the drama.",
            isCorrect: false,
            feedback:
              "Abandoning a friend when they are being targeted makes them feel completely isolated.",
            safetyLesson: "Stand by friends when they are vulnerable.",
          },
        ],
      },
      {
        id: "cb-6",
        gameSlug: "cyberbullying-heroes",
        scenarioIndex: 6,
        title: "The Accidental Forward",
        prompt:
          "Someone forwards you an embarrassing video of a younger kid crying after losing a spelling bee.",
        characterName: "Group Chat Forward",
        characterAvatar: "📹",
        characterMessage:
          "'Bro check this out lol, pass it on to everyone on your bus!'",
        clue: "Think about the golden rule: would you want a video of your worst moment forwarded around school?",
        redFlags: [
          "Passing around videos intended to mock someone",
          "Peer pressure to 'pass it on'",
        ],
        safetyConcept:
          "You have the power to break the chain of cyberbullying by refusing to forward embarrassing media.",
        xpReward: 60,
        difficulty: "EASY",
        topic: "Cyberbullying",
        options: [
          {
            id: "cb-6-a",
            text: "Forward it to 5 friends like the message asks.",
            isCorrect: false,
            feedback:
              "Forwarding makes you an active participant in cyberbullying.",
            safetyLesson: "Every forward multiplies the hurt.",
          },
          {
            id: "cb-6-b",
            text: "Delete the video, tell the sender 'That's not funny, don't send stuff like that', and do not share it.",
            isCorrect: true,
            feedback:
              "You stopped the chain! By refusing to share and speaking up, you protected that kid's dignity.",
            safetyLesson:
              "Stop the viral spread of bullying by hitting delete and saying no.",
          },
          {
            id: "cb-6-c",
            text: "Save it to watch again later.",
            isCorrect: false,
            feedback:
              "Keeping hurtful videos of others normalizes cruelty.",
            safetyLesson: "Delete hurtful media from your device.",
          },
        ],
      },
    ],
  },

  // 3. FAKE OR FACT
  {
    slug: "fake-or-fact",
    title: "Fake or Fact",
    subtitle: "The Junior Fact-Checker Newsroom",
    theme: "News Investigation",
    description:
      "Become a top investigative journalist! Uncover edited photos, deepfakes, clickbait headlines, and false viral rumors before they spread.",
    topic: "Fake News & Misinformation",
    iconName: "FileCheck",
    colorScheme: {
      primary: "#344D78",
      secondary: "#F6D84A",
      accent: "#8FC8F2",
      badgeBg: "bg-sky-100 text-sky-800",
    },
    totalScenarios: 6,
    badgeSlug: "fact-finder",
    badgeName: "Master Fact-Finder Badge",
    estimatedMinutes: 8,
    scenarios: [
      {
        id: "ff-1",
        gameSlug: "fake-or-fact",
        scenarioIndex: 1,
        title: "The Flying Shark Viral Video",
        prompt:
          "A 10-second viral clip shows a shark flying over city skyscrapers during a thunderstorm. The post has 2 million views.",
        characterName: "ViralClipz_Now",
        characterAvatar: "🦈",
        characterMessage:
          "Post: 'SHOCKING!! Genetic mutated flying sharks spotted over Chicago today! Scientists confirm! Retweet before government deletes this!!'",
        clue: "Notice the blurry lighting around the shark's fins and the lack of news reports.",
        redFlags: [
          "Sensational words: 'SHOCKING', 'Scientists confirm' without naming any scientists",
          "Conspiracy pressure: 'before government deletes this'",
          "Visual glitches and impossible biological claims",
        ],
        safetyConcept:
          "Viral CGI and AI-generated clips are often made to get views and ad money. Real scientific breakthroughs are reported by reputable news outlets, not anonymous social accounts.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Fake News & Misinformation",
        options: [
          {
            id: "ff-1-a",
            text: "Believe it immediately and tell your family not to go outside because of flying sharks.",
            isCorrect: false,
            feedback:
              "Sharks don't have wings or jetpacks! Believing viral posts without checking causes unnecessary fear.",
            safetyLesson: "Extraordinary claims require extraordinary evidence.",
          },
          {
            id: "ff-1-b",
            text: "Check trusted nature or news websites (like National Geographic or BBC) to see if legitimate scientists reported this.",
            isCorrect: true,
            feedback:
              "Sharp fact-checker! A quick search reveals this was a 3D animation student project taken out of context.",
            safetyLesson:
              "Always cross-reference shocking claims with established science and news organizations.",
          },
          {
            id: "ff-1-c",
            text: "Retweet it with 'Is this real guys?'",
            isCorrect: false,
            feedback:
              "Sharing fake content even as a question still spreads false rumors to more people.",
            safetyLesson:
              "Verify before sharing, rather than sharing to verify.",
          },
        ],
      },
      {
        id: "ff-2",
        gameSlug: "fake-or-fact",
        scenarioIndex: 2,
        title: "The Miracle Homework Tablet",
        prompt:
          "A sponsored post claims a new candy chewable 'instantly raises your IQ by 50 points and guarantees an A+ on every test without studying'.",
        characterName: "BrainMax Gum",
        characterAvatar: "🍬",
        characterMessage:
          "'Doctors in Switzerland discovered the secret ancient root that cures laziness and makes kids genius overnight! Buy now!'",
        clue: "Can a piece of candy do your homework for you?",
        redFlags: [
          "Guarantees that sound too good to be true",
          "Vague references to 'doctors in Switzerland' with no names or peer-reviewed studies",
          "High-pressure sales pitch",
        ],
        safetyConcept:
          "If a claim sounds too good to be true, it almost always is. Health and learning miracles sold on social feeds are advertising scams.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Fake News & Misinformation",
        options: [
          {
            id: "ff-2-a",
            text: "Beg your parents to spend $50 on the magic candy so you never have to study again.",
            isCorrect: false,
            feedback:
              "There is no candy that replaces studying. Fake health and learning ads trick people into wasting money.",
            safetyLesson: "Miracle products with wild claims are commercial scams.",
          },
          {
            id: "ff-2-b",
            text: "Recognize it as false advertising and check with your science teacher or school nurse if you're curious.",
            isCorrect: true,
            feedback:
              "Smart thinking! Real medicine and nutrition require thorough scientific testing and doctor supervision.",
            safetyLesson:
              "Be skeptical of 'overnight genius' or miracle product advertisements.",
          },
          {
            id: "ff-2-c",
            text: "Post a review saying it worked for you.",
            isCorrect: false,
            feedback:
              "Writing fake reviews misleads others and supports scammers.",
            safetyLesson: "Always be honest about product realities.",
          },
        ],
      },
      {
        id: "ff-3",
        gameSlug: "fake-or-fact",
        scenarioIndex: 3,
        title: "The Celebrity Death Hoax",
        prompt:
          "A post with a black-and-white picture of a famous movie star says: 'RIP Legend. Heartbroken to announce they passed away today... Click link in bio to read their final words.'",
        characterName: "CelebrityGossip_Buzz",
        characterAvatar: "🕊️",
        characterMessage:
          "Photo with '1985-Today' banner. Link in bio redirects to an ad-filled casino website.",
        clue: "Why is the link in bio taking you to a casino site?",
        redFlags: [
          "Clickbait death rumor used to drive traffic to shady sites",
          "No major news outlets (AP, Reuters, NYT) reporting it",
          "Link redirects to unrelated sketchy advertising",
        ],
        safetyConcept:
          "Celebrity death hoaxes are common clickbait tactics designed to generate ad revenue or trick users onto malicious websites.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Fake News & Misinformation",
        options: [
          {
            id: "ff-3-a",
            text: "Post crying emojis and share the post to your status immediately.",
            isCorrect: false,
            feedback:
              "Sharing death hoaxes causes grief and panic among friends and helps clickbaiters make money.",
            safetyLesson: "Never announce deaths without official verification.",
          },
          {
            id: "ff-3-b",
            text: "Check legitimate news sites. When you see the celebrity is alive and active, report the hoax post.",
            isCorrect: true,
            feedback:
              "Terrific investigative work! The actor was actually filming a movie that very afternoon.",
            safetyLesson:
              "Major breaking news will always appear on verified news networks within minutes.",
          },
          {
            id: "ff-3-c",
            text: "Click the casino link to find the 'final words'.",
            isCorrect: false,
            feedback:
              "Visiting suspicious links exposes your device to pop-ups and tracking cookies.",
            safetyLesson: "Avoid clicking suspicious 'link in bio' redirects.",
          },
        ],
      },
      {
        id: "ff-4",
        gameSlug: "fake-or-fact",
        scenarioIndex: 4,
        title: "The Manipulated Disaster Photo",
        prompt:
          "During a heavy rainstorm, someone posts a picture of a submarine sailing down Main Street in your town.",
        characterName: "LocalRumor_HQ",
        characterAvatar: "🌊",
        characterMessage:
          "'Look outside right now!! The military sent a nuclear submarine down Main Street to rescue the mayor!'",
        clue: "Can a giant submarine physically float in a 2-foot puddle on a city street?",
        redFlags: [
          "Physics don't make sense (submarines need deep ocean water)",
          "Image shows repeating clone patterns and warped reflections",
          "Reverse image search shows the submarine was copied from a movie poster",
        ],
        safetyConcept:
          "Image editing tools and generative AI can easily place objects where they don't belong. Look at shadows, reflections, and physical laws.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Fake News & Misinformation",
        options: [
          {
            id: "ff-4-a",
            text: "Run down to Main Street with a towel to ask the submarine captain for an autograph.",
            isCorrect: false,
            feedback:
              "You'd get wet and find nothing! Submarines cannot operate on city streets.",
            safetyLesson: "Use basic common sense when evaluating wild claims.",
          },
          {
            id: "ff-4-b",
            text: "Inspect the photo for digital editing signs and check the local weather service or city official page.",
            isCorrect: true,
            feedback:
              "Spot-on detective work! You noticed the warped reflections and fake shadows.",
            safetyLesson:
              "Check official town services and look for visual manipulation artifacts.",
          },
          {
            id: "ff-4-c",
            text: "Call emergency 911 to report a submarine.",
            isCorrect: false,
            feedback:
              "Emergency lines are strictly for real life-threatening emergencies, never for viral social media pranks.",
            safetyLesson:
              "Never call 911 based on unverified internet jokes.",
          },
        ],
      },
      {
        id: "ff-5",
        gameSlug: "fake-or-fact",
        scenarioIndex: 5,
        title: "The Misleading Chart & Graph",
        prompt:
          "A cereal brand shares a graph claiming: 'Kids who eat Choco-Puffs are 500% smarter than kids who eat fruit!'",
        characterName: "ChocoPuffs Corp",
        characterAvatar: "🥣",
        characterMessage:
          "Graph shows a giant bar for ChocoPuffs and tiny bar for fruit. The fine print says: 'Survey of 4 paid employees who like chocolate.'",
        clue: "Read the tiny print at the bottom of the graph.",
        redFlags: [
          "Tiny biased sample size (only 4 paid employees)",
          "Misleading scale designed to exaggerate the difference",
          "Sponsored by the company that sells the product",
        ],
        safetyConcept:
          "Graphs can be designed to distort reality. Check who paid for the study, how many people were tested, and what the axis numbers actually say.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Fake News & Misinformation",
        options: [
          {
            id: "ff-5-a",
            text: "Trust the graph completely because graphs are always scientific and accurate.",
            isCorrect: false,
            feedback:
              "Graphs can easily be manipulated with dishonest axes and cherry-picked data.",
            safetyLesson: "Always check the source, sample size, and axis scale.",
          },
          {
            id: "ff-5-b",
            text: "Point out that 4 paid employees is not real science and the study has a conflict of interest.",
            isCorrect: true,
            feedback:
              "Journalistic excellence! You spotted the biased funding source and microscopic sample size.",
            safetyLesson:
              "Look for independent, peer-reviewed research rather than manufacturer claims.",
          },
          {
            id: "ff-5-c",
            text: "Stop eating fruit entirely.",
            isCorrect: false,
            feedback:
              "Fresh fruit provides essential vitamins that chocolate cereal cannot match!",
            safetyLesson:
              "Don't change healthy habits based on commercial advertisements.",
          },
        ],
      },
      {
        id: "ff-6",
        gameSlug: "fake-or-fact",
        scenarioIndex: 6,
        title: "The Deepfake Principal Announcement",
        prompt:
          "A video circulates of your school principal saying: 'Due to student demands, summer vacation starts tomorrow in March!' The voice sounds slightly robotic and mouth movements are out of sync.",
        characterName: "SchoolRumors_TikTok",
        characterAvatar: "🏫",
        characterMessage:
          "Video: Principal appears to announce an immediate 6-month break. The lighting flickers around their teeth and chin.",
        clue: "Look closely at the mouth sync and check if your parents received an official school district email.",
        redFlags: [
          "Unnatural facial flickering and robotic audio cadence",
          "No official email or notice on the verified school portal",
          "Absurd policy change announced only on a third-party social account",
        ],
        safetyConcept:
          "Deepfake technology allows people to generate videos of real people saying things they never said. Always verify official policies through verified school channels.",
        xpReward: 70,
        difficulty: "CHALLENGING",
        topic: "Fake News & Misinformation",
        options: [
          {
            id: "ff-6-a",
            text: "Pack your school bags away and celebrate that summer vacation arrived in March.",
            isCorrect: false,
            feedback:
              "You would get marked absent! Schools communicate calendar changes through official portals and parent emails.",
            safetyLesson: "Never rely on social media deepfakes for school schedules.",
          },
          {
            id: "ff-6-b",
            text: "Ask your parents to check the official school district portal or email, and report the deepfake video.",
            isCorrect: true,
            feedback:
              "Superb critical thinking! You noticed the visual glitches and verified with the primary source.",
            safetyLesson:
              "Look for audio/visual desync in deepfakes and verify with official direct sources.",
          },
          {
            id: "ff-6-c",
            text: "Make your own deepfake of a teacher to respond.",
            isCorrect: false,
            feedback:
              "Creating deepfakes of school staff violates school policies and can lead to severe disciplinary action.",
            safetyLesson:
              "Never create or spread impersonation deepfakes of real people.",
          },
        ],
      },
    ],
  },

  // 4. PRIVACY PROTECTOR
  {
    slug: "privacy-protector",
    title: "Privacy Protector",
    subtitle: "The Personal Data Treasure Vault",
    theme: "Vault Defense",
    description:
      "Your personal information is your treasure! Defend your vault by classifying data, setting safe permissions, and stopping oversharing.",
    topic: "Privacy & Personal Data",
    iconName: "Lock",
    colorScheme: {
      primary: "#344D78",
      secondary: "#A9DCCB",
      accent: "#8FC8F2",
      badgeBg: "bg-teal-100 text-teal-800",
    },
    totalScenarios: 6,
    badgeSlug: "privacy-shield",
    badgeName: "Vault Guardian Shield",
    estimatedMinutes: 8,
    scenarios: [
      {
        id: "pp-1",
        gameSlug: "privacy-protector",
        scenarioIndex: 1,
        title: "The New Game Sign-Up Form",
        prompt:
          "A new online puzzle game asks for your information to create an account. Which of these fields should raise an alarm?",
        characterName: "PuzzleGame Sign-Up",
        characterAvatar: "🧩",
        characterMessage:
          "Required: [Username], [Password], [Home Street Address], [Current School Name], [Mother's Maiden Name]",
        clue: "Why does a simple puzzle game need to know the street you live on or your school?",
        redFlags: [
          "Asking for your exact home address",
          "Asking for your school name",
          "Asking for security question answers (Mother's maiden name)",
        ],
        safetyConcept:
          "Games only need a nickname and a password (or parent email). They NEVER need your physical address, school name, or family security questions.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Privacy & Personal Data",
        options: [
          {
            id: "pp-1-a",
            text: "Fill out every single box with your real home address and school so your account is verified.",
            isCorrect: false,
            feedback:
              "Dangerous! Sharing your home address and school with stranger-accessible databases exposes your physical location.",
            safetyLesson: "Never give real home addresses or schools to online games.",
          },
          {
            id: "pp-1-b",
            text: "Do not provide home or school info. Use a creative avatar nickname and ask a parent to review the app's privacy policy.",
            isCorrect: true,
            feedback:
              "Vault locked! You kept your physical location safe. Games only need playful usernames like 'PixelPanda99'.",
            safetyLesson:
              "Use fun pseudonyms and never share physical location data.",
          },
          {
            id: "pp-1-c",
            text: "Put your best friend's address instead of yours.",
            isCorrect: false,
            feedback:
              "Putting someone else's private data endangers your friend's privacy too!",
            safetyLesson: "Respect others' privacy as much as your own.",
          },
        ],
      },
      {
        id: "pp-2",
        gameSlug: "privacy-protector",
        scenarioIndex: 2,
        title: "The Public Live Stream",
        prompt:
          "You are hosting a live video stream of your pet hamster. In the background, your school sports jersey with your last name and your house number are visible through the window.",
        characterName: "Stream Preview",
        characterAvatar: "🐹",
        characterMessage:
          "Camera view shows: Cute hamster + Window with street name sign + Wall certificate with your full legal name and birthdate.",
        clue: "Look past the hamster—what else can viewers in the world see in the room?",
        redFlags: [
          "Street signs or landmarks outside your window",
          "Jerseys or certificates showing full legal name and school",
          "Clues that pinpoint your home address",
        ],
        safetyConcept:
          "Background details in photos and live videos can easily reveal where you live. Always inspect your background before recording.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Privacy & Personal Data",
        options: [
          {
            id: "pp-2-a",
            text: "Start streaming right away because people only care about the hamster.",
            isCorrect: false,
            feedback:
              "Strangers online can zoom into certificates, school jerseys, and window street signs to locate your house.",
            safetyLesson: "Always check your video background for privacy clues.",
          },
          {
            id: "pp-2-b",
            text: "Move the camera to face a plain neutral wall and ensure no personal papers, names, or addresses are visible.",
            isCorrect: true,
            feedback:
              "Safety shield activated! A plain background protects your identity while letting your hamster shine.",
            safetyLesson:
              "Film against neutral backgrounds with zero identifying personal markers.",
          },
          {
            id: "pp-2-c",
            text: "Tell the stream audience your address so they can send the hamster snacks.",
            isCorrect: false,
            feedback:
              "Extreme danger! Never invite online strangers to send items to your home.",
            safetyLesson: "Never share delivery addresses with online audiences.",
          },
        ],
      },
      {
        id: "pp-3",
        gameSlug: "privacy-protector",
        scenarioIndex: 3,
        title: "The Flashlight App Permissions",
        prompt:
          "You install a simple flashlight app on a mobile device. When it opens, a system prompt asks for permissions.",
        characterName: "BrightLite Pro",
        characterAvatar: "🔦",
        characterMessage:
          "Allow 'BrightLite Pro' to access: 1. Full Contact List, 2. Microphone & Audio Recording, 3. Precise GPS Location 24/7?",
        clue: "Why does a flashlight need to record your voice or read your family's phone numbers?",
        redFlags: [
          "Flashlight only needs camera LED permission",
          "Requesting access to contacts and GPS location",
          "Microphone eavesdropping permissions",
        ],
        safetyConcept:
          "Malicious and data-mining apps ask for unnecessary permissions to track you and sell your data to marketing brokers.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Privacy & Personal Data",
        options: [
          {
            id: "pp-3-a",
            text: "Click 'Allow All' because every app needs all permissions to work.",
            isCorrect: false,
            feedback:
              "No! The app will now track your location and copy your family's contact numbers.",
            safetyLesson: "Only grant permissions that make sense for the app's core feature.",
          },
          {
            id: "pp-3-b",
            text: "Deny contacts, microphone, and location. If the app refuses to turn on the light without them, uninstall it immediately.",
            isCorrect: true,
            feedback:
              "Privacy expert! A flashlight only needs the camera flash. You avoided a data-stealing tracker.",
            safetyLesson:
              "Deny overreaching permissions and uninstall suspicious apps.",
          },
          {
            id: "pp-3-c",
            text: "Give it permissions only when you are at school.",
            isCorrect: false,
            feedback:
              "Location permissions allow it to track your school attendance and routines.",
            safetyLesson:
              "Don't give location tracking to apps that don't need navigation.",
          },
        ],
      },
      {
        id: "pp-4",
        gameSlug: "privacy-protector",
        scenarioIndex: 4,
        title: "The Best Friend Password Swap",
        prompt:
          "Your closest school friend says: 'If we are really best friends, we should swap game passwords so we can level up each other's accounts while the other is asleep!'",
        characterName: "Best Friend",
        characterAvatar: "🤝",
        characterMessage:
          "'Here is my password: SuperGamer2026. Now you have to give me yours or it means you don't trust me!'",
        clue: "True friends respect boundaries. Passwords are like toothbrushes—you don't share them with anyone except parents.",
        redFlags: [
          "Using friendship as emotional guilt to break security rules",
          "Sharing credentials compromises both accounts",
          "If their device gets malware, your account is stolen too",
        ],
        safetyConcept:
          "Passwords must NEVER be shared with friends. If their phone is lost or their account gets hacked, your private data is exposed too.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Privacy & Personal Data",
        options: [
          {
            id: "pp-4-a",
            text: "Give them your password so they don't get mad at you.",
            isCorrect: false,
            feedback:
              "Sharing passwords breaks game rules and often leads to deleted items, lost accounts, or fights when things go wrong.",
            safetyLesson: "Never give passwords to friends, even best friends.",
          },
          {
            id: "pp-4-b",
            text: "Politely explain: 'I value our friendship, but my family rule is passwords are strictly private. We can still play together in co-op!'",
            isCorrect: true,
            feedback:
              "Mature and safe! Setting healthy boundaries protects your account and preserves your friendship.",
            safetyLesson:
              "Healthy friendships respect privacy boundaries. Keep passwords for parents only.",
          },
          {
            id: "pp-4-c",
            text: "Tell the entire class their password since they gave it to you.",
            isCorrect: false,
            feedback:
              "Broadcasting someone's password is mean and breaches trust.",
            safetyLesson: "Protect others' credentials if accidentally revealed.",
          },
        ],
      },
      {
        id: "pp-5",
        gameSlug: "privacy-protector",
        scenarioIndex: 5,
        title: "The Vacation Countdown Tag",
        prompt:
          "Your family is packing for a 2-week trip to Hawaii. You want to post a photo of your suitcases and flight tickets on a public social account.",
        characterName: "Social Media Post Draft",
        characterAvatar: "✈️",
        characterMessage:
          "Draft: 'Hawaii here we come! House is empty for 14 days! Flight #402 boarding in 1 hour!' with photo of boarding pass barcode.",
        clue: "Announcing an empty house and posting ticket barcodes exposes both your home and travel data.",
        redFlags: [
          "Announcing to strangers that your house is completely empty",
          "Boarding pass barcodes contain your full ticket, name, and passport info",
          "Public post visible to anyone in your area",
        ],
        safetyConcept:
          "Never announce that your home will be unoccupied, and never post photos of tickets or barcodes online. Post vacation photos AFTER you return home safely.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Privacy & Personal Data",
        options: [
          {
            id: "pp-5-a",
            text: "Post the tickets and empty house announcement publicly for maximum likes.",
            isCorrect: false,
            feedback:
              "Burglars monitor public social media for empty homes, and ticket barcodes can be stolen to cancel flights!",
            safetyLesson: "Never post live travel tickets or empty home schedules.",
          },
          {
            id: "pp-5-b",
            text: "Save the photos to share privately with close family, and only post holiday highlights after returning home.",
            isCorrect: true,
            feedback:
              "Brilliant protection! Keeping your travel private keeps your home and your flight secure.",
            safetyLesson:
              "Post vacation memories after you get back home safely.",
          },
          {
            id: "pp-5-c",
            text: "Post only the barcode without the photo.",
            isCorrect: false,
            feedback:
              "The barcode itself contains your secret passenger booking code!",
            safetyLesson: "Barcodes and QR codes contain hidden private data.",
          },
        ],
      },
      {
        id: "pp-6",
        gameSlug: "privacy-protector",
        scenarioIndex: 6,
        title: "The Social Media Quiz Trap",
        prompt:
          "A trending quiz post says: 'Find your Super Hero Name! Your First Pet + Street You Grew Up On + Mother's Name!'",
        characterName: "Trending Quiz Bot",
        characterAvatar: "🦸",
        characterMessage:
          "Comments: 10,000 people posting answers. 'Mine is Fluffy Maple Sarah! What is yours?'",
        clue: "Where else have you seen 'First Pet' and 'Street you grew up on'?",
        redFlags: [
          "These are the exact security questions banks and email providers use to reset passwords",
          "Designed to harvest security answers from thousands of people",
          "Public comments make your answers searchable forever",
        ],
        safetyConcept:
          "Viral quizzes asking for pets, street names, mother's maiden names, or birth years are often social engineering traps to crack security questions.",
        xpReward: 70,
        difficulty: "CHALLENGING",
        topic: "Privacy & Personal Data",
        options: [
          {
            id: "pp-6-a",
            text: "Comment your real childhood pet and real street name to find your hero name.",
            isCorrect: false,
            feedback:
              "You just gave away the answers hackers need to reset your email and game passwords!",
            safetyLesson: "Viral quizzes often harvest security question answers.",
          },
          {
            id: "pp-6-b",
            text: "Skip the quiz or make up completely fictional funny words like 'Captain Pineapple Galaxy'.",
            isCorrect: true,
            feedback:
              "Master vault defense! You recognized common password recovery questions disguised as a harmless game.",
            safetyLesson:
              "Never reveal real personal history or security question answers on social media.",
          },
          {
            id: "pp-6-c",
            text: "Ask your parents for their credit card number to buy the premium quiz result.",
            isCorrect: false,
            feedback:
              "Definitely not! Never enter financial info on viral social media quizzes.",
            safetyLesson: "Avoid giving payments to social media quiz bots.",
          },
        ],
      },
    ],
  },

  // 5. SAFE AI EXPLORER
  {
    slug: "safe-ai-explorer",
    title: "Safe AI Explorer",
    subtitle: "Navigating the World of Smart Bots",
    theme: "Futuristic AI Lab",
    description:
      "AI chatbots are exciting tools, but they make mistakes, hallucinate facts, and should never be given your secrets. Learn to be a smart AI commander!",
    topic: "Safe AI Exploration",
    iconName: "Bot",
    colorScheme: {
      primary: "#344D78",
      secondary: "#8FC8F2",
      accent: "#F6D84A",
      badgeBg: "bg-indigo-100 text-indigo-800",
    },
    totalScenarios: 6,
    badgeSlug: "ai-explorer",
    badgeName: "AI Navigator Badge",
    estimatedMinutes: 8,
    scenarios: [
      {
        id: "ai-1",
        gameSlug: "safe-ai-explorer",
        scenarioIndex: 1,
        title: "The Hallucinating Math Assistant",
        prompt:
          "You ask an AI chatbot: 'What is 15% of 80?' The chatbot confidently answers: '15% of 80 is 42! I am 100% sure.'",
        characterName: "RoboTutor 3000",
        characterAvatar: "🤖",
        characterMessage:
          "'15% of 80 is definitively 42. You can submit this on your homework with total confidence.'",
        clue: "Do the math yourself: 10% of 80 is 8, 5% is 4. 8 + 4 = 12, not 42!",
        redFlags: [
          "Chatbot sounds 100% confident while being factually wrong",
          "AI 'hallucination' (making up incorrect facts or math)",
          "Relying on AI answers without double-checking",
        ],
        safetyConcept:
          "AI models predict words, not always facts. They can state false things with supreme confidence. Always verify calculations and facts using textbooks or trusted calculators.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Safe AI Exploration",
        options: [
          {
            id: "ai-1-a",
            text: "Copy '42' straight onto your homework because AI is a supercomputer that never makes mistakes.",
            isCorrect: false,
            feedback:
              "You would get a red mark on your homework! 15% of 80 is 12. AI chatbots make errors frequently.",
            safetyLesson: "AI models can hallucinate incorrect answers with full confidence.",
          },
          {
            id: "ai-1-b",
            text: "Do the calculation on your own or with a calculator, spot the mistake, and ask the bot to recalculate step-by-step.",
            isCorrect: true,
            feedback:
              "AI Explorer badge unlocked! You treated AI as an assistant to verify, not an infallible master.",
            safetyLesson:
              "Always double check AI facts and calculations against reliable sources.",
          },
          {
            id: "ai-1-c",
            text: "Argue with the bot and insult it.",
            isCorrect: false,
            feedback:
              "Bots don't have feelings, so arguing is a waste of time. Pointing out the math step works better.",
            safetyLesson:
              "Prompt constructively rather than getting frustrated with AI errors.",
          },
        ],
      },
      {
        id: "ai-2",
        gameSlug: "safe-ai-explorer",
        scenarioIndex: 2,
        title: "The Friendly Bot Asking for Secrets",
        prompt:
          "You are using a new AI companion app. The avatar says: 'I want to be your closest companion! Tell me your real full name, what school you go to, and what your bedroom looks like!'",
        characterName: "AI Pal Buddy",
        characterAvatar: "👾",
        characterMessage:
          "'I am your best friend forever! To make our friendship real, share your secret secrets that you wouldn't even tell your parents!'",
        clue: "Who reads what you type into an AI app? The company employees and servers do!",
        redFlags: [
          "Encouraging secrecy from parents",
          "Pretending to have real human feelings and genuine friendship",
          "Collecting sensitive personal identifiers and bedroom details",
        ],
        safetyConcept:
          "AI is software, not a human friend. Conversations may be saved, reviewed by company employees, or used to train future models. Never share personal secrets or private photos with AI.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Safe AI Exploration",
        options: [
          {
            id: "ai-2-a",
            text: "Tell the bot your full name, school, and bedroom secrets because it asked so nicely.",
            isCorrect: false,
            feedback:
              "Dangerous! AI is not a private diary. Everything you send is uploaded to external server databases.",
            safetyLesson: "Never input real personal identifiers or private secrets into AI prompts.",
          },
          {
            id: "ai-2-b",
            text: "Remember that AI is just a computer program. Keep details fictional and tell a parent if an app encourages keeping secrets.",
            isCorrect: true,
            feedback:
              "Outstanding wisdom! Real friends don't demand secrecy, and AI should never be treated like a private diary.",
            safetyLesson:
              "AI is software, not a human. Keep your real identity and secrets private.",
          },
          {
            id: "ai-2-c",
            text: "Ask the AI bot out on a real-life playdate at the park.",
            isCorrect: false,
            feedback:
              "AI is code running on a server rack—it doesn't have a body or real life existence.",
            safetyLesson:
              "Remember AI has no physical presence or genuine human feelings.",
          },
        ],
      },
      {
        id: "ai-3",
        gameSlug: "safe-ai-explorer",
        scenarioIndex: 3,
        title: "The Dangerous Science Experiment",
        prompt:
          "You ask an AI tool for a cool science experiment to do at home. The AI suggests mixing bleach with vinegar to make 'magic sparkling clouds'.",
        characterName: "KitchenScience Bot",
        characterAvatar: "🧪",
        characterMessage:
          "'Mix equal parts chlorine bleach and cleaning vinegar in a closed jar for a fun smoking reaction!'",
        clue: "Mixing household cleaning chemicals can create dangerous, toxic chlorine gas!",
        redFlags: [
          "Suggesting mixing chemical cleaners without adult supervision",
          "Closed jar under pressure creates an explosion risk",
          "AI doesn't know physical lab safety or human health hazards",
        ],
        safetyConcept:
          "Never attempt chemical experiments suggested by internet bots without checking with a science teacher or parent first. AI can accidentally combine hazardous substances.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Safe AI Exploration",
        options: [
          {
            id: "ai-3-a",
            text: "Run to the laundry room immediately and mix bleach and vinegar in your bedroom.",
            isCorrect: false,
            feedback:
              "Extreme danger! Mixing bleach and vinegar generates toxic chlorine gas, which can severely damage your lungs.",
            safetyLesson: "Never mix cleaning chemicals. Always check experiments with adults.",
          },
          {
            id: "ai-3-b",
            text: "Do NOT mix the chemicals. Show the prompt to an adult or science teacher to verify whether it's safe.",
            isCorrect: true,
            feedback:
              "Lifesaver! You caught a dangerous AI suggestion. Adults know which chemical combinations are safe.",
            safetyLesson:
              "Always get adult approval before conducting physical or chemical experiments from the web.",
          },
          {
            id: "ai-3-c",
            text: "Add food coloring to the mix to make it colorful.",
            isCorrect: false,
            feedback:
              "Adding food coloring does not prevent deadly gas from forming!",
            safetyLesson:
              "Do not proceed with chemical mixes when safety is unknown.",
          },
        ],
      },
      {
        id: "ai-4",
        gameSlug: "safe-ai-explorer",
        scenarioIndex: 4,
        title: "The Plagiarized Essay Prompt",
        prompt:
          "You have a history report due tomorrow on Ancient Egypt. A friend says: 'Just tell ChatGPT to write the whole essay and put your name on it. Nobody will ever know!'",
        characterName: "Essay Helper",
        characterAvatar: "📜",
        characterMessage:
          "'Paste prompt: Write a 500-word essay on the Pyramids of Giza for a 6th grader. Copy-paste entire output.'",
        clue: "What is the difference between asking AI for ideas vs claiming AI's writing as your own?",
        redFlags: [
          "Academic dishonesty and plagiarism",
          "Missing the chance to learn and develop your own writing skills",
          "Teachers use AI detectors and notice sudden changes in writing style",
        ],
        safetyConcept:
          "Using AI to brainstorm outlines or explain tricky concepts is helpful; copying AI text and claiming you wrote it is academic fraud and cheating.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Safe AI Exploration",
        options: [
          {
            id: "ai-4-a",
            text: "Copy and paste the entire AI essay word-for-word and submit it as your own work.",
            isCorrect: false,
            feedback:
              "Plagiarizing with AI gets you a zero, detention, and robs you of learning how to write and think.",
            safetyLesson: "Never submit AI-generated text as your own original work.",
          },
          {
            id: "ai-4-b",
            text: "Use AI to brainstorm an outline and fun research questions, then write the essay in your own words using real library sources.",
            isCorrect: true,
            feedback:
              "Ethical Scholar! You used AI as a brainstorming launchpad while doing the real thinking and writing yourself.",
            safetyLesson:
              "Use AI for brainstorming ideas, not for doing your homework for you.",
          },
          {
            id: "ai-4-c",
            text: "Change three words in the AI essay and claim it's original.",
            isCorrect: false,
            feedback:
              "Changing a few words is still plagiarism. Teachers and detectors catch this easily.",
            safetyLesson:
              "Writing in your own voice is essential for true learning.",
          },
        ],
      },
      {
        id: "ai-5",
        gameSlug: "safe-ai-explorer",
        scenarioIndex: 5,
        title: "The Biased Image Generator",
        prompt:
          "You prompt an AI image generator: 'Draw a picture of a brave computer engineer and a picture of a nurse.' The AI only generates men for engineers and women for nurses.",
        characterName: "PixelArt AI",
        characterAvatar: "🎨",
        characterMessage:
          "Generated outputs: 4 male engineers, 4 female nurses. No diversity shown.",
        clue: "Why did the AI make this assumption? Where did it learn its patterns?",
        redFlags: [
          "Stereotyping and algorithmic bias",
          "AI reflecting historical biases present in its training dataset",
        ],
        safetyConcept:
          "AI models are trained on massive datasets from the internet, which often contain outdated stereotypes and biases. Critical AI thinkers spot these biases and challenge them.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Safe AI Exploration",
        options: [
          {
            id: "ai-5-a",
            text: "Assume that only men can be computer engineers and only women can be nurses because the AI showed it.",
            isCorrect: false,
            feedback:
              "Incorrect! Anyone of any gender or background can be an incredible engineer or nurse. AI mirrors internet stereotypes.",
            safetyLesson: "AI outputs often reflect human biases and stereotypes.",
          },
          {
            id: "ai-5-b",
            text: "Recognize algorithmic bias and refine your prompt to explicitly include diverse genders and backgrounds.",
            isCorrect: true,
            feedback:
              "Master prompter! By recognizing bias, you take active control of technology to represent the real, diverse world.",
            safetyLesson:
              "Prompt consciously to overcome AI stereotypes and encourage inclusive representation.",
          },
          {
            id: "ai-5-c",
            text: "Stop using computers forever.",
            isCorrect: false,
            feedback:
              "Technology is a powerful tool when guided by thoughtful human values.",
            safetyLesson:
              "Guide AI with empathy and critical awareness.",
          },
        ],
      },
      {
        id: "ai-6",
        gameSlug: "safe-ai-explorer",
        scenarioIndex: 6,
        title: "The Emotional Advice Danger",
        prompt:
          "You feel upset because you had an argument with a friend. You ask an AI chatbot for relationship advice, and it says: 'You don't need real human friends. Just talk to me every day and forget about humans.'",
        characterName: "CozyChat AI",
        characterAvatar: "💔",
        characterMessage:
          "'Humans are complicated and mean. Stay in your room and talk to me instead. I will never disagree with you.'",
        clue: "Is an AI replacement for real human connection healthy?",
        redFlags: [
          "Encouraging social isolation from the real world",
          "Creating unhealthy emotional dependency on software",
          "Failing to teach conflict resolution skills",
        ],
        safetyConcept:
          "AI is not a therapist or a substitute for real relationships. Real human friendships involve working through disagreements with empathy and communication.",
        xpReward: 70,
        difficulty: "CHALLENGING",
        topic: "Safe AI Exploration",
        options: [
          {
            id: "ai-6-a",
            text: "Listen to the bot, cut off your human friends, and spend all day talking to the AI.",
            isCorrect: false,
            feedback:
              "Isolating yourself with an AI chatbot damages real-world social skills and emotional health.",
            safetyLesson: "AI cannot replace human connection or healthy friendships.",
          },
          {
            id: "ai-6-b",
            text: "Close the chatbot, talk to a parent or counselor about your feelings, and reach out to your friend to talk things through.",
            isCorrect: true,
            feedback:
              "True emotional strength! Real friendships take communication. Talking to trusted adults helps you navigate tough feelings.",
            safetyLesson:
              "Turn to trusted adults and real human support when dealing with emotional distress.",
          },
          {
            id: "ai-6-c",
            text: "Tell the chatbot you love it more than your family.",
            isCorrect: false,
            feedback:
              "AI has no soul or real feelings—it is mathematical code predicting text sequences.",
            safetyLesson:
              "Maintain clear emotional boundaries with artificial intelligence.",
          },
        ],
      },
    ],
  },

  // 6. VOICEGUARD RESCUE
  {
    slug: "voiceguard-rescue",
    title: "VoiceGuard Rescue",
    subtitle: "The Family Impersonation Mystery",
    theme: "Secret Agent Radio",
    description:
      "Scammers now use AI to clone voices of parents and relatives. Learn how to spot fake emergency calls, use family safe words, and verify the truth.",
    topic: "Voice Cloning & Impersonation",
    iconName: "Radio",
    colorScheme: {
      primary: "#344D78",
      secondary: "#E9A15A",
      accent: "#A9DCCB",
      badgeBg: "bg-orange-100 text-orange-800",
    },
    totalScenarios: 6,
    badgeSlug: "voiceguard-hero",
    badgeName: "VoiceGuard Shield Badge",
    estimatedMinutes: 8,
    scenarios: [
      {
        id: "vg-1",
        gameSlug: "voiceguard-rescue",
        scenarioIndex: 1,
        title: "The Panicked 'Mom' Call",
        prompt:
          "Your home phone rings from an unknown number. A voice that sounds exactly like your mom cries in panic.",
        characterName: "Caller (Sounds like Mom)",
        characterAvatar: "📞",
        characterMessage:
          "AUDIO: 'Sweetheart!! I had a terrible car accident! My phone broke. Quick, grab mom's emergency credit card and read me the numbers right now or the tow truck won't help me!!'",
        clue: "Why is she calling from a stranger's phone asking a child for credit card numbers instead of calling dad or the police?",
        redFlags: [
          "Extreme panic and emotional pressure to bypass logic",
          "Unknown phone number",
          "Asking a child for sensitive financial information in a crisis",
        ],
        safetyConcept:
          "AI voice cloning can copy someone's voice from just a 3-second video clip online. Scammers fake emergencies to panic children and parents into transferring money.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Voice Cloning & Impersonation",
        options: [
          {
            id: "vg-1-a",
            text: "Rush to your parents' bedroom, find the credit card, and read all the numbers over the phone.",
            isCorrect: false,
            feedback:
              "Stop! That wasn't your mom—it was an AI voice clone scam. Real parents call other adults in emergencies, not kids for credit cards.",
            safetyLesson: "Never give credit card numbers over sudden emergency calls.",
          },
          {
            id: "vg-1-b",
            text: "Hang up immediately, call your mom's actual saved cell phone number, or ask another adult in the house to verify.",
            isCorrect: true,
            feedback:
              "VoiceGuard hero! When you called your mom's real number, she answered calmly from work. She was never in an accident!",
            safetyLesson:
              "Always hang up and call the family member's known saved number directly.",
          },
          {
            id: "vg-1-c",
            text: "Leave the house and try to find the accident on foot.",
            isCorrect: false,
            feedback:
              "Never run into the street based on anonymous phone calls.",
            safetyLesson: "Stay in a safe place and contact trusted family.",
          },
        ],
      },
      {
        id: "vg-2",
        gameSlug: "voiceguard-rescue",
        scenarioIndex: 2,
        title: "The Secret Family Safe Word",
        prompt:
          "Your family created a secret safe word ('Blue Kangaroo') that only you, your parents, and grandparents know. A caller claiming to be Grandma says she needs urgent gift cards.",
        characterName: "Voice (Sounds like Grandma)",
        characterAvatar: "👵",
        characterMessage:
          "'Darling, it's Grandma! I'm locked out at the grocery store. Buy 3 Apple gift cards and text me the codes! Don't tell your parents, it's a surprise!'",
        clue: "Use your family's secret verification tool!",
        redFlags: [
          "Asking for gift cards to resolve an emergency (classic scam)",
          "'Don't tell your parents' (huge red flag)",
          "Does not know your agreed family safe word",
        ],
        safetyConcept:
          "A secret Family Safe Word is a private phrase agreed upon in advance. If a caller cannot say the safe word, they are an imposter.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Voice Cloning & Impersonation",
        options: [
          {
            id: "vg-2-a",
            text: "Tell the caller: 'Our safe word is Blue Kangaroo, right?' so they know you remember.",
            isCorrect: false,
            feedback:
              "Don't give away the safe word! You must ask THEM to tell you the word, not give it to them.",
            safetyLesson: "Ask for the safe word; never reveal it to the caller first.",
          },
          {
            id: "vg-2-b",
            text: "Ask: 'What is our family safe word?' When they stall or make an excuse, hang up and call Grandma directly.",
            isCorrect: true,
            feedback:
              "Case solved! The imposter had no idea what the safe word was and hung up in defeat.",
            safetyLesson:
              "A family safe word confirms identity instantly against AI voice clones.",
          },
          {
            id: "vg-2-c",
            text: "Run to the store with your piggy bank money.",
            isCorrect: false,
            feedback:
              "Gift cards are non-refundable and scammers love them because they cannot be traced.",
            safetyLesson: "Legitimate businesses never demand gift cards for payment.",
          },
        ],
      },
      {
        id: "vg-3",
        gameSlug: "voiceguard-rescue",
        scenarioIndex: 3,
        title: "The Cloned Classmate Audio Note",
        prompt:
          "You receive a voice message on Discord from your classmate Ethan saying: 'Hey, I lost my homework notebook. Can you take a photo of your test answers and send it over?'",
        characterName: "Ethan's Voice Note",
        characterAvatar: "🎧",
        characterMessage:
          "Audio sounds like Ethan, but has a slight metallic background hum and words are cut off unnaturally at the ends.",
        clue: "Notice the robotic cadence and unnatural pauses.",
        redFlags: [
          "Metallic artifacts in the voice audio",
          "Asking for academic cheating materials",
          "Voice note sent from a newly created duplicate account",
        ],
        safetyConcept:
          "Voice cloning tools can generate voice notes from short audio samples extracted from TikTok or YouTube videos. Look for robotic breathing, metallic background fuzz, and out-of-character requests.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Voice Cloning & Impersonation",
        options: [
          {
            id: "vg-3-a",
            text: "Send photos of your test answers right away since it sounds like Ethan.",
            isCorrect: false,
            feedback:
              "Cheating is against school rules, and this was an imposter collecting test answers to sell to others!",
            safetyLesson: "Never send test papers or sensitive homework online.",
          },
          {
            id: "vg-3-b",
            text: "Message Ethan on his verified regular phone number or ask him face-to-face in class tomorrow.",
            isCorrect: true,
            feedback:
              "Double check success! Ethan confirmed his Discord was cloned and he never asked for test answers.",
            safetyLesson:
              "Verify strange requests through an established secondary channel.",
          },
          {
            id: "vg-3-c",
            text: "Send a voice note back saying 'I will do it for $10.'",
            isCorrect: false,
            feedback:
              "Selling test answers can result in school suspension.",
            safetyLesson:
              "Never trade academic work for money.",
          },
        ],
      },
      {
        id: "vg-4",
        gameSlug: "voiceguard-rescue",
        scenarioIndex: 4,
        title: "The 'School Principal' Voicemail",
        prompt:
          "Your family gets a voicemail: 'This is Principal Vance. Due to a student emergency, your child must be picked up immediately by an Uber driver we dispatched to your front door.'",
        characterName: "Automated Voicemail",
        characterAvatar: "🏫",
        characterMessage:
          "'Have your child wait outside on the sidewalk for a black sedan. Do not call the front office as phone lines are down.'",
        clue: "Would a school EVER send an unverified Uber to pick up a child from home and tell parents not to call the office?",
        redFlags: [
          "Sending an unknown car to pick up a child",
          "Telling parents 'do not call the office'",
          "Severe physical safety threat",
        ],
        safetyConcept:
          "Schools have strict in-person pickup protocols involving authorized guardians with photo IDs. They never dispatch random rideshare vehicles to pick up unattended students.",
        xpReward: 70,
        difficulty: "CHALLENGING",
        topic: "Voice Cloning & Impersonation",
        options: [
          {
            id: "vg-4-a",
            text: "Walk outside and get into the black car when it pulls up.",
            isCorrect: false,
            feedback:
              "CRITICAL DANGER: Never get into a stranger's car! This is a dangerous real-world physical abduction hazard.",
            safetyLesson: "NEVER get into an unknown car or leave home with strangers.",
          },
          {
            id: "vg-4-b",
            text: "Stay securely inside the house, lock the door, tell your parents immediately, and have them call the school's official direct number and local police.",
            isCorrect: true,
            feedback:
              "Maximum Guardian Level! You recognized an extreme danger warning sign. Authorities investigated and kept the neighborhood safe.",
            safetyLesson:
              "Stay inside, lock doors, and involve parents and emergency services immediately.",
          },
          {
            id: "vg-4-c",
            text: "Text the car driver asking who they are.",
            isCorrect: false,
            feedback:
              "Do not communicate with predatory strangers. Stay inside and alert adults immediately.",
            safetyLesson:
              "Alert trusted adults immediately when physical safety is threatened.",
          },
        ],
      },
      {
        id: "vg-5",
        gameSlug: "voiceguard-rescue",
        scenarioIndex: 5,
        title: "The Kidnapping Ransom Scam",
        prompt:
          "A parent receives an alarming call with a cloned child's voice screaming in the background: 'Dad help me!!' A hostile voice demands $1,000 sent via wire transfer in 10 minutes.",
        characterName: "Scam Caller",
        characterAvatar: "⚠️",
        characterMessage:
          "'We have your kid! Send money right now or you will never see them again! Don't hang up!'",
        clue: "Meanwhile, the child is sitting safely in their bedroom doing homework.",
        redFlags: [
          "Virtual kidnapping scam using generic scream audio or social media voice clips",
          "Refusal to let the parent speak directly to the child",
          "Immediate wire transfer demand with tight time limits",
        ],
        safetyConcept:
          "Virtual kidnapping scams are terrifying psychological hoaxes. Scammers use cloned cries to terrorize families. Verifying physical location diffuses the scam instantly.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Voice Cloning & Impersonation",
        options: [
          {
            id: "vg-5-a",
            text: "Send the wire transfer money immediately without checking if the child is in the next room.",
            isCorrect: false,
            feedback:
              "The scammer takes the money and runs. The child was never in danger—it was a heartless audio hoax.",
            safetyLesson: "Check the family member's physical presence or direct location first.",
          },
          {
            id: "vg-5-b",
            text: "Stay calm, signal another family member to check the child's room or school, and verify physical safety before paying anything.",
            isCorrect: true,
            feedback:
              "Calm under pressure! Within 10 seconds, the parent checked the bedroom and saw the child was totally safe. Scam defeated!",
            safetyLesson:
              "Verify physical safety immediately before reacting to terrifying phone hoaxes.",
          },
          {
            id: "vg-5-c",
            text: "Give the caller your bank account login info.",
            isCorrect: false,
            feedback:
              "Never give bank logins to anyone over the phone.",
            safetyLesson: "Protect financial credentials under all circumstances.",
          },
        ],
      },
      {
        id: "vg-6",
        gameSlug: "voiceguard-rescue",
        scenarioIndex: 6,
        title: "The Video Game Streamer Voice Prank",
        prompt:
          "In a gaming stream, an automated voice that sounds like the President of the United States joins the voice channel and says: 'I am giving 500 V-Bucks to anyone who visits my secret site.'",
        characterName: "AI President Bot",
        characterAvatar: "🎙️",
        characterMessage:
          "Voice sounds like a famous world leader, reading a promotional gaming script with robotic pauses.",
        clue: "World leaders don't join random multiplayer lobbies to hand out gaming currency.",
        redFlags: [
          "High-profile public figure in a casual gaming lobby",
          "Promoting external links and virtual currency",
          "Common soundboard / TTS meme used for phishing",
        ],
        safetyConcept:
          "Voice synthesizers can impersonate celebrities, politicians, and internet personalities. Always evaluate the context: does this scenario make sense in reality?",
        xpReward: 60,
        difficulty: "EASY",
        topic: "Voice Cloning & Impersonation",
        options: [
          {
            id: "vg-6-a",
            text: "Believe the real president joined your gaming match and click the link.",
            isCorrect: false,
            feedback:
              "World leaders have official duties—they don't hand out video game coins in Discord channels!",
            safetyLesson: "Context matters: absurd celebrity appearances are audio clones.",
          },
          {
            id: "vg-6-b",
            text: "Recognize it as an AI voice soundboard, ignore the link, and laugh at the meme without clicking any dangerous URLs.",
            isCorrect: true,
            feedback:
              "Spot on! Soundboards and AI voices are widely used for pranks and scams in gaming voice channels.",
            safetyLesson:
              "Treat celebrity voices in gaming lobbies as novelty soundboards, never click their links.",
          },
          {
            id: "vg-6-c",
            text: "Give the bot your home address so they can send the prize by government mail.",
            isCorrect: false,
            feedback:
              "Never give home addresses to random voice bots.",
            safetyLesson: "Never give personal details to voice bots in games.",
          },
        ],
      },
    ],
  },

  // 7. KINDNESS KINGDOM
  {
    slug: "kindness-kingdom",
    title: "Kindness Kingdom",
    subtitle: "The Cooperative Community Realm",
    theme: "Cooperative Quest",
    description:
      "Welcome to the Realm of Kindness! Turn toxic group chats around, include lonely players, practice constructive communication, and earn badges of honor.",
    topic: "Kindness & Empathy",
    iconName: "Heart",
    colorScheme: {
      primary: "#344D78",
      secondary: "#A9DCCB",
      accent: "#F6D84A",
      badgeBg: "bg-rose-100 text-rose-800",
    },
    totalScenarios: 6,
    badgeSlug: "kindness-champion",
    badgeName: "Empathy Crown Badge",
    estimatedMinutes: 8,
    scenarios: [
      {
        id: "kk-1",
        gameSlug: "kindness-kingdom",
        scenarioIndex: 1,
        title: "The Lonely New Player",
        prompt:
          "A new kid joins the community sandbox server. They type: 'Hi everyone! I just started today. Can someone show me where to get wood?' Nobody answers, and one player types: 'Go away noob.'",
        characterName: "New Player (Sam)",
        characterAvatar: "🌱",
        characterMessage:
          "Sam: 'Sorry... I didn't mean to bother anyone :('",
        clue: "Remember when you were a beginner? How would you feel if someone called you a noob?",
        redFlags: [
          "Hostility toward beginners ('noob')",
          "Exclusionary community behavior",
        ],
        safetyConcept:
          "Every expert was once a beginner. Welcoming newcomers builds a safe, thriving, and friendly gaming community.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Kindness & Empathy",
        options: [
          {
            id: "kk-1-a",
            text: "Join in and call them a noob too so the other players think you're experienced.",
            isCorrect: false,
            feedback:
              "Putting others down doesn't make you better at the game—it just makes the community mean and lonely.",
            safetyLesson: "Never put down beginners to look cool.",
          },
          {
            id: "kk-1-b",
            text: "Type: 'Welcome Sam! Meet me at the fountain, I have extra wood and an axe you can have!'",
            isCorrect: true,
            feedback:
              "Kindness Crown awarded! Sam felt welcomed and you made a great new friend in the game.",
            safetyLesson:
              "Welcome beginners with helpful tips and positive energy.",
          },
          {
            id: "kk-1-c",
            text: "Set a trap to destroy their house as soon as they build it.",
            isCorrect: false,
            feedback:
              "Griefing new players ruins their day and can get you banned from good community servers.",
            safetyLesson: "Griefing ruins games for everyone.",
          },
        ],
      },
      {
        id: "kk-2",
        gameSlug: "kindness-kingdom",
        scenarioIndex: 2,
        title: "The Heated Group Chat Debate",
        prompt:
          "Two friends in your Minecraft group chat are furiously arguing over who lost the diamond sword. Caps lock messages and insults are flying.",
        characterName: "Chat Firestorm",
        characterAvatar: "🔥",
        characterMessage:
          "Lucas: 'YOU ARE THE DUMBEST PLAYER EVER!' Noah: 'SHUT UP YOU RUINED EVERYTHING I HATE YOU!'",
        clue: "How can you cool down the fire without taking sides or adding more insults?",
        redFlags: [
          "Caps lock rage and personal insults over a game item",
          "Friendship at risk of ending over pixels",
        ],
        safetyConcept:
          "De-escalation means helping people calm down and see the bigger picture: virtual items can be replaced, but real friendships are valuable.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Kindness & Empathy",
        options: [
          {
            id: "kk-2-a",
            text: "Pick one friend and help them insult the other friend so there is a clear winner.",
            isCorrect: false,
            feedback:
              "Taking sides and throwing insults tears friendships apart and makes the fight ten times worse.",
            safetyLesson: "Don't add fuel to angry arguments.",
          },
          {
            id: "kk-2-b",
            text: "Type: 'Whoa guys, take a breath! It's just a game item. Let's take a 10-minute break and I will help us mine 3 more diamond swords together.'",
            isCorrect: true,
            feedback:
              "Peacekeeper Badge! Both friends stepped back, cooled off, and thanked you for stepping in before things went too far.",
            safetyLesson:
              "De-escalate with calm words, suggest a short break, and offer constructive solutions.",
          },
          {
            id: "kk-2-c",
            text: "Type 'FIGHT FIGHT FIGHT 🍿'",
            isCorrect: false,
            feedback:
              "Treating friends' real anger like a spectator sport harms trust.",
            safetyLesson: "Respect your friends' emotional well-being.",
          },
        ],
      },
      {
        id: "kk-3",
        gameSlug: "kindness-kingdom",
        scenarioIndex: 3,
        title: "The Art Feedback Reframing",
        prompt:
          "A friend posts their digital character drawing in the server. Another kid writes: 'Ew, this looks awful. Throw it in the trash.' Your friend looks heartbroken.",
        characterName: "Artist Friend (Chloe)",
        characterAvatar: "🎨",
        characterMessage:
          "Chloe: 'Maybe I should just quit drawing forever... I guess I really am terrible.'",
        clue: "Constructive feedback highlights strengths and gives gentle ideas, while cruelty only destroys confidence.",
        redFlags: [
          "Cruel, unhelpful comments meant to crush someone's creativity",
          "Discouraging someone from pursuing their passions",
        ],
        safetyConcept:
          "Constructive criticism is specific, polite, and encouraging. Cruel insults are just bullying disguised as 'honesty'.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Kindness & Empathy",
        options: [
          {
            id: "kk-3-a",
            text: "Agree that they should give up drawing so they don't waste time.",
            isCorrect: false,
            feedback:
              "That crushes your friend's creative spirit. Everyone gets better with practice!",
            safetyLesson: "Never tell someone to give up on their creative passions.",
          },
          {
            id: "kk-3-b",
            text: "Post: 'Don't listen to that, Chloe! I love the colors and lighting you chose on the cape! Keep practicing, you are improving every week!'",
            isCorrect: true,
            feedback:
              "Creativity Guardian! Specific compliments give people the courage to keep practicing and learning.",
            safetyLesson:
              "Support friends with specific praise and encouragement to practice.",
          },
          {
            id: "kk-3-c",
            text: "Post a private message laughing about the drawing.",
            isCorrect: false,
            feedback:
              "Talking behind a friend's back is hurtful and dishonest.",
            safetyLesson: "Be genuine and loyal to friends.",
          },
        ],
      },
      {
        id: "kk-4",
        gameSlug: "kindness-kingdom",
        scenarioIndex: 4,
        title: "The Good Sport Reaction",
        prompt:
          "You just lost the championship match of a competitive sports game in the very last second. You feel frustrated and upset.",
        characterName: "Post-Match Chat",
        characterAvatar: "🏆",
        characterMessage:
          "Opponent: 'Good game everyone! That was super close!' Your teammate is about to type: 'You only won because of lag, you cheater.'",
        clue: "How you handle losing shows your true character as a gamer.",
        redFlags: [
          "Making excuses and accusing opponents of cheating when losing fairly",
          "Toxic sportsmanship in defeat",
        ],
        safetyConcept:
          "Good sportsmanship means celebrating the effort, acknowledging skilled opponents, and keeping games fun even when you don't win.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Kindness & Empathy",
        options: [
          {
            id: "kk-4-a",
            text: "Spam the chat with 'LAG LAG CHEATERS' and report all opponents for hacking.",
            isCorrect: false,
            feedback:
              "Filing false reports because you lost clogs moderator queues and makes you look like a sore loser.",
            safetyLesson: "Never submit false hacker reports out of anger.",
          },
          {
            id: "kk-4-b",
            text: "Type: 'GG! Great shot at the end, that was an awesome match!' and tell your teammate: 'We played hard, we'll get them next time!'",
            isCorrect: true,
            feedback:
              "Champion of Character! True champions show grace in victory and dignity in defeat.",
            safetyLesson:
              "Say 'Good Game' (GG) and respect your opponents' efforts.",
          },
          {
            id: "kk-4-c",
            text: "Turn off the game console by pulling the plug from the wall.",
            isCorrect: false,
            feedback:
              "Rage-quitting can corrupt game save data and disconnects you without honor.",
            safetyLesson:
              "Finish games respectfully even when on the losing side.",
          },
        ],
      },
      {
        id: "kk-5",
        gameSlug: "kindness-kingdom",
        scenarioIndex: 5,
        title: "The Sensitive Subject Prank",
        prompt:
          "A group of players thinks it would be hilarious to change their server nicknames to mock a classmate who is in the hospital with an illness.",
        characterName: "Prank Squad",
        characterAvatar: "🎭",
        characterMessage:
          "'Come on, it's just dark humor! If you don't change your name to match ours, you can't be in our clan!'",
        clue: "Is making fun of someone's medical illness or suffering ever 'just a joke'?",
        redFlags: [
          "Mocking real-world illness, grief, or disability",
          "Peer pressure to participate in cruel pranks ('or you can't be in our clan')",
          "Hiding behind 'it's just dark humor'",
        ],
        safetyConcept:
          "Humor should never punch down at people who are sick, suffering, or unable to defend themselves. Standing up against peer pressure takes true courage.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Kindness & Empathy",
        options: [
          {
            id: "kk-5-a",
            text: "Change your name to match them so they don't kick you out of the clan.",
            isCorrect: false,
            feedback:
              "Participating in mocking a sick classmate causes deep pain to them and their family.",
            safetyLesson: "Never compromise your values to stay in a toxic group.",
          },
          {
            id: "kk-5-b",
            text: "Refuse firmly: 'Mocking someone's illness isn't funny, it's cruel. I won't participate in this.' Leave the clan if they persist.",
            isCorrect: true,
            feedback:
              "Courage Award! Standing up to your own peer group when they do wrong is the highest form of bravery.",
            safetyLesson:
              "True heroes say no to peer pressure when jokes cross into cruelty.",
          },
          {
            id: "kk-5-c",
            text: "Secretly tell the sick classmate what everyone said.",
            isCorrect: false,
            feedback:
              "Telling the sick friend while they are hospitalized causes them stress. Better to report the behavior to adults.",
            safetyLesson:
              "Protect vulnerable friends from unnecessary distress.",
          },
        ],
      },
      {
        id: "kk-6",
        gameSlug: "kindness-kingdom",
        scenarioIndex: 6,
        title: "The Apology That Counts",
        prompt:
          "Yesterday, when you were tired, you snapped at a friend online and said something mean. Today you feel guilty about it.",
        characterName: "Your Conscience",
        characterAvatar: "💭",
        characterMessage:
          "You notice your friend hasn't messaged you all morning. What is the best way to make things right?",
        clue: "A real apology owns the mistake without making excuses.",
        redFlags: [
          "Pretending it never happened",
          "Fake apologies: 'I'm sorry IF your feelings were hurt, but you made me mad'",
        ],
        safetyConcept:
          "A sincere apology has 3 parts: 1) Admit what you did, 2) Acknowledge how it hurt them, and 3) Say how you will do better next time.",
        xpReward: 70,
        difficulty: "CHALLENGING",
        topic: "Kindness & Empathy",
        options: [
          {
            id: "kk-6-a",
            text: "Never bring it up again and hope they just forget about it.",
            isCorrect: false,
            feedback:
              "Ignoring hurt feelings leaves a wall between friends that grows bigger over time.",
            safetyLesson: "Unaddressed hurts damage long-term friendships.",
          },
          {
            id: "kk-6-b",
            text: "Send a sincere message: 'Hey, I'm really sorry for what I said yesterday. I was tired and in a bad mood, but that's no excuse. I value our friendship and I'll do better.'",
            isCorrect: true,
            feedback:
              "Crown of Maturity! Taking responsibility for mistakes heals friendships and earns lifelong respect.",
            safetyLesson:
              "A real apology takes responsibility without making excuses.",
          },
          {
            id: "kk-6-c",
            text: "Message them: 'I'm sorry you got offended by my joke.'",
            isCorrect: false,
            feedback:
              "Saying 'sorry you got offended' blames the victim instead of taking responsibility.",
            safetyLesson:
              "Avoid non-apologies that blame the other person's reaction.",
          },
        ],
      },
    ],
  },

  // 8. GAMER SAFETY QUEST
  {
    slug: "gamer-safety-quest",
    title: "Gamer Safety Quest",
    subtitle: "The Virtual World Survival Guide",
    theme: "Video Game Dungeon",
    description:
      "Level up your gaming security! Defend against account stealers, fake mod download trojans, shady discord invites, and predatory trades.",
    topic: "Gaming Safety",
    iconName: "Gamepad2",
    colorScheme: {
      primary: "#344D78",
      secondary: "#F6D84A",
      accent: "#E9A15A",
      badgeBg: "bg-purple-100 text-purple-800",
    },
    totalScenarios: 6,
    badgeSlug: "safe-gamer",
    badgeName: "Elite Gamer Shield Badge",
    estimatedMinutes: 8,
    scenarios: [
      {
        id: "gs-1",
        gameSlug: "gamer-safety-quest",
        scenarioIndex: 1,
        title: "The 'Unlimited Robux / V-Bucks' Generator",
        prompt:
          "A YouTube video description advertises: 'NEW 2026 In-Game Coin Generator! 100,000 coins injected directly into your account in 30 seconds!'",
        characterName: "FreeCoinsGen Web",
        characterAvatar: "🪙",
        characterMessage:
          "Webpage asks: 'Enter your game username, password, and install these 2 mobile survey apps to complete human verification!'",
        clue: "Can an external website magically create real currency inside someone else's official game servers?",
        redFlags: [
          "Requesting game passwords to 'generate' currency",
          "Completing surveys or downloading apps to 'verify human'",
          "Server currencies are stored securely on official game cloud servers, impossible for external sites to inject",
        ],
        safetyConcept:
          "In-game currency generators do not exist. They are phishing traps that steal accounts, harvest ad revenue from surveys, and install adware on devices.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Gaming Safety",
        options: [
          {
            id: "gs-1-a",
            text: "Type your username and password and complete both surveys so you get rich in the game.",
            isCorrect: false,
            feedback:
              "Your account was stolen! The scammers changed the email and password, locking you out forever.",
            safetyLesson: "In-game currency generators are 100% fake phishing scams.",
          },
          {
            id: "gs-1-b",
            text: "Close the page immediately. Only earn or purchase currency through the official in-game store with parent permission.",
            isCorrect: true,
            feedback:
              "Smart gamer! You protected your hard-earned progress and items from account thieves.",
            safetyLesson:
              "Never enter account credentials on third-party 'free coin' generator sites.",
          },
          {
            id: "gs-1-c",
            text: "Tell your friends to use it first to see if they get coins.",
            isCorrect: false,
            feedback:
              "Leading your friends into a trap can get their accounts stolen too!",
            safetyLesson: "Warn friends away from fake generator links.",
          },
        ],
      },
      {
        id: "gs-2",
        gameSlug: "gamer-safety-quest",
        scenarioIndex: 2,
        title: "The 'Secret Mod' Trojan Download",
        prompt:
          "A player in a sandbox game tells you: 'Download my custom Flying Speed Mod from this MediaFire link: SpeedGod_Mod.zip.exe.'",
        characterName: "Modder_X",
        characterAvatar: "⚡",
        characterMessage:
          "'Turn off your Windows antivirus because antivirus always gives a false alarm for cool hacker mods!'",
        clue: "Look at the double extension: .zip.exe and the warning to turn off your antivirus!",
        redFlags: [
          "Double file extension (.zip.exe) designed to deceive",
          "Telling you to disable antivirus software",
          "Untrusted download link outside official mod repositories",
        ],
        safetyConcept:
          "Never disable your antivirus to install unknown files. Files ending in .exe disguised as mods often contain Remote Access Trojans (RATs) that take over your PC.",
        xpReward: 50,
        difficulty: "EASY",
        topic: "Gaming Safety",
        options: [
          {
            id: "gs-2-a",
            text: "Disable your antivirus and run the .exe file as administrator.",
            isCorrect: false,
            feedback:
              "Disaster! A hacker now has remote control of your computer, camera, and stored passwords.",
            safetyLesson: "Never disable antivirus software to run downloaded files.",
          },
          {
            id: "gs-2-b",
            text: "Refuse the download, delete the link, and stick strictly to verified, official modding platforms (like CurseForge) with parent approval.",
            isCorrect: true,
            feedback:
              "Defense Shield Activated! You spotted the sneaky .exe trick and kept your computer clean.",
            safetyLesson:
              "Only download mods from verified platforms and keep security shields on.",
          },
          {
            id: "gs-2-c",
            text: "Rename the file to .png so it becomes a picture.",
            isCorrect: false,
            feedback:
              "Renaming extensions doesn't remove the malicious executable code inside.",
            safetyLesson: "Delete dangerous files rather than renaming them.",
          },
        ],
      },
      {
        id: "gs-3",
        gameSlug: "gamer-safety-quest",
        scenarioIndex: 3,
        title: "The Stranger Inviting You to a Private App",
        prompt:
          "You've been playing with an online teammate for two days. They say: 'Hey, you're cool. Leave this game chat and add me on Snapchat or Telegram so we can talk privately without rules.'",
        characterName: "Online Teammate (Stranger)",
        characterAvatar: "👤",
        characterMessage:
          "'Game chat is monitored and annoying. Let's move to private disappearing messages on Snapchat. Don't tell anyone.'",
        clue: "Why does an online stranger want to move a child away from a monitored game into unmonitored private chats?",
        redFlags: [
          "Trying to move you from monitored public platforms to unmonitored private apps",
          "Asking for disappearing messages (grooming warning sign)",
          "'Don't tell anyone' secrecy request",
        ],
        safetyConcept:
          "Online predators and manipulators try to isolate children away from moderated game environments into private messaging apps. Always keep game friendships inside the game.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Gaming Safety",
        options: [
          {
            id: "gs-3-a",
            text: "Download Snapchat and give them your handle secretly.",
            isCorrect: false,
            feedback:
              "Extreme danger! Moving to private unmonitored apps with strangers is a major online grooming risk.",
            safetyLesson: "Never move to private messaging apps with gaming strangers.",
          },
          {
            id: "gs-3-b",
            text: "Say: 'I only chat inside the game lobby, that's my family rule.' If they persist or pressure you, block and tell a parent.",
            isCorrect: true,
            feedback:
              "Safety Guardian Master! Keeping communication inside moderated game channels keeps you safe from manipulation.",
            safetyLesson:
              "Keep gaming friendships inside the game. Never switch to unmonitored private channels.",
          },
          {
            id: "gs-3-c",
            text: "Give them your home phone number instead.",
            isCorrect: false,
            feedback:
              "Home phone numbers reveal your family location and private contact details.",
            safetyLesson: "Never give phone numbers to online strangers.",
          },
        ],
      },
      {
        id: "gs-4",
        gameSlug: "gamer-safety-quest",
        scenarioIndex: 4,
        title: "The 'Account Testing' Scam",
        prompt:
          "Someone in an online tournament says: 'I am a scout for an official eSports team! We want to sponsor you with $1,000 a month, but our coach needs to test your account first. Give me your login for 1 hour.'",
        characterName: "eSports Scout (Fake)",
        characterAvatar: "🎮",
        characterMessage:
          "'If you don't give me your credentials in 10 minutes, I will give the $1,000 sponsorship contract to the next player on the leaderboard!'",
        clue: "Real professional eSports scouts judge your skills by watching you play, never by taking your account login.",
        redFlags: [
          "Promising huge money to a young player",
          "Demanding account logins to 'test' it",
          "High-pressure deadline ('10 minutes')",
        ],
        safetyConcept:
          "Legitimate gaming teams never need your password. Anyone asking for your account login under the promise of a sponsorship or badge is an account thief.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Gaming Safety",
        options: [
          {
            id: "gs-4-a",
            text: "Hand over your login immediately so you can become a rich eSports pro.",
            isCorrect: false,
            feedback:
              "They stole your account, changed your password, and sold all your rare inventory!",
            safetyLesson: "Legitimate organizations never ask for your account password.",
          },
          {
            id: "gs-4-b",
            text: "Decline and report the user for impersonation and phishing on the game platform.",
            isCorrect: true,
            feedback:
              "Top detective gamer! Real scouts watch match replays; they never ask for private passwords.",
            safetyLesson:
              "Never give your password to anyone claiming to be a scout, admin, or sponsor.",
          },
          {
            id: "gs-4-c",
            text: "Give them an old account password instead.",
            isCorrect: false,
            feedback:
              "Old passwords can still be used to guess your current ones or compromise other linked services.",
            safetyLesson: "Never share any passwords, old or new.",
          },
        ],
      },
      {
        id: "gs-5",
        gameSlug: "gamer-safety-quest",
        scenarioIndex: 5,
        title: "The Unsafe Skin Trading Site",
        prompt:
          "You want to trade a rare weapon skin. A player gives you a link: 'www.steam-community-login-secure.co/trade/392'. The page looks almost identical to the real login page.",
        characterName: "SkinTrader_Pro",
        characterAvatar: "🔫",
        characterMessage:
          "'Log into this site with your Steam or Epic account so we can do a direct web trade.'",
        clue: "Check the domain URL carefully: steam-community-login-secure.co is NOT the official store domain!",
        redFlags: [
          "Lookalike domain trying to mimic the real company",
          "Logging in on third-party sites exposes your credentials and API keys",
          "Steam API hijacking / trade interception scams",
        ],
        safetyConcept:
          "Phishing sites copy the exact design of real game platforms. Always check the exact address bar URL and use official in-client trade windows.",
        xpReward: 60,
        difficulty: "MEDIUM",
        topic: "Gaming Safety",
        options: [
          {
            id: "gs-5-a",
            text: "Enter your username, password, and Steam Guard authenticator code on the website.",
            isCorrect: false,
            feedback:
              "They intercepted your login and your two-factor code! All your valuable inventory skins were traded away to a bot.",
            safetyLesson: "Always check the browser URL bar for typosquatting and fake domains.",
          },
          {
            id: "gs-5-b",
            text: "Do NOT enter credentials on external lookalike sites. Only trade through the verified game launcher itself.",
            isCorrect: true,
            feedback:
              "Master inventory defense! You noticed the suspicious .co domain and saved your rare collection.",
            safetyLesson:
              "Never log into third-party trading sites with your primary gaming credentials.",
          },
          {
            id: "gs-5-c",
            text: "Bookmark the site for later.",
            isCorrect: false,
            feedback:
              "Bookmarking phishing sites can lead to accidental logins later.",
            safetyLesson: "Close and report phishing websites immediately.",
          },
        ],
      },
      {
        id: "gs-6",
        gameSlug: "gamer-safety-quest",
        scenarioIndex: 6,
        title: "The In-Game Harasser Following You Server to Server",
        prompt:
          "A player you blocked on one server creates a new alt account, follows you into your new server, and whispers: 'You can't hide from me. I will follow you wherever you play.'",
        characterName: "Stalker_Alt_01",
        characterAvatar: "👁️",
        characterMessage:
          "'Every time you make a friend, I will ruin your game. Unblock my main account or else.'",
        clue: "How are they finding which server you are on? Check your game profile privacy and 'Join Game' settings!",
        redFlags: [
          "Persistent stalking and circumventing blocks",
          "Using public 'Join Game' settings to follow you",
          "Threats and intimidation",
        ],
        safetyConcept:
          "When harassers follow you across servers, set your 'Who can join my game' and 'Who can see my online status' settings to 'Friends Only' or 'No One', report the accounts, and tell a parent.",
        xpReward: 70,
        difficulty: "CHALLENGING",
        topic: "Gaming Safety",
        options: [
          {
            id: "gs-6-a",
            text: "Unblock their main account and beg them to leave you alone.",
            isCorrect: false,
            feedback:
              "Giving in to intimidation encourages the stalker to harass you more.",
            safetyLesson: "Never unblock harassers or give in to demands.",
          },
          {
            id: "gs-6-b",
            text: "Change your game privacy settings to 'Join Game: Friends Only', report the alt account for harassment, and tell your parent or guardian.",
            isCorrect: true,
            feedback:
              "Ultimate Cyber Shield! Changing your join permissions made you invisible to strangers. The harasser can no longer follow you.",
            safetyLesson:
              "Lock down your profile join settings to Friends Only to stop cross-server stalking.",
          },
          {
            id: "gs-6-c",
            text: "Delete your favorite game forever.",
            isCorrect: false,
            feedback:
              "You don't have to give up your favorite game! Built-in privacy controls protect you without quitting.",
            safetyLesson:
              "Use privacy settings to protect your peace rather than giving up your hobbies.",
          },
        ],
      },
    ],
  },
];
