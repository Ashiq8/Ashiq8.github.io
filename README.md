# Syed Ashique Y — Professional AI/ML Engineer Portfolio

A modern, high-performance, responsive portfolio website built with clean HTML5, CSS3, and vanilla JavaScript. Designed specifically for showcasing machine learning, deep learning, computer vision, generative AI, and agentic workflows to recruiters and engineering teams.

---

## 🌟 Visual Identity & Key Enhancements
- **Color Scheme**: Deep Space Obsidian (`#070b14`) & Navy (`#0c1322`) with Electric Blue (`#38bdf8`), Violet (`#8b5cf6`), and Emerald (`#10b981`) accents.
- **Typography**: Inter (UI font) paired with JetBrains Mono (tech badges & code elements).
- **Hero Section**:
  - Direct **"Download Resume"** button linking to `assets/Syed_Ashique_Resume.pdf`.
  - Professional tagline and concise summary.
  - Active links to GitHub ([github.com/Ashiq8](https://github.com/Ashiq8)) and LinkedIn ([linkedin.com/in/syedash-68a9228](https://www.linkedin.com/in/syedash-68a9228)).
- **About Section**:
  - Concise, easy to scan structure with three core focus pillars:
    1. *Deep Learning & Computer Vision*
    2. *Generative AI & Agentic Systems*
    3. *Data-Driven Software*
  - Academic snapshot: B.Tech in Artificial Intelligence & Data Science at St. Joseph's Institute of Technology, Chennai (CGPA: 8.3).
  - Career objective callout.
- **Skills Section**:
  - Structured cleanly into 3 realistic, unexaggerated tiers:
    - **Hands-on Proficiencies** (Core production/project tools: Python, SQL, PyTorch, U-Net++, MCP, FastMCP, Playwright, etc.)
    - **Familiar & Applied** (Working knowledge: TensorFlow, Keras, Pandas, NumPy, TypeScript, React, Flask, etc.)
    - **Currently Learning** (Active research: LangGraph.js, Hybrid RAG, SmolVLM, Azure AI Fundamentals)
- **Detailed Project Views**:
  - In-depth expandable case studies on each project card:
    - **Explainable Wildfire Segmentation (PEP Project)**: Benchmark comparison on FLAME dataset (2,003 pairs) with **0.8009 test IoU** and **0.8891 Dice score** on U-Net++, Grad-CAM, and SmolVLM-500M.
    - **Brain Tumor Detection using MRI**: CNN classification with DICOM/NIfTI medical preprocessing.
    - **SpeakQL (Speech-to-SQL)**: Voice queries translated to SQLite statements via Flask API.
    - **MCP Browser Debug Server**: Developed during AI Engineering Internship at Altosyn Technologies (Dec 2025 - Jan 2026) using FastMCP and Playwright.
- **Contact Section**:
  - Real email: `syedaash740@gmail.com`
  - Phone: `+91 8110890749`
  - Functional contact form: Ready for **Formspree** (replace `YOUR_FORMSPREE_ID` with your Formspree endpoint) with built-in instant fallback to pre-filled `mailto:` drafts so messages are never lost!
  - 1-click **Copy Email** button with floating toast notification.
- **Navigation & Scrolling**:
  - Fixed active navigation indicator for both desktop and mobile drawers.
  - `scroll-margin-top` applied to all section headings so fixed navbar never hides titles.

---

## 📁 Repository Structure

```
Syed_portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── assets/
│   ├── project-wildfire.svg      # Visual architecture graphic for Wildfire Segmentation
│   ├── project-brain-tumor.svg   # Visual architecture graphic for Brain Tumor Detection
│   ├── project-speakql.svg       # Visual architecture graphic for SpeakQL Speech-to-SQL
│   ├── project-mcp.svg           # Visual architecture graphic for MCP Browser Debug Server
│   └── Syed_Ashique_Resume.pdf   # Printable / downloadable resume file
├── favicon.svg                   # Custom monogram 'SA' SVG favicon
├── index.html                    # Semantic HTML5 markup, SEO & Schema.org JSON-LD
├── style.css                     # Complete responsive design tokens & styling
├── script.js                     # Mobile drawer, scroll spy, case study accordions, Formspree & copy email
├── .gitignore                    # Standard repository exclusions
└── README.md                     # Documentation & deployment guide
```

---

## 🚀 Running the Website Locally

### Method 1: Local Server (Already running on port 8000)
Open your browser and navigate to:
```
http://localhost:8000
```

### Method 2: Python Command
If you ever restart the server manually:
```bash
python -m http.server 8000
```

---

## 🛠️ How to Customize & Update Content

### 1. Replacing Project Screenshots
1. Add your screenshot image file (PNG/JPG) into `assets/` (e.g. `assets/wildfire-demo.png`).
2. In `index.html`, find the corresponding project `<img>` tag and update `src`:
   ```html
   <img src="assets/wildfire-demo.png" alt="Wildfire Segmentation UI" class="project-image" loading="lazy">
   ```

### 2. Updating Formspree Form ID
1. Create a free form at [Formspree.io](https://formspree.io).
2. Copy your form endpoint (e.g., `https://formspree.io/f/mqkvnxyz`).
3. In `index.html` (approx line 520), replace `YOUR_FORMSPREE_ID`:
   ```html
   <form action="https://formspree.io/f/mqkvnxyz" method="POST" class="contact-form" id="contact-form" novalidate>
   ```

### 3. Replacing Your Resume PDF
Whenever you update your resume, simply replace `assets/Syed_Ashique_Resume.pdf` with your updated PDF file while keeping the same file name.

---

## 🌐 Deploying to GitHub Pages

1. Push your repository to GitHub (`https://github.com/Ashiq8/Ashiq8.github.io` or `https://github.com/Ashiq8/portfolio`):
   ```bash
   git init
   git add .
   git commit -m "feat: updated portfolio with case studies and resume"
   git branch -M main
   git remote add origin https://github.com/Ashiq8/Ashiq8.github.io.git
   git push -u origin main
   ```
2. In GitHub repository **Settings > Pages > Build and deployment > Source**, choose **GitHub Actions**.
3. The included `.github/workflows/deploy.yml` pipeline will automatically build and publish your site!
