/* ==========================================================================
   CYBERPATH ACADEMY - State & Data Store
   ========================================================================== */

// --- Initial Learning Paths Data ---
const INITIAL_PATHS = [
    {
        id: "computer-fundamentals",
        title: "Computer Fundamentals",
        description: "Learn the core essentials of computers, operating systems, hardware, and programming.",
        icon: "fa-desktop",
        xpReward: 300,
        modules: [
            {
                id: "what-is-computer",
                title: "What is a Computer",
                video: "https://www.youtube.com/embed/O5nskjZ_GoI", // Mock educational URL
                notes: "<h3>What is a Computer?</h3><p>A computer is an electronic device that manipulates information, or data. It has the ability to store, retrieve, and process data.</p><h3>The Input-Process-Output Model</h3><p>Every computer system operates on three basic steps: inputting data, processing that data using an arithmetic/logic unit (ALU), and outputting the result.</p>",
                quiz: {
                    type: "mcq",
                    question: "What is the primary function of the CPU (Central Processing Unit) in a computer?",
                    options: [
                        "Storing large backup files",
                        "Executing instructions and processing data",
                        "Displaying high-resolution graphics",
                        "Connecting the computer to the internet"
                    ],
                    answer: 1,
                    explanation: "The CPU is the 'brain' of the computer, responsible for executing programming instructions and processing calculations."
                }
            },
            {
                id: "operating-systems",
                title: "Operating Systems",
                notes: "<h3>Operating Systems (OS)</h3><p>An Operating System is system software that manages computer hardware, software resources, and provides common services for computer programs. The three main operating systems are Windows, macOS, and Linux.</p>",
                quiz: {
                    type: "mcq",
                    question: "Which of the following is considered system software?",
                    options: [
                        "Google Chrome web browser",
                        "Microsoft Word editor",
                        "Linux Operating System kernel",
                        "Minecraft game client"
                    ],
                    answer: 2,
                    explanation: "The Operating System (Linux) is system software that manages hardware and resources, unlike applications which run on top of it."
                }
            },
            {
                id: "file-systems",
                title: "File Systems",
                notes: "<h3>File Systems</h3><p>A file system is the method and data structure that an operating system uses to control how data is stored and retrieved. Without a file system, information placed in a storage medium would be one large body of data with no way to tell where one piece of information stops and the next begins.</p>",
                quiz: {
                    type: "mcq",
                    question: "What is the main role of a File System?",
                    options: [
                        "Compiling code to machine language",
                        "Organizing and retrieving files on storage media",
                        "Sending packets across network firewalls",
                        "Generating encryption keys"
                    ],
                    answer: 1,
                    explanation: "File systems (like NTFS, ext4, APFS) handle the indexing, saving, and retrieval of documents on physical disks."
                }
            },
            {
                id: "internet-basics",
                title: "Internet Basics",
                notes: "<h3>Internet Basics</h3><p>The internet is a global network of computers connected together. Computers connect to the internet using cables, phone lines, satellites, or wireless connections. Information travels across these channels using standard rules called protocols.</p>",
                quiz: {
                    type: "mcq",
                    question: "What does the abbreviation URL stand for?",
                    options: [
                        "Universal Route Locator",
                        "Unified Resource Link",
                        "Uniform Resource Locator",
                        "User Request Loop"
                    ],
                    answer: 2,
                    explanation: "URL stands for Uniform Resource Locator, which specifies the web address of a resource on the internet."
                }
            },
            {
                id: "hardware-software",
                title: "Hardware and Software",
                notes: "<h3>Hardware vs. Software</h3><p>Hardware refers to the physical elements of a computer system. Software is a collection of instructions that tell the hardware what to do. Hardware cannot function without software, and software cannot run without hardware.</p>",
                quiz: {
                    type: "mcq",
                    question: "Which of the following is an example of computer hardware?",
                    options: [
                        "Web Browser",
                        "RAM (Random Access Memory)",
                        "Operating System",
                        "DirectX Driver"
                    ],
                    answer: 1,
                    explanation: "RAM is a physical memory module inside the computer, making it hardware."
                }
            },
            {
                id: "basic-programming",
                title: "Basic Programming Concepts",
                notes: "<h3>Introduction to Programming</h3><p>Programming is the process of writing instructions that a computer can perform to solve a problem or complete a task. Key concepts include variables, data types, loops, and conditional statements.</p>",
                quiz: {
                    type: "mcq",
                    question: "What structure allows a program to repeat a block of code multiple times?",
                    options: [
                        "Variable",
                        "Conditional Statement",
                        "Loop",
                        "Function"
                    ],
                    answer: 2,
                    explanation: "Loops (such as 'for' or 'while' loops) are designed to repeat lines of code based on conditions."
                }
            }
        ]
    },
    {
        id: "networking-fundamentals",
        title: "Networking Fundamentals",
        description: "Explore how computers communicate. Master the OSI model, TCP/IP, IP addressing, DNS, and Firewalls.",
        icon: "fa-network-wired",
        xpReward: 400,
        modules: [
            {
                id: "intro-networks",
                title: "Introduction to Networks",
                notes: "<h3>What is a Computer Network?</h3><p>A network consists of two or more computers connected together to share resources, exchange files, or allow communications. Networks can be local (LAN) or wide area (WAN).</p>",
                quiz: {
                    type: "mcq",
                    question: "What type of network is typically confined to a single building or school?",
                    options: ["WAN (Wide Area Network)", "LAN (Local Area Network)", "VPN (Virtual Private Network)", "MAN (Metropolitan Area Network)"],
                    answer: 1,
                    explanation: "A LAN connects devices within a limited geographical area, such as a school or office."
                }
            },
            {
                id: "osi-model",
                title: "OSI Model",
                notes: "<h3>The 7-Layer OSI Model</h3><p>The Open Systems Interconnection (OSI) model characterizes and standardizes the communication functions of a telecommunication or computing system without regard to its underlying internal structure.</p><ol><li>Physical</li><li>Data Link</li><li>Network</li><li>Transport</li><li>Session</li><li>Presentation</li><li>Application</li></ol>",
                quiz: {
                    type: "mcq",
                    question: "Which OSI layer is responsible for routing packets across different networks?",
                    options: ["Layer 2: Data Link", "Layer 3: Network", "Layer 4: Transport", "Layer 7: Application"],
                    answer: 1,
                    explanation: "Layer 3, the Network layer, handles routers, logical addressing (IP), and path determination."
                }
            },
            {
                id: "tcp-ip-model",
                title: "TCP/IP Model",
                notes: "<h3>TCP/IP Suite</h3><p>The TCP/IP model is a condensed version of the OSI model, focusing on 4 layers: Link/Network Access, Internet, Transport, and Application.</p>",
                quiz: {
                    type: "mcq",
                    question: "What layer of TCP/IP maps to the OSI Application, Presentation, and Session layers?",
                    options: ["Internet Layer", "Transport Layer", "Network Access Layer", "Application Layer"],
                    answer: 3,
                    explanation: "The TCP/IP Application layer combines the responsibilities of layers 5, 6, and 7 of the OSI model."
                }
            },
            {
                id: "dns-dhcp",
                title: "DNS & DHCP",
                notes: "<h3>Domain Name System & Dynamic Host Configuration</h3><p><strong>DNS (Domain Name System):</strong> The phonebook of the Web. Translates domain names (e.g., cyberpath.org) to IP addresses.</p><p><strong>DHCP (Dynamic Host Configuration Protocol):</strong> Automatically assigns IP addresses, subnet masks, and gateways to network clients.</p>",
                quiz: {
                    type: "mcq",
                    question: "Which protocol automatically assigns IP addresses to devices when they connect to a network?",
                    options: ["DNS", "HTTP", "DHCP", "FTP"],
                    answer: 2,
                    explanation: "DHCP stands for Dynamic Host Configuration Protocol, designed to dynamically assign IP network settings."
                }
            },
            {
                id: "firewalls-vpn",
                title: "Firewalls & VPNs",
                notes: "<h3>Network Security Devices</h3><p><strong>Firewalls:</strong> Monitor and filter incoming and outgoing network traffic based on established security rules.</p><p><strong>VPN (Virtual Private Network):</strong> Extends a private network across a public network by encrypting the connection channel.</p>",
                quiz: {
                    type: "mcq",
                    question: "How does a VPN secure traffic on a public network?",
                    options: [
                        "By blocking all packet traffic",
                        "By encrypting the communication stream",
                        "By changing the physical MAC address",
                        "By performing port scans"
                    ],
                    answer: 1,
                    explanation: "A VPN encrypts the communication tunnel, preventing packet snooping by third parties on public Wi-Fi."
                }
            }
        ],
        labs: [
            {
                id: "lab-ping-traceroute",
                title: "Ping & Traceroute Lab",
                difficulty: "easy",
                xp: 100,
                description: "Test network connectivity and map routes using ICMP commands in a simulated environment."
            },
            {
                id: "lab-packet-analysis",
                title: "Packet Analysis Lab",
                difficulty: "medium",
                xp: 150,
                description: "Use a Wireshark-style packet inspector to analyze captured frames and find authentication secrets."
            }
        ]
    },
    {
        id: "linux-fundamentals",
        title: "Linux Fundamentals",
        description: "Master the Linux command line. Navigate file systems, manage user permissions, and write bash scripts.",
        icon: "fa-terminal",
        xpReward: 500,
        modules: [
            {
                id: "intro-linux",
                title: "Introduction to Linux",
                notes: "<h3>What is Linux?</h3><p>Linux is an open-source Unix-like operating system kernel, first released by Linus Torvalds in 1991. Today, Linux runs the majority of servers, cloud architectures, and supercomputers globally, and forms the bedrock of security distributions like Kali Linux.</p>",
                quiz: {
                    type: "mcq",
                    question: "Who created the initial version of the Linux kernel?",
                    options: ["Bill Gates", "Linus Torvalds", "Richard Stallman", "Steve Jobs"],
                    answer: 1,
                    explanation: "Linus Torvalds created and released the initial Linux kernel as a hobby in 1991."
                }
            },
            {
                id: "terminal-basics",
                title: "Terminal Basics",
                notes: "<h3>The Command Line Interface (CLI)</h3><p>In Linux, the command terminal is a powerful utility for administering systems. Important commands:</p><ul><li><code>pwd</code>: Print Working Directory (shows where you are)</li><li><code>ls</code>: List directory contents</li><li><code>cd [dir]</code>: Change directory</li><li><code>cat [file]</code>: Concatenate and display file content</li></ul>",
                quiz: {
                    type: "mcq",
                    question: "Which command would you use to list files in a directory along with details like permissions and size?",
                    options: ["cd -l", "ls -l", "pwd -v", "cat -d"],
                    answer: 1,
                    explanation: "The 'ls -l' command displays a detailed (long) list representation of files and directories."
                }
            },
            {
                id: "file-permissions",
                title: "File Permissions",
                notes: "<h3>Linux Permissions (Read, Write, Execute)</h3><p>Linux secures files using permissions. Files have owners, group assignments, and other user policies. Read (r=4), Write (w=2), and Execute (x=1).</p><p>Using <code>chmod</code>, permissions are updated: <code>chmod 755 script.sh</code>.</p>",
                quiz: {
                    type: "mcq",
                    question: "What does chmod 700 translate to in terms of permissions?",
                    options: [
                        "Owner can read, write, and execute; others have no access",
                        "Everyone can read and write but not execute",
                        "Group has full access; Owner has read-only",
                        "Owner can write; others can execute"
                    ],
                    answer: 0,
                    explanation: "chmod 700 represents: Owner = 7 (4+2+1, full rwx), Group = 0 (none), Others = 0 (none)."
                }
            }
        ],
        labs: [
            {
                id: "lab-linux-navigation",
                title: "Linux Command Line Challenge",
                difficulty: "medium",
                xp: 150,
                description: "Access a live simulated Linux terminal, navigate complex pathways, modify permissions, and read hidden flags."
            }
        ]
    },
    {
        id: "cybersecurity-fundamentals",
        title: "Cybersecurity Fundamentals",
        description: "Learn the pillars of security. Explore the CIA Triad, encryption vs hashing, threat types, and passwords.",
        icon: "fa-lock",
        xpReward: 500,
        modules: [
            {
                id: "cia-triad",
                title: "CIA Triad",
                notes: "<h3>The CIA Triad</h3><p>The CIA Triad stands for <strong>Confidentiality, Integrity, and Availability</strong>. This is the foundational model designed to guide information security policies.</p><ul><li><strong>Confidentiality:</strong> Only authorized individuals can access data.</li><li><strong>Integrity:</strong> Data remains accurate and unaltered during transit/storage.</li><li><strong>Availability:</strong> Authorized users can access systems when required.</li></ul>",
                quiz: {
                    type: "mcq",
                    question: "Encryption protects which core pillar of the CIA Triad?",
                    options: ["Availability", "Integrity", "Confidentiality", "Non-repudiation"],
                    answer: 2,
                    explanation: "Encryption ensures only authorized keyholders can view plaintext data, upholding Confidentiality."
                }
            },
            {
                id: "encryption-hashing",
                title: "Encryption and Hashing",
                notes: "<h3>Cryptographic Core Concepts</h3><p><strong>Encryption:</strong> Two-way function. Converts plaintext to ciphertext using a key, and can be decrypted back to plaintext.</p><p><strong>Hashing:</strong> One-way function. Converts inputs to a fixed-length string that cannot be mathematically reversed. Used to verify integrity.</p>",
                quiz: {
                    type: "mcq",
                    question: "Which statement is true regarding Hashing?",
                    options: [
                        "It is a two-way algorithm used for secure communications",
                        "It is a one-way algorithm used to verify data integrity",
                        "A hash can be decrypted by using a private key",
                        "Hashing increases the size of data files"
                    ],
                    answer: 1,
                    explanation: "Hashing produces a unique, fixed-size value from data, which cannot be reversed, making it perfect for checking files for changes."
                }
            }
        ]
    },
    {
        id: "web-security",
        title: "Web Security",
        description: "Discover common web application bugs. Understand SQL injection, XSS, CSRF, and cookies.",
        icon: "fa-globe",
        xpReward: 600,
        modules: [
            {
                id: "sql-injection",
                title: "SQL Injection (SQLi)",
                notes: "<h3>SQL Injection</h3><p>SQL Injection occurs when malicious SQL statements are inserted into entry fields for execution. This can allow attackers to bypass login screens, read records from the database, or modify data.</p>",
                quiz: {
                    type: "mcq",
                    question: "What is the primary cause of SQL Injection vulnerabilities?",
                    options: [
                        "Weak password hashing algorithms",
                        "Unsanitized user inputs concatenated directly into SQL queries",
                        "Lack of HTTP headers on the web server",
                        "Using an outdated version of JavaScript"
                    ],
                    answer: 1,
                    explanation: "When user inputs are merged directly with database statements without validation or parameterized queries, attackers can manipulate the query logic."
                }
            },
            {
                id: "cross-site-scripting",
                title: "Cross-Site Scripting (XSS)",
                notes: "<h3>Cross-Site Scripting (XSS)</h3><p>XSS vulnerabilities occur when an application includes untrusted data in a web page without proper validation or escaping. The attacker can inject malicious scripts into pages viewed by other users.</p>",
                quiz: {
                    type: "mcq",
                    question: "Which type of script is typically injected in an XSS attack?",
                    options: ["Bash Shell script", "SQL database query", "JavaScript", "Python script"],
                    answer: 2,
                    explanation: "XSS injections typically leverage JavaScript because it runs natively in client browsers to steal session tokens or redirect users."
                }
            }
        ],
        labs: [
            {
                id: "lab-sqli",
                title: "SQL Injection Simulator",
                difficulty: "medium",
                xp: 200,
                description: "Exploit a vulnerable database login form by injecting SQL payloads and bypass administration validation."
            },
            {
                id: "lab-xss",
                title: "XSS Simulation Lab",
                difficulty: "medium",
                xp: 200,
                description: "Inject scripts into an interactive feed comment box to inspect how client browsers process unauthorized scripts."
            }
        ]
    },
    {
        id: "ethical-hacking",
        title: "Ethical Hacking Fundamentals",
        description: "Understand the ethical hacking cycle. Learn reconnaissance, active port scans, and assessments.",
        icon: "fa-user-ninja",
        xpReward: 600,
        modules: [
            {
                id: "reconnaissance",
                title: "Reconnaissance",
                notes: "<h3>Passive vs Active Reconnaissance</h3><p>Reconnaissance is the discovery phase of ethical hacking. Passive recon involves gather information without interacting with target assets directly (e.g., searches, DNS records). Active recon involves directly interrogating targets (e.g., port scanning).</p>",
                quiz: {
                    type: "mcq",
                    question: "Which of the following is an example of Passive Reconnaissance?",
                    options: [
                        "Running a vulnerability scan with Nessus",
                        "Searching public DNS registers and Whois directories",
                        "Scanning open ports using Nmap",
                        "Running a directory brute-force attack"
                    ],
                    answer: 1,
                    explanation: "Checking public directories does not send packets directly to target servers, making it passive recon."
                }
            }
        ]
    },
    {
        id: "cyber-attacks",
        title: "Cyber Attacks Education",
        description: "Analyze defensive concepts. Explore phishing, password cracking, ransomware, and MITM details safely.",
        icon: "fa-biohazard",
        xpReward: 650,
        modules: [
            {
                id: "phishing",
                title: "Phishing",
                notes: "<h3>Phishing Attacks</h3><p>Phishing is a type of social engineering where an attacker sends fraudulent messages designed to trick a person into revealing sensitive information.</p><h4>Real-World Example</h4><p>An email spoofing a bank alert requiring credentials update.</p><h4>Prevention Methods</h4><p>Implement Multi-Factor Authentication (MFA), verify sender domain addresses, and educate staff on security awareness.</p>",
                quiz: {
                    type: "mcq",
                    question: "What is the best initial defense against social engineering attacks like Phishing?",
                    options: [
                        "Installing a backup hardware disk",
                        "User awareness training and validating sender domains",
                        "Enabling high-grade file system encryption",
                        "Running diagnostic CPU loops"
                    ],
                    answer: 1,
                    explanation: "Educating users to spot fake communications is the primary buffer against deceptive social engineering."
                }
            }
        ]
    },
    {
        id: "security-tools",
        title: "Security Tools Introduction",
        description: "Get started with professional tools. Hands-on exercises with Wireshark, Nmap, and Burp Suite concepts.",
        icon: "fa-wrench",
        xpReward: 700,
        modules: [
            {
                id: "nmap-burpsuite",
                title: "Nmap and Burp Suite",
                notes: "<h3>Network Mapping and Web Interception</h3><p><strong>Nmap (Network Mapper):</strong> A free and open-source utility for network discovery and security auditing.</p><p><strong>Burp Suite:</strong> An integrated platform for performing security testing of web applications, featuring a local proxy server to capture and modify traffic.</p>",
                quiz: {
                    type: "mcq",
                    question: "What is the primary role of Burp Suite in ethical security audits?",
                    options: [
                        "Cracking hash digests locally",
                        "Intercepting and editing web requests as a proxy",
                        "Scanning network subnets automatically",
                        "Writing scripts to deploy firewalls"
                    ],
                    answer: 1,
                    explanation: "Burp Suite intercepts web traffic between your browser and servers, allowing auditors to inspect headers, parameters, and payloads."
                }
            }
        ],
        labs: [
            {
                id: "lab-tools",
                title: "Security Tools Interceptor",
                difficulty: "hard",
                xp: 250,
                description: "Interactively use simulated Nmap scanners and intercept cookie payloads inside a proxy panel."
            }
        ]
    }
];

