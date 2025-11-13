# SkillBridge

SkillBridge is a MERN stack application that connects users' skills with job opportunities and learning resources. The platform provides rule-based matching for jobs and resources, with placeholders for future AI-powered features.

## Project Overview

SkillBridge helps users discover career opportunities and learning resources based on their skills and preferences. The platform features user authentication, profile management, job listings, learning resources, and a personalized dashboard with recommendations. 

## Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Deployment**: Render

## Local Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SkillBridge
   ```

2. **Setup Backend**

   Navigate to the server directory:
   ```bash
   cd server
   ```

   Install dependencies:
   ```bash
   npm install
   ```

   (If you pulled only the new files) install the AI helpers:
   ```bash
   npm install multer pdf-parse pdfkit nodemailer
   ```

   Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/skillbridge
   JWT_SECRET=supersecret_jwt_key_change_in_production
   PORT=4000
   NODE_ENV=development
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your-smtp-user
   SMTP_PASS=your-smtp-password
   RESUME_PARSER_KEY=replace-with-api-key-if-needed
   ```

   For MongoDB Atlas, use:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/skillbridge
   ```

3. **Setup Frontend**

   Navigate to the client directory:
   ```bash
   cd ../client
   ```

   Install dependencies:
   ```bash
   npm install
   ```

   Create a `.env` file in the `client` directory (optional for local dev):
   ```env
   VITE_API_URL=http://localhost:4000
   ```

4. **Seed the Database**

   From the project root:
   ```bash
   cd server
   node scripts/seed.js
   ```

   This will create:
   - 1 demo user (email: `test@example.com`, password: `password123`)
   - 18 job entries
   - 21 learning resources

### Running the Application

**Option 1: Run separately (recommended for development)**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

**Option 2: Use concurrently (if installed globally)**

From project root:
```bash
npm install -g concurrently
concurrently "cd server && npm run dev" "cd client && npm run dev"
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

### Demo User Credentials

After seeding, you can login with:
- **Email**: `test@example.com`
- **Password**: `password123`

## Resource Illustration Prompts

Use the following prompts (each includes a bottom-right CTA button with a white cursor) when generating placeholder illustrations for resource cards:

1. Programming Hero – Complete Web Development Course  
   Create a modern vector illustration representing full-stack web development for the platform “Programming Hero”. Include JavaScript, MERN stack symbols, browser windows, and code blocks. Use a vibrant gradient background inspired by Programming Hero’s blue/purple/pink theme. Add a rounded CTA-style button at the bottom-right with a white cursor hovering over it. No text.
2. AWS Cloud Practitioner  
   Create a modern vector illustration representing AWS Cloud Practitioner. Include cloud servers, AWS-style orange accents, and cloud icons. Use a blue-purple gradient background. Add a small rounded button at the bottom-right with a white cursor hovering over it. No text.
3. Advanced React Patterns  
   Create a clean vector illustration representing advanced React development. Include the React atom, UI components, and code blocks. Soft blue-purple gradient background. Add a rounded interactive button at the bottom-right with a white cursor hovering over it. No text.
4. Communication Skills Workshop  
   Create a friendly vector illustration showing communication and teamwork. Include chat bubbles and two people talking. Soft gradient background. Add a rounded CTA-style button at the bottom-right with a white cursor hovering over it. No text.
5. Complete React Developer Course (Udemy)  
   Create a modern vector illustration for React development. Include the React logo, code snippets, and abstract UI shapes. Blue and purple gradient background. Include a rounded button at the bottom-right with a white mouse cursor hovering on it. No text.
6. Digital Marketing Essentials (Google)  
   Create a flat vector illustration representing digital marketing. Include SEO icons, charts, megaphone, and marketing symbols. Add a bottom-right rounded button with a white cursor hovering over it. No text.
7. Docker & Containerization  
   Create a modern vector illustration for Docker and containerization. Include container blocks, Docker whale elements, and DevOps icons. Blue gradient background. Add a rounded button bottom-right with a white cursor hovering on it. No text.
8. Express.js API Development  
   Create a vector illustration representing Express.js APIs. Include servers, REST API icons, and JS-inspired shapes. Gradient background. Add a CTA button bottom-right with a white cursor hovering over it. No text.
9. Full Stack Development Bootcamp (Odin Project)  
   Create a modern illustration representing full stack web development. Include browser windows, server icons, and MERN shapes. Gradient background with soft depth. Add a rounded button bottom-right with a white cursor hovering. No text.
10. Git & Version Control  
    Create a vector illustration for Git and version control. Include branching diagrams, commit icons, and repository visuals. Orange-blue gradient background. Add a rounded button bottom-right with a white cursor hovering. No text.
