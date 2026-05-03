# GrowWise AI 🚀
### Your Premium AI-Powered Financial Command Center

GrowWise AI is a sophisticated, full-stack financial tracking platform designed for the modern user. Combining sleek, high-fidelity design with the power of Google Gemini AI, it transforms raw financial data into actionable insights and personalized investment strategies.

---

## ✨ Key Features

### 📊 Intelligence Dashboard
- **Real-Time Overview**: Get a bird's-eye view of your net balance, total income, and expenditures.
- **Dynamic Visualization**: Beautiful, responsive charts showing your spending trends and category-wise breakdowns.
- **Live Market Ticker**: Stay updated with a real-time scrolling marquee of global market indices and top assets.

### 🤖 AI Financial Command Center
- **Personalized Chat Session**: Chat directly with "GrowWise AI," a Gemini-powered financial assistant that understands your specific budget, goals, and transaction history.
- **Smart Investment Advisor**: One-click generation of personalized, low-to-medium risk investment suggestions (Index Funds, ETFs, Bonds) tailored to your current savings rate.
- **Hybrid Intelligent Fallback**: A proprietary fallback system that ensures the advisor is always available, even during AI API peak hours.
- **Automated Categorization**: AI-driven categorization for your transactions to keep your books perfectly organized.

### 🌓 Premium User Experience
- **Hyper-Glass Aesthetic**: A stunning, modern UI built with high-fidelity glassmorphism, vibrant gradients, and smooth micro-animations.
- **Full Theme Support**: Seamlessly switch between a crisp Light Mode and a deep, eye-friendly Dark Mode.
- **Mobile & Tablet Optimized**: A fully responsive layout that works perfectly on everything from wide monitors to pocket-sized smartphones.
- **Interactive Profile Management**: Sleek user profile dropdown with quick access to account details and settings.

### 🔒 Enterprise-Grade Security
- **Cookie-Based Authentication**: Secure JWT token storage using browser cookies, following industry best practices for session management.
- **Protected Routes**: Automatic redirection for unauthenticated users and smart protection to prevent logged-in users from accessing auth pages.
- **Secure Data Handling**: Backend-side context optimization to ensure only necessary financial data is processed by AI models.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend** | Next.js 15 (App Router), Tailwind CSS v4, Framer Motion, Lucide React, Recharts |
| **Backend** | Node.js, Express.js, Mongoose (MongoDB) |
| **Artificial Intelligence** | Google Gemini API (2.0 Flash / Pro), Custom Fallback Logic |
| **Authentication** | JSON Web Tokens (JWT), Browser Cookies |
| **State Management** | React Hooks, Context API, `next-themes` |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Google Gemini API Key

### 2. Backend Installation
1. Navigate to the `backend` directory.
2. Install dependencies: `npm install`
3. Configure your `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_google_ai_key
   ```
4. Start the server: `npm run dev`

### 3. Frontend Installation
1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`
3. Start the Next.js app: `npm run dev`
4. Access the app at `http://localhost:3000`

---

## 📱 Visual Highlights
- **Prism Backgrounds**: Vibrant, animated backgrounds that feel alive.
- **Adaptive Layouts**: Smart sidebars that transform into mobile-friendly navigation menus.
- **Smooth Transitions**: Framer Motion powered transitions for a fluid app experience.

---

*Built with ❤️ for a smarter financial future.*
