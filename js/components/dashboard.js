/* ==========================================================================
   CYBERPATH ACADEMY - Student Dashboard Page
   ========================================================================== */

import { db } from "../state.js";
import { ui } from "../ui.js";

export function renderDashboard() {
    const container = document.getElementById("view-dashboard");
    const user = db.state.currentUser;

    if (!user) return;

    // Calculations
    const currentLevelXP = Math.pow(user.level - 1, 2) * 500;
    const nextLevelXP = Math.pow(user.level, 2) * 500;
    const levelProgressXP = user.xp - currentLevelXP;
    const levelRangeXP = nextLevelXP - currentLevelXP;
    const progressPercent = Math.min(100, Math.floor((levelProgressXP / levelRangeXP) * 100));

    const totalLessonsCount = db.state.paths.reduce((acc, p) => acc + p.modules.length, 0);
    const totalLabsCount = db.state.paths.reduce((acc, p) => acc + (p.labs ? p.labs.length : 0), 0);
    
    const completedLessonsCount = user.completedLessons ? user.completedLessons.length : 0;
    const completedLabsCount = user.completedLabs ? user.completedLabs.length : 0;
    
    const overallProgressPercent = Math.floor(((completedLessonsCount + completedLabsCount) / (totalLessonsCount + totalLabsCount)) * 100) || 0;

    container.innerHTML = `
        <h1 class="cyber-title neon-text-blue"><i class="fa-solid fa-gauge-high"></i> Defender Dashboard</h1>
        
        <div class="dashboard-grid">
            <!-- Sidebar Info -->
            <div class="dashboard-sidebar">
                <div class="cyber-card profile-summary-card">
                    <div class="profile-avatar-large">${user.name.charAt(0).toUpperCase()}</div>
                    <h2>${user.name}</h2>
                    <span class="profile-level-badge">Lvl ${user.level} Defender</span>
                    
                    <div class="streak-counter">
                        <i class="fa-solid fa-fire"></i>
                        <span>${user.streak} Day Streak</span>
                    </div>

                    <!-- Level XP Progress -->
                    <div class="xp-progress-container">
                        <div class="xp-labels">
                            <span>${user.xp} XP Total</span>
                            <span>Level ${user.level + 1} (${progressPercent}%)</span>
                        </div>
                        <div class="xp-bar-bg">
                            <div class="xp-bar-fill" style="width: ${progressPercent}%;"></div>
                        </div>
                        <p style="font-size: 0.8rem; text-align: center; margin-top: 8px; color: var(--text-muted);">
                            ${nextLevelXP - user.xp} XP needed to level up
                        </p>
                    </div>

                    <!-- Quick stats list -->
                    <div style="width: 100%; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px; margin-top: 10px;">
                        <p style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom: 8px;">
                            <span>Lessons Complete:</span>
                            <strong class="neon-text-blue">${completedLessonsCount} / ${totalLessonsCount}</strong>
                        </p>
                        <p style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom: 8px;">
                            <span>Labs Resolved:</span>
                            <strong class="neon-text-green">${completedLabsCount} / ${totalLabsCount}</strong>
                        </p>
                        <p style="display:flex; justify-content:space-between; font-size:0.9rem;">
                            <span>Rank Class:</span>
                            <strong class="neon-text-warning">${user.xp > 4000 ? "Elite Specialist" : user.xp > 1500 ? "Junior Defender" : "Initiate"}</strong>
                        </p>
                    </div>
                </div>
                
                <!-- Settings Panel -->
                <div class="cyber-card" style="margin-top: 20px;">
                    <h3 class="cyber-title-sm" style="font-size:1.1rem; border-left-color: var(--warning);"><i class="fa-solid fa-gears"></i> Profile Settings</h3>
                    <form id="form-update-profile" style="margin-top: 15px;">
                        <div class="form-group" style="margin-bottom: 12px;">
                            <label for="profile-name">Edit Codename</label>
                            <input type="text" id="profile-name" class="cyber-input" value="${user.name}" style="padding: 8px 12px; font-size: 0.9rem;" required>
                        </div>
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label for="profile-password">Update Password</label>
                            <input type="password" id="profile-password" class="cyber-input" placeholder="New Password" style="padding: 8px 12px; font-size: 0.9rem;">
                        </div>
                        <button type="submit" class="cyber-btn cyber-btn-warning" style="padding: 8px 16px; font-size:0.8rem; width:100%;">
                            <i class="fa-solid fa-floppy-disk"></i> Commit Updates
                        </button>
                    </form>
                </div>
            </div>

            <!-- Main Panel Content -->
            <div class="dashboard-main">
                <!-- Row 1: Statistics Cards -->
                <div class="dashboard-stats-grid">
                    <div class="cyber-card dash-stat-card">
                        <div class="dash-stat-icon"><i class="fa-solid fa-bars-progress"></i></div>
                        <div>
                            <div class="dash-stat-num">${overallProgressPercent}%</div>
                            <div class="dash-stat-label">Total Completion</div>
                        </div>
                    </div>
                    <div class="cyber-card dash-stat-card green-stat">
                        <div class="dash-stat-icon"><i class="fa-solid fa-trophy"></i></div>
                        <div>
                            <div class="dash-stat-num">${user.badges ? user.badges.length : 0}</div>
                            <div class="dash-stat-label">Badges Earned</div>
                        </div>
                    </div>
                    <div class="cyber-card dash-stat-card warning-stat">
                        <div class="dash-stat-icon"><i class="fa-solid fa-graduation-cap"></i></div>
                        <div>
                            <div class="dash-stat-num">${user.certificates ? user.certificates.length : 0}</div>
                            <div class="dash-stat-label">Diplomas Earned</div>
                        </div>
                    </div>
                </div>

                <!-- Row 2: Badges & Achievements -->
                <div class="cyber-card">
                    <h3 class="cyber-title-sm"><i class="fa-solid fa-award"></i> Achievement Badges</h3>
                    <p style="font-size:0.9rem; margin-bottom: 15px;">Complete syllabus modules and labs to unlock badges.</p>
                    <div class="badges-container" id="badges-container">
                        <!-- Badges list dynamically built -->
                    </div>
                </div>

                <!-- Row 3: Earned Certificates -->
                <div class="cyber-card">
                    <h3 class="cyber-title-sm" style="border-left-color: var(--success);"><i class="fa-solid fa-file-invoice"></i> Path Graduation Certificates</h3>
                    <div class="certificates-list" id="certificates-list">
                        <!-- Certificates built dynamically -->
                    </div>
                </div>

                <!-- Row 4: Leaderboard -->
                <div class="cyber-card">
                    <h3 class="cyber-title-sm" style="border-left-color: var(--warning);"><i class="fa-solid fa-ranking-star"></i> Global Academy Leaderboard</h3>
                    <p style="font-size:0.9rem; margin-bottom: 15px;">Ranked dynamically based on total student XP.</p>
                    <table class="leaderboard-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Codename</th>
                                <th>Defender Level</th>
                                <th>Total XP</th>
                            </tr>
                        </thead>
                        <tbody id="leaderboard-tbody">
                            <!-- Leaderboard records built dynamically -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Render Sub-components
    renderBadges(user);
    renderCertificates(user);
    renderLeaderboard(user);

    // Profile Settings listeners
    document.getElementById("form-update-profile").addEventListener("submit", (e) => {
        e.preventDefault();
        const newName = document.getElementById("profile-name").value;
        const newPass = document.getElementById("profile-password").value;

        db.updateProfile(newName, newPass);
        ui.updateHeaderAuth();
        ui.showToast("Profile settings updated successfully.", "success");
        renderDashboard(); // Re-render page
    });
}

function renderBadges(user) {
    const listContainer = document.getElementById("badges-container");
    
    // Core Predefined Badges Schema to display
    const badgesSchema = [
        { id: "first-steps", name: "First Steps", desc: "Completed your first lesson module.", icon: "fa-baby" },
        { id: "level-2", name: "Defender Lvl 2", desc: "Reached Defender Level 2.", icon: "fa-shield-halved" },
        { id: "level-5", name: "Defender Lvl 5", desc: "Reached Defender Level 5.", icon: "fa-rocket" },
        { id: "path-comp-computer-fundamentals", name: "Fundamental Graduate", desc: "Completed all Computer Fundamentals lessons.", icon: "fa-desktop", pathComp: true },
        { id: "path-comp-networking-fundamentals", name: "Networking Master", desc: "Completed all Networking lessons and labs.", icon: "fa-network-wired", pathComp: true },
        { id: "linux-wizard", name: "Terminal Wizard", desc: "Resolved Linux navigation challenges.", icon: "fa-terminal" },
        { id: "websec-expert", name: "Exploit Specialist", desc: "Exploited SQL Injections and XSS scripting.", icon: "fa-bug" }
    ];

    listContainer.innerHTML = badgesSchema.map(badge => {
        const userBadge = user.badges ? user.badges.find(b => b.id === badge.id) : null;
        const isUnlocked = !!userBadge;
        
        return `
            <div class="badge-item ${isUnlocked ? 'unlocked' : ''} ${badge.pathComp ? 'path-complete' : ''}" 
                 title="${badge.desc} ${isUnlocked ? '(Unlocked!)' : '(Locked)'}">
                <div class="badge-icon-holder">
                    <i class="fa-solid ${badge.icon}"></i>
                </div>
                <div class="badge-label">${badge.name}</div>
            </div>
        `;
    }).join("");
}

function renderCertificates(user) {
    const certsContainer = document.getElementById("certificates-list");
    const earnedPaths = user.certificates || [];

    if (earnedPaths.length === 0) {
        certsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 20px; color: var(--text-muted); border: 1px dashed rgba(255,255,255,0.05); border-radius: 6px;">
                <i class="fa-solid fa-graduation-cap" style="font-size:2.5rem; color: rgba(255,255,255,0.05); margin-bottom: 10px;"></i>
                <p>No certificates earned yet. Complete all modules and labs in a learning path to graduate!</p>
            </div>
        `;
        return;
    }

    certsContainer.innerHTML = earnedPaths.map(pathId => {
        const path = db.state.paths.find(p => p.id === pathId);
        if (!path) return "";
        
        return `
            <div class="cyber-card cert-card-item green-accent">
                <div class="cert-thumbnail">
                    <i class="fa-solid fa-certificate"></i>
                </div>
                <div class="cert-title-info">
                    <h4>${path.title} Graduate</h4>
                    <p>Verified Certificate of Completion</p>
                    <button class="cyber-btn cyber-btn-green" style="width: 100%; font-size:0.8rem; padding: 8px 16px;" 
                            data-path="${path.id}">
                        <i class="fa-solid fa-eye"></i> View Certificate
                    </button>
                </div>
            </div>
        `;
    }).join("");

    // Add buttons listener
    const viewButtons = certsContainer.querySelectorAll("button");
    viewButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const pathId = btn.getAttribute("data-path");
            ui.showCertificate(pathId);
        });
    });
}