// --- Initial Forum Threads ---
const INITIAL_THREADS = [
    {
        id: "thread-1",
        title: "How to set Linux permissions correctly for config files?",
        content: "I am trying to secure my database configuration file in Linux. I want only the owner to read and write to it. What command do I use? Is it chmod 600 or 755?",
        author: "Alex_Beginner",
        date: "2026-06-22T10:30:00Z",
        tag: "linux",
        replies: [
            {
                id: "reply-1-1",
                author: "CyberNinja_99",
                content: "You should use `chmod 600 file.conf`. This grants read and write permissions to the owner, and absolutely zero access to everyone else. `chmod 755` would make it readable and executable by anyone on the system, which is bad for config files containing secrets!",
                date: "2026-06-22T10:45:00Z",
                isMentor: false
            },
            {
                id: "reply-1-2",
                author: "Mentor_Sarah",
                content: "Excellent advice, CyberNinja. To verify the change has taken effect, remember to run `ls -l file.conf`. You should see `-rw-------` in the permissions field. This ensures credentials remain private.",
                date: "2026-06-22T11:15:00Z",
                isMentor: true
            }
        ]
    },
    {
        id: "thread-2",
        title: "What is the difference between TCP and UDP in real life?",
        content: "I read that TCP is connection-oriented and UDP is connectionless. Can anyone give a simple real-world analogy? Thanks!",
        author: "NeoDef",
        date: "2026-06-23T08:00:00Z",
        tag: "networking",
        replies: [
            {
                id: "reply-2-1",
                author: "Mentor_John",
                content: "Think of TCP as a phone call: you dial, wait for the other side to answer, establish a connection, and confirm they heard you ('Can you hear me?'). If they miss a word, they ask you to repeat it. UDP is like sending a postcard: you write the message, address it, drop it in the mailbox, and hope it arrives. You don't verify if they received it. Postcards (UDP) are faster because there's no call setup, which is why video streaming and gaming use UDP, whereas webpages use TCP.",
                date: "2026-06-23T09:12:00Z",
                isMentor: true
            }
        ]
    }
];

