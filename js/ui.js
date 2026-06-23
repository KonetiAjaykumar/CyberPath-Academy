/* ==========================================================================
   CYBERPATH ACADEMY - UI Helpers, Modals & Notifications
   ========================================================================== */

import { db } from "./state.js";

class UIManager {
    init() {
        this.updateHeaderAuth();
        this.setupModalClosers();
    }

    // --- Dynamic Auth Header Widget ---
    updateHeaderAuth() {
        const authContainer = document.getElementById("header-auth");
        const user = db.state.currentUser;

        if (user) {
            document.body.classList.add("logged-in");
            if (user.role === "admin") {
                document.body.classList.add("admin-role");
            } else {
                document.body.classList.remove("admin-role");
            }

            // Render Profile Dropdown & XP pill
            authContainer.innerHTML = `
                <div class="user-header-widget">
                    ${user.role !== "admin" ? `
                        <div class="user-xp-pill">
                            <i class="fa-solid fa-bolt"></i>
                            <span>Lvl ${user.level} | ${user.xp} XP</span>
                        </div>
                    ` : ""}
                    <div class="user-profile-menu" id="user-profile-menu">
                        <div class="user-profile-avatar">${user.name.charAt(0).toUpperCase()}</div>
                        <!-- Dropdown Menu -->
                        <div class="user-dropdown-menu" id="user-dropdown-menu">
                            <div class="dropdown-header">
                                <div class="dropdown-name">${user.name}</div>
                                <div class="dropdown-email">${user.email}</div>
                            </div>
                            <div class="dropdown-divider"></div>
                            <a href="#dashboard" class="dropdown-item"><i class="fa-solid fa-user"></i> My Profile</a>
                            ${user.role === "admin" ? `<a href="#admin" class="dropdown-item"><i class="fa-solid fa-user-shield"></i> Admin Panel</a>` : ""}
                            <div class="dropdown-divider"></div>
                            <button id="btn-logout" class="dropdown-item logout-btn"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
                        </div>
                    </div>
                </div>
            `;

            // Dropdown Toggle
            const avatar = document.getElementById("user-profile-menu");
            avatar.addEventListener("click", (e) => {
                e.stopPropagation();
                const menu = document.getElementById("user-dropdown-menu");
                menu.classList.toggle("active");
            });

            // Close dropdown clicking outside
            document.addEventListener("click", () => {
                const menu = document.getElementById("user-dropdown-menu");
                if (menu) menu.classList.remove("active");
            });

            // Logout Listener
            document.getElementById("btn-logout").addEventListener("click", () => {
                db.logout();
                this.updateHeaderAuth();
                this.showToast("Logged out successfully.", "info");
                window.location.hash = "#home";
            });

        } else {
            document.body.classList.remove("logged-in", "admin-role");
            authContainer.innerHTML = `
                <div class="guest-only">
                    <a href="#auth" class="cyber-btn cyber-btn-blue"><i class="fa-solid fa-user-lock"></i> Login / Register</a>
                </div>
            `;
        }
    }

