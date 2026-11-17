const firedKeys = new Set<string>();

export async function triggerCelebration(key: string) {
  if (typeof window === 'undefined') return;
  if (firedKeys.has(key)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  firedKeys.add(key);
  try {
    const confetti = (await import('canvas-confetti')).default;
    confetti({
      particleCount: 55,
      spread: 65,
      origin: { y: 0.72 },
      colors: ['#6366F1', '#22D3EE', '#F5B942', '#10B981'],
    });
  } catch {
    // Graceful no-op if confetti fails to load
  }
}
