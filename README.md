# Project Installation Guide
## Requirements
- Node.js (18.x or newer)
- npm
- GitHub account (optional)
- Google Cloud Console account (optional)
- Supabase account
- Resend account
- Stripe account
## OAuth Configuration
### GitHub
1. Go to GitHub Developer Settings
2. Create a new OAuth registration
3. Generate Client ID and Client Secret
### Google
1. Go to Google Cloud Console
2. Create a project
3. Configure the OAuth consent screen
4. Generate Credentials
## Installation Steps
### 1. Install Dependencies
```bash
npm install
```
### 2. Generate Prisma
```bash
npx prisma generate
```
- Generates TypeScript types
- Creates Prisma client
- Required before migrations and running the project
### 3. Environment Configuration
Create a `.env` file with the following configurations:
#### Authentication
- `AUTH_TRUST_HOST`: `http://localhost:3000/api/auth/session`
- `AUTH_SECRET`: Generate a random secret (e.g., `openssl rand -hex 32`)
- `GITHUB_CLIENT_ID`: From GitHub Developer Settings
- `GITHUB_CLIENT_SECRET`: From GitHub Developer Settings
- `GOOGLE_CLIENT_ID`: From Google Cloud Console
- `GOOGLE_CLIENT_SECRET`: From Google Cloud Console
#### Database
- `DATABASE_URL`: Supabase connection parameters (pooled connection)
- `DIRECT_URL`: Direct connection to the database (migrations)
#### Email Service
- `RESEND_API_KEY`: API key from Resend
#### Payments
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `STRIPE_SECRET_KEY`: Stripe secret key
If you need to test purchasing the premium version of the application, run the command:
```bash
npm run stripe
```
### 4. Run the Project
```bash
npm run dev
```
## Troubleshooting
- Check the correctness of all keys
- Make sure you have the appropriate permissions enabled in the service consoles
- Verify software versions
## Security Notes
- Do not share the `.env` file
- Keep keys confidential
- Use strong, unique passwords
