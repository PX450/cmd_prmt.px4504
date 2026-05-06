let inputState = 'BOOTING'; 
const rootKey = "09122005"; // The Root Key! Edit this date (DDMMYYYY)
const hiddenInput = document.getElementById('hidden-input');
const typedInput = document.getElementById('typed-input');
const output = document.getElementById('output');
const inputContainer = document.getElementById('input-container');
const promptText = document.getElementById('prompt-text');

// Keep the hidden input focused for typing
document.addEventListener('click', () => hiddenInput.focus());
hiddenInput.focus();

hiddenInput.addEventListener('input', (e) => {
    if (inputState === 'AWAITING_YN' || inputState === 'AWAITING_ROOT_KEY') {
        typedInput.textContent = hiddenInput.value;
    }
});

hiddenInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (inputState === 'AWAITING_YN' || inputState === 'AWAITING_ROOT_KEY')) {
        e.preventDefault();
        const originalAttempt = hiddenInput.value;
        const attempt = hiddenInput.value.trim().toLowerCase();
        printLine(`> ${originalAttempt}`);
        hiddenInput.value = '';
        typedInput.textContent = '';
        
        if (inputState === 'AWAITING_YN') {
            if (attempt === 'y' || attempt === 'yes') {
                inputContainer.style.display = 'none';
                inputState = 'BOOTING';
                continueBoot();
            } else {
                printLine("[ERROR] OVERRIDE DENIED. SYSTEM LOCKED. ARE YOU SURE? (y/n):", "error");
            }
        } else if (inputState === 'AWAITING_ROOT_KEY') {
            if (originalAttempt === rootKey) {
                inputState = 'AUTHENTICATED';
                inputContainer.style.display = 'none';
                startDecryption();
            } else {
                printLine("[ACCESS DENIED: INCORRECT ROOT KEY]", "error");
                printLine("");
            }
        }
    }
});

const bootLogs = [
    "INIT: version 2.88 booting",
    "Mounting local filesystems... [OK]",
    "Starting system log daemon... [OK]",
    "Checking kernel modules... [OK]",
    "Loading memory core... 0x8F9A12",
    "Initializing neural net protocols... [OK]",
    "Connecting to secure server... 192.168.0.1",
    "Bypassing firewall [||||||||||] 100%",
    "Establishing secure tunnel... [OK]",
    "Scanning for active vulnerabilities...",
    "Vulnerability found in module 'HEART_STRINGS.SYS'",
    "Attempting exploit...",
    "Exploit successful. Gaining elevated privileges...",
    "Injecting payload... [OK]"
];

async function runBootSequence() {
    inputContainer.style.display = 'none';
    for (const log of bootLogs) {
        printLine(log);
        await delay(50 + Math.random() * 150);
    }
    
    await delay(500);
    printLine("");
    printLine("[WARNING] UNAUTHORIZED ACCESS DETECTED.", "error");
    printLine("INITIATE ROOT OVERRIDE? (y/n):");
    
    inputState = 'AWAITING_YN';
    promptText.textContent = "";
    inputContainer.style.display = 'flex';
    hiddenInput.focus();
}

async function continueBoot() {
    printLine("OVERRIDE ACCEPTED. BYPASSING SECURITY...", "success");
    await delay(800);
    printLine("Loading authentication module... [OK]");
    await delay(500);
    printLine("");
    
    inputState = 'AWAITING_ROOT_KEY';
    promptText.textContent = "[AUTHENTICATION REQUIRED: ENTER ROOT_KEY_DDMMYYYY] ";
    inputContainer.style.display = 'flex';
    hiddenInput.focus();
}

// Start the boot sequence on load
window.onload = runBootSequence;

function printLine(text, className = "") {
    const line = document.createElement('div');
    line.textContent = text;
    if (className) line.className = className;
    output.appendChild(line);
    scrollToBottom();
}

function scrollToBottom() {
    const terminal = document.getElementById('terminal');
    terminal.scrollTop = terminal.scrollHeight;
}

