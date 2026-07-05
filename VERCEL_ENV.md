# Vercel deployment

## 0. Vercel project settings (fixes the 404 landing page)

TanStack Start uses Nitro. By default this project builds for Cloudflare, which is why Vercel serves a 404. A `vercel.json` is now committed that forces the Vercel Nitro preset:

```json
{ "buildCommand": "NITRO_PRESET=vercel npm run build", "framework": null }
```

In the Vercel dashboard → **Project → Settings → General**:
- **Framework Preset**: Other
- **Build Command**: leave blank (uses `vercel.json`) or set `NITRO_PRESET=vercel npm run build`
- **Output Directory**: leave blank (Nitro's Vercel preset writes to `.vercel/output` automatically)
- **Install Command**: `npm install`
- **Node.js Version**: 20.x or later

After changing, **Redeploy** (don't just refresh — a rebuild is required).

---

## Google Sheets service account


The enquiry form writes to a Google Sheet using a Google service account and
Web Crypto (works on Vercel Edge, Node, and Cloudflare runtimes).

## 1. Create a service account

1. Go to https://console.cloud.google.com/ → create/select a project.
2. Enable **Google Sheets API** (APIs & Services → Library).
3. APIs & Services → **Credentials** → *Create credentials* → *Service account*.
4. Open the service account → **Keys** → *Add key* → *JSON*. Download the file.

From the JSON you need:
- `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key`  → `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

## 2. Create the sheet and share it

1. Create a new Google Sheet (any name).
2. Rename the first tab to `Enquiries` (or set `GOOGLE_SHEET_TAB`).
3. Click **Share** → paste the service account email → give **Editor** access.
4. Copy the sheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/<THIS_IS_THE_ID>/edit`

## 3. Environment variables (Vercel → Project → Settings → Environment Variables)

| Name | Value |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `...@...iam.gserviceaccount.com` |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Full `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n` value. Paste it exactly as-is from the JSON (with the literal `\n` sequences); the code decodes them. |
| `GOOGLE_SHEET_ID` | The ID from the sheet URL |
| `GOOGLE_SHEET_TAB` | *(optional)* Tab name. Default `Enquiries` |

If you also use Lovable Cloud (Supabase) features, add:

| Name | Where to find it |
|---|---|
| `VITE_SUPABASE_URL` | Lovable Cloud → Supabase → Project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase → Project Settings → API → publishable/anon key |
| `SUPABASE_URL` | same as above (server) |
| `SUPABASE_PUBLISHABLE_KEY` | same as above (server) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → API → service_role (server only, keep secret) |

## Notes

- The header row is written automatically on first submission.
- No Lovable connector keys are needed anymore.
