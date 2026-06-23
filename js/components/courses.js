/* ==========================================================================
   CYBERPATH ACADEMY - Courses & Curriculum Rendering
   ========================================================================== */

import { db } from "../state.js";
import { ui } from "../ui.js";

// --- Homepage Renderer ---
export function renderHome() {
    const container = document.getElementById("view-home");
    const user = db.state.currentUser;

    // Fetch live statistics from DB
    const studentCount = db.state.users.filter(u => u.role !== "admin").length + 2480; // Add simulated offset
    const courseCount = db.state.paths.length;
    const labsCount = db.state.paths.reduce((acc, p) => acc + (p.labs ? p.labs.length : 0), 0);
    const certificatesCount = db.state.users.reduce((acc, u) => acc + (u.certificates ? u.certificates.length : 0), 0) + 1240;

    container.innerHTML = `
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-text">
                <h1 class="cyber-title neon-text-blue" style="font-size: 3rem; line-height: 1.1;">
                    CYBERPATH ACADEMY
                </h1>
                <h2 class="neon-text-green" style="font-size: 1.8rem; margin-bottom: 15px;">
                    Learn Cybersecurity for Free
                </h2>
                <p class="hero-subtitle">
                    Empowering underprivileged children, students, and absolute beginners worldwide to become cyber defenders. Master IT basics, networking, Linux, and ethical hacking through structured paths and hands-on labs.
                </p>
                <div class="hero-buttons">
                    ${user ? `
                        <a href="#paths" class="cyber-btn cyber-btn-green"><i class="fa-solid fa-gamepad"></i> Enter Sandbox</a>
                        <a href="#dashboard" class="cyber-btn cyber-btn-blue"><i class="fa-solid fa-user-ninja"></i> Dashboard</a>
                    ` : `
                        <a href="#auth" class="cyber-btn cyber-btn-green"><i class="fa-solid fa-graduation-cap"></i> Start Learning Now</a>
                        <a href="#auth" class="cyber-btn"><i class="fa-solid fa-right-to-bracket"></i> Login</a>
                    `}
                    <button class="cyber-btn cyber-btn-warning" id="btn-donate">
                        <i class="fa-solid fa-hand-holding-dollar"></i> Donate
                    </button>
                    <button class="cyber-btn" id="btn-mentor">
                        <i class="fa-solid fa-chalkboard-user"></i> Become a Mentor
                    </button>
                </div>
            </div>
            <div class="hero-illustration">
                <div class="hacker-hologram">
                    <i class="fa-solid fa-user-shield hologram-icon"></i>
                </div>
            </div>
        </section>

        <!-- Stats Grid -->
        <div class="stat-grid">
            <div class="cyber-card stat-card">
                <div class="stat-number neon-text-blue">${studentCount}+</div>
                <div class="stat-label">Students Enrolled</div>
            </div>
            <div class="cyber-card stat-card">
                <div class="stat-number neon-text-green">${courseCount}</div>
                <div class="stat-label">Learning Paths</div>
            </div>
            <div class="cyber-card stat-card">
                <div class="stat-number neon-text-warning">${labsCount}</div>
                <div class="stat-label">Hands-on Labs</div>
            </div>
            <div class="cyber-card stat-card">
                <div class="stat-number neon-text-blue">${certificatesCount}+</div>
                <div class="stat-label">Graduates Certified</div>
            </div>
        </div>

        <!-- Callouts -->
        <div style="margin-top: 60px; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
            <div class="cyber-card">
                <h3 class="cyber-title-sm"><i class="fa-solid fa-gamepad"></i> Gamified Learning</h3>
                <p>Gain XP points, unlock custom achievements, level up your profile, and earn graduation certificates to show off your new skills.</p>
            </div>
            <div class="cyber-card green-accent">
                <h3 class="cyber-title-sm" style="border-left-color: var(--success);"><i class="fa-solid fa-terminal"></i> In-Browser Terminal Labs</h3>
                <p>Run simulated Linux prompts, packet analyzers, and target injection vulnerabilities in sandboxed safety. Zero software installation required.</p>
            </div>
            <div class="cyber-card">
                <h3 class="cyber-title-sm" style="border-left-color: var(--warning);"><i class="fa-solid fa-earth-americas"></i> 100% Free Forever</h3>
                <p>Founded on the mission to bridge the digital security education divide. No paywalls, no advertisements, no subscriptions. Supported by global donors.</p>
            </div>
        </div>
    `;

    // Hook listeners for static actions
    document.getElementById("btn-donate").addEventListener("click", () => {
        ui.showToast("Thank you for your support! Our mock payment processor is sandboxed, but we appreciate your generosity.", "success");
    });

    document.getElementById("btn-mentor").addEventListener("click", () => {
        ui.showToast("Become a Mentor! Send an application request to mentor@cyberpath.org to guide young students.", "info");
    });
}

