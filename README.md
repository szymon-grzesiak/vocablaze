# Przewodnik Instalacji Projektu

## Wymagania
- Node.js (18.x lub nowsza)
- npm
- Konto GitHub (opcjonalne)
- Konto Google Cloud Console (opcjonalne)
- Konto Supabase
- Konto Resend
- Konto Stripe

## Konfiguracja OAuth
### GitHub
1. Przejdź do GitHub Developer Settings
2. Utwórz nową rejestrację OAuth
3. Wygeneruj Client ID i Client Secret

### Google
1. Przejdź do Google Cloud Console
2. Utwórz projekt
3. Skonfiguruj ekran zgody OAuth
4. Wygeneruj Credentiale

## Kroki Instalacji

### 1. Instalacja Zależności
```bash
npm install
```

### 2. Generowanie Prisma
```bash
npx prisma generate
```
- Generuje typy TypeScript
- Tworzy klienta Prisma
- Wymagane przed migracjami i uruchomieniem projektu

### 3. Konfiguracja Środowiska
Utwórz plik `.env` z następującymi konfiguracjami:

#### Uwierzytelnianie
- `AUTH_TRUST_HOST`: `http://localhost:3000/api/auth/session`
- `AUTH_SECRET`: Wygeneruj losowy sekret (np. `openssl rand -hex 32`)
- `GITHUB_CLIENT_ID`: Z GitHub Developer Settings
- `GITHUB_CLIENT_SECRET`: Z GitHub Developer Settings
- `GOOGLE_CLIENT_ID`: Z Google Cloud Console
- `GOOGLE_CLIENT_SECRET`: Z Google Cloud Console

#### Baza Danych
- `DATABASE_URL`: Parametry połączenia Supabase (połączenie pulowe)
- `DIRECT_URL`: Bezpośrednie połączenie do bazy (migracje)

#### Usługa E-mail
- `RESEND_API_KEY`: Klucz API z Resend

#### Płatności
- `STRIPE_WEBHOOK_SECRET`: Sekret webhooka Stripe
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Klucz publiczny Stripe
- `STRIPE_SECRET_KEY`: Klucz tajny Stripe

Jeśli, jest potrzeba wytestowania zakupienia wersji premium aplikacji, trzeba wpisać komendę:
```bash
npm run stripe
```

### 4. Uruchomienie Projektu
```bash
npm run dev
```

## Rozwiązywanie Problemów
- Sprawdź poprawność wszystkich kluczy
- Upewnij się, że masz włączone odpowiednie uprawnienia w konsolach usług
- Zweryfikuj wersje oprogramowania

## Uwagi Bezpieczeństwa
- Nie udostępniaj pliku `.env`
- Zachowaj klucze w tajemnicy
- Użyj silnych, unikalnych haseł
