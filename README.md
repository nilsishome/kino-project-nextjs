# kino-project-nextjs
Remaking the Kino - (Västerås) - website in Next.js!

# Testning

## Teststrategi

- **Enhetstester**: Testar hjälpfunktioner som e-postutskick.
- **Integrationstester**: Testar API-routes för registrering, lösenordsåterställning m.m.
- **Mockning** används för externa beroenden (t.ex. Resend).

## Köra tester

1. Installera beroenden:
   ```
   npm install --save-dev jest ts-jest @types/jest node-mocks-http supertest
   ```

2. Lägg till i `package.json`:
   ```json
   "scripts": {
     "test": "jest"
   }
   ```

3. Kör tester:
   ```
   npm run test
   ```

## Testade delar

- **Registrering**: `/api/register`
- **Lösenordsåterställning**: `/api/auth/reset-password`
- **E-postutskick**: `sendVerificationMail`, `sendResetMail`
