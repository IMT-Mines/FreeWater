import { config } from '../config';
import { MemcacheClient } from 'memcache-client';

const client = new MemcacheClient({ server: config.MEMCACHED_URL });
const expirationTime = 60 * 60 * 12;

export async function set<T>(key: string, value: T) {
  await client.set(key, JSON.stringify(value), { lifetime: expirationTime });
}

export async function get<T>(key: string): Promise<T | null> {
  const data = await client.get<string>(key);
  if (!data) {
    return null;
  }
  return JSON.parse(data.value);
}