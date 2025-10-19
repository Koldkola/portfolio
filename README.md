# Colorful Portfolio with AI Chatbot

A colorful, responsive static portfolio website with an integrated AI chatbot. Includes a small Express server to proxy requests to OpenAI (optional).

Getting started (PowerShell):

```powershell
# install dependencies
npm install

# set your OpenAI key (optional)
$env:OPENAI_API_KEY = "sk-..."

# start dev server
npm start
```

Pages:
- index.html — Home/hero, featured projects
- projects.html — Projects listing
- contact.html — Contact form

Notes:
- If you don't provide an OpenAI key, the chatbot falls back to a small local bot with canned responses.
- Deploy static frontend to Netlify, Vercel, or GitHub Pages. Server can be deployed to Heroku or Render.

Local development notes:

- The Express server serves the static files from `/public` and exposes a POST `/api/chat` endpoint that proxies to OpenAI if `OPENAI_API_KEY` is set.
- To use the real AI chatbot, set `OPENAI_API_KEY` in your environment before running `npm start`.
- For quick local testing without an API key, the chatbot responds with canned replies.

Important: run `npm install` in the project root before starting the server so required Node packages (express, axios, cors) are installed.

Optional improvements:

- Add authentication and rate-limiting to the `/api/chat` endpoint before deploying.
- Add project detail pages and real images or case studies.
- Improve accessibility and add unit tests.

Deploying to Vercel
-------------------

This project is ready for deployment to Vercel. The static files in `public/` will be served automatically. The serverless API endpoint is available at `/api/chat` using the Vercel Serverless Functions folder `api/`.

Steps to deploy:

1. Install the Vercel CLI (optional for local deployment):

```powershell
npm install -g vercel
```

2. Log in and deploy:

```powershell
vercel login
vercel
# or for a production deploy
vercel --prod
```

3. Add environment variables (in the Vercel dashboard) if you want the AI to use OpenAI:

- Environment variable: `OPENAI_API_KEY` — your OpenAI API key

Notes:
- If `OPENAI_API_KEY` is not set, the `/api/chat` endpoint returns canned/local replies.
- If you prefer to use a custom server (Express) instead of Vercel functions, deploy the project to a server (Render, Heroku) and update `chat.js` fetch URL accordingly.

Local development vs Vercel
---------------------------

- For local development, run `npm install` and `npm start` to use the included `server.js` Express server.
- For Vercel deployment, the serverless function at `api/chat.js` will handle chat requests; you can remove `server.js` from production deployment if you prefer pure serverless.