// --- Roadmap / Paths Explorer Renderer ---
export function renderPaths() {
    const container = document.getElementById("view-paths");
    const user = db.state.currentUser;
    if (!user) return;

    container.innerHTML = `
        <h1 class="cyber-title neon-text-blue"><i class="fa-solid fa-road"></i> Learning Roadmap</h1>
        <p style="margin-bottom: 30px; max-width: 700px;">
            Progress through our structured syllabus. Complete each node and pass the labs to unlock subsequent levels in your career.
        </p>

        <div class="roadmap-container">
            <div class="roadmap-nodes" id="roadmap-nodes">
                <!-- roadmap items dynamically injected -->
            </div>
        </div>
    `;

    const nodesList = document.getElementById("roadmap-nodes");

    nodesList.innerHTML = db.state.paths.map((path, index) => {
        // Simple Lock Logic: Path N requires Path N-1 completed
        let isLocked = false;
        let completionPercent = 0;
        let isCompleted = false;
        let isInProgress = false;

        const completedLessons = user.completedLessons || [];
        const completedLabs = user.completedLabs || [];

        // Check completion status of previous path
        if (index > 0) {
            const prevPath = db.state.paths[index - 1];
            const prevModulesDone = prevPath.modules.every(mod => completedLessons.includes(mod.id));
            const prevLabsDone = !prevPath.labs || prevPath.labs.every(lab => completedLabs.includes(lab.id));
            if (!prevModulesDone || !prevLabsDone) {
                isLocked = true;
            }
        }

        // Calculate progress for current path
        const pathModules = path.modules;
        const pathLabs = path.labs || [];
        const totalItems = pathModules.length + pathLabs.length;
        
        const doneModules = pathModules.filter(m => completedLessons.includes(m.id)).length;
        const doneLabs = pathLabs.filter(l => completedLabs.includes(l.id)).length;
        
        completionPercent = totalItems > 0 ? Math.floor(((doneModules + doneLabs) / totalItems) * 100) : 0;
        isCompleted = completionPercent === 100;
        isInProgress = completionPercent > 0 && completionPercent < 100;

        // Custom override for first path or developer admins
        if (index === 0 || user.role === "admin") {
            isLocked = false;
        }

        let statusIcon = '<i class="fa-solid fa-lock"></i>';
        if (isCompleted) statusIcon = '<i class="fa-solid fa-check"></i>';
        else if (isInProgress) statusIcon = '<i class="fa-solid fa-spinner fa-spin"></i>';
        else if (!isLocked) statusIcon = '<i class="fa-solid fa-play"></i>';

        return `
            <div class="roadmap-node-wrapper">
                <div class="roadmap-node ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''} ${isInProgress ? 'in-progress' : ''}" 
                     data-id="${path.id}" data-locked="${isLocked}">
                    <div class="node-status-icon">
                        ${statusIcon}
                    </div>
                    <div class="node-info">
                        <h3><i class="fa-solid ${path.icon}"></i> PATH ${index + 1}: ${path.title}</h3>
                        <p>${path.description}</p>
                        ${!isLocked ? `
                            <div class="node-progress-bar-bg">
                                <div class="node-progress-bar-fill" style="width: ${completionPercent}%;"></div>
                            </div>
                            <div style="display:flex; justify-content:space-between; font-size: 0.75rem; margin-top: 5px;">
                                <span>${completionPercent}% Complete</span>
                                <span>${doneModules + doneLabs} / ${totalItems} modules</span>
                            </div>
                        ` : '<span style="font-size:0.8rem; color:var(--error);"><i class="fa-solid fa-ban"></i> Complete previous path to unlock</span>'}
                    </div>
                    <div class="node-xp-badge">
                        +${path.xpReward} XP
                    </div>
                </div>
            </div>
        `;
    }).join("");

    // Bind Node click listeners
    const nodes = nodesList.querySelectorAll(".roadmap-node");
    nodes.forEach(node => {
        node.addEventListener("click", () => {
            const isLocked = node.getAttribute("data-locked") === "true";
            if (isLocked) {
                ui.showToast("This path is locked. Complete the previous paths first!", "warning");
                return;
            }
            const pathId = node.getAttribute("data-id");
            window.location.hash = `#path?id=${pathId}`;
        });
    });
}

