# 🛡️ CyberPath Academy

**Empowering Every Child and Beginner to Become a Cyber Defender.**

CyberPath Academy is a completely free, gamified, high-fidelity cybersecurity education platform built to bridge the digital learning divide. It introduces beginners and underprivileged students worldwide to computer fundamentals, network communication, Linux commands, web application security, defensive cyber-attack education, and industry-grade security tools.

---

## 🚀 Key Features

1. **Structured Learning Roadmap**: Interactive visual roadmap tracking 8 sequential career modules:
   - **Path 1**: Computer Fundamentals
   - **Path 2**: Networking Fundamentals
   - **Path 3**: Linux Fundamentals
   - **Path 4**: Cybersecurity Fundamentals
   - **Path 5**: Web Security
   - **Path 6**: Ethical Hacking Fundamentals
   - **Path 7**: Cyber Attacks Education (Defensive and Ethical)
   - **Path 8**: Security Tools Introduction

2. **In-Browser Terminal Laboratories**:
   - 💻 **Linux CLI Challenge**: Navigate directory structures, update privileges with `chmod`, and locate configuration flags.
   - 🔌 **ICMP Ping & Traceroute**: Issue echo requests and visually trace packet hops between client and ISP nodes.
   - 🔍 **Wireshark Packet Dissector**: Dissect captured hex payloads to isolate security leaks.
   - 🛡️ **SQL Injection Sandbox**: Formulate logic bypass statements and watch the visual SQL queries evaluate.
   - ⚠️ **XSS Social Feed**: Inject script tags, observe browser alert responses, and study cookie theft.
   - 🛠️ **Burp Suite Interceptor**: Modify cookie header parameters (`role=user` → `role=admin`) in a proxy panel to gain access.

3. **Gamification & Progress System**:
   - **XP and Levels**: Pass lessons (+50 XP), solve labs (+100-250 XP), and level up automatically.
   - **Achievements Grid**: Unlock specific badges for learning milestones.
   - **Streak Monitor**: Track active login days.
   - **SVG Certificate Generator**: Dynamically compile verified graduation certificates containing student cnames, downloadable as scalable vector graphics (`.svg`) or printable.

4. **Community Collaboration**:
   - Discuss lessons, post replies, and ask questions.
   - Click "Ask a Mentor" to receive simulated professional advisory feedback.

5. **Administrator Panel**:
   - Review registered student progression logs.
   - Download student progress reports as spreadsheet CSV files.
   - Compile new custom learning paths and append custom lesson modules/quizzes.

---

## 📂 Codebase Layout

```
CyberPath Academy/
├── index.html                   # SPA main grid layout, modals, and container shells
├── README.md                    # Project documentation
├── css/
│   ├── styles.css               # Core variables, grids, layout structure, and grid animations
│   └── components.css           # Component layouts for dashboards, roadmaps, and terminals
└── js/
    ├── state.js                 # LocalStorage persistence, levels/XP math, paths dataset
    ├── router.js                # Hashchange routing listeners and guest route guards
    ├── ui.js                    # Avatar details, toast notifications, SVG certificates
    └── components/
        ├── auth.js              # Login and registration templates
        ├── dashboard.js         # Student analytics details and leaderboard ranks
        ├── courses.js           # Roadmap nodes lists and unified lesson viewer
        ├── quiz.js              # Multiple choice examination engine
        ├── labs.js              # Sandbox terminals and packet analyzer frames
        ├── forum.js             # Discussion threads list and reply forms
        └── admin.js             # CSV exports and course compiler inputs
```

---

## 💻 Running the Sandbox Locally

The application runs purely in the client-side browser with **zero external compiler dependencies, servers, or installations**:
1. Clone or download this repository.
2. Double-click the file `index.html` or drag it into any modern web browser (Chrome, Edge, Firefox, Safari).
3. Register a student defender username to begin!

---

## 🌐 Deploying to GitHub Pages

To host this platform online for free:
1. Open the repository settings on **GitHub**.
2. Select the **Pages** tab on the left navigation menu.
3. Under **Build and deployment**, select **Deploy from a branch** as the source.
4. Set the branch to `main` and path to `/ (root)`, then click **Save**.
5. Your application will be live at `https://<your-username>.github.io/CyberPath-Academy/` within minutes.

---

## ⚠️ Defensive & Academic Warning
*CyberPath Academy materials are built strictly for defensive and ethical academic research purposes. Port scanning, exploiting vulnerabilities, or capturing traffic on network assets without explicit owner authorization is illegal.*