11. GraphQL API Development  
    Create a minimal vector illustration for GraphQL development. Include the GraphQL geometric logo, linked nodes, and API visuals. Soft gradient background. Add a rounded button at bottom-right with a white cursor hovering. No text.
12. HTML & CSS Basics  
    Create a vector illustration for HTML and CSS. Include a browser window, layout grid, and styling blocks. Light gradient background. Add a bottom-right rounded button with a white cursor hovering. No text.
13. JavaScript: The Complete Guide  
    Create a modern vector illustration representing JavaScript learning. Include JS icons, brackets, and code visuals. Yellow-blue gradient background. Add a rounded CTA button bottom-right with a white cursor hovering. No text.
14. MongoDB University  
    Create a vector illustration for MongoDB learning. Include green database icons, leaf symbol, and NoSQL shapes. Green-blue gradient background. Add a rounded button bottom-right with a white cursor hovering. No text.
15. Node.js Masterclass  
    Create a clean illustration representing Node.js backend development. Include Node.js hexagon, server icons, and Express symbols. Green-blue gradient background. Add a rounded button bottom-right with a white cursor hovering. No text.
16. Python for Data Science  
    Create a modern data-science themed vector illustration. Include Python colors, charts, graphs, and data visuals. Soft gradient background. Add a rounded button bottom-right with a white cursor hovering. No text.
17. SQL Fundamentals  
    Create a vector illustration representing SQL databases. Include stacked database icons, tables, and query diagrams. Blue gradient background. Add a rounded interactive button at bottom-right with a white cursor hovering. No text.
18. Testing with Jest  
    Create a flat illustration for Jest testing. Include checkmarks, code snippets, and red accents. Soft gradient background. Add a rounded button bottom-right with a white cursor hovering. No text.
19. TypeScript for JavaScript Developers  
    Create a vector illustration representing TypeScript. Include TS-inspired blocks, typing icons, and code shapes. Blue gradient background. Add a bottom-right rounded button with a white cursor hovering. No text.
20. UI/UX Design Principles  
    Create a modern illustration for UI/UX design. Include wireframes, UI cards, and design shapes. Purple-blue gradient background. Add a rounded CTA button at the bottom-right with a white cursor hovering. No text.
21. Web Accessibility (a11y)  
    Create a clean vector illustration representing web accessibility. Include accessibility icons, inclusive design shapes, and universal interface symbols. Soft gradient background. Add a rounded button at the bottom-right with a white cursor hovering. No text.

## Build & Deploy to Render

### Prerequisites for Render

1. GitHub repository with the code
2. MongoDB Atlas account (or Render MongoDB)
3. Render account

### Deployment Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy Backend Service**

   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `skillbridge-backend`
     - **Root Directory**: `server`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment Variables**:
       - `MONGO_URI`: Your MongoDB connection string
       - `JWT_SECRET`: A secure random string
       - `NODE_ENV`: `production`
       - `PORT`: `4000` (or leave default)

3. **Deploy Frontend (Static Site)**

   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Configure the site:
     - **Name**: `skillbridge-frontend`
     - **Root Directory**: `client`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `client/dist`
     - **Environment Variables**:
       - `VITE_API_URL`: Your backend service URL (e.g., `https://skillbridge-backend.onrender.com`)

4. **Update Frontend API URL**

   After backend is deployed, update the frontend environment variable:
   - Go to your frontend service settings
   - Add/Update `VITE_API_URL` with your backend URL
   - Redeploy the frontend

5. **Alternative: Use render.yaml**

   If you prefer using `render.yaml`:
   - Push the `render.yaml` file to your repository
   - In Render, go to "New +" → "Blueprint"
   - Connect your repository
   - Render will automatically detect and configure services from `render.yaml`
   - Make sure to set environment variables in the Render dashboard

### Post-Deployment

1. **Seed Production Database** (optional)

   You can seed the production database by calling the seed endpoint:
   ```bash
   curl -X POST https://your-backend-url.onrender.com/api/seed
   ```

   **Note**: Consider protecting this endpoint in production or removing it after seeding.

2. **Verify Deployment**

   - Visit your frontend URL
   - Test login with demo credentials
   - Verify API endpoints are accessible

## Project Structure

