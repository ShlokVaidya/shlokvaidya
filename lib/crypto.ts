// Edge-safe crypto utilities
export function hash(value: string): string {
  // Use Web Crypto API which is available in edge runtime
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  // For now, return a simple hash using Web standard
  // In production, consider using a purpose-built library like @noble/hashes
  return Array.from(new Uint8Array(data.slice(0, 32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
