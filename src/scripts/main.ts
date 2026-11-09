// 1. E-mail składany dopiero w przeglądarce, żeby boty go nie zebrały.
document.querySelectorAll<HTMLAnchorElement>('.js-mail').forEach((a) => {
  const { u, d, s } = a.dataset;
  if (!u || !d) return;
  const addr = `${u}@${d}`;
  a.href = `mailto:${addr}${s ? `?subject=${encodeURIComponent(s)}` : ''}`;
  a.querySelectorAll('.js-mail-text').forEach((t) => (t.textContent = addr));
});

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 2. Wejścia elementów przy przewijaniu.
const rise = document.querySelectorAll('.rise');
if ('IntersectionObserver' in window && !reduce) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }),
    { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
  );
  rise.forEach((el) => io.observe(el));
} else {
  rise.forEach((el) => el.classList.add('in'));
}

// 3. Przyklejone zdjęcie zmienia się razem z sekcją, którą czytasz.
const stage = document.querySelector('.stage');
if (stage && 'IntersectionObserver' in window) {
  const pics = stage.querySelectorAll<HTMLElement>('picture[data-key]');
  const show = (key: string) => pics.forEach((p) => p.classList.toggle('is-on', p.dataset.key === key));
  stage.classList.add('is-ready');
  const so = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) show((e.target as HTMLElement).dataset.stage || 'start');
    }),
    { rootMargin: '-45% 0px -45% 0px' },
  );
  document.querySelectorAll('[data-stage]').forEach((s) => so.observe(s));
}

// 4. Portfolio: nazwa projektu przełącza podgląd i opis.
const projects = Array.from(document.querySelectorAll<HTMLElement>('.project'));
const previews = document.querySelectorAll<HTMLElement>('.preview picture[data-key]');
const activate = (el: HTMLElement) => {
  projects.forEach((p) => {
    const on = p === el;
    p.classList.toggle('is-active', on);
  });
  previews.forEach((p) => p.classList.toggle('is-on', p.dataset.key === el.dataset.key));
};
const desktop = window.matchMedia('(min-width: 901px)');
projects.forEach((p) => {
  const btn = p.querySelector('button');
  btn?.addEventListener('click', () => activate(p));
  btn?.addEventListener('focus', () => activate(p));
  p.addEventListener('mouseenter', () => { if (desktop.matches) activate(p); });
});
