# prue.io

Scott Prue's personal site. A single static page served by a Cloudflare Worker, with a contact
form that sends email through [Cloudflare Email Sending](https://developers.cloudflare.com/email-service/).

No framework, no build step: plain HTML/CSS in `public/`, one Worker (`src/worker.ts`) that
serves the static assets and handles `POST /api/contact`.

## Develop

```sh
npm install
npm run dev        # wrangler dev → http://localhost:8787
npm run check      # typecheck the worker
```

## Deploy

Pushes to `master` deploy via GitHub Actions (`.github/workflows/deploy.yml`).
Repo secrets required:

- `CLOUDFLARE_API_TOKEN` — token with **Workers Scripts: Edit** (and Email Sending access)
- `CLOUDFLARE_ACCOUNT_ID`

Manual deploy: `npm run deploy`.

## One-time domain + email cutover (manual, in consoles)

The site needs the `prue.io` zone on Cloudflare for both the custom domain and the contact
form's `from: contact@prue.io` address. DNS is currently at DNSimple pointing to Firebase
Hosting, with Google MX for mail.

1. **Add the `prue.io` zone** in the Cloudflare dashboard. Before switching nameservers,
   confirm Cloudflare imported all existing DNS records — especially the Google **MX** records
   and any SPF/TXT records — so mail keeps working. The site keeps serving from Firebase
   during propagation.
2. **Switch nameservers** at DNSimple to the two Cloudflare-assigned nameservers. Wait for the
   zone to go active.
3. **Enable Email Sending**: `npx wrangler email sending enable prue.io` (adds DKIM/SPF
   records). Until this is done, the contact form returns a friendly error with a `mailto:`
   fallback — nothing breaks.
4. **Attach the domain to the Worker**: Workers & Pages → `portfolio` → Settings → Domains &
   Routes → add `prue.io` (and `www.prue.io` or a www→apex redirect rule).
5. **Verify**: `curl -sI https://prue.io` serves the new site; submit the contact form and
   confirm the email arrives at prescottprue@gmail.com with a working reply-to.
6. **Decommission Firebase**: remove the custom domain from Firebase Hosting project
   `prue-29a00`, then retire the project once stable.

## Fonts

[General Sans](https://www.fontshare.com/fonts/general-sans) (variable, self-hosted) under the
ITF Free Font License.
