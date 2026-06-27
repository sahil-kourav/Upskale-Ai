<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F0C29,50:302B63,100:24243e&height=260&section=header&text=UpSkale%20AI&fontSize=70&fontColor=ffffff&animation=twinkling&fontAlignY=35&desc=AI-Powered%20Career%20Preparation%20Platform&descAlignY=58&descSize=20&stroke=2F81F7&strokeWidth=1" width="100%"/>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&pause=1000&color=2F81F7&center=true&vCenter=true&width=700&lines=Analyze+resumes+%2B+job+descriptions+with+AI;Generate+tailored+interview+questions;Practice+with+AI-powered+mock+interviews;Track+your+progress+with+detailed+reports" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-2F81F7?style=for-the-badge" />
  <img src="https://img.shields.io/badge/license-MIT-302B63?style=for-the-badge" />
  <img src="https://img.shields.io/github/stars/sahil-kourav/upskale-ai?style=for-the-badge&color=24243e" />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## 📖 About

**UpSkale AI** is an AI-powered career preparation platform. Users upload their
resume, a job description, and a short self-description — the platform uses
**Google Gemini** to analyze all three and generate a tailored interview-prep
report. A separate AI mock interview system, powered by **OpenRouter**, runs
realistic timed practice interviews and scores performance in detail.

---

## ✨ Features

| | |
|---|---|
| 🧠 **AI Resume & JD Analysis** | Gemini analyzes your resume, job description, and profile together |
| 🎯 **Resume-to-JD Match Score** | Instantly see how well your resume aligns with the target role |
| 📊 **Skill Gap Analysis** | Identifies exactly what skills are missing for the role |
| 🗺️ **Preparation Roadmap** | Step-by-step personalized plan to close those gaps |
| 📄 **ATS-Friendly Resume** | Auto-generates a resume formatted to pass automated screening |
| 🎤 **AI Mock Interviews** | Timed questions across 3 difficulty levels, powered by OpenRouter |
| 📈 **Performance Dashboard** | Scores communication, correctness, and confidence per session |
| 💬 **Per-Question Feedback** | Strengths, improvement areas, and example answers for each question |
| 🧾 **Downloadable PDF Reports** | Generated with Puppeteer for offline review |
| 🕓 **Interview History** | All past sessions and reports saved and viewable anytime |
| 💳 **Credit-Based Usage** | Free starter credits, with Razorpay integration to purchase more |

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,js&theme=dark" />
</p>

| Layer | Tools |
|---|---|
| **Frontend** | React.js |
| **Backend** | Node.js, Express.js, REST APIs |
| **Database** | MongoDB |
| **AI / GenAI** | Google Gemini, OpenRouter |
| **Auth** | JWT |
| **Payments** | Razorpay |
| **Reports** | Puppeteer (PDF generation) |
| **Deployment** | Vercel (frontend), Render (backend) |

---

## 🧩 Architecture

```mermaid
flowchart LR
    U[User] --> FE[React Frontend]
    FE --> API[Express REST API]
    API --> AUTH[Auth Service - JWT]
    API --> ANALYSIS[Resume / JD Analysis - Gemini]
    API --> MOCK[Mock Interview Service - OpenRouter]
    API --> REPORT[PDF Report Generator - Puppeteer]
    API --> CREDIT[Credit & Payment Service - Razorpay]
    API --> DB[(MongoDB)]
    ANALYSIS --> DB
    MOCK --> DB
    REPORT --> DB
    CREDIT --> DB
```

*(This diagram renders natively on GitHub — no extra image needed.)*

---

## 🖼️ Screenshots

<p align="center">
  <img src="https://res.cloudinary.com/djmvmlwsg/image/upload/v1782376144/Screenshot_2026-06-25_135536_hgi6g7.png" width="45%" />
  <img src="https://res.cloudinary.com/djmvmlwsg/image/upload/v1782376144/Screenshot_2026-06-25_135523_nzhbjp.png" width="45%" />
  <img src="https://res.cloudinary.com/djmvmlwsg/image/upload/v1782376144/Screenshot_2026-06-25_135558_rc6f7e.png" width="45%" />
  <img src="https://res.cloudinary.com/djmvmlwsg/image/upload/v1782376145/Screenshot_2026-06-25_135717_zuwxd0.png" width="45%" />
</p>

---

## 🗺️ Roadmap

- [x] AI resume + JD analysis with Gemini
- [x] AI mock interview system with OpenRouter
- [x] Credit-based usage with Razorpay
- [x] PDF report generation + interview history
- [ ] Improve mock interview answer accuracy
- [ ] Add more interview role templates
- [ ] Add testing & observability

---

## 📫 Contact

<p align="center">
  <a href="https://linkedin.com/in/sahilkourav"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
  <a href="mailto:sahilkourav02@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302B63,100:0F0C29&height=120&section=footer&animation=twinkling" width="100%"/>
