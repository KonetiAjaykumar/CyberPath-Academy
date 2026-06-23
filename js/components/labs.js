/* ==========================================================================
   CYBERPATH ACADEMY - Interactive Lab Simulations
   ========================================================================== */

import { db } from "../state.js";
import { ui } from "../ui.js";

// --- Renders Labs Hub View ---
export function renderLabsHub() {
    const container = document.getElementById("view-labs");
    const user = db.state.currentUser;
    if (!user) return;

    const completedLabs = user.completedLabs || [];

    // Aggregate all labs from paths
    const allLabs = [];
    db.state.paths.forEach(path => {
        if (path.labs) {
            path.labs.forEach(lab => {
                allLabs.push({
                    ...lab,
                    pathId: path.id,
                    pathTitle: path.title
                });
            });
        }
    });

    container.innerHTML = `
        <h1 class="cyber-title neon-text-blue"><i class="fa-solid fa-flask"></i> Hands-on Laboratories</h1>
        <p style="margin-bottom: 30px; max-width: 700px;">
            Apply theory to practice. Solve sandbox puzzles, extract flags, and submit them below to confirm your defensive comprehension.
        </p>

        <div class="labs-grid">
            ${allLabs.map(lab => {
                const isCompleted = completedLabs.includes(lab.id);
                return `
                    <div class="cyber-card lab-card ${isCompleted ? 'green-accent' : ''}">
                        <div>
                            <div class="lab-meta">
                                <span class="lab-difficulty ${lab.difficulty}">${lab.difficulty}</span>
                                <span>${lab.pathTitle}</span>
                            </div>
                            <h3 style="margin-bottom: 10px;">${lab.title}</h3>
                            <p style="font-size:0.85rem; margin-bottom: 20px;">${lab.description}</p>
                        </div>
                        
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span class="neon-text-green" style="font-weight:700;">+${lab.xp} XP</span>
                            <button class="cyber-btn ${isCompleted ? 'cyber-btn-green' : 'cyber-btn-blue'}" 
                                    data-path="${lab.pathId}" data-lab="${lab.id}" style="padding: 6px 12px; font-size: 0.75rem;">
                                ${isCompleted ? '<i class="fa-solid fa-rotate-right"></i> Redo Lab' : '<i class="fa-solid fa-flask"></i> Spin Lab'}
                            </button>
                        </div>
                    </div>
                `;
            }).join("")}
        </div>
    `;

    // Hook launch clicks
    container.querySelectorAll(".cyber-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const pathId = btn.getAttribute("data-path");
            const labId = btn.getAttribute("data-lab");
            window.location.hash = `#lab?path=${pathId}&id=${labId}`;
        });
    });
}

// --- Renders Single Lab Sandboxed Environment ---
export function renderLab(pathId, labId) {
    const container = document.getElementById("view-lab");
    const user = db.state.currentUser;
    if (!user) return;

    const path = db.state.paths.find(p => p.id === pathId);
    const lab = path ? path.labs.find(l => l.id === labId) : null;

    if (!path || !lab) {
        window.location.hash = "#labs";
        return;
    }

    const isCompleted = user.completedLabs ? user.completedLabs.includes(labId) : false;

    // Render basic layout: Left instructions, Right simulator
    container.innerHTML = `
        <div style="margin-bottom: 20px; display:flex; justify-content:space-between; align-items:center;">
            <a href="#path?id=${pathId}" class="cyber-btn" style="padding: 6px 12px; font-size: 0.8rem;">
                <i class="fa-solid fa-arrow-left"></i> Exit Lab
            </a>
            <span class="user-xp-pill" style="background:rgba(255, 159, 0, 0.1); border-color:var(--warning); color:var(--warning);">
                SANDBOX INTERACTIVE
            </span>
        </div>

        <div class="lesson-layout">
            <!-- Left instructions panel -->
            <div class="cyber-card" style="display:flex; flex-direction:column; gap:20px;">
                <h2 class="neon-text-blue"><i class="fa-solid fa-circle-info"></i> Lab Mission</h2>
                <h3 style="margin-top:-10px; color:#ffffff;">${lab.title}</h3>
                
                <div id="lab-instructions-text" style="font-size:0.95rem; line-height:1.6;">
                    <!-- Filled by specific lab engine -->
                </div>

                <div class="dropdown-divider" style="margin: 5px 0;"></div>

                <!-- Flag submission form -->
                <form id="form-submit-flag">
                    <div class="form-group">
                        <label for="lab-flag-input" style="font-weight:700;">Submit Flag</label>
                        <input type="text" id="lab-flag-input" class="cyber-input" placeholder="e.g. FLAG{SECRET_CODE}" required>
                    </div>
                    <button type="submit" class="cyber-btn cyber-btn-green" style="width:100%; margin-top: 5px;">
                        <i class="fa-solid fa-flag"></i> Submit Credentials
                    </button>
                </form>

                ${isCompleted ? `
                    <div class="user-xp-pill" style="border-color:var(--success); color:var(--success); text-align:center; display:block; padding:8px;">
                        <i class="fa-solid fa-check"></i> You have already completed this lab!
                    </div>
                ` : ""}
            </div>

            <!-- Right interactive simulator -->
            <div id="lab-simulator-pane">
                <!-- Filled dynamically by specific lab engines -->
            </div>
        </div>
    `;

    // Boot specific lab engine logic
    initSpecificLab(pathId, labId);
}