function renderLeaderboard(user) {
    const tbody = document.getElementById("leaderboard-tbody");
    
    // Always insert current user if not already in the state's static list
    const isUserInList = db.state.leaderboard.find(l => l.name === user.name);
    if (!isUserInList && user.role !== "admin") {
        db.updateLeaderboardEntry(user.name, user.xp, user.level, user.badges ? user.badges.length : 0);
    }
    
    // Refresh sort
    db.state.leaderboard.sort((a, b) => b.xp - a.xp);

    tbody.innerHTML = db.state.leaderboard.map((student, index) => {
        const isSelf = student.name === user.name;
        let rankClass = "";
        let rankBadge = `${index + 1}`;

        if (index === 0) { rankClass = "rank-1"; rankBadge = '<i class="fa-solid fa-crown"></i> 1'; }
        else if (index === 1) { rankClass = "rank-2"; }
        else if (index === 2) { rankClass = "rank-3"; }

        return `
            <tr class="leaderboard-row ${isSelf ? 'user-row' : ''}">
                <td class="rank-col ${rankClass}">${rankBadge}</td>
                <td>
                    <div class="user-col">
                        <div class="user-mini-avatar">${student.name.charAt(0).toUpperCase()}</div>
                        <span>${student.name} ${isSelf ? '<span class="neon-text-blue" style="font-size:0.75rem;">(You)</span>' : ''}</span>
                    </div>
                </td>
                <td style="font-weight:600;">Lvl ${student.level}</td>
                <td class="neon-text-green" style="font-weight:700;">${student.xp} XP</td>
            </tr>
        `;
    }).join("");
}
