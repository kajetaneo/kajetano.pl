import type { ImageMetadata } from 'astro';

// Wszystkie zdjęcia z src/assets/img. W site.json podajesz samą nazwę pliku.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.{jpg,jpeg,png,webp,avif}', { eager: true });

export function img(name: string): ImageMetadata {
  const hit = Object.entries(files).find(([path]) => path.endsWith('/' + name));
  if (!hit) throw new Error(`Brak zdjęcia "${name}" w src/assets/img (sprawdź site.json)`);
  return hit[1].default;
}