function initSpecificLab(pathId, labId) {
    const flagInput = document.getElementById("lab-flag-input");
    const flagForm = document.getElementById("form-submit-flag");

    let targetFlag = "";

    // Set directions and compile target flags
    if (labId === "lab-ping-traceroute") {
        targetFlag = "FLAG{ICMP_PING_SUCCESS}";
        renderPingTracerouteLab();
    } else if (labId === "lab-packet-analysis") {
        targetFlag = "FLAG{WIRESHARK_HEX_DECODER}";
        renderPacketAnalysisLab();
    } else if (labId === "lab-linux-navigation") {
        targetFlag = "FLAG{CHMOD_LINUX_WIZARD}";
        renderLinuxTerminalLab();
    } else if (labId === "lab-sqli") {
        targetFlag = "FLAG{SQLI_BYPASS_AUTH}";
        renderSqlInjectionLab();
    } else if (labId === "lab-xss") {
        targetFlag = "FLAG{STORED_XSS_COOKIE_STEALER}";
        renderXssLab();
    } else if (labId === "lab-tools") {
        targetFlag = "FLAG{PROXY_BURP_COOKIE_MOD}";
        renderToolsLab();
    }

    // Flag submit listener
    flagForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = flagInput.value.trim();

        if (value.toUpperCase() === targetFlag.toUpperCase()) {
            const res = db.completeLab(pathId, labId);
            ui.showToast("Congratulations! Credentials verified successfully.", "success");
            if (res && res.firstTime) {
                ui.showToast(`Gained +${res.xpGained} XP!`, "success");
            }
            window.location.hash = `#path?id=${pathId}`; // Back to path
        } else {
            ui.showToast("Incorrect flag value. Check lab output or read tips.", "error");
        }
    });
}


/* ==========================================
   SPECIFIC LAB EMULATORS
   ========================================== */

