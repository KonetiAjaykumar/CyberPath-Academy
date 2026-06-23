/* ==========================================================================
   CYBERPATH ACADEMY - Hash-Based Router
   ========================================================================== */

import { db } from "./state.js";
import { ui } from "./ui.js";

// Lazy loading handlers
const routes = {
    "home": async (params) => {
        const { renderHome } = await import("./components/courses.js");
        renderHome();
    },
    "auth": async (params) => {
        const { renderAuth } = await import("./components/auth.js");
        renderAuth();
    },
    "dashboard": async (params) => {
        const { renderDashboard } = await import("./components/dashboard.js");
        renderDashboard();
    },
    "paths": async (params) => {
        const { renderPaths } = await import("./components/courses.js");
        renderPaths();
    },
    "path": async (params) => {
        const { renderPathDetails } = await import("./components/courses.js");
        renderPathDetails(params.id);
    },
    "lesson": async (params) => {
        const { renderLesson } = await import("./components/courses.js");
        renderLesson(params.path, params.module);
    },
    "labs": async (params) => {
        const { renderLabsHub } = await import("./components/labs.js");
        renderLabsHub();
    },
    "lab": async (params) => {
        const { renderLab } = await import("./components/labs.js");
        renderLab(params.path, params.id);
    },
    "forum": async (params) => {
        const { renderForumHub } = await import("./components/forum.js");
        renderForumHub();
    },
    "thread": async (params) => {
        const { renderThread } = await import("./components/forum.js");
        renderThread(params.id);
    },
    "admin": async (params) => {
        const { renderAdmin } = await import("./components/admin.js");
        renderAdmin();
    }
};

class Router {
    constructor() {
        window.addEventListener("hashchange", () => this.handleRouting());
        window.addEventListener("load", () => {
            ui.init(); // Initialize global header/auth elements first
            this.handleRouting();
        });
        
        // Mobile Toggle Listener
        document.getElementById("mobile-toggle").addEventListener("click", () => {
            const nav = document.getElementById("cyber-nav");
            nav.classList.toggle("active");
        });
    }

    parseHash() {
        const hash = window.location.hash.slice(1) || "home";
        const parts = hash.split("?");
        const path = parts[0];
        const queryString = parts[1] || "";
        
        const params = {};
        if (queryString) {
            queryString.split("&").forEach(pair => {
                const [key, value] = pair.split("=");
                params[decodeURIComponent(key)] = decodeURIComponent(value);
            });
        }
        return { path, params };
    }

    async handleRouting() {
        const { path, params } = this.parseHash();
        const user = db.state.currentUser;

        // Route Guard: Student Dashboard, Labs, Path Details require Auth
        const protectedRoutes = ["dashboard", "paths", "path", "lesson", "labs", "lab", "forum", "thread", "admin"];
        const adminRoutes = ["admin"];

        if (protectedRoutes.includes(path) && !user) {
            ui.showToast("Authentication required to access this resource", "warning");
            window.location.hash = "#auth";
            return;
        }

        if (adminRoutes.includes(path) && (!user || user.role !== "admin")) {
            ui.showToast("Unauthorized. Administrator access only.", "error");
            window.location.hash = "#dashboard";
            return;
        }

        // Collapse mobile nav on routing
        document.getElementById("cyber-nav").classList.remove("active");

        // Set nav link active state
        this.updateActiveNavLink(path);

        // Hide all views first
        const views = document.querySelectorAll(".app-view");
        views.forEach(v => v.classList.remove("active-view"));

        // Match route
        const routeHandler = routes[path];
        if (routeHandler) {
            try {
                // Show matching view container
                const containerId = `view-${path}`;
                const viewContainer = document.getElementById(containerId);
                if (viewContainer) {
                    viewContainer.classList.add("active-view");
                }
                
                // Execute component code
                await routeHandler(params);
            } catch (err) {
                console.error("Routing error for: " + path, err);
                ui.showToast("Failed to load view components.", "error");
            }
        } else {
            // Page not found -> default to home
            window.location.hash = "#home";
        }
    }

    updateActiveNavLink(path) {
        const links = document.querySelectorAll(".nav-link");
        links.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href === `#${path}`) {
                link.classList.add("active");
            }
        });
    }
}

export const router = new Router();
