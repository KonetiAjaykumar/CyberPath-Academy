/* ==========================================================================
   CYBERPATH ACADEMY - Forum Discussion Board Components
   ========================================================================== */

import { db } from "../state.js";
import { ui } from "../ui.js";

// --- Renders Main Forum Hub ---
export function renderForumHub() {
    const container = document.getElementById("view-forum");
    const user = db.state.currentUser;
    if (!user) return;

    // Outer shell
    container.innerHTML = `
        <div class="forum-header-bar">
            <div>
                <h1 class="cyber-title neon-text-blue"><i class="fa-solid fa-comments"></i> Community Forums</h1>
                <p>Collaborate with fellow student defenders, ask questions, or request mentor assistance.</p>
            </div>
            <button class="cyber-btn cyber-btn-blue" id="btn-new-thread">
                <i class="fa-solid fa-plus"></i> New Discussion
            </button>
        </div>

        <div style="display:grid; grid-template-columns: 3fr 1fr; gap: 30px; margin-top:20px;">
            <!-- Threads List Column -->
            <div>
                <!-- Filters Bar -->
                <div class="cyber-card" style="margin-bottom:20px; padding:15px; display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                    <span>Filter:</span>
                    <button class="cyber-btn tag-filter-btn active" data-tag="all" style="padding:4px 10px; font-size:0.75rem;">All Topics</button>
                    <button class="cyber-btn tag-filter-btn" data-tag="linux" style="padding:4px 10px; font-size:0.75rem;">Linux</button>
                    <button class="cyber-btn tag-filter-btn" data-tag="networking" style="padding:4px 10px; font-size:0.75rem;">Networking</button>
                    <button class="cyber-btn tag-filter-btn" data-tag="websec" style="padding:4px 10px; font-size:0.75rem;">Web Security</button>
                </div>

                <!-- Discussion Items -->
                <div class="forum-threads-list" id="threads-container">
                    <!-- Threads populated dynamically -->
                </div>
            </div>

            <!-- Sidebar Info/Groups -->
            <div>
                <div class="cyber-card" style="margin-bottom:20px;">
                    <h3 class="cyber-title-sm" style="border-left-color: var(--warning);"><i class="fa-solid fa-chalkboard-user"></i> Mentor Support</h3>
                    <p style="font-size:0.85rem; margin-top:10px; line-height:1.5;">
                        Stuck on a lab or concept? Click <strong>"Ask a Mentor"</strong> when posting a reply to request guidance from our certified professionals.
                    </p>
                </div>
                <div class="cyber-card">
                    <h3 class="cyber-title-sm"><i class="fa-solid fa-bullhorn"></i> Announcements</h3>
                    <div style="font-size:0.85rem; margin-top:10px; display:flex; flex-direction:column; gap:12px;">
                        <div>
                            <strong style="color:var(--primary);">[System] Level 3 Labs Live</strong>
                            <p style="color:var(--text-muted); font-size:0.75rem; margin-top:2px;">New SQL injection exercises added to curriculum.</p>
                        </div>
                        <div>
                            <strong style="color:var(--primary);">[Event] Weekend CTF Tournament</strong>
                            <p style="color:var(--text-muted); font-size:0.75rem; margin-top:2px;">Register for Saturday's practice flags search.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Inline Thread Creator Modal -->
        <div class="modal-overlay" id="thread-create-modal">
            <div class="cyber-modal">
                <button class="close-modal" id="close-thread-modal"><i class="fa-solid fa-xmark"></i></button>
                <h3 class="cyber-title-sm neon-text-blue"><i class="fa-solid fa-pen-to-square"></i> New Discussion Topic</h3>
                
                <form id="form-create-thread" style="margin-top:20px;">
                    <div class="form-group">
                        <label for="thread-title-input">Topic Title</label>
                        <input type="text" id="thread-title-input" class="cyber-input" placeholder="Summarize your issue..." required>
                    </div>
                    <div class="form-group">
                        <label for="thread-tag-select">Category Tag</label>
                        <select id="thread-tag-select" class="cyber-input" style="background:#07090e;">
                            <option value="general">General Help</option>
                            <option value="linux">Linux Fundamentals</option>
                            <option value="networking">Networking Fundamentals</option>
                            <option value="websec">Web Security</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="thread-content-input">Detail Message</label>
                        <textarea id="thread-content-input" class="cyber-input" style="height:120px; line-height:1.4;" placeholder="Describe your questions or findings in detail..." required></textarea>
                    </div>
                    <button type="submit" class="cyber-btn cyber-btn-blue" style="width:100%;">
                        <i class="fa-solid fa-paper-plane"></i> Deploy Post
                    </button>
                </form>
            </div>
        </div>
    `;

    // Render list
    renderThreadsList("all");

    // Modal listeners
    const modal = document.getElementById("thread-create-modal");
    document.getElementById("btn-new-thread").addEventListener("click", () => {
        modal.classList.add("active");
    });
    document.getElementById("close-thread-modal").addEventListener("click", () => {
        modal.classList.remove("active");
    });

    // Handle Thread submission
    document.getElementById("form-create-thread").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("thread-title-input").value;
        const tag = document.getElementById("thread-tag-select").value;
        const msg = document.getElementById("thread-content-input").value;

        db.createForumThread(title, msg, tag);
        ui.showToast("Discussion thread posted successfully!", "success");
        
        // Reset form & close
        e.target.reset();
        modal.classList.remove("active");
        
        // Re-render
        renderThreadsList("all");
    });

    // Hook filter buttons
    const filterBtns = container.querySelectorAll(".tag-filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const tag = btn.getAttribute("data-tag");
            renderThreadsList(tag);
        });
    });
}