// --- Path Details View ---
export function renderPathDetails(pathId) {
    const container = document.getElementById("view-path");
    const user = db.state.currentUser;
    if (!user) return;

    const path = db.state.paths.find(p => p.id === pathId);
    if (!path) {
        window.location.hash = "#paths";
        return;
    }

    const completedLessons = user.completedLessons || [];
    const completedLabs = user.completedLabs || [];

    // Header HTML
    container.innerHTML = `
        <div style="margin-bottom: 20px;">
            <a href="#paths" class="cyber-btn" style="padding: 6px 12px; font-size: 0.8rem;"><i class="fa-solid fa-arrow-left"></i> Back to Roadmap</a>
        </div>
        
        <div class="cyber-card" style="margin-bottom: 30px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap: 15px;">
                <div>
                    <h1 class="neon-text-blue" style="font-size:2.2rem; margin-bottom: 8px;"><i class="fa-solid ${path.icon}"></i> ${path.title}</h1>
                    <p>${path.description}</p>
                </div>
                <div class="node-xp-badge" style="font-size:1rem; padding: 12px 20px;">
                    Graduation: +${path.xpReward} XP
                </div>
            </div>
        </div>

        <div style="display:grid; grid-template-columns: 2fr 1fr; gap: 30px;">
            <!-- Modules List -->
            <div>
                <h3 class="cyber-title-sm" style="margin-bottom: 15px;"><i class="fa-solid fa-book-open"></i> Theory Modules</h3>
                <div style="display:flex; flex-direction:column; gap:12px;">
                    ${path.modules.map((mod, idx) => {
                        const isDone = completedLessons.includes(mod.id);
                        const score = user.quizScores ? user.quizScores[mod.id] : null;
                        
                        return `
                            <div class="cyber-card task-item-box ${isDone ? 'completed' : ''}" style="cursor: pointer;" data-mod="${mod.id}">
                                <div class="task-checkbox">
                                    <i class="fa-solid ${isDone ? 'fa-square-check' : 'fa-square'}"></i>
                                </div>
                                <div class="task-text">
                                    <span style="color:var(--text-muted); font-size: 0.85rem;">Module ${idx + 1}</span>
                                    <h4 style="margin-top:2px;">${mod.title}</h4>
                                </div>
                                ${score !== null ? `
                                    <div class="user-xp-pill" style="border-color:var(--success); color:var(--success);">
                                        Quiz: ${score}%
                                    </div>
                                ` : ""}
                                <div class="cyber-btn" style="padding: 6px 12px; font-size: 0.75rem;">
                                    ${isDone ? '<i class="fa-solid fa-rotate-right"></i> Review' : '<i class="fa-solid fa-chevron-right"></i> Study'}
                                </div>
                            </div>
                        `;
                    }).join("")}
                </div>
            </div>

            <!-- Labs List -->
            <div>
                <h3 class="cyber-title-sm" style="border-left-color: var(--success); margin-bottom: 15px;"><i class="fa-solid fa-flask"></i> Hands-on Laboratories</h3>
                <div style="display:flex; flex-direction:column; gap:12px;">
                    ${path.labs && path.labs.length > 0 ? path.labs.map(lab => {
                        const isDone = completedLabs.includes(lab.id);
                        
                        return `
                            <div class="cyber-card task-item-box ${isDone ? 'completed' : ''}" style="cursor: pointer;" data-lab="${lab.id}">
                                <div class="task-checkbox" style="color: var(--success);">
                                    <i class="fa-solid ${isDone ? 'fa-circle-check' : 'fa-circle-play'}"></i>
                                </div>
                                <div class="task-text">
                                    <h4>${lab.title}</h4>
                                    <p style="font-size:0.8rem; margin-top: 3px;">${lab.description}</p>
                                </div>
                                <div style="display:flex; flex-direction:column; align-items:flex-end; gap: 5px;">
                                    <span style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">${lab.difficulty}</span>
                                    <div class="user-xp-pill" style="font-size:0.75rem; padding: 2px 8px;">+${lab.xp} XP</div>
                                </div>
                            </div>
                        `;
                    }).join("") : `
                        <div style="text-align:center; padding: 20px; color: var(--text-muted); border: 1px dashed rgba(255,255,255,0.05); border-radius: 6px;">
                            <p>No labs configured for this fundamentals path.</p>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;

    // Hook listeners for module items
    container.querySelectorAll("[data-mod]").forEach(el => {
        el.addEventListener("click", () => {
            const modId = el.getAttribute("data-mod");
            window.location.hash = `#lesson?path=${pathId}&module=${modId}`;
        });
    });

    // Hook listeners for lab items
    container.querySelectorAll("[data-lab]").forEach(el => {
        el.addEventListener("click", () => {
            const labId = el.getAttribute("data-lab");
            window.location.hash = `#lab?path=${pathId}&id=${labId}`;
        });
    });
}

