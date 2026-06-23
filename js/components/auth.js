/* ==========================================================================
   CYBERPATH ACADEMY - Auth Screen Components (Login, Signup, Profile)
   ========================================================================== */

import { db } from "../state.js";
import { ui } from "../ui.js";

export function renderAuth() {
    const container = document.getElementById("view-auth");
    
    // Default sub-view is Login
    showLoginForm(container);
}

function showLoginForm(container) {
    container.innerHTML = `
        <div class="auth-grid">
            <div class="cyber-card auth-card">
                <div class="auth-header">
                    <h2 class="neon-text-blue"><i class="fa-solid fa-shield-halved"></i> LOGIN</h2>
                    <p>Access your cyber-defense dashboard</p>
                </div>
                
                <form id="form-login">
                    <div class="form-group">
                        <label for="login-email">Email Address</label>
                        <input type="email" id="login-email" class="cyber-input" placeholder="e.g. kid@cyberpath.org" required>
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <input type="password" id="login-password" class="cyber-input" placeholder="••••••••" required>
                    </div>
                    
                    <button type="submit" class="cyber-btn cyber-btn-blue" style="width: 100%; margin-top: 10px;">
                        <i class="fa-solid fa-right-to-bracket"></i> Authenticate
                    </button>
                </form>

                <div class="auth-divider">OR</div>

                <button class="google-btn" id="btn-google-login">
                    <img src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.min.js" style="display:none;" alt="">
                    <i class="fa-brands fa-google" style="color: #4285F4;"></i> Sign in with Google
                </button>

                <div style="margin-top: 25px; text-align: center; font-size: 0.9rem;">
                    <p>New to CyberPath? <a href="#" id="link-goto-register">Create Account</a></p>
                    <p style="margin-top: 8px;"><a href="#" id="link-goto-reset" style="font-size: 0.8rem; color: var(--text-muted);">Forgot Password?</a></p>
                </div>
            </div>
        </div>
    `;

    // Bind Event Listeners
    document.getElementById("form-login").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const pass = document.getElementById("login-password").value;

        try {
            db.login(email, pass);
            ui.updateHeaderAuth();
            ui.showToast(`Welcome back, ${db.state.currentUser.name}!`, "success");
            window.location.hash = "#dashboard";
        } catch (err) {
            ui.showToast(err.message, "error");
        }
    });

    document.getElementById("btn-google-login").addEventListener("click", () => {
        try {
            db.loginGoogle();
            ui.updateHeaderAuth();
            ui.showToast(`Logged in with Google!`, "success");
            window.location.hash = "#dashboard";
        } catch (err) {
            ui.showToast(err.message, "error");
        }
    });

    document.getElementById("link-goto-register").addEventListener("click", (e) => {
        e.preventDefault();
        showRegisterForm(container);
    });

    document.getElementById("link-goto-reset").addEventListener("click", (e) => {
        e.preventDefault();
        showResetForm(container);
    });
}

function showRegisterForm(container) {
    container.innerHTML = `
        <div class="auth-grid">
            <div class="cyber-card auth-card">
                <div class="auth-header">
                    <h2 class="neon-text-green"><i class="fa-solid fa-user-plus"></i> REGISTER</h2>
                    <p>Join the academy completely for free</p>
                </div>
                
                <form id="form-register">
                    <div class="form-group">
                        <label for="reg-name">Defender Codename / Name</label>
                        <input type="text" id="reg-name" class="cyber-input" placeholder="e.g. Alex Green" required>
                    </div>
                    <div class="form-group">
                        <label for="reg-email">Email Address</label>
                        <input type="email" id="reg-email" class="cyber-input" placeholder="e.g. defender@domain.com" required>
                    </div>
                    <div class="form-group">
                        <label for="reg-password">Password</label>
                        <input type="password" id="reg-password" class="cyber-input" placeholder="Min 6 characters" minlength="6" required>
                    </div>
                    
                    <button type="submit" class="cyber-btn cyber-btn-green" style="width: 100%; margin-top: 10px;">
                        <i class="fa-solid fa-user-check"></i> Deploy Account
                    </button>
                </form>

                <div class="auth-divider">OR</div>

                <button class="google-btn" id="btn-google-login">
                    <i class="fa-brands fa-google" style="color: #4285F4;"></i> Register with Google
                </button>

                <div style="margin-top: 25px; text-align: center; font-size: 0.9rem;">
                    <p>Already registered? <a href="#" id="link-goto-login">Login</a></p>
                </div>
            </div>
        </div>
    `;

    // Bind Event Listeners
    document.getElementById("form-register").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("reg-name").value;
        const email = document.getElementById("reg-email").value;
        const pass = document.getElementById("reg-password").value;

        try {
            db.register(name, email, pass);
            ui.updateHeaderAuth();
            ui.showToast(`Account successfully deployed!`, "success");
            window.location.hash = "#dashboard";
        } catch (err) {
            ui.showToast(err.message, "error");
        }
    });

    document.getElementById("btn-google-login").addEventListener("click", () => {
        try {
            db.loginGoogle();
            ui.updateHeaderAuth();
            ui.showToast(`Registered with Google!`, "success");
            window.location.hash = "#dashboard";
        } catch (err) {
            ui.showToast(err.message, "error");
        }
    });

    document.getElementById("link-goto-login").addEventListener("click", (e) => {
        e.preventDefault();
        showLoginForm(container);
    });
}

function showResetForm(container) {
    container.innerHTML = `
        <div class="auth-grid">
            <div class="cyber-card auth-card">
                <div class="auth-header">
                    <h2 class="neon-text-warning"><i class="fa-solid fa-key"></i> RESET PASSWORD</h2>
                    <p>Reset code will be dispatched to your email</p>
                </div>
                
                <form id="form-reset">
                    <div class="form-group">
                        <label for="reset-email">Email Address</label>
                        <input type="email" id="reset-email" class="cyber-input" placeholder="e.g. kid@cyberpath.org" required>
                    </div>
                    
                    <button type="submit" class="cyber-btn cyber-btn-warning" style="width: 100%; margin-top: 10px;">
                        <i class="fa-solid fa-paper-plane"></i> Send Reset Link
                    </button>
                </form>

                <div style="margin-top: 25px; text-align: center; font-size: 0.9rem;">
                    <p>Remembered credentials? <a href="#" id="link-goto-login">Back to Login</a></p>
                </div>
            </div>
        </div>
    `;

    document.getElementById("form-reset").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("reset-email").value;

        try {
            db.resetPassword(email);
            ui.showToast(`Password reset link dispatched to ${email}`, "success");
            showLoginForm(container);
        } catch (err) {
            ui.showToast(err.message, "error");
        }
    });

    document.getElementById("link-goto-login").addEventListener("click", (e) => {
        e.preventDefault();
        showLoginForm(container);
    });
}