function renderThreadsList(filterTag) {
    const list = document.getElementById("threads-container");
    let threads = db.state.forumThreads;

    if (filterTag !== "all") {
        threads = threads.filter(t => t.tag === filterTag);
    }

    if (threads.length === 0) {
        list.innerHTML = `
            <div style="text-align:center; padding: 40px; color:var(--text-muted); border:1px dashed rgba(255,255,255,0.05); border-radius:6px; background:var(--bg-card);">
                <p>No discussion threads found in this category yet.</p>
            </div>
        `;
        return;
    }

    list.innerHTML = threads.map(thread => {
        const hasMentorReply = thread.replies.some(r => r.isMentor);
        const replyCount = thread.replies ? thread.replies.length : 0;
        
        return `
            <div class="cyber-card forum-thread-card" style="padding: 16px 20px;">
                <div class="thread-stats">
                    <div class="thread-stat-val">${replyCount}</div>
                    <div class="thread-stat-lbl">Replies</div>
                </div>
                
                <div class="thread-main-content">
                    <h3 class="thread-title" data-id="${thread.id}">${thread.title}</h3>
                    <div class="thread-meta">
                        <span>By <strong>${thread.author}</strong></span>
                        <span>&bull;</span>
                        <span>${new Date(thread.date).toLocaleDateString()}</span>
                        <span>&bull;</span>
                        <span class="thread-tag tag-${thread.tag}">${thread.tag.toUpperCase()}</span>
                        ${hasMentorReply ? `<span class="mentor-badge"><i class="fa-solid fa-user-tie"></i> Mentor Active</span>` : ""}
                    </div>
                </div>
                
                <button class="cyber-btn" data-thread="${thread.id}" style="padding: 6px 12px; font-size:0.75rem;">
                    View <i class="fa-solid fa-angles-right"></i>
                </button>
            </div>
        `;
    }).join("");

    // Add listeners to titles and view buttons
    const triggerThreadView = (threadId) => {
        window.location.hash = `#thread?id=${threadId}`;
    };

    list.querySelectorAll(".thread-title").forEach(title => {
        title.addEventListener("click", () => triggerThreadView(title.getAttribute("data-id")));
    });

    list.querySelectorAll("[data-thread]").forEach(btn => {
        btn.addEventListener("click", () => triggerThreadView(btn.getAttribute("data-thread")));
    });
}

