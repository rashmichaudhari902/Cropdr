# 🌾 CropDr. — AI-Powered Crop Disease Detector

> Protecting Harvests. Empowering Farmers. Building Bharat.

CropDr. is a free, AI-powered web platform that helps Indian farmers detect crop diseases instantly — just upload a photo and get a complete diagnosis + treatment plan in under 30 seconds.

---

## 🚨 Problem

- 🇮🇳 146 million farming families in India lack access to agri experts
- 📉 20–40% yield loss every year due to undetected crop diseases
- 💸 ₹50,000 Crore annual losses from late or wrong diagnosis
- 🗣️ Language barriers block most digital agriculture solutions
- ⏰ By the time a farmer identifies a disease, it's already too late

---

## ✅ Our Solution

CropDr. gives every farmer the power of an agricultural expert — in their pocket, in their language, for free.

| Step | What Happens |
|------|-------------|
| 📸 Upload | Take up to 5 crop photos from any angle |
| 🧠 AI Analysis | Disease detected with confidence score & severity level |
| 📋 Get Report | Root cause, affected area %, spread risk |
| 💊 Follow Plan | Day 1 → Day 3 → Day 7 treatment guide |

---

## ✨ Key Features

- 🔬 **Multi-Image Analysis** — Upload 5 images for higher accuracy
- 🌦️ **Weather Risk Alerts** — Predicts disease outbreak before it happens
- 🗓️ **Stage-Wise Treatment Plan** — Day-by-day organic & chemical guide
- 📍 **India-Specific Advice** — Local pesticide brands, govt schemes, Kisan helplines
- 🗣️ **Regional Languages** — Hindi, Marathi, Telugu, Punjabi support
- 🤖 **AI Chatbot 24/7** — Ask anything in plain language
- 📊 **Crop Health Dashboard** — Track scan history, alerts & recovery
- 🔔 **Early Warnings** — Proactive alerts before disease spreads

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Python, Flask |
| AI Engine | Claude Sonnet (Anthropic API) — Vision + NLP |
| Weather | Real-Time Weather API |
| Auth | Google OAuth 2.0 + Email/Password |
| Database | Structured DB — crop scans, user profiles, disease records |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/cropdr.git
cd cropdr

# Install dependencies
npm run install:backend

# Add your API keys in .env
cp .env
[locally run the project if you jus change the api keys in the .env file]
[also do change your API and add during deployment into env variables.]

# Run the app
npm start
```

App will run at `http://localhost:5000`

---

## 🔑 Environment Variables

Create a `.env` file:
