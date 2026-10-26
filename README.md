# VEST-POL — plan produkcji i zamówienia

Aplikacja instalowana z przeglądarki (PWA). Otwórz https://plonczykt-a11y11.github.io/vestpol/ i kliknij **Zainstaluj**.

- Dane (zamówienia, statusy, konta) są na serwerze Google Apps Script i są dostępne tylko po zalogowaniu PIN-em.
- `config.js` — adres serwera (wdrożenie Apps Script, kończy się na `/exec`).
- Po zmianie plików zwiększ `WERSJA` w `sw.js`, żeby zainstalowane aplikacje pobrały nową wersję.
