# kajetano.pl

Statyczna strona Kajetana Pilachowskiego (Kajetano) w Astro, hostowana za darmo na GitHub Pages.

## Gdzie co jest
- **Cała treść**: `src/content/site.json`. Teksty, liczby, usługi, portfolio, opinie, kontakt, social media i meta SEO. Prawie każda zmiana treści to edycja tylko tego pliku.
- **Zdjęcia**: `src/assets/img/`. W `site.json` podaje się samą nazwę pliku (np. `"image": "narwal-scena.jpg"`). Astro samo robi z nich AVIF/WebP w kilku rozmiarach. Nowe zdjęcie: wrzuć plik do folderu, wpisz nazwę i opis (`imageAlt`) w `site.json`.
- **Układ strony**: `src/pages/index.astro` (sekcje), `src/layouts/Base.astro` (head, SEO, JSON-LD, favicony), `src/styles/global.css` (wygląd), `src/scripts/main.ts` (e-mail składany w JS, animacje, przełączanie zdjęć).
- **Pliki statyczne**: `public/` (favicony, `og.jpg` 1200×630, `robots.txt`, manifest).
- `_stara-strona/`: kopia mediów i HTML ze starego WordPressa. Nie trafia do repo (jest w `.gitignore`).

## Podgląd lokalnie
```bash
npm install      # tylko za pierwszym razem
npm run dev      # http://localhost:4321, odświeża się na żywo
npm run build && npm run preview   # wersja produkcyjna, http://localhost:4322
```

## Publikacja
`git push` na gałąź `main`. Workflow `.github/workflows/deploy.yml` buduje stronę i publikuje ją na GitHub Pages (ok. 1–2 min). Status: zakładka Actions w repo.

## Zasady
- Język polski, ton luźny, „peer-to-peer”.
- Bez ciasteczek i bez trackerów. Analityka tylko bezcookiesowa i tylko po zgodzie Kajetana.
- E-mail nie może być w HTML jako zwykły tekst: zostaje `data-u`/`data-d` + `js-mail` (fallback `kontakt(małpa)kajetano.pl`).
- Zachować tag weryfikacyjny Google (`meta.googleVerification` w `site.json`).
- Nie używać GIF-a z „The Office” ze starej strony (prawa autorskie).
- Po zmianach sprawdź `npm run build` (błąd = np. literówka w nazwie zdjęcia w `site.json`). Cel: Lighthouse 95+ w każdej kategorii.

## DNS i poczta (OVH)
- Domena `kajetano.pl` jest w OVH. Serwery DNS zostają w OVH.
- Strona: rekordy A/AAAA dla `kajetano.pl` na GitHub Pages i CNAME `www` → `kajetaneo.github.io`.
- **Nie ruszać rekordów MX, SPF ani innych TXT poczty.** Poczta `kontakt@kajetano.pl` jest na OVH E-mail Pro (opłacone do 1.06.2027). Ewentualna przeprowadzka na Zimbra Starter przed tą datą.
