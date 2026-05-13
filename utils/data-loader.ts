import fs from 'fs';

export function loadData<T>(path: string): T {
  const raw = fs.readFileSync(path, 'utf-8');
  return JSON.parse(raw) as T;
}