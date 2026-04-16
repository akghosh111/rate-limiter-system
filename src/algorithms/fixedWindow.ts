const store = new Map<string, { count: number; resetTime: number }>();

export function fixedWindow(
  key: string,
  limit: number,
  windowMs: number
) {
  const now = Date.now();

  const entry = store.get(key);

  if (!entry || now > entry.resetTime) {
    store.set(key, {
      count: 1,
      resetTime: now + windowMs
    });

    return { allowed: true, remaining: limit - 1, resetTime: now + windowMs };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }

  entry.count++;

  return {
    allowed: true,
    remaining: limit - entry.count,
    resetTime: entry.resetTime
  };
}