// --- Renders Single Thread detail reply page ---
export function renderThread(threadId) {
    const container = document.getElementById("view-forum");
    const user = db.state.currentUser;
    if (!user) return;

    const thread = db.state.forumThreads.find(t => t.id === threadId);
    if (!thread) {
        window.location.hash = "#forum";
        return;
    }

    const loadThreadData = () => {
        container.innerHTML = `
            <div style="margin-bottom: 20px;">
                <a href="#forum" class="cyber-btn" style="padding: 6px 12px; font-size: 0.8rem;">
                    <i class="fa-solid fa-arrow-left"></i> Back to Board
                </a>
            </div>

            <!-- OP card -->
            <div class="cyber-card">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:15px; flex-wrap:wrap; gap:10px;">
                    <div>
                        <h2 class="neon-text-blue" style="font-size:1.4rem;">${thread.title}</h2>
                        <div style="font-size:0.8rem; color:var(--text-muted); margin-top:5px;">
                            Posted by <strong>${thread.author}</strong> on ${new Date(thread.date).toLocaleString()}
                        </div>
                    </div>
                    <span class="thread-tag tag-${thread.tag}">${thread.tag.toUpperCase()}</span>
                </div>
                <p style="color:#ffffff; font-size:0.95rem; line-height:1.6; word-break:break-all;">
                    ${thread.content}
                </p>
            </div>

            <!-- Replies List Header -->
            <h3 class="cyber-title-sm" style="margin-top:30px; margin-bottom:15px;"><i class="fa-solid fa-reply-all"></i> Replies (${thread.replies.length})</h3>

            <!-- Replies list -->
            <div class="post-replies-list" id="replies-container">
                ${thread.replies.map(reply => `
                    <div class="reply-item ${reply.isMentor ? 'mentor-reply' : ''}">
                        <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.8rem; color:var(--text-muted);">
                            <span>
                                <strong style="color:${reply.isMentor ? 'var(--warning)' : 'var(--primary)'};">
                                    ${reply.author}
                                </strong>
                                ${reply.isMentor ? '<span class="mentor-badge" style="margin-left:5px;">Mentor</span>' : ""}
                            </span>
                            <span>${new Date(reply.date).toLocaleString()}</span>
                        </div>
                        <p style="color:var(--text-main); font-size:0.9rem; line-height:1.5;">${reply.content}</p>
                    </div>
                `).join("")}
            </div>

            <!-- Reply Form Box -->
            <div class="cyber-card" style="margin-top:35px;">
                <h3 class="cyber-title-sm" style="font-size:1.1rem; border-left-color: var(--success);"><i class="fa-solid fa-reply"></i> Submit Reply</h3>
                <form id="form-submit-reply" style="margin-top:15px;">
                    <div class="form-group">
                        <textarea id="reply-text-input" class="cyber-input" style="height:100px; line-height:1.4;" placeholder="Input your analysis or questions..." required></textarea>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                        <label style="display:flex; align-items:center; gap:8px; font-size:0.85rem; cursor:pointer;">
                            <input type="checkbox" id="reply-ask-mentor" style="width:16px; height:16px; accent-color:var(--warning);">
                            <span><i class="fa-solid fa-chalkboard-user" style="color:var(--warning);"></i> Ask a Mentor for professional feedback</span>
                        </label>
                        <button type="submit" class="cyber-btn cyber-btn-green" style="padding: 8px 20px;">
                            <i class="fa-solid fa-paper-plane"></i> Deploy Reply
                        </button>
                    </div>
                </form>
            </div>
        `;

        // Reply submission action
        document.getElementById("form-submit-reply").addEventListener("submit", (e) => {
            e.preventDefault();
            const text = document.getElementById("reply-text-input").value;
            const askMentor = document.getElementById("reply-ask-mentor").checked;

            db.createForumReply(threadId, text, askMentor);
            ui.showToast("Reply submitted!", "success");
            
            // Reload thread page content
            loadThreadData();
        });
    };

    // Initial render
    loadThreadData();

    // Event listener: updates view live when simulated mentor responds
    window.addEventListener("mentor-reply", (e) => {
        if (e.detail.threadId === threadId) {
            ui.showToast("A CyberPath Mentor has replied to your post!", "warning");
            loadThreadData();
        }
    });
}