// 1. PING & TRACEROUTE LAB
function renderPingTracerouteLab() {
    const instructions = document.getElementById("lab-instructions-text");
    const simulator = document.getElementById("lab-simulator-pane");

    instructions.innerHTML = `
        <p>Your goal is to audit connectivity with our remote academic server <strong>cyberpath.org</strong>.</p>
        <h4 style="margin: 12px 0 6px 0; color:#fff;">Commands to execute:</h4>
        <ol style="margin-left: 20px;">
            <li>Type <code>ping cyberpath.org</code> to test ICMP echo delays.</li>
            <li>Type <code>traceroute cyberpath.org</code> to audit routing hops.</li>
        </ol>
        <p style="margin-top: 12px;">Solve both commands to receive the credentials key: <code>FLAG{ICMP_PING_SUCCESS}</code>.</p>
    `;

    simulator.innerHTML = `
        <div class="cyber-card" style="height: 100%; display:flex; flex-direction:column; justify-content:space-between;">
            <!-- Network Node Diagram -->
            <div style="background:#090d16; border:1px solid #1f2a3d; border-radius:6px; padding:20px; display:flex; justify-content:space-around; align-items:center; position:relative; overflow:hidden;">
                <!-- Moving Packet -->
                <div id="ping-packet" style="position:absolute; width:8px; height:8px; background:var(--success); border-radius:50%; box-shadow:0 0 8px var(--success); display:none;"></div>
                
                <div class="net-node active-node" id="node-client" style="text-align:center;">
                    <i class="fa-solid fa-laptop" style="font-size:2rem; color:var(--primary);"></i>
                    <div style="font-size:0.75rem; margin-top:5px;">Client</div>
                </div>
                <div style="flex:1; height:2px; background:rgba(255,255,255,0.05); position:relative;" id="wire-1"></div>
                <div class="net-node" id="node-router" style="text-align:center;">
                    <i class="fa-solid fa-server" style="font-size:1.8rem; color:var(--text-muted);"></i>
                    <div style="font-size:0.75rem; margin-top:5px;">Router</div>
                </div>
                <div style="flex:1; height:2px; background:rgba(255,255,255,0.05); position:relative;" id="wire-2"></div>
                <div class="net-node" id="node-isp" style="text-align:center;">
                    <i class="fa-solid fa-network-wired" style="font-size:1.8rem; color:var(--text-muted);"></i>
                    <div style="font-size:0.75rem; margin-top:5px;">ISP Hub</div>
                </div>
                <div style="flex:1; height:2px; background:rgba(255,255,255,0.05); position:relative;" id="wire-3"></div>
                <div class="net-node" id="node-target" style="text-align:center;">
                    <i class="fa-solid fa-earth-americas" style="font-size:2rem; color:var(--text-muted);"></i>
                    <div style="font-size:0.75rem; margin-top:5px;">target.org</div>
                </div>
            </div>

            <!-- Terminal Simulator -->
            <div class="terminal-wrapper" style="margin-top:15px; margin-bottom:0;">
                <div class="terminal-header">
                    <div class="terminal-title"><i class="fa-solid fa-terminal"></i> Command shell</div>
                    <div class="terminal-dots">
                        <span class="terminal-dot dot-red"></span>
                        <span class="terminal-dot dot-yellow"></span>
                        <span class="terminal-dot dot-green"></span>
                    </div>
                </div>
                <div class="terminal-body" id="ping-terminal-body">
                    <div class="terminal-line">Welcome to CyberPath shell. Network utilities ready.</div>
                    <div class="terminal-line">Type 'help' for instructions.</div>
                    <div class="terminal-input-container">
                        <span class="terminal-prompt">user@defender:~$</span>
                        <input type="text" class="terminal-input-line" id="ping-input" autofocus autocomplete="off">
                    </div>
                </div>
            </div>
        </div>
    `;

    const input = document.getElementById("ping-input");
    const terminalBody = document.getElementById("ping-terminal-body");
    
    let pingRan = false;
    let traceRan = false;

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const cmd = input.value.trim().toLowerCase();
            input.value = "";
            
            // Insert user command line
            const line = document.createElement("div");
            line.className = "terminal-line";
            line.innerHTML = `<span class="terminal-prompt">user@defender:~$</span> ${cmd}`;
            terminalBody.insertBefore(line, terminalBody.lastElementChild);

            const out = document.createElement("div");
            out.className = "terminal-line";

            if (cmd === "help") {
                out.innerHTML = "Available commands: <code>ping cyberpath.org</code>, <code>traceroute cyberpath.org</code>, <code>clear</code>";
            } else if (cmd === "ping cyberpath.org") {
                pingRan = true;
                out.innerHTML = `PING cyberpath.org (104.22.4.19): 56 data bytes<br>
                                64 bytes from 104.22.4.19: seq=0 ttl=56 time=11.2 ms<br>
                                64 bytes from 104.22.4.19: seq=1 ttl=56 time=12.4 ms<br>
                                --- cyberpath.org ping statistics ---<br>
                                2 packets transmitted, 2 packets received, 0% packet loss`;
                
                // Animate packet
                animatePingPacket();
            } else if (cmd === "traceroute cyberpath.org") {
                traceRan = true;
                out.innerHTML = `traceroute to cyberpath.org (104.22.4.19), 30 hops max<br>
                                1  192.168.1.1 (gateway)  1.42 ms<br>
                                2  10.0.8.254 (isp-router)  5.80 ms<br>
                                3  104.22.4.19 (cyberpath.org)  11.5 ms`;
                
                // Sequential lights
                animateTracerouteNodes();
            } else if (cmd === "clear") {
                terminalBody.innerHTML = "";
                terminalBody.appendChild(input.parentElement);
                return;
            } else {
                out.innerHTML = `bash: command not found: ${cmd}. Type 'help' for support.`;
            }

            terminalBody.insertBefore(out, terminalBody.lastElementChild);
            terminalBody.scrollTop = terminalBody.scrollHeight;

            // Check if both solved
            if (pingRan && traceRan) {
                const win = document.createElement("div");
                win.className = "terminal-line neon-text-green";
                win.style.fontWeight = "bold";
                win.innerHTML = "<br>[+] CHALLENGE SOLVED! Key unlocked: FLAG{ICMP_PING_SUCCESS}";
                terminalBody.insertBefore(win, terminalBody.lastElementChild);
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        }
    });

    // Sub-animations
    function animatePingPacket() {
        const p = document.getElementById("ping-packet");
        const client = document.getElementById("node-client");
        const target = document.getElementById("node-target");
        
        const clientPos = client.getBoundingClientRect();
        const targetPos = target.getBoundingClientRect();
        const parentPos = client.parentElement.getBoundingClientRect();

        p.style.display = "block";
        p.style.left = (clientPos.left - parentPos.left + 20) + "px";
        p.style.top = (clientPos.top - parentPos.top + 20) + "px";

        // Animate out
        setTimeout(() => {
            p.style.transition = "left 1s linear, top 1s linear";
            p.style.left = (targetPos.left - parentPos.left + 20) + "px";
            
            // Activate nodes
            setTimeout(() => { document.getElementById("node-target").classList.add("active-node"); }, 1000);

            // Animate back
            setTimeout(() => {
                p.style.left = (clientPos.left - parentPos.left + 20) + "px";
                setTimeout(() => { p.style.display = "none"; }, 1000);
            }, 1200);
        }, 100);
    }

    function animateTracerouteNodes() {
        const delay = 500;
        setTimeout(() => {
            document.getElementById("node-router").classList.add("active-node");
            document.getElementById("node-router").querySelector("i").style.color = "var(--primary)";
        }, delay);
        setTimeout(() => {
            document.getElementById("node-isp").classList.add("active-node");
            document.getElementById("node-isp").querySelector("i").style.color = "var(--primary)";
        }, delay * 2);
        setTimeout(() => {
            document.getElementById("node-target").classList.add("active-node");
            document.getElementById("node-target").querySelector("i").style.color = "var(--primary)";
        }, delay * 3);
    }
}