// Typewriter effect function
async function typeWriter(text, speed = 40) {
    const line = document.createElement('div');
    output.appendChild(line);

    for (let i = 0; i < text.length; i++) {
        line.textContent += text.charAt(i);
        scrollToBottom();
        // Wait a bit, vary the speed slightly to feel like a real terminal/human
        await new Promise(resolve => setTimeout(resolve, speed + (Math.random() * 20)));
    }
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Edit these logs to make it personal for Riya!
const narrative = [
    { text: "[LOADING_MEMORY_BANK... SUCCESS]", delay: 1000 },
    { text: "System log: Decrypting early memories...", delay: 800 },
    { text: "Found file: 'First Date.log'", delay: 500 },
    { text: "Retrieving quote: 'I didn't expect to laugh this much.'", delay: 2000 },
    { text: "System log: Analyzing emotional resonance... OVERFLOW DETECTED.", delay: 1000 },
    { text: "Accessing file: 'Inside_Jokes.enc'", delay: 800 },
    { text: "Decryption successful.", delay: 500 },
    { text: "WARNING: High levels of affection detected in localized clusters.", delay: 1500 },
    { text: "Bypassing security protocols to access core system...", delay: 1000 },
    { text: "[ACCESSING THE HEART]...", delay: 2500 }
];

async function startDecryption() {
    printLine("[AUTHENTICATION SUCCESSFUL. ROOT PRIVILEGES GRANTED.]", "success");
    await delay(1200);
    printLine("");

    for (const item of narrative) {
        await typeWriter(item.text);
        await delay(item.delay);
    }

    await delay(1000);
    output.innerHTML = ''; // Clear screen for the grand reveal

    await renderAsciiHeart();
}

// The dense 3D binary heart
const asciiHeartLines = [
    "      1011001010        1010011010      ",
    "   0110101100110101  1010110011010110   ",
    " 10110101011001010101010100110101011010 ",
    "0110101011001101011011010110011010101101",
    "1011010101100101011011010100110101011010",
    "0110101011001101011011010110011010101101",
    "1011010101100101011011010100110101011010",
    " 01101010110011010110110101100110101011 ",
    "  101101010110010101101101010011010110  ",
    "   0110101011001101011011010110011010   ",
    "     101101010110010101001101010110     ",
    "       01101010110011011001101010       ",
    "         1011010101101001101010         ",
    "           011010101111001101           ",
    "             10110101001101             ",
    "               0110101100               ",
    "                 101101                 ",
    "                   01                   "
];

async function renderAsciiHeart() {
    const container = document.createElement('div');
    container.className = "ascii-heart-container";

    const wrapper = document.createElement('div');
    wrapper.className = "heart-wrapper";

    container.appendChild(wrapper);
    output.appendChild(container);

    for (const line of asciiHeartLines) {
        const div = document.createElement('div');
        div.className = "heart";
        div.innerHTML = line.replace(/ /g, '&nbsp;'); // Preserve spaces for ASCII
        wrapper.appendChild(div);
        scrollToBottom();
        await delay(80); // Renders line by line slightly faster
    }

    await delay(1500);
    printLine("");
    await typeWriter("> Calculating Love Index...");
    await drawProgressBar();
    await delay(500);
    printLine("");
    await typeWriter("> System Status: 100% In Love with Riya.");

    await delay(1000);
    startLoveAnimation();
}

async function drawProgressBar() {
    const barLength = 30;
    const barDiv = document.createElement('div');
    output.appendChild(barDiv);

    for (let i = 0; i <= barLength; i++) {
        const percent = Math.floor((i / barLength) * 100);
        const filled = "█".repeat(i);
        const empty = "-".repeat(barLength - i);
        barDiv.textContent = `[${filled}${empty}] ${percent}%`;
        scrollToBottom();
        // Dramatic pause at 99%
        const speed = (i === barLength - 1) ? 1200 : 30 + Math.random() * 40;
        await delay(speed);
    }
}

function startLoveAnimation() {
    // Show giant glowing text
    const giantText = document.createElement('div');
    giantText.className = "giant-text";
    giantText.innerHTML = "I LOVE YOU ANU ❤️";
    output.appendChild(giantText);
    scrollToBottom();

    // Constantly generate floating hearts
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = "floating-heart";
        heart.innerText = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (Math.random() * 3 + 3) + "s"; // 3s to 6s

        // Randomize size slightly
        const size = Math.random() * 1.5 + 1; // 1rem to 2.5rem
        heart.style.fontSize = size + "rem";

        document.body.appendChild(heart);

        // Remove heart element after it finishes floating
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 250); // new heart every 250ms
}
