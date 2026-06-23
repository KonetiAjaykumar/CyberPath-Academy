/* ==========================================================================
   CYBERPATH ACADEMY - Administrator Panel Components
   ========================================================================== */

import { db } from "../state.js";
import { ui } from "../ui.js";

export function renderAdmin() {
    const container = document.getElementById("view-admin");
    const user = db.state.currentUser;

    if (!user || user.role !== "admin") return;

    container.innerHTML = `
        <h1 class="cyber-title neon-text-warning"><i class="fa-solid fa-user-shield"></i> Administration Terminal</h1>
        <p>Academy configuration controls, custom course compiler, and student analytics tracking.</p>

        <div class="admin-tab-container">
            <!-- Sidebar tabs -->
            <div class="admin-tabs-list">
                <button class="cyber-btn admin-tab-btn active" data-pane="analytics"><i class="fa-solid fa-chart-line"></i> Student Analytics</button>
                <button class="cyber-btn admin-tab-btn" data-pane="course-editor"><i class="fa-solid fa-folder-plus"></i> Curriculum Editor</button>
                <button class="cyber-btn admin-tab-btn" data-pane="config"><i class="fa-solid fa-sliders"></i> Platform Config</button>
            </div>

            <!-- Main Pane Area -->
            <div class="admin-panes-wrapper">
                <!-- Pane: Analytics -->
                <div class="cyber-card admin-pane active-pane" id="pane-analytics">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; flex-wrap:wrap; gap:10px;">
                        <h3 class="cyber-title-sm" style="border-left-color: var(--success);"><i class="fa-solid fa-users"></i> Student Logs</h3>
                        <button class="cyber-btn cyber-btn-green" id="btn-export-csv" style="padding: 6px 12px; font-size: 0.75rem;">
                            <i class="fa-solid fa-file-csv"></i> Export CSV Report
                        </button>
                    </div>
                    
                    <div style="overflow-x:auto;">
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>Codename</th>
                                    <th>Email</th>
                                    <th>Level</th>
                                    <th>XP</th>
                                    <th>Lessons Passed</th>
                                    <th>Labs Passed</th>
                                    <th>Diplomas</th>
                                </tr>
                            </thead>
                            <tbody id="admin-analytics-tbody">
                                <!-- Loaded dynamically -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Pane: Course Editor -->
                <div class="cyber-card admin-pane" id="pane-course-editor">
                    <h3 class="cyber-title-sm"><i class="fa-solid fa-circle-plus"></i> Create Learning Path</h3>
                    <form id="form-admin-create-path" style="margin-top:15px; margin-bottom:30px; display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                        <div class="form-group">
                            <label>Unique ID (slug)</label>
                            <input type="text" id="admin-path-id" class="cyber-input" placeholder="e.g. cloud-security" required style="padding:8px 12px; font-size:0.9rem;">
                        </div>
                        <div class="form-group">
                            <label>Path Title</label>
                            <input type="text" id="admin-path-title" class="cyber-input" placeholder="e.g. Cloud Security Basics" required style="padding:8px 12px; font-size:0.9rem;">
                        </div>
                        <div class="form-group" style="grid-column: 1/-1;">
                            <label>Short Description</label>
                            <input type="text" id="admin-path-desc" class="cyber-input" placeholder="Summarize path syllabus..." required style="padding:8px 12px; font-size:0.9rem;">
                        </div>
                        <div class="form-group">
                            <label>FontAwesome Icon Class</label>
                            <input type="text" id="admin-path-icon" class="cyber-input" value="fa-cloud" required style="padding:8px 12px; font-size:0.9rem;">
                        </div>
                        <div style="grid-column:1/-1; display:flex; justify-content:flex-end;">
                            <button type="submit" class="cyber-btn cyber-btn-blue" style="padding:8px 20px; font-size:0.8rem;">
                                <i class="fa-solid fa-plus"></i> Add Path
                            </button>
                        </div>
                    </form>

                    <div class="dropdown-divider" style="margin:25px 0;"></div>

                    <h3 class="cyber-title-sm" style="border-left-color: var(--warning);"><i class="fa-solid fa-file-medical"></i> Append Lesson Module</h3>
                    <form id="form-admin-add-module" style="margin-top:15px; display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                        <div class="form-group">
                            <label>Target Path</label>
                            <select id="admin-mod-path-select" class="cyber-input" style="background:#07090e; padding:8px 12px; font-size:0.9rem;">
                                <!-- Dynamically populated path list -->
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Module ID (slug)</label>
                            <input type="text" id="admin-mod-id" class="cyber-input" placeholder="e.g. intro-iam" required style="padding:8px 12px; font-size:0.9rem;">
                        </div>
                        <div class="form-group" style="grid-column: 1/-1;">
                            <label>Module Title</label>
                            <input type="text" id="admin-mod-title" class="cyber-input" placeholder="e.g. Identity and Access Management" required style="padding:8px 12px; font-size:0.9rem;">
                        </div>
                        <div class="form-group" style="grid-column: 1/-1;">
                            <label>Theory Reading Notes (HTML/Texts)</label>
                            <textarea id="admin-mod-notes" class="cyber-input" style="height:100px; font-size:0.85rem; line-height:1.4;" placeholder="<h3>Subhead</h3><p>Content...</p>" required></textarea>
                        </div>
                        
                        <!-- Quiz subset -->
                        <div class="form-group" style="grid-column: 1/-1; margin-top:10px;">
                            <strong style="color:var(--warning); font-size:0.85rem; text-transform:uppercase;">Knowledge Quiz Check</strong>
                        </div>
                        <div class="form-group" style="grid-column: 1/-1;">
                            <label>Quiz Question Text</label>
                            <input type="text" id="admin-quiz-q" class="cyber-input" placeholder="What is..." required style="padding:8px 12px; font-size:0.9rem;">
                        </div>
                        <div class="form-group">
                            <label>Option A</label>
                            <input type="text" id="admin-quiz-opt0" class="cyber-input" required style="padding:6px 12px; font-size:0.85rem;">
                        </div>
                        <div class="form-group">
                            <label>Option B</label>
                            <input type="text" id="admin-quiz-opt1" class="cyber-input" required style="padding:6px 12px; font-size:0.85rem;">
                        </div>
                        <div class="form-group">
                            <label>Option C</label>
                            <input type="text" id="admin-quiz-opt2" class="cyber-input" required style="padding:6px 12px; font-size:0.85rem;">
                        </div>
                        <div class="form-group">
                            <label>Option D</label>
                            <input type="text" id="admin-quiz-opt3" class="cyber-input" required style="padding:6px 12px; font-size:0.85rem;">
                        </div>
                        <div class="form-group">
                            <label>Correct Option Index (0-3)</label>
                            <select id="admin-quiz-ans" class="cyber-input" style="background:#07090e; padding:6px 12px; font-size:0.85rem;">
                                <option value="0">A</option>
                                <option value="1">B</option>
                                <option value="2">C</option>
                                <option value="3">D</option>
                            </select>
                        </div>
                        <div class="form-group" style="grid-column: 1/-1;">
                            <label>Explanation on verification check</label>
                            <input type="text" id="admin-quiz-exp" class="cyber-input" placeholder="This correct answer because..." required style="padding:8px 12px; font-size:0.9rem;">
                        </div>

                        <div style="grid-column:1/-1; display:flex; justify-content:flex-end;">
                            <button type="submit" class="cyber-btn cyber-btn-warning" style="padding:8px 20px; font-size:0.8rem;">
                                <i class="fa-solid fa-file-medical"></i> Compile Module
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Pane: Config -->
                <div class="cyber-card admin-pane" id="pane-config">
                    <h3 class="cyber-title-sm" style="border-left-color: var(--error);"><i class="fa-solid fa-triangle-exclamation"></i> Emergency Actions</h3>
                    <p style="font-size:0.9rem; margin-top:10px;">Warning: Resetting local state database will wipe all registration records, student progress scores, earned certificates, and forum logs.</p>
                    <div style="margin-top:20px;">
                        <button class="cyber-btn cyber-btn-warning" id="btn-admin-wipe" style="border-color:var(--error); color:var(--error);">
                            <i class="fa-solid fa-trash-can"></i> WIPE LOCAL STORAGE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Bind sub-tabs toggles
    const tabButtons = container.querySelectorAll(".admin-tab-btn");
    const panes = container.querySelectorAll(".admin-pane");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const paneId = `pane-${btn.getAttribute("data-pane")}`;
            panes.forEach(p => {
                p.classList.remove("active-pane");
                if (p.id === paneId) p.classList.add("active-pane");
            });
        });
    });

    // Initial render
    populateAnalyticsTable();
    populatePathsDropdown();

    // Export CSV listener
    document.getElementById("btn-export-csv").addEventListener("click", () => {
        exportStudentReportCSV();
    });

    // Wipe storage listener
    document.getElementById("btn-admin-wipe").addEventListener("click", () => {
        const conf = confirm("Are you absolutely sure you want to restore CyberPath database defaults? This operation is irreversible.");
        if (conf) {
            localStorage.removeItem("cyberpath_state");
            ui.showToast("Database restored to defaults. Reloading platform...", "warning");
            setTimeout(() => window.location.reload(), 1500);
        }
    });

    // Add path listener
    document.getElementById("form-admin-create-path").addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("admin-path-id").value;
        const title = document.getElementById("admin-path-title").value;
        const desc = document.getElementById("admin-path-desc").value;
        const icon = document.getElementById("admin-path-icon").value;

        db.createPath(id, title, desc, icon);
        ui.showToast(`Learning Path '${title}' created!`, "success");
        e.target.reset();
        
        // Refresh selectors
        populatePathsDropdown();
    });

    // Add module listener
    document.getElementById("form-admin-add-module").addEventListener("submit", (e) => {
        e.preventDefault();
        const pathId = document.getElementById("admin-mod-path-select").value;
        const modId = document.getElementById("admin-mod-id").value;
        const title = document.getElementById("admin-mod-title").value;
        const notes = document.getElementById("admin-mod-notes").value;
        
        const quizQ = document.getElementById("admin-quiz-q").value;
        const quizOpts = [
            document.getElementById("admin-quiz-opt0").value,
            document.getElementById("admin-quiz-opt1").value,
            document.getElementById("admin-quiz-opt2").value,
            document.getElementById("admin-quiz-opt3").value
        ];
        const quizAns = document.getElementById("admin-quiz-ans").value;
        const quizExp = document.getElementById("admin-quiz-exp").value;

        db.addModuleToPath(pathId, modId, title, notes, quizQ, quizOpts, quizAns, quizExp);
        ui.showToast(`Module '${title}' successfully appended to path ${pathId}!`, "success");
        e.target.reset();
    });
}

function populateAnalyticsTable() {
    const tbody = document.getElementById("admin-analytics-tbody");
    const logs = db.getStudentLogs();

    if (logs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted);">No student learners registered yet.</td></tr>`;
        return;
    }

    tbody.innerHTML = logs.map(student => {
        const completedLessons = student.completedLessons ? student.completedLessons.length : 0;
        const completedLabs = student.completedLabs ? student.completedLabs.length : 0;
        const certificates = student.certificates ? student.certificates.length : 0;
        
        return `
            <tr>
                <td><strong>${student.name}</strong></td>
                <td>${student.email}</td>
                <td>Lvl ${student.level}</td>
                <td class="neon-text-green">${student.xp} XP</td>
                <td>${completedLessons}</td>
                <td>${completedLabs}</td>
                <td><span class="user-xp-pill" style="font-size:0.75rem; padding: 2px 8px;">${certificates} Diplomas</span></td>
            </tr>
        `;
    }).join("");
}

function populatePathsDropdown() {
    const select = document.getElementById("admin-mod-path-select");
    if (!select) return;

    select.innerHTML = db.state.paths.map(path => {
        return `<option value="${path.id}">${path.title}</option>`;
    }).join("");
}

function exportStudentReportCSV() {
    const logs = db.getStudentLogs();
    if (logs.length === 0) {
        ui.showToast("No student records available to compile report.", "warning");
        return;
    }

    // Build CSV Headers
    let csvContent = "Codename,Email,Level,Total XP,Streak,Lessons Completed,Labs Completed,Certificates Earned\n";

    // Build Rows
    logs.forEach(s => {
        const lCount = s.completedLessons ? s.completedLessons.length : 0;
        const lbCount = s.completedLabs ? s.completedLabs.length : 0;
        const certCount = s.certificates ? s.certificates.length : 0;
        
        csvContent += `"${s.name}","${s.email}",${s.level},${s.xp},${s.streak},${lCount},${lbCount},${certCount}\n`;
    });

    // Create Download Trigger
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `cyberpath_student_logs_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    ui.showToast("Student CSV analytics report downloaded!", "success");
}