// --- Unified Lesson Viewer Renderer ---
export function renderLesson(pathId, moduleId) {
    const container = document.getElementById("view-lesson");
    const user = db.state.currentUser;
    if (!user) return;

    const path = db.state.paths.find(p => p.id === pathId);
    const modIndex = path ? path.modules.findIndex(m => m.id === moduleId) : -1;
    const mod = modIndex !== -1 ? path.modules[modIndex] : null;

    if (!path || !mod) {
        window.location.hash = "#paths";
        return;
    }

    // Next/Prev navigation references
    const prevMod = modIndex > 0 ? path.modules[modIndex - 1] : null;
    const nextMod = modIndex < path.modules.length - 1 ? path.modules[modIndex + 1] : null;

    container.innerHTML = `
        <div style="margin-bottom: 20px; display:flex; justify-content:space-between; align-items:center;">
            <a href="#path?id=${path.id}" class="cyber-btn" style="padding: 6px 12px; font-size: 0.8rem;">
                <i class="fa-solid fa-folder-open"></i> Back to Path Curriculum
            </a>
            <span class="user-xp-pill">Path: ${path.title}</span>
        </div>

        <div class="lesson-layout">
            <!-- Left Pane: Content -->
            <div class="lesson-content-pane">
                <!-- Video Box Mock -->
                <div class="lesson-video-box">
                    ${mod.video ? `
                        <iframe src="${mod.video}" title="Educational Video" frameborder="0" allowfullscreen></iframe>
                    ` : `
                        <div class="video-mock-placeholder">
                            <i class="fa-regular fa-circle-play"></i>
                            <div>
                                <h4 style="color:#ffffff;">Simulated Classroom Video Lecture</h4>
                                <p style="font-size:0.85rem; text-align:center; margin-top:5px;">Click to view animated blackboard visual representations</p>
                            </div>
                        </div>
                    `}
                </div>

                <!-- Written Notes -->
                <div class="cyber-card lesson-reading-notes">
                    <h1 class="neon-text-blue" style="border-bottom: 1px solid rgba(0, 240, 255, 0.2); padding-bottom: 8px;">
                        ${mod.title}
                    </h1>
                    
                    <div style="margin-top: 20px;">
                        ${mod.notes}
                    </div>

                    <!-- Dynamic SVG Architecture Diagrams -->
                    ${renderDiagramForModule(mod.id)}
                    
                    <div class="cyber-alert">
                        <div class="cyber-alert-title"><i class="fa-solid fa-triangle-exclamation"></i> Academic Warning</div>
                        <p style="font-size: 0.85rem;">This course material is prepared exclusively for defensive and ethical academic research purposes. Unauthorized scanning or testing of remote systems without explicit consent is illegal.</p>
                    </div>
                </div>

                <!-- Footer Nav Buttons -->
                <div class="lesson-footer-navigation">
                    ${prevMod ? `
                        <button class="cyber-btn" id="btn-prev-lesson" data-id="${prevMod.id}">
                            <i class="fa-solid fa-chevron-left"></i> Previous Module
                        </button>
                    ` : "<div></div>"}
                    
                    ${nextMod ? `
                        <button class="cyber-btn" id="btn-next-lesson" data-id="${nextMod.id}">
                            Next Module <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    ` : "<div></div>"}
                </div>
            </div>

            <!-- Right Pane: Actions & Quizzes -->
            <div class="lesson-tasks-pane">
                <!-- Lesson progression list -->
                <div class="cyber-card">
                    <h3 class="cyber-title-sm"><i class="fa-solid fa-list-check"></i> Lesson Checklist</h3>
                    <div style="margin-top: 15px; display:flex; flex-direction:column; gap:10px;">
                        <div class="task-item-box completed" id="task-reading">
                            <div class="task-checkbox"><i class="fa-solid fa-square-check"></i></div>
                            <div class="task-text">Study Reading Notes</div>
                        </div>
                        <div class="task-item-box" id="task-quiz">
                            <div class="task-checkbox"><i class="fa-solid fa-square"></i></div>
                            <div class="task-text">Pass Module Examination</div>
                        </div>
                    </div>
                </div>

                <!-- Quiz Sandbox Frame -->
                <div class="cyber-card" id="quiz-sandbox">
                    <!-- Loaded dynamically by quiz.js -->
                </div>
            </div>
        </div>
    `;

    // Hook reading click
    document.getElementById("task-reading").addEventListener("click", () => {
        ui.showToast("You have completed studying the theoretical syllabus notes. Move on to the quiz!", "info");
    });

    // Boot up the quiz script engine for this module inside the placeholder
    import("./quiz.js").then(quizEngine => {
        quizEngine.initQuiz(path.id, mod);
    });

    // Bind navigation buttons
    if (prevMod) {
        document.getElementById("btn-prev-lesson").addEventListener("click", () => {
            window.location.hash = `#lesson?path=${pathId}&module=${prevMod.id}`;
        });
    }
    if (nextMod) {
        document.getElementById("btn-next-lesson").addEventListener("click", () => {
            window.location.hash = `#lesson?path=${pathId}&module=${nextMod.id}`;
        });
    }
}