// 2. PACKET ANALYSIS LAB (WIRESHARK)
function renderPacketAnalysisLab() {
    const instructions = document.getElementById("lab-instructions-text");
    const simulator = document.getElementById("lab-simulator-pane");

    instructions.innerHTML = `
        <p>A student learner thinks credentials are leaking from a mock portal. We captured their network packets.</p>
        <p style="margin-top:10px;"><strong>Goal:</strong> Locate the packet containing the HTTP POST login request, select it, and audit the payload parameters to find the secret validation flag.</p>
    `;

    // Wireshark interface layout
    simulator.innerHTML = `
        <div class="cyber-card wireshark-wrapper">
            <!-- ToolBar -->
            <div class="wireshark-toolbar">
                <span style="color:var(--error); font-weight:700;"><i class="fa-solid fa-circle"></i> Capturing Live...</span>
                <span>Filter: <input type="text" value="http" disabled style="background:#0f131a; border:1px solid #273549; color:#fff; font-size:0.75rem; padding:1px 5px; border-radius:3px;"></span>
            </div>
            
            <!-- Packets Grid -->
            <div class="wireshark-packets-pane">
                <table class="packet-table">
                    <thead>
                        <tr>
                            <th style="width: 50px;">No.</th>
                            <th style="width: 80px;">Time</th>
                            <th style="width: 120px;">Source</th>
                            <th style="width: 120px;">Destination</th>
                            <th style="width: 80px;">Protocol</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="packet-row packet-dns" data-id="1">
                            <td>1</td><td>0.000</td><td>192.168.1.15</td><td>8.8.8.8</td><td>DNS</td><td>Standard query 0x2f3c A secure-vault.local</td>
                        </tr>
                        <tr class="packet-row packet-dns" data-id="2">
                            <td>2</td><td>0.045</td><td>8.8.8.8</td><td>192.168.1.15</td><td>DNS</td><td>Standard query response 0x2f3c A 10.0.8.44</td>
                        </tr>
                        <tr class="packet-row packet-tcp" data-id="3">
                            <td>3</td><td>0.120</td><td>192.168.1.15</td><td>10.0.8.44</td><td>TCP</td><td>53421 &rarr; 80 [SYN] Seq=0 Win=64240</td>
                        </tr>
                        <tr class="packet-row packet-tcp" data-id="4">
                            <td>4</td><td>0.165</td><td>10.0.8.44</td><td>192.168.1.15</td><td>TCP</td><td>80 &rarr; 53421 [SYN, ACK] Seq=0 Ack=1</td>
                        </tr>
                        <tr class="packet-row packet-tcp" data-id="5">
                            <td>5</td><td>0.166</td><td>192.168.1.15</td><td>10.0.8.44</td><td>TCP</td><td>53421 &rarr; 80 [ACK] Seq=1 Ack=1</td>
                        </tr>
                        <tr class="packet-row packet-http" data-id="6">
                            <td>6</td><td>0.240</td><td>192.168.1.15</td><td>10.0.8.44</td><td>HTTP</td><td>POST /api/login HTTP/1.1 (application/x-www-form-urlencoded)</td>
                        </tr>
                        <tr class="packet-row packet-tcp" data-id="7">
                            <td>7</td><td>0.295</td><td>10.0.8.44</td><td>192.168.1.15</td><td>TCP</td><td>80 &rarr; 53421 [ACK] Seq=1 Ack=242</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Details Pane -->
            <div class="wireshark-details-pane" id="wireshark-details">
                Select a packet to dissect hex bytes...
            </div>
        </div>
    `;

    // Selection details database
    const packetDetails = {
        "1": `Frame 1: 74 bytes on wire<br>
              Domain Name System (query)<br>
              &nbsp;&nbsp;&nbsp;&nbsp;Queries:<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name: secure-vault.local<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: A (Host Address)`,
        "2": `Frame 2: 90 bytes on wire<br>
              Domain Name System (response)<br>
              &nbsp;&nbsp;&nbsp;&nbsp;Answers:<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;secure-vault.local: type A, class IN, addr 10.0.8.44`,
        "3": `Frame 3: 74 bytes on wire<br>
              Transmission Control Protocol, Src Port: 53421, Dst Port: 80, Seq: 0, Len: 0<br>
              &nbsp;&nbsp;&nbsp;&nbsp;Flags: 0x002 (SYN)`,
        "4": `Frame 4: 74 bytes on wire<br>
              Transmission Control Protocol, Src Port: 80, Dst Port: 53421, Seq: 0, Ack: 1, Len: 0<br>
              &nbsp;&nbsp;&nbsp;&nbsp;Flags: 0x012 (SYN, ACK)`,
        "5": `Frame 5: 66 bytes on wire<br>
              Transmission Control Protocol, Src Port: 53421, Dst Port: 80, Seq: 1, Ack: 1, Len: 0<br>
              &nbsp;&nbsp;&nbsp;&nbsp;Flags: 0x010 (ACK)`,
        "6": `Frame 6: 308 bytes on wire<br>
              Hypertext Transfer Protocol<br>
              &nbsp;&nbsp;&nbsp;&nbsp;POST /api/login HTTP/1.1\\r\\n<br>
              &nbsp;&nbsp;&nbsp;&nbsp;Host: secure-vault.local\\r\\n<br>
              &nbsp;&nbsp;&nbsp;&nbsp;Content-Type: application/x-www-form-urlencoded\\r\\n<br>
              &nbsp;&nbsp;&nbsp;&nbsp;Content-Length: 53\\r\\n\\r\\n<br>
              HTML Form URL Encoded: application/x-www-form-urlencoded<br>
              &nbsp;&nbsp;&nbsp;&nbsp;<strong>Form item: "username" = "admin"</strong><br>
              &nbsp;&nbsp;&nbsp;&nbsp;<strong>Form item: "secret_flag" = "FLAG{WIRESHARK_HEX_DECODER}"</strong>`,
        "7": `Frame 7: 66 bytes on wire<br>
              Transmission Control Protocol, Src Port: 80, Dst Port: 53421, Seq: 1, Ack: 242, Len: 0`
    };

    const rows = simulator.querySelectorAll(".packet-row");
    const details = document.getElementById("wireshark-details");

    rows.forEach(row => {
        row.addEventListener("click", () => {
            // Remove active style
            rows.forEach(r => r.classList.remove("selected"));
            row.classList.add("selected");
            
            const id = row.getAttribute("data-id");
            details.innerHTML = packetDetails[id] || "No decoding structure.";
        });
    });
}

