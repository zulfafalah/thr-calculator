import LZString from 'lz-string';

/**
 * Keys from localStorage that make up the shareable state.
 */
const SHARE_KEYS = ['recipients_data', 'thr_config', 'distributed_ids'] as const;

/**
 * Compress all THR-related localStorage data into a URL-safe string.
 * The result can be appended as a URL hash fragment.
 */
export function compressStateToHash(): string {
  const payload: Record<string, unknown> = {};

  for (const key of SHARE_KEYS) {
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        payload[key] = JSON.parse(raw);
      } catch {
        payload[key] = raw;
      }
    }
  }

  const json = JSON.stringify(payload);
  const compressed = LZString.compressToEncodedURIComponent(json);
  return compressed;
}

/**
 * Build a full shareable URL with the compressed state as the hash.
 */
export function buildShareURL(): string {
  const hash = compressStateToHash();
  const base = window.location.origin + window.location.pathname.replace(/\/hasil\/?$/, '/hasil');
  return `${base}#${hash}`;
}

/**
 * Read the URL hash, decompress, and restore into localStorage.
 * Returns `true` if data was successfully restored.
 */
export function restoreStateFromHash(hash: string): boolean {
  // Strip leading '#' if present
  const compressed = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!compressed) return false;

  try {
    const json = LZString.decompressFromEncodedURIComponent(compressed);
    if (!json) return false;

    const payload: Record<string, unknown> = JSON.parse(json);

    for (const key of SHARE_KEYS) {
      if (key in payload) {
        localStorage.setItem(key, JSON.stringify(payload[key]));
      }
    }

    return true;
  } catch (e) {
    console.error('[THR Share] Failed to restore state from hash:', e);
    return false;
  }
}
