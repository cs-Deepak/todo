# Deployment checklist for server

1. Set required environment variables (e.g., in Vercel/Render project settings):

   - `JWT_SECRET` = a long random string
   - `DATABASE` = MongoDB connection string
   - `CLIENT_URL` = Frontend URL (e.g., https://your-frontend.vercel.app)

2. Do not add `VITE_API_URL` in the server env — frontend uses `VITE_API_URL`.

3. CORS:

   - The server now allows requests from `CLIENT_URL` and from any `*.vercel.app` or `*.onrender.com` origin.
   - If your frontend uses a custom domain, add it explicitly to `CLIENT_URL`.

4. Logging:

   - The server prints login attempts and success statements to help debug authentication flow.
   - View your deployment logs for troubleshooting.

5. Re-deploy backend after updating environment variables.

6. Debugging auth/CORS issues:
   - Use curl to test login directly (replace placeholders):
     ```bash
     curl -X POST $BACKEND_URL/auth/login -H "Content-Type: application/json" -d '{"email":"your@example.com","password":"YourPass"}'
     ```
   - After login, call the /auth/me endpoint with the token to verify it's valid
     ```bash
     curl -H "Authorization: Bearer <token>" $BACKEND_URL/auth/me
     ```
   - If `auth/me` returns 403 or invalid token, make sure your `JWT_SECRET` matches between your deployed backend and any other deployed tokens.
   - Check server logs for `Blocked CORS Origin:` warnings if the frontend can't reach the backend.