// 3. LINUX TERMINAL LAB
function renderLinuxTerminalLab() {
    const instructions = document.getElementById("lab-instructions-text");
    const simulator = document.getElementById("lab-simulator-pane");

    instructions.innerHTML = `
        <p>Auditing server directories as guest. We need to check configuration settings in the <code>secrets/</code> folder.</p>
        <p style="margin-top:10px;"><strong>Challenge:</strong> Change file permissions of the restricted target file <code>flag.txt</code> to read its contents using standard Linux commands.</p>
        <h4 style="margin: 12px 0 6px 0; color:#fff;">Useful Command Set:</h4>
        <ul style="margin-left: 20px; font-family: monospace; font-size: 0.85rem;">
            <li>ls -l (detail files)</li>
            <li>cd secrets (change path)</li>
            <li>chmod 600 flag.txt (apply read/write to owner)</li>
            <li>cat flag.txt (read file)</li>
        </ul>
    `;

    simulator.innerHTML = `
        <div class="cyber-card" style="padding:0;">
            <div class="terminal-wrapper" style="margin:0;">
                <div class="terminal-header">
                    <div class="terminal-title"><i class="fa-solid fa-terminal"></i> guest@cyberpath-academy:~$</div>
                    <div class="terminal-dots">
                        <span class="terminal-dot dot-red"></span>
                        <span class="terminal-dot dot-yellow"></span>
                        <span class="terminal-dot dot-green"></span>
                    </div>
                </div>
                <div class="terminal-body" id="linux-term-body">
                    <div class="terminal-line">Linux kernel 5.15.0-generic. Shell loaded.</div>
                    <div class="terminal-line">guest@cyberpath-academy:~$</div>
                    <div class="terminal-input-container">
                        <span class="terminal-prompt">guest@cyberpath-academy:~$</span>
                        <input type="text" class="terminal-input-line" id="linux-term-input" autocomplete="off" autofocus>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Local Directory Structure state
    let currentDir = "home"; // "home" or "secrets"
    let flagPermissions = 0; // 000 (locked)

    const input = document.getElementById("linux-term-input");
    const body = document.getElementById("linux-term-body");

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const rawCmd = input.value.trim();
            const cmdParts = rawCmd.split(" ");
            const action = cmdParts[0].toLowerCase();
            const arg = cmdParts[1];

            input.value = "";

            // Print Command prompt line
            const line = document.createElement("div");
            line.className = "terminal-line";
            line.innerHTML = `<span class="terminal-prompt">guest@cyberpath-academy:${currentDir === "home" ? "~" : "~/secrets"}$</span> ${rawCmd}`;
            body.insertBefore(line, body.lastElementChild);

            const out = document.createElement("div");
            out.className = "terminal-line";

            // Bash Command Interpreter
            if (action === "clear") {
                body.innerHTML = "";
                body.appendChild(input.parentElement);
                return;
            } else if (action === "pwd") {
                out.innerHTML = currentDir === "home" ? "/home/guest" : "/home/guest/secrets";
            } else if (action === "ls") {
                if (currentDir === "home") {
                    if (arg === "-l") {
                        out.innerHTML = `drwxr-xr-x 2 guest guest 4096 Jun 23 12:00 secrets<br>-rw-r--r-- 1 guest guest  142 Jun 23 12:00 readme.txt`;
                    } else {
                        out.innerHTML = `readme.txt&nbsp;&nbsp;&nbsp;&nbsp;secrets/`;
                    }
                } else {
                    if (arg === "-l") {
                        const permString = flagPermissions === 600 ? "-rw-------" : "----------";
                        out.innerHTML = `${permString} 1 guest guest   25 Jun 23 12:00 flag.txt<br>-rwxr-xr-x 1 guest guest 1024 Jun 23 12:00 database.db`;
                    } else {
                        out.innerHTML = `database.db&nbsp;&nbsp;&nbsp;&nbsp;flag.txt`;
                    }
                }
            } else if (action === "cd") {
                if (!arg || arg === "~" || arg === "..") {
                    currentDir = "home";
                } else if (arg === "secrets" && currentDir === "home") {
                    currentDir = "secrets";
                } else {
                    out.innerHTML = `bash: cd: ${arg}: No such file or directory`;
                }
            } else if (action === "cat") {
                if (!arg) {
                    out.innerHTML = "cat: missing operand";
                } else if (currentDir === "home" && arg === "readme.txt") {
                    out.innerHTML = "Welcome. Auditor flag configs are secured inside the secrets/ directory. Go find it!";
                } else if (currentDir === "secrets" && arg === "flag.txt") {
                    if (flagPermissions === 600) {
                        out.innerHTML = "<span class='neon-text-green'>FLAG{CHMOD_LINUX_WIZARD}</span>";
                    } else {
                        out.innerHTML = "cat: flag.txt: Permission denied. Access mode invalid.";
                    }
                } else {
                    out.innerHTML = `cat: ${arg}: No such file or file restricted.`;
                }
            } else if (action === "chmod") {
                if (currentDir === "secrets" && arg === "600" && cmdParts[2] === "flag.txt") {
                    flagPermissions = 600;
                    out.innerHTML = "Permissions updated to mode 600 (-rw-------).";
                } else {
                    out.innerHTML = "chmod: usage: chmod [octal-mode] [filename]. Try 'chmod 600 flag.txt'.";
                }
            } else {
                out.innerHTML = `bash: command not found: ${action}. Supported commands: ls, cd, pwd, cat, chmod, clear.`;
            }

            body.insertBefore(out, body.lastElementChild);
            body.scrollTop = body.scrollHeight;
        }
    });
}

// 4. SQL INJECTION LAB
function renderSqlInjectionLab() {
    const instructions = document.getElementById("lab-instructions-text");
    const simulator = document.getElementById("lab-simulator-pane");

    instructions.innerHTML = `
        <p>A web login page is vulnerable to SQL Injection. Let's study how raw SQL inputs evaluate.</p>
        <p style="margin-top:10px;"><strong>Mission:</strong> Input a SQL logic bypass payload inside the username field to authenticate as administrator without knowing the secret password.</p>
        <p style="margin-top:10px;"><strong>Example Bypass Payload:</strong> <code>' OR '1'='1</code></p>
    `;

    simulator.innerHTML = `
        <div class="cyber-card" style="height:100%; display:flex; flex-direction:column; justify-content:space-between;">
            <!-- SQL Statement Visualizer -->
            <div class="sql-query-display" id="sql-query-visual">
                <span class="sql-keyword">SELECT</span> * <span class="sql-keyword">FROM</span> users <span class="sql-keyword">WHERE</span> username = '<span class="sql-variable" id="sql-user-param"></span>' <span class="sql-keyword">AND</span> password = '<span class="sql-variable" id="sql-pass-param"></span>';
            </div>

            <!-- Login HTML Form -->
            <div style="background:#0f131a; border:1px solid rgba(0, 240, 255, 0.15); border-radius:6px; padding:25px; max-width:400px; margin:0 auto; width:100%;">
                <h3 style="text-align:center; margin-bottom:15px; color:#fff;"><i class="fa-solid fa-lock"></i> WebAdmin Access</h3>
                <div class="form-group" style="margin-bottom:12px;">
                    <label>Username</label>
                    <input type="text" id="sqli-user" class="cyber-input" placeholder="e.g. admin" style="padding:8px 12px; font-size:0.9rem;" autocomplete="off">
                </div>
                <div class="form-group" style="margin-bottom:18px;">
                    <label>Password</label>
                    <input type="password" id="sqli-pass" class="cyber-input" placeholder="••••••••" style="padding:8px 12px; font-size:0.9rem;" disabled>
                </div>
                <button class="cyber-btn cyber-btn-blue" id="btn-sqli-login" style="width:100%; padding:8px;">
                    Login
                </button>
            </div>
            
            <!-- Exploit Success popup placeholder -->
            <div id="sqli-success-alert" style="display:none; background:rgba(57, 255, 20, 0.08); border:1px solid var(--success); border-radius:6px; padding:15px; text-align:center; margin-top:20px;">
                <h4 class="neon-text-green"><i class="fa-solid fa-circle-check"></i> Bypass Successful!</h4>
                <p style="font-size:0.85rem; margin-top:5px; color:var(--text-main);">SQL clause evaluated to TRUE. Secret credential: <strong>FLAG{SQLI_BYPASS_AUTH}</strong></p>
            </div>
        </div>
    `;

    const userIn = document.getElementById("sqli-user");
    const userParam = document.getElementById("sql-user-param");
    const loginBtn = document.getElementById("btn-sqli-login");
    const successAlert = document.getElementById("sqli-success-alert");

    // Dynamic SQL updating
    userIn.addEventListener("input", () => {
        userParam.textContent = userIn.value;
    });

    loginBtn.addEventListener("click", () => {
        const val = userIn.value.trim();
        
        // Match SQL bypass payload
        if (val.includes("' OR '1'='1") || val.includes("' or '1'='1")) {
            successAlert.style.display = "block";
            ui.showToast("SQL Injection Successful!", "success");
        } else {
            ui.showToast("Access Denied: Invalid database credentials query.", "error");
        }
    });
}

// 5. XSS SIMULATION LAB
function renderXssLab() {
    const instructions = document.getElementById("lab-instructions-text");
    const simulator = document.getElementById("lab-simulator-pane");

    instructions.innerHTML = `
        <p>A social application comment feed is printing user posts directly to the browser DOM without HTML escaping.</p>
        <p style="margin-top:10px;"><strong>Goal:</strong> Inject a script payload into the comment field that fires a pop-up alert dialog to prove XSS vulnerabilities exist.</p>
        <p style="margin-top:10px;"><strong>Payload template:</strong> <code>&lt;script&gt;alert(1)&lt;/script&gt;</code></p>
    `;

    simulator.innerHTML = `
        <div class="cyber-card" style="height:100%; display:flex; flex-direction:column; justify-content:space-between;">
            <!-- Social Feed List -->
            <div style="background:#090d16; border:1px solid #1f2a3d; border-radius:6px; padding:15px; height:200px; overflow-y:auto;" id="xss-feed">
                <div style="margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.03); padding-bottom:8px;">
                    <strong style="color:var(--primary);">Alice_Hacks</strong> <span style="font-size:0.75rem; color:var(--text-muted);">2m ago</span>
                    <p style="font-size:0.85rem; color:#fff; margin-top:3px;">Awesome tutorial paths!</p>
                </div>
            </div>

            <!-- Comment Input -->
            <div style="margin-top:15px; display:flex; gap:10px;">
                <input type="text" id="xss-comment-input" class="cyber-input" placeholder="Type a comment..." style="flex:1; padding:8px 12px; font-size:0.9rem;" autocomplete="off">
                <button class="cyber-btn cyber-btn-blue" id="btn-xss-post" style="padding:8px 16px; font-size:0.8rem;">
                    Post
                </button>
            </div>

            <!-- Custom Browser Alert PopUp Simulator -->
            <div id="xss-browser-popup" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); background:#181f2c; border:1px solid var(--primary); border-radius:8px; width:300px; box-shadow:0 10px 40px rgba(0,0,0,0.8); z-index:90; padding:20px; text-align:center;">
                <h4 style="color:#ffffff; margin-bottom:10px;"><i class="fa-solid fa-triangle-exclamation" style="color:var(--warning);"></i> Browser Alert</h4>
                <p id="xss-popup-text" style="font-size:0.9rem; color:var(--text-main); margin-bottom:20px; font-family:monospace;"></p>
                <button class="cyber-btn cyber-btn-blue" id="btn-xss-close-alert" style="padding:6px 15px; font-size:0.8rem;">OK</button>
            </div>
            
            <div id="xss-flag-display" style="display:none; background:rgba(57, 255, 20, 0.08); border:1px solid var(--success); border-radius:6px; padding:15px; text-align:center; margin-top:15px;">
                <h4 class="neon-text-green"><i class="fa-solid fa-bug"></i> XSS Triggered!</h4>
                <p style="font-size:0.85rem; margin-top:5px;">Cookie stolen: <strong>FLAG{STORED_XSS_COOKIE_STEALER}</strong></p>
            </div>
        </div>
    `;

    const input = document.getElementById("xss-comment-input");
    const feed = document.getElementById("xss-feed");
    const btn = document.getElementById("btn-xss-post");
    const popup = document.getElementById("xss-browser-popup");
    const popupText = document.getElementById("xss-popup-text");
    const flagDisplay = document.getElementById("xss-flag-display");

    btn.addEventListener("click", () => {
        const text = input.value.trim();
        if (!text) return;
        input.value = "";

        // Add to mock feed
        const comm = document.createElement("div");
        comm.style.marginBottom = "12px";
        comm.style.borderBottom = "1px solid rgba(255,255,255,0.03)";
        comm.style.paddingBottom = "8px";
        
        comm.innerHTML = `
            <strong style="color:var(--success);">DefenderGuest</strong> <span style="font-size:0.75rem; color:var(--text-muted);">Just now</span>
            <p style="font-size:0.85rem; color:#fff; margin-top:3px;">${text}</p>
        `;
        feed.appendChild(comm);
        feed.scrollTop = feed.scrollHeight;

        // Check if script payload
        if (text.toLowerCase().includes("<script>") && text.toLowerCase().includes("alert(")) {
            // Trigger simulated popup alert
            setTimeout(() => {
                popupText.innerText = "XSS Script Executed! Cookie: session_id=7a8b9c2d1e0f";
                popup.style.display = "block";
            }, 800);
        }
    });

    document.getElementById("btn-xss-close-alert").addEventListener("click", () => {
        popup.style.display = "none";
        flagDisplay.style.display = "block";
        ui.showToast("Stored XSS Exploit Confirmed!", "success");
    });
}

// 6. TOOLS LAB (NMAP & BURP proxy)
function renderToolsLab() {
    const instructions = document.getElementById("lab-instructions-text");
    const simulator = document.getElementById("lab-simulator-pane");

    instructions.innerHTML = `
        <p>A corporate server <strong>target.local</strong> is running. We want to test its headers.</p>
        <h4 style="margin: 12px 0 6px 0; color:#fff;">Steps:</h4>
        <ol style="margin-left: 20px; font-size: 0.9rem;">
            <li>Run Nmap port scan by typing <code>nmap -sV target.local</code> in the console.</li>
            <li>In the interceptor below, change the Cookie value from <code>role=user</code> to <code>role=admin</code>, and forward the request.</li>
        </ol>
        <p style="margin-top: 10px;">Solve to capture key: <code>FLAG{PROXY_BURP_COOKIE_MOD}</code>.</p>
    `;

    simulator.innerHTML = `
        <div class="cyber-card" style="height:100%; display:flex; flex-direction:column; gap:15px;">
            <!-- Console -->
            <div style="background:#090d16; border:1px solid #1f2a3d; border-radius:6px; padding:12px; height:130px; overflow-y:auto; font-family:monospace; font-size:0.8rem; color:var(--success);" id="tools-console">
                <div>Security Terminal ready. Enter scan queries...</div>
                <div style="display:flex; align-items:center; gap:5px; margin-top:5px;">
                    <span>$</span>
                    <input type="text" id="tools-nmap-input" style="background:transparent; border:none; color:var(--success); font-family:monospace; outline:none; flex:1;" autocomplete="off">
                </div>
            </div>

            <!-- Burp Interceptor Mock -->
            <div style="background:#1e293b; border:1px solid rgba(0, 240, 255, 0.2); border-radius:6px; overflow:hidden;">
                <!-- Header -->
                <div style="background:#0f172a; padding:8px 15px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(0, 240, 255, 0.1);">
                    <strong style="color:#fff;"><i class="fa-solid fa-scissors"></i> Proxy Intercept Panel</strong>
                    <span class="user-xp-pill" style="font-size:0.75rem; border-color:var(--error); color:var(--error);" id="burp-status">INTERCEPT IS OFF</span>
                </div>
                <!-- Controls -->
                <div style="background:#334155; padding:8px 15px; display:flex; gap:10px;">
                    <button class="cyber-btn" id="btn-burp-toggle" style="padding:4px 10px; font-size:0.75rem; color:#fff; border-color:#fff;">Toggle Intercept</button>
                    <button class="cyber-btn" id="btn-burp-forward" style="padding:4px 10px; font-size:0.75rem;" disabled>Forward Request</button>
                </div>
                <!-- Text Area -->
                <div style="padding:15px;">
                    <textarea id="burp-headers" class="cyber-input" style="height:100px; font-family:monospace; font-size:0.8rem; line-height:1.4;" disabled>
