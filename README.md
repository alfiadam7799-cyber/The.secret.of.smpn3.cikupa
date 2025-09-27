# The Secret of SMPN 3 Cikupa
Node.js + Express + MongoDB project (ready for hosting).

## What this project includes
- Express server with EJS views
- MongoDB (Mongoose) for storing uploads metadata and users
- Multer for file upload (files saved to `uploads/`)
- Admin login and dashboard (seeded from .env on first run)
- Upload page requires password: `hutao cantik`
- "Rahasia" (secret) page shows uploaded images (you can add 10+)

## Setup (on your server)
1. Upload project files to your server.
2. Make a `.env` file at project root using `.env.example` and fill values:
   - `MONGODB_URI` : your MongoDB connection string (mongodb+srv://...)
   - `ADMIN_EMAIL` : admin email (e.g. alfiadam7799@gmail.com)
   - `ADMIN_PASS`  : admin password (e.g. hutao123)
   - `SESSION_SECRET` : any secret string for sessions
3. Install dependencies:
   ```
   npm install
   ```
4. Start the app:
   ```
   npm start
   ```
5. Visit the site (e.g. http://your-server:PORT/). Default port is 3000.

## Notes
- Uploaded files are stored in `uploads/` and referenced in MongoDB.
- For production, consider using cloud storage (S3) and HTTPS.
- Replace the placeholder styles in `public/css/style.css` to match your "YouTube + blood" theme.