// --- Diagrams Engine (Draws inline SVGs depending on module topic) ---
function renderDiagramForModule(moduleId) {
    if (moduleId === "what-is-computer") {
        return `
            <div class="cyber-diagram">
                <svg width="350" height="150" viewBox="0 0 350 150">
                    <!-- CPU -->
                    <rect x="130" y="30" width="90" height="90" fill="#0f172a" stroke="#00f0ff" stroke-width="2" rx="6" />
                    <text x="175" y="70" font-family="Outfit" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">CPU</text>
                    <text x="175" y="90" font-family="monospace" font-size="9" fill="#8a9cae" text-anchor="middle">(Process)</text>
                    
                    <!-- Input -->
                    <rect x="10" y="50" width="80" height="50" fill="#0f172a" stroke="#39ff14" stroke-width="1.5" rx="4" />
                    <text x="50" y="80" font-family="Outfit" font-size="12" fill="#39ff14" text-anchor="middle">Input Device</text>
                    
                    <!-- Output -->
                    <rect x="260" y="50" width="80" height="50" fill="#0f172a" stroke="#ff9f00" stroke-width="1.5" rx="4" />
                    <text x="300" y="80" font-family="Outfit" font-size="12" fill="#ff9f00" text-anchor="middle">Output Monitor</text>

                    <!-- Connecting Lines -->
                    <line x1="90" y1="75" x2="130" y2="75" stroke="#00f0ff" stroke-width="2" stroke-dasharray="4 2" />
                    <polygon points="130,75 122,71 122,79" fill="#00f0ff" />
                    
                    <line x1="220" y1="75" x2="260" y2="75" stroke="#00f0ff" stroke-width="2" stroke-dasharray="4 2" />
                    <polygon points="260,75 252,71 252,79" fill="#00f0ff" />
                </svg>
            </div>
        `;
    }

    if (moduleId === "osi-model") {
        return `
            <div class="cyber-diagram">
                <svg width="250" height="180" viewBox="0 0 250 180">
                    <g fill="#0f172a" stroke="#00f0ff" stroke-width="1.5" font-family="Outfit" font-size="11" text-anchor="middle">
                        <rect x="10" y="5" width="230" height="20" rx="3" />
                        <text x="125" y="19" fill="#ffffff" font-weight="bold">Layer 7: Application (HTTP, DNS)</text>

                        <rect x="10" y="30" width="230" height="20" rx="3" />
                        <text x="125" y="44" fill="#ffffff">Layer 6: Presentation (SSL/TLS)</text>

                        <rect x="10" y="55" width="230" height="20" rx="3" />
                        <text x="125" y="69" fill="#ffffff">Layer 5: Session (RPC)</text>

                        <rect x="10" y="80" width="230" height="20" rx="3" stroke="#39ff14" />
                        <text x="125" y="94" fill="#39ff14" font-weight="bold">Layer 4: Transport (TCP, UDP)</text>

                        <rect x="10" y="105" width="230" height="20" rx="3" />
                        <text x="125" y="119" fill="#ffffff">Layer 3: Network (IP, Routers)</text>

                        <rect x="10" y="130" width="230" height="20" rx="3" />
                        <text x="125" y="144" fill="#ffffff">Layer 2: Data Link (MAC, Switches)</text>

                        <rect x="10" y="155" width="230" height="20" rx="3" />
                        <text x="125" y="169" fill="#ffffff">Layer 1: Physical (Cables, Hubs)</text>
                    </g>
                </svg>
            </div>
        `;
    }

    if (moduleId === "cia-triad") {
        return `
            <div class="cyber-diagram">
                <svg width="200" height="160" viewBox="0 0 200 160">
                    <!-- Glowing CIA Triangle -->
                    <polygon points="100,20 20,130 180,130" fill="none" stroke="#00f0ff" stroke-width="3" />
                    
                    <circle cx="100" cy="20" r="8" fill="#07090e" stroke="#39ff14" stroke-width="2" />
                    <text x="100" y="45" font-family="Outfit" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">Confidentiality</text>
                    
                    <circle cx="20" cy="130" r="8" fill="#07090e" stroke="#39ff14" stroke-width="2" />
                    <text x="50" y="145" font-family="Outfit" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">Integrity</text>
                    
                    <circle cx="180" cy="130" r="8" fill="#07090e" stroke="#39ff14" stroke-width="2" />
                    <text x="155" y="145" font-family="Outfit" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">Availability</text>

                    <text x="100" y="95" font-family="Outfit" font-size="14" fill="#00f0ff" text-anchor="middle" font-weight="bold" opacity="0.8">C.I.A.</text>
                </svg>
            </div>
        `;
    }

    return ""; // Default: no diagram
}
