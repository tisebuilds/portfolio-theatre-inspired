const PEAK_GAIN = 0.12;
const DURATION_MS = 90;
const HIGHPASS_HZ = 1200;

let ctxRef: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctxRef) {
    try {
      ctxRef = new AudioContext();
    } catch {
      return null;
    }
  }
  return ctxRef;
}

/** Call from pointerdown / first key to satisfy autoplay policy */
export function primeAudioContext(): void {
  const ctx = getContext();
  if (ctx?.state === "suspended") {
    void ctx.resume().catch(() => {});
  }
}

export function playChannelFlipSound(options?: {
  reducedMotion?: boolean;
  /** Skip SFX (e.g. mobile resume layout) */
  muted?: boolean;
}): void {
  if (options?.reducedMotion || options?.muted) return;

  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    void ctx.resume().catch(() => {});
    if (ctx.state === "suspended") return;
  }

  const sampleRate = ctx.sampleRate;
  const n = Math.max(1, Math.floor((DURATION_MS / 1000) * sampleRate));
  const buffer = ctx.createBuffer(1, n, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < n; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / n) ** 1.5;
  }

  const src = ctx.createBufferSource();
  src.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = HIGHPASS_HZ;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(PEAK_GAIN, ctx.currentTime + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + DURATION_MS / 1000);

  src.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  src.start();
  src.stop(ctx.currentTime + DURATION_MS / 1000 + 0.02);
}
