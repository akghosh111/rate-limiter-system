const store = new Map<string, number[]>();

export function slidingWindow(
  key: string,
  limit: number,
  windowMs: number
) {
  const now = Date.now();

  let queue = store.get(key);

  if (!queue) {
    queue = [];
    store.set(key, queue);
  }

  
  const oldest = queue[0] ?? now;
  while (queue.length > 0 && now - oldest >= windowMs) {
    queue.shift();
  }

  if (queue.length >= limit) {
    const oldest = queue[0] ?? now;

    return {
      allowed: false,
      remaining: 0,
      resetTime: oldest + windowMs
    };
  }

  queue.push(now);

  return {
    allowed: true,
    remaining: limit - queue.length,
    resetTime: (queue[0] ?? now) + windowMs
  };
}