import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  badgeIcon: string;
  badgeColor: string;
}

export const LEVELS: LevelInfo[] = [
  {
    level: 1,
    title: "Curious Explorer",
    minXp: 0,
    maxXp: 250,
    badgeIcon: "Compass",
    badgeColor: "bg-clicky-sky text-clicky-navy-dark",
  },
  {
    level: 2,
    title: "Safety Scout",
    minXp: 250,
    maxXp: 600,
    badgeIcon: "ShieldCheck",
    badgeColor: "bg-clicky-mint text-clicky-navy-dark",
  },
  {
    level: 3,
    title: "Digital Detective",
    minXp: 600,
    maxXp: 1100,
    badgeIcon: "Search",
    badgeColor: "bg-clicky-yellow text-clicky-navy-dark",
  },
  {
    level: 4,
    title: "Cyber Guardian",
    minXp: 1100,
    maxXp: 1800,
    badgeIcon: "Award",
    badgeColor: "bg-clicky-orange text-white",
  },
  {
    level: 5,
    title: "Clicky Champion",
    minXp: 1800,
    maxXp: 3000,
    badgeIcon: "Crown",
    badgeColor: "bg-gradient-to-r from-clicky-yellow via-clicky-orange to-clicky-sky text-clicky-navy-dark",
  },
];

export function getLevelInfo(xp: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getLevelProgress(xp: number): {
  currentLevel: LevelInfo;
  nextLevel: LevelInfo | null;
  percentage: number;
  xpToNext: number;
} {
  const current = getLevelInfo(xp);
  const next = LEVELS.find((l) => l.level === current.level + 1) || null;

  if (!next) {
    return {
      currentLevel: current,
      nextLevel: null,
      percentage: 100,
      xpToNext: 0,
    };
  }

  const range = next.minXp - current.minXp;
  const earned = xp - current.minXp;
  const percentage = Math.min(100, Math.max(0, Math.round((earned / range) * 100)));
  const xpToNext = Math.max(0, next.minXp - xp);

  return {
    currentLevel: current,
    nextLevel: next,
    percentage,
    xpToNext,
  };
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

// Child-friendly web audio synthesizer for playful sound effects
let audioContext: AudioContext | null = null;
let isAudioMuted = false;

export function toggleAudioMute(muted?: boolean): boolean {
  if (typeof window === "undefined") return true;
  if (muted !== undefined) {
    isAudioMuted = muted;
  } else {
    isAudioMuted = !isAudioMuted;
  }
  try {
    localStorage.setItem("clicky_audio_muted", isAudioMuted ? "true" : "false");
  } catch {}
  return isAudioMuted;
}

export function getAudioMuted(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return localStorage.getItem("clicky_audio_muted") === "true";
  } catch {
    return false;
  }
}

export function playSound(
  type:
    | "click"
    | "correct"
    | "incorrect"
    | "clue"
    | "puzzleComplete"
    | "badgeUnlocked"
    | "levelUp"
    | "gameComplete"
    | "celebrate"
    | "chime"
) {
  if (typeof window === "undefined" || getAudioMuted()) return;

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioContext) audioContext = new AudioCtx();
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const now = audioContext.currentTime;

    if (type === "click") {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === "clue") {
      // Gentle discovery harp trill
      [739.99, 880.0, 1108.73, 1318.51].forEach((freq, idx) => {
        if (!audioContext) return;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.07, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.2);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.2);
      });
    } else if (type === "correct") {
      // Pleasant harmonious chime
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        if (!audioContext) return;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.1, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.22);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.22);
      });
    } else if (type === "incorrect") {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.18);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === "puzzleComplete" || type === "badgeUnlocked") {
      // Uplifting reward fanfare
      const notes = [587.33, 739.99, 880.0, 1174.66];
      notes.forEach((freq, i) => {
        if (!audioContext) return;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.12, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.35);
      });
    } else if (type === "celebrate" || type === "levelUp" || type === "gameComplete") {
      const chords = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      chords.forEach((freq, i) => {
        if (!audioContext) return;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.12, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.45);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.45);
      });
    } else if (type === "chime") {
      [659.25, 880, 1046.5].forEach((freq, idx) => {
        if (!audioContext) return;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.08, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    }
  } catch {
    // Ignore audio errors gracefully on un-interacted or restricted browsers
  }
}