// --- Global State Manager class ---
class StateManager {
    constructor() {
        this.load();
    }

    load() {
        try {
            const data = localStorage.getItem("cyberpath_state");
            if (data) {
                this.state = JSON.parse(data);
            } else {
                this.initializeDefault();
            }
        } catch (e) {
            console.error("Failed to load local state", e);
            this.initializeDefault();
        }
    }

    initializeDefault() {
        this.state = {
            currentUser: null, // null means guest
            users: [
                {
                    name: "Admin User",
                    email: "admin@cyberpath.org",
                    password: "password123",
                    role: "admin"
                },
                {
                    name: "Poor Student",
                    email: "student@cyberpath.org",
                    password: "password123",
                    role: "student"
                }
            ],
            paths: INITIAL_PATHS,
            forumThreads: INITIAL_THREADS,
            xpLogs: [],
            // Leaderboard Mock Database
            leaderboard: [
                { name: "CyberAce", level: 12, xp: 5800, badgeCount: 14 },
                { name: "CodeHacker", level: 10, xp: 4950, badgeCount: 11 },
                { name: "RootAccess", level: 8, xp: 3900, badgeCount: 9 },
                { name: "PixelDef", level: 5, xp: 2150, badgeCount: 6 },
                { name: "NetWizard", level: 4, xp: 1800, badgeCount: 5 }
            ]
        };
        this.save();
    }