```
SkillBridge/
├── server/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # Express routes
│   │   ├── middleware/     # Auth middleware
│   │   ├── services/        # Business logic
│   │   │   ├── ai/         # AI service placeholders (Part 2)
│   │   │   └── n8n/        # n8n webhook handlers (Part 2)
│   │   └── index.js        # Express app entry
│   ├── scripts/
│   │   └── seed.js         # Database seed script
│   ├── package.json
│   └── .env.example
├── client/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context (Auth)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── render.yaml              # Render deployment config
├── .gitignore
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User Profile
- `GET /api/users/me` - Get current user profile (auth required)
- `PUT /api/users/me` - Update user profile (auth required)

### Jobs
- `GET /api/jobs` - List jobs (supports query params: search, location, jobType, skill, page, limit)
- `GET /api/jobs/:id` - Get job details

### Resources
- `GET /api/resources` - List resources (supports query params: search, platform, costType, skill, page, limit)

### Dashboard
- `GET /api/dashboard/recommendations` - Get personalized recommendations (auth required)

### AI (Part 2 - Placeholders)
- `POST /api/ai/parse-resume` - Resume parsing (returns 501/mock)

### Webhooks (Part 2 - Placeholders)
- `POST /api/webhooks/n8n` - n8n webhook handler

### AI & Automation (New)
- `POST /api/parse-resume` — Upload PDF resume and extract skills using keyword matching
- `GET /api/recommendations?skills=react,html` — Rule-based job scoring with explainability
- `POST /api/generate-questions` — Generate five interview Q&A pairs for a role
- `POST /api/issue-certificate` — Create PDF micro-certificate and return public URL

### Development
- `POST /api/seed` - Seed database (dev only)

## Part 2 Integration Points

The following files and routes are prepared for Part 2 AI and n8n integration:

### AI Services
- `server/src/services/ai/resumeParser.js` - Resume parsing with OpenAI/ML
- `server/src/services/ai/jobMatcher.js` - AI-powered job matching
- `server/src/routes/ai.js` - AI API routes
- `server/src/routes/parseResume.js` - PDF parsing entry point
- `server/src/routes/recommendations.js` - Rule/embedding hybrid recommendation API
- `server/src/routes/questions.js` - Interview question generator
- `server/src/routes/certificate.js` - Micro-certificate issuance
- `server/mcp/certificateGenerator.js` - PDFKit certificate helper (drops files in `public/certs`)

### n8n Integration
- `server/src/services/n8n/webhookHandler.js` - n8n webhook processing
- `server/src/routes/webhooks.js` - Webhook routes

### TODO Comments
All placeholder files contain `// TODO: Part 2` comments indicating where to implement:
- OpenAI API integration for resume parsing
- ML models for job matching
- n8n workflow triggers and handlers
- Vector database integration for semantic search

### n8n Quickstart (Docker)
```bash
docker run -it --rm --name n8n \
  -p 5678:5678 \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=user \
  -e N8N_BASIC_AUTH_PASSWORD=pass \
  n8nio/n8n
```

## Features

### Part 1 (Current)
- ✅ User authentication (JWT)
- ✅ User profile management with skills
- ✅ Job listings with filters
- ✅ Learning resources with filters
- ✅ Dashboard with rule-based recommendations
- ✅ Responsive UI with Tailwind CSS
- ✅ Seed script for sample data

### Part 2 (Future)
- 🔜 AI-powered resume parsing
- 🔜 Advanced job matching with ML
- 🔜 n8n automation workflows
- 🔜 Personalized learning paths
- 🔜 Career milestone tracking

## Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/skillbridge
JWT_SECRET=your_secret_key
PORT=4000
NODE_ENV=development
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
RESUME_PARSER_KEY=replace-with-api-key-if-needed
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:4000
```

For production, set `VITE_API_URL` to your deployed backend URL.

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally, or
- Verify MongoDB Atlas connection string is correct
- Check network/firewall settings

### CORS Errors
- Backend has CORS enabled for all origins (development)
- For production, restrict CORS to your frontend domain

### Build Errors
- Ensure Node.js version is 16+
- Delete `node_modules` and reinstall dependencies
- Check for missing environment variables

## Manual API Testing

```bash
# Parse resume (expects resume.pdf in current directory)
curl -F "resume=@resume.pdf" http://localhost:4000/api/parse-resume

# Get explainable recommendations
curl "http://localhost:4000/api/recommendations?skills=react,html"

# Generate interview questions
curl -X POST http://localhost:4000/api/generate-questions \
  -H "Content-Type: application/json" \
  -d '{"jobTitle":"Frontend Developer","skills":["react","javascript","css"]}'

# Issue a micro-certificate
curl -X POST http://localhost:4000/api/issue-certificate \
  -H "Content-Type: application/json" \
  -d '{"userId":"user-001","name":"SkillBridge Learner","courseId":"course-101","courseName":"React Basics"}'
```

## License

This project is part of a hackathon submission.

## Contributing

This is a hackathon project. For Part 2, focus on:
1. Implementing AI services in `server/src/services/ai/`
2. Integrating n8n workflows in `server/src/services/n8n/`
3. Enhancing recommendation algorithms
4. Adding more sophisticated matching logic

---

**Note**: Remember to change `JWT_SECRET` and other sensitive values in production!