GET /admin HTTP/1.1
Host: target.local
User-Agent: Mozilla/5.0
Cookie: role=user
                    </textarea>
                </div>
            </div>
            
            <!-- Response View -->
            <div id="tools-response" style="background:#090d16; border:1px dashed rgba(255,255,255,0.05); border-radius:6px; padding:15px; font-family:monospace; font-size:0.8rem; text-align:center; min-height:80px; display:flex; align-items:center; justify-content:center;">
                HTTP Server logs will show here after request forwarding...
            </div>
        </div>
    `;

    const consoleDiv = document.getElementById("tools-console");
    const nmapInput = document.getElementById("tools-nmap-input");
    const burpToggle = document.getElementById("btn-burp-toggle");
    const burpForward = document.getElementById("btn-burp-forward");
    const burpStatus = document.getElementById("burp-status");
    const burpHeaders = document.getElementById("burp-headers");
    const responseBox = document.getElementById("tools-response");

    let interceptOn = false;

    // Nmap parser
    nmapInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const val = nmapInput.value.trim().toLowerCase();
            nmapInput.value = "";

            const line = document.createElement("div");
            line.innerHTML = `<span style="color:var(--primary); font-weight:700;">$</span> ${val}`;
            consoleDiv.insertBefore(line, nmapInput.parentElement);

            const out = document.createElement("div");
            out.style.marginTop = "3px";

            if (val === "nmap -sv target.local") {
                out.innerHTML = `Starting Nmap 7.92 ( https://nmap.org ) at 2026-06-23<br>
                                Nmap scan report for target.local (192.168.1.100)<br>
                                PORT   STATE SERVICE VERSION<br>
                                80/tcp open  http    Apache httpd 2.4.49 (vulnerable)<br>
                                Service Info: OS: Linux`;
                
                // Allow intercepting toggle now
                ui.showToast("Server discovered! You can now turn on the Proxy Interceptor.", "info");
            } else {
                out.innerHTML = `bash: command not found: ${val}. Did you mean 'nmap -sV target.local'?`;
            }

            consoleDiv.insertBefore(out, nmapInput.parentElement);
            consoleDiv.scrollTop = consoleDiv.scrollHeight;
        }
    });

    // Burp Proxy toggle
    burpToggle.addEventListener("click", () => {
        interceptOn = !interceptOn;
        if (interceptOn) {
            burpStatus.textContent = "INTERCEPT IS ON";
            burpStatus.style.borderColor = "var(--success)";
            burpStatus.style.color = "var(--success)";
            burpHeaders.removeAttribute("disabled");
            burpForward.removeAttribute("disabled");
            ui.showToast("Proxy intercept active. Modify request payload.", "success");
        } else {
            burpStatus.textContent = "INTERCEPT IS OFF";
            burpStatus.style.borderColor = "var(--error)";
            burpStatus.style.color = "var(--error)";
            burpHeaders.setAttribute("disabled", "true");
            burpForward.setAttribute("disabled", "true");
        }
    });

    // Forward request logic
    burpForward.addEventListener("click", () => {
        const val = burpHeaders.value;
        
        if (val.includes("role=admin")) {
            responseBox.style.color = "var(--success)";
            responseBox.innerHTML = `<strong>HTTP/1.1 200 OK</strong><br>
                                     Server: Apache/2.4.49<br>
                                     Content: Access Granted. Admin logs: <strong class='neon-text-green'>FLAG{PROXY_BURP_COOKIE_MOD}</strong>`;
            ui.showToast("Admin cookie accepted!", "success");
        } else {
            responseBox.style.color = "var(--error)";
            responseBox.innerHTML = `<strong>HTTP/1.1 403 Forbidden</strong><br>
                                     Content: Unauthorized access role. Request cookie rejected.`;
            ui.showToast("Request rejected: unauthorized cookie role.", "error");
        }
    });
}
