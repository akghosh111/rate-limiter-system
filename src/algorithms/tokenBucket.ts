const store = new Map<
  string,
  { tokens: number; lastRefill: number }
>();

export function tokenBucket(
  key: string,
  capacity: number,
  refillRate: number 
) {
  const now = Date.now();

  let bucket = store.get(key);

  if (!bucket) {
    bucket = { tokens: capacity, lastRefill: now };
    store.set(key, bucket);
  }

  
  const elapsed = (now - bucket.lastRefill) / 1000;
  const refill = Math.floor(elapsed * refillRate);

  if (refill > 0) {
    bucket.tokens = Math.min(capacity, bucket.tokens + refill);
    bucket.lastRefill = now;
  }

  if (bucket.tokens <= 0) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: bucket.lastRefill + 1000 / refillRate
    };
  }

  bucket.tokens--;

  return {
    allowed: true,
    remaining: bucket.tokens,
    resetTime: bucket.lastRefill + 1000 / refillRate
  };
}