    // --- Modal Setup ---
    setupModalClosers() {
        // Badge closers
        document.getElementById("close-badge-modal").addEventListener("click", () => this.closeModal("badge-modal"));
        document.getElementById("btn-claim-badge").addEventListener("click", () => this.closeModal("badge-modal"));
        
        // Cert closers
        document.getElementById("close-cert-modal").addEventListener("click", () => this.closeModal("certificate-modal"));
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("active");
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove("active");
        }
    }

    // --- Toast Notifications ---
    showToast(message, type = "info") {
        const container = document.getElementById("toast-container");
        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;

        let icon = "fa-circle-info";
        if (type === "success") icon = "fa-circle-check";
        if (type === "warning") icon = "fa-circle-exclamation";
        if (type === "error") icon = "fa-triangle-exclamation";

        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);
        
        // Auto remove
        setTimeout(() => {
            toast.style.animation = "slideIn 0.3s ease reverse forwards";
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // --- Badge Unlock Triggers ---
    showBadgeUnlock(badge) {
        document.getElementById("unlocked-badge-name").textContent = badge.name;
        document.getElementById("unlocked-badge-desc").textContent = badge.description;
        document.getElementById("unlocked-badge-xp").textContent = 100;
        
        // Set icons depending on badge type
        const iconEl = document.getElementById("unlocked-badge-icon");
        iconEl.className = "fa-solid fa-trophy";
        if (badge.id.includes("comp")) {
            iconEl.className = "fa-solid fa-graduation-cap";
        } else if (badge.id.includes("level")) {
            iconEl.className = "fa-solid fa-medal";
        }
        
        this.showModal("badge-modal");
    }

    // --- Dynamic SVG Certificate Renderer ---
    showCertificate(pathId) {
        const user = db.state.currentUser;
        if (!user) return;

        const path = db.state.paths.find(p => p.id === pathId);
        if (!path) return;

        const dateString = new Date().toLocaleDateString(undefined, {
            year: "numeric", month: "long", day: "numeric"
        });

        // Beautiful SVG Certificate Design
        const certSvg = `
            <svg id="certificate-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
                <!-- Background Styles -->
                <rect width="800" height="600" fill="#080c14" />
                <rect x="20" y="20" width="760" height="560" fill="none" stroke="#00f0ff" stroke-width="2" stroke-dasharray="10 5" opacity="0.3" />
                <rect x="30" y="30" width="740" height="540" fill="none" stroke="#39ff14" stroke-width="1" opacity="0.15" />
                
                <!-- Corner Borders -->
                <path d="M 30 70 L 30 30 L 70 30" fill="none" stroke="#00f0ff" stroke-width="4" />
                <path d="M 770 70 L 770 30 L 730 30" fill="none" stroke="#00f0ff" stroke-width="4" />
                <path d="M 30 530 L 30 570 L 70 570" fill="none" stroke="#00f0ff" stroke-width="4" />
                <path d="M 770 530 L 770 570 L 730 570" fill="none" stroke="#00f0ff" stroke-width="4" />
                
                <!-- Background Grid Detail -->
                <g stroke="rgba(0, 240, 255, 0.02)" stroke-width="1">
                    <line x1="100" y1="30" x2="100" y2="570" />
                    <line x1="200" y1="30" x2="200" y2="570" />
                    <line x1="300" y1="30" x2="300" y2="570" />
                    <line x1="400" y1="30" x2="400" y2="570" />
                    <line x1="500" y1="30" x2="500" y2="570" />
                    <line x1="600" y1="30" x2="600" y2="570" />
                    <line x1="700" y1="30" x2="700" y2="570" />
                </g>

                <!-- Watermark Badge -->
                <g transform="translate(400, 300)" opacity="0.05">
                    <circle r="180" fill="none" stroke="#00f0ff" stroke-width="5" stroke-dasharray="12 6" />
                    <polygon points="0,-120 100,-40 60,80 -60,80 -100,-40" fill="none" stroke="#39ff14" stroke-width="3" />
                </g>

                <!-- Certificate Text Content -->
                <text x="400" y="90" font-family="'Outfit', sans-serif" font-weight="800" font-size="28" fill="#ffffff" text-anchor="middle" letter-spacing="4">
                    CYBERPATH ACADEMY
                </text>
                
                <text x="400" y="130" font-family="'Outfit', sans-serif" font-weight="600" font-size="12" fill="#00f0ff" text-anchor="middle" letter-spacing="2">
                    FREE EDUCATION FOR FUTURE CYBER DEFENDERS
                </text>

                <text x="400" y="210" font-family="'Outfit', sans-serif" font-weight="300" font-style="italic" font-size="16" fill="#8a9cae" text-anchor="middle">
                    This certifies that student defender
                </text>

                <text x="400" y="270" font-family="'Outfit', sans-serif" font-weight="700" font-size="36" fill="#39ff14" text-anchor="middle" letter-spacing="1">
                    ${user.name}
                </text>

                <text x="400" y="320" font-family="'Outfit', sans-serif" font-weight="300" font-size="16" fill="#8a9cae" text-anchor="middle">
                    has successfully completed the structured learning path of
                </text>

                <text x="400" y="370" font-family="'Outfit', sans-serif" font-weight="700" font-size="24" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">
                    ${path.title}
                </text>

                <text x="400" y="410" font-family="'Outfit', sans-serif" font-weight="300" font-size="14" fill="#8a9cae" text-anchor="middle">
                    including all theory modules, interactive labs, and validation examinations.
                </text>

                <!-- Signatures and Date -->
                <line x1="150" y1="500" x2="310" y2="500" stroke="#00f0ff" stroke-width="1.5" opacity="0.5" />
                <text x="230" y="520" font-family="'Outfit', sans-serif" font-size="12" fill="#8a9cae" text-anchor="middle">
                    Date: ${dateString}
                </text>

                <line x1="490" y1="500" x2="650" y2="500" stroke="#00f0ff" stroke-width="1.5" opacity="0.5" />
                <!-- Script Signature representation -->
                <text x="570" y="490" font-family="'JetBrains Mono', monospace" font-style="italic" font-weight="700" font-size="16" fill="#00f0ff" text-anchor="middle">
                    Sarah_Mentor
                </text>
                <text x="570" y="520" font-family="'Outfit', sans-serif" font-size="12" fill="#8a9cae" text-anchor="middle">
                    Academics Director
                </text>
                
                <!-- Bottom Seal -->
                <g transform="translate(400, 490)">
                    <circle r="25" fill="#0f1420" stroke="#39ff14" stroke-width="2" />
                    <path d="M -8 -8 L 0 -16 L 8 -8 L 4 -8 L 4 8 L -4 8 L -4 -8 Z" fill="#39ff14" />
                </g>
            </svg>
        `;

        const canvasContainer = document.getElementById("cert-canvas-container");
        canvasContainer.innerHTML = certSvg;

        // Hook download event
        const downloadBtn = document.getElementById("btn-download-cert");
        downloadBtn.onclick = () => {
            const svgString = new XMLSerializer().serializeToString(document.getElementById("certificate-svg"));
            const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
            const svgUrl = URL.createObjectURL(svgBlob);
            
            const downloadLink = document.createElement("a");
            downloadLink.href = svgUrl;
            downloadLink.download = `cyberpath_certificate_${pathId}.svg`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            this.showToast("Certificate downloaded successfully!", "success");
        };

        // Hook print event
        const printBtn = document.getElementById("btn-print-cert");
        printBtn.onclick = () => {
            const printWindow = window.open("", "_blank");
            printWindow.document.write(`
                <html>
                <head>
                    <title>Print Certificate</title>
                    <style>
                        body { margin: 0; background: #000; display: flex; align-items: center; justify-content: center; height: 100vh; }
                        svg { width: 100%; max-width: 900px; height: auto; }
                    </style>
                </head>
                <body>
                    ${certSvg}
                    <script>
                        window.onload = function() {
                            window.print();
                            setTimeout(function() { window.close(); }, 500);
                        }
                    </script>
                </body>
                </html>
            `);
            printWindow.document.close();
        };

        this.showModal("certificate-modal");
    }
}

// Additional Dropdown styling (appended to support navbar layouts)
const dropdownCss = `
.user-profile-menu {
    position: relative;
}
.user-dropdown-menu {
    position: absolute;
    top: 50px;
    right: 0;
    width: 200px;
    background: #0f131a;
    border: 1px solid rgba(0, 240, 255, 0.2);
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    border-radius: 8px;
    padding: 10px 0;
    display: none;
    flex-direction: column;
    z-index: 120;
}
.user-dropdown-menu.active {
    display: flex;
}
.dropdown-header {
    padding: 5px 15px 8px 15px;
}
.dropdown-name {
    font-weight: 700;
    color: #ffffff;
    font-size: 0.95rem;
}
.dropdown-email {
    font-size: 0.75rem;
    color: var(--text-muted);
}
.dropdown-divider {
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin: 8px 0;
}
.dropdown-item {
    padding: 8px 15px;
    color: var(--text-muted);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-family: var(--font-ui);
    transition: var(--transition);
}
.dropdown-item:hover {
    color: var(--primary);
    background: rgba(0,240,255,0.05);
}
.dropdown-item.logout-btn:hover {
    color: var(--error);
    background: rgba(255,51,102,0.05);
}
`;

// Insert the dropdown CSS stylesheet programmatically
const styleSheet = document.createElement("style");
styleSheet.innerText = dropdownCss;
document.head.appendChild(styleSheet);

export const ui = new UIManager();
