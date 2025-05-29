# kino-project-nextjs
Remaking the Kino - (Västerås) - website in Next.js!

## 🧪 Testning

### Testningsstrategi

- **Enhetstester:** Testar hjälpfunktioner, t.ex. e-postutskick.
- **Integrationstester:** Testar API-routes för registrering, lösenordsåterställning och e-postverifiering.
- **Negativa tester:** Säkerställer att felhantering fungerar, t.ex. ogiltig e-post, för kort lösenord, ogiltiga eller utgångna tokens.
- **Mockning:** Externa beroenden som e-posttjänster mockas för att undvika riktiga utskick och beroenden av API-nycklar.
- **Isolerad databas:** Alla integrationstester körs mot en mongodb-memory-server för att inte påverka riktig data.

---

### Testade delar

| Testtyp           | Funktion/Endpoint                        | Filnamn                                 |
|-------------------|------------------------------------------|-----------------------------------------|
| Enhetstest        | Skicka verifieringsmail                  | `sendVerificationMail.test.ts`          |
| Enhetstest        | Skicka reset-mail                        | `verify-email.test.tsx`                 |
| Integrationstest  | Registrering (lyckad)                    | `register.api.test.ts`                  |
| Integrationstest  | Registrering (fel/negativ)               | `register.negative.api.test.ts`         |
| Integrationstest  | Lösenordsåterställning (lyckad)          | `resetPassword.api.test.ts`             |
| Integrationstest  | Lösenordsåterställning (fel/negativ)     | `resetPassword.negative.api.test.ts`    |
| Integrationstest  | E-postverifiering (lyckad/fel)           | `verify-email.api.test.ts`              |

---

### Köra tester

1. **Installera beroenden:**
   ```sh
   npm install
   ```

2. **Kör testerna:**
   ```sh
   npm run test
   ```
   eller
   ```sh
   npx jest
   ```

---

**Alla tester körs automatiskt mot en isolerad testdatabas.