    save() {
        try {
            localStorage.setItem("cyberpath_state", JSON.stringify(this.state));
        } catch (e) {
            console.error("Failed to save local state", e);
        }
    }

    // --- Authentication ---
    register(name, email, password) {
        // Validation
        if (!name || !email || !password) {
            throw new Error("All registration fields are required.");
        }
        
        const existing = this.state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existing) {
            throw new Error("An account with this email address already exists.");
        }

        const newUser = {
            name,
            email,
            password,
            role: "student",
            level: 1,
            xp: 0,
            streak: 1,
            lastLoginDate: new Date().toISOString().split("T")[0],
            completedLessons: [], // list of moduleIds
            completedLabs: [], // list of labIds
            quizScores: {}, // moduleId -> score %
            badges: [], // list of badgeIds
            certificates: [] // list of pathIds
        };

        this.state.users.push(newUser);
        this.state.currentUser = newUser;
        
        // Add to leaderboard
        this.updateLeaderboardEntry(newUser.name, newUser.xp, newUser.level, 0);
        this.save();
        return newUser;
    }

    login(email, password) {
        if (!email || !password) {
            throw new Error("Email and password are required.");
        }

        const user = this.state.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (!user) {
            throw new Error("Invalid email or password.");
        }

        this.state.currentUser = user;
        
        // Handle login streak
        if (user.role !== "admin") {
            this.updateLoginStreak(user);
        }

        this.save();
        return user;
    }

    loginGoogle() {
        // Simulating Google login redirect
        let googleUser = this.state.users.find(u => u.email === "google.learner@gmail.com");
        if (!googleUser) {
            googleUser = {
                name: "Google Learner",
                email: "google.learner@gmail.com",
                password: "google_oauth_bypass",
                role: "student",
                level: 1,
                xp: 0,
                streak: 1,
                lastLoginDate: new Date().toISOString().split("T")[0],
                completedLessons: [],
                completedLabs: [],
                quizScores: {},
                badges: [],
                certificates: []
            };
            this.state.users.push(googleUser);
            this.updateLeaderboardEntry(googleUser.name, googleUser.xp, googleUser.level, 0);
        }
        
        this.state.currentUser = googleUser;
        this.updateLoginStreak(googleUser);
        this.save();
        return googleUser;
    }

    logout() {
        this.state.currentUser = null;
        this.save();
    }

    resetPassword(email) {
        const user = this.state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!user) {
            throw new Error("No account registered with this email address.");
        }
        // Simulated action
        return true;
    }

    updateProfile(name, password) {
        if (!this.state.currentUser) return;
        const userIndex = this.state.users.findIndex(u => u.email === this.state.currentUser.email);
        if (userIndex !== -1) {
            if (name) {
                // Update leaderboard too
                const oldName = this.state.users[userIndex].name;
                this.state.users[userIndex].name = name;
                this.state.currentUser.name = name;
                
                const lbIdx = this.state.leaderboard.findIndex(l => l.name === oldName);
                if (lbIdx !== -1) this.state.leaderboard[lbIdx].name = name;
            }
            if (password) {
                this.state.users[userIndex].password = password;
                this.state.currentUser.password = password;
            }
            this.save();
        }
    }

    updateLoginStreak(user) {
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

        if (user.lastLoginDate === yesterday) {
            user.streak += 1;
        } else if (user.lastLoginDate !== today) {
            user.streak = 1;
        }
        user.lastLoginDate = today;
    }

    // --- XP & Gamification Engines ---
    addXP(amount, reason = "Completing exercises") {
        const user = this.state.currentUser;
        if (!user || user.role === "admin") return null;

        const originalXP = user.xp;
        user.xp += amount;
        
        // Level logic: level = floor(sqrt(xp / 500)) + 1
        // xpForNextLevel = level * 500
        const newLevel = Math.floor(Math.sqrt(user.xp / 500)) + 1;
        let leveledUp = false;
        if (newLevel > user.level) {
            user.level = newLevel;
            leveledUp = true;
            this.awardBadge("level-" + newLevel, `Level ${newLevel} Defender`, `Reached Level ${newLevel}!`, 200);
        }

        // Sync to users list
        const idx = this.state.users.findIndex(u => u.email === user.email);
        if (idx !== -1) {
            this.state.users[idx].xp = user.xp;
            this.state.users[idx].level = user.level;
        }

        // Update leaderboard
        const badgeCount = user.badges ? user.badges.length : 0;
        this.updateLeaderboardEntry(user.name, user.xp, user.level, badgeCount);

        this.save();
        return { leveledUp, newLevel, gained: amount };
    }

    updateLeaderboardEntry(name, xp, level, badgeCount) {
        const idx = this.state.leaderboard.findIndex(l => l.name === name);
        if (idx !== -1) {
            this.state.leaderboard[idx].xp = xp;
            this.state.leaderboard[idx].level = level;
            this.state.leaderboard[idx].badgeCount = badgeCount;
        } else {
            this.state.leaderboard.push({ name, xp, level, badgeCount });
        }
        // Sort
        this.state.leaderboard.sort((a, b) => b.xp - a.xp);
    }

    awardBadge(badgeId, name, description, xp = 100) {
        const user = this.state.currentUser;
        if (!user) return null;

        if (!user.badges) user.badges = [];
        const alreadyHas = user.badges.find(b => b.id === badgeId);
        if (alreadyHas) return null;

        const newBadge = { id: badgeId, name, description, unlockedAt: new Date().toISOString() };
        user.badges.push(newBadge);

        // Update in DB
        const idx = this.state.users.findIndex(u => u.email === user.email);
        if (idx !== -1) {
            this.state.users[idx].badges = user.badges;
        }

        // Award XP recursively (avoiding infinite loops by ensuring level-up badges don't call this again)
        this.addXP(xp, `Badge Unlock: ${name}`);

        return newBadge;
    }

    // --- Progression Tracking ---
    completeLesson(pathId, moduleId) {
        const user = this.state.currentUser;
        if (!user) return;

        if (!user.completedLessons) user.completedLessons = [];
        if (!user.completedLessons.includes(moduleId)) {
            user.completedLessons.push(moduleId);
            
            // Update db
            const idx = this.state.users.findIndex(u => u.email === user.email);
            if (idx !== -1) this.state.users[idx].completedLessons = user.completedLessons;

            // Earn XP
            const result = this.addXP(50, `Completed module: ${moduleId}`);
            
            // Check for Path completion
            this.checkPathCompletion(pathId);
            
            // Check achievements
            if (user.completedLessons.length === 1) {
                this.awardBadge("first-steps", "First Steps", "Completed your very first lesson on CyberPath!", 100);
            }

            this.save();
            return { firstTime: true, xpGained: 50, xpResult: result };
        }
        return { firstTime: false };
    }

    completeLab(pathId, labId) {
        const user = this.state.currentUser;
        if (!user) return;

        if (!user.completedLabs) user.completedLabs = [];
        if (!user.completedLabs.includes(labId)) {
            user.completedLabs.push(labId);

            // Update db
            const idx = this.state.users.findIndex(u => u.email === user.email);
            if (idx !== -1) this.state.users[idx].completedLabs = user.completedLabs;

            // Get target lab details
            const path = this.state.paths.find(p => p.id === pathId);
            const lab = path ? path.labs.find(l => l.id === labId) : null;
            const xpReward = lab ? lab.xp : 100;

            const result = this.addXP(xpReward, `Completed hands-on lab: ${labId}`);

            // Specific Badges
            if (labId === "lab-linux-navigation") {
                this.awardBadge("linux-wizard", "Terminal Wizard", "Successfully solved the Linux directory permissions lab.", 150);
            } else if (labId === "lab-sqli" || labId === "lab-xss") {
                this.awardBadge("websec-expert", "Web Exploit Defender", "Bypassed SQL injections and analyzed XSS vulnerabilities.", 150);
            }

            this.save();
            return { firstTime: true, xpGained: xpReward, xpResult: result };
        }
        return { firstTime: false };
    }

    submitQuizScore(pathId, moduleId, score) {
        const user = this.state.currentUser;
        if (!user) return;

        if (!user.quizScores) user.quizScores = {};
        const oldScore = user.quizScores[moduleId] || 0;
        
        if (score > oldScore) {
            user.quizScores[moduleId] = score;

            // Sync database
            const idx = this.state.users.findIndex(u => u.email === user.email);
            if (idx !== -1) this.state.users[idx].quizScores = user.quizScores;

            // Give XP if they passed (> 70%)
            let xpEarned = 0;
            if (score >= 70 && oldScore < 70) {
                xpEarned = 70;
                this.addXP(xpEarned, `Passed Quiz: ${moduleId}`);
            }

            this.save();
            return { improved: true, xpGained: xpEarned };
        }
        return { improved: false };
    }

    checkPathCompletion(pathId) {
        const user = this.state.currentUser;
        if (!user) return;

        const path = this.state.paths.find(p => p.id === pathId);
        if (!path) return;

        // Check if all modules are completed and quizzes passed
        const allModulesCompleted = path.modules.every(mod => user.completedLessons.includes(mod.id));
        const allLabsCompleted = !path.labs || path.labs.every(lab => user.completedLabs.includes(lab.id));

        if (allModulesCompleted && allLabsCompleted) {
            if (!user.certificates) user.certificates = [];
            if (!user.certificates.includes(pathId)) {
                user.certificates.push(pathId);

                // Sync db
                const idx = this.state.users.findIndex(u => u.email === user.email);
                if (idx !== -1) this.state.users[idx].certificates = user.certificates;

                // Award Path completion badge
                this.awardBadge(`path-comp-${pathId}`, `${path.title} Master`, `Successfully graduated from the ${path.title} syllabus.`, path.xpReward || 200);
            }
        }
    }

    // --- Community Forum Operations ---
    createForumThread(title, content, tag) {
        const user = this.state.currentUser;
        if (!user) throw new Error("Must be logged in to create discussion threads.");

        const newThread = {
            id: "thread-" + (this.state.forumThreads.length + 1),
            title,
            content,
            author: user.name,
            date: new Date().toISOString(),
            tag,
            replies: []
        };

        this.state.forumThreads.unshift(newThread); // Insert at start
        this.addXP(20, "Posted a discussion topic");
        this.save();
        return newThread;
    }

    createForumReply(threadId, content, askMentor = false) {
        const user = this.state.currentUser;
        if (!user) throw new Error("Must be logged in to reply.");

        const thread = this.state.forumThreads.find(t => t.id === threadId);
        if (!thread) throw new Error("Thread not found.");

        const newReply = {
            id: `reply-${threadId}-${thread.replies.length + 1}`,
            author: user.name,
            content,
            date: new Date().toISOString(),
            isMentor: user.role === "admin"
        };

        thread.replies.push(newReply);
        this.addXP(5, "Replied in discussion");

        // Simulated Mentor Response
        if (askMentor) {
            setTimeout(() => {
                const mentors = ["Mentor_Sarah", "Mentor_John", "CyberSpecialist_Dave"];
                const selectedMentor = mentors[Math.floor(Math.random() * mentors.length)];
                
                const mentorReply = {
                    id: `reply-${threadId}-${thread.replies.length + 2}`,
                    author: selectedMentor,
                    content: `Hi ${user.name}, thanks for asking. That's a very common question. Usually, in defensive security, we recommend auditing configurations regularly and applying the principle of least privilege. Check out the resources in our syllabus or DM me if you need specific advice!`,
                    date: new Date().toISOString(),
                    isMentor: true
                };
                
                thread.replies.push(mentorReply);
                this.save();
                
                // Dispatches standard event so UI updates live
                window.dispatchEvent(new CustomEvent("mentor-reply", { detail: { threadId } }));
            }, 3000);
        }

        this.save();
        return newReply;
    }

    // --- Admin Functions ---
    createPath(id, title, description, icon) {
        if (!this.state.currentUser || this.state.currentUser.role !== "admin") return;
        
        const path = {
            id,
            title,
            description,
            icon,
            xpReward: 300,
            modules: []
        };
        this.state.paths.push(path);
        this.save();
        return path;
    }

    addModuleToPath(pathId, modId, title, notes, quizQ, quizOpts, quizAns, quizExp) {
        if (!this.state.currentUser || this.state.currentUser.role !== "admin") return;

        const path = this.state.paths.find(p => p.id === pathId);
        if (!path) return;

        const newModule = {
            id: modId,
            title,
            notes,
            quiz: {
                type: "mcq",
                question: quizQ,
                options: quizOpts,
                answer: parseInt(quizAns),
                explanation: quizExp
            }
        };

        path.modules.push(newModule);
        this.save();
        return newModule;
    }

    getStudentLogs() {
        return this.state.users.filter(u => u.role !== "admin");
    }
}

export const db = new StateManager();
