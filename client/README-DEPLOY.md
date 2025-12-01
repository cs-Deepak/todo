# Deploying the frontend (Vercel)

1. In your Vercel project settings, add the environment variable: `VITE_API_URL` and set its value to your backend URL (e.g., `https://todo-backend-steel-six.vercel.app`).
2. Rebuild the frontend after setting the env var (Vite inlines env vars at build time).
3. Make sure the backend CORS whitelist contains the frontend domain (or allow \*.vercel.app/
   by enabling wildcard in server CORS logic). see `server/README-DEPLOY.md` for backend setup.
4. If login is failing on deployed site:
   - Confirm you set `VITE_API_URL` to the backend URL for the frontend deployment and rebuilt.
   - If you created accounts locally and login fails on deployed site, ensure the deployed backend uses the same database or create a test user in deployed DB using the Signup page.
   - Check logs in Vercel/Render for API errors or CORS rejections.
