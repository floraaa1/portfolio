const before = document.getElementById("before");
const liner = document.getElementById("liner");
const command = document.getElementById("typer");
const textarea = document.getElementById("texter");
const terminal = document.getElementById("terminal");

let git = 0;
let pw = false;
let pwd = false;
const commands = [];

let inPersonalityMode = false;
let personalityIndex = 0;
let personalityScores = {};

let memoryScore = 0;
let inMemoryDecision = false;
let currentMemory = "";
let inEasterEgg = false;


setTimeout(() => {
    loopLines(banner, "", 80);
    textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

function enterKey(e) {
    if (e.keyCode === 181) {
        document.location.reload(true);
        return;
    }

    if (pw) {

        return;
    }


    if (e.keyCode === 13) {
        const rawInput = command.innerText.trim();
        if (!rawInput) return;
        commands.push(rawInput);
        git = commands.length - 1;

        addLine(`visitor@debugger.com:~$ ${rawInput}`, "no-animation", 0);

        if (inEasterEgg) {
            handleEasterEgg(rawInput);
            command.innerText = "";
            textarea.value = "";
            return;
        }

        commander(rawInput.toLowerCase());

        command.innerText = "";
        textarea.value = "";
    }


    if (e.keyCode === 38 && git > 0) {
        git--;
        textarea.value = commands[git];
        command.innerText = textarea.value;
    }
    if (e.keyCode === 40 && git < commands.length - 1) {
        git++;
        textarea.value = commands[git] || "";
        command.innerText = textarea.value;
    }
}


function commander(cmd) {
    // 1) If we're in a memory-decision, route it there
    if (inMemoryDecision) {
        handleMemoryDecision(cmd);
        return;
    }

    // 2) If we're in the personality questionnaire, route it there
    if (inPersonalityMode) {
        handlePersonalityAnswer(cmd);
        return;
    }
    const container = document.getElementById("audio-container");
    container.style.display = "none";

    switch (cmd) {
        case "help":
            loopLines(help, "color2 margin", 80);
            break;

        case "emotion_module":
        case "childhood_scene":
        case "letter_from_humans":
            loopLines(window[cmd], "color2 margin", 80);
            inMemoryDecision = true;
            currentMemory = cmd;
            textarea.focus();
            break;

        case "scientist_audio":
            container.style.display = "block";
            const audioEl = document.getElementById("scientist-sound");
            audioEl.currentTime = 0;
            audioEl.play().catch(console.error);
            audioEl.addEventListener("ended", () => {
                container.style.display = "none";
                textarea.focus();
            });

            loopLines(window[cmd], "color2 margin", 80);
            inMemoryDecision = true;
            currentMemory = cmd;
            textarea.focus();
            break;

        case "personality":
            inPersonalityMode = true;
            personalityIndex = 0;
            personalityScores = {};
            askPersonalityQuestion();
            break;

        default:
            addLine(
                '<span class="error">Command not found. Type <span class="command">help</span>.</span>',
                "error",
                80
            );
    }
}


function addLine(text, style, time) {
    var t = "";
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
            t += "&nbsp;&nbsp;";
            i++;
        } else {
            t += text.charAt(i);
        }
    }
    setTimeout(function () {
        var next = document.createElement("p");
        next.innerHTML = t;
        next.className = style;

        before.parentNode.insertBefore(next, before);

        window.scrollTo(0, document.body.offsetHeight);
    }, time);
}

function loopLines(name, style, time) {
    name.forEach(function (item, index) {
        addLine(item, style, index * time);
    });
}

function askPersonalityQuestion() {
    const q = personality[personalityIndex];
    const lines = [
        `Question ${personalityIndex + 1}: ${q.text}`,
        `1) ${q.options[0]}`,
        `2) ${q.options[1]}`
    ];
    loopLines(lines, "color2 margin", 80);
}

function handlePersonalityAnswer(input) {
    const choice = parseInt(input.trim(), 10) - 1;
    if (![0, 1].includes(choice)) {
        addLine("Invalid choice. Please type 1 or 2.", "error", 0);
        return;
    }

    const cat = personality[personalityIndex].category[choice];
    personalityScores[cat] = (personalityScores[cat] || 0) + 1;

    personalityIndex++;
    if (personalityIndex < personality.length) {
        askPersonalityQuestion();
    } else {
        inPersonalityMode = false;
        displayPersonalityResults();
    }
}

function handleMemoryDecision(input) {
    const ans = input.trim().toLowerCase();
    if (ans === "repair") {
        memoryScore++;
        addLine("✔ Memory repaired.", "color2 margin", 0);
    } else if (ans === "discard") {
        addLine("✖ Memory discarded.", "color2 margin", 0);
    } else {
        addLine('Invalid. Please type "repair" or "discard".', "error", 0);
        return;
    }

    inMemoryDecision = false;

    addLine(
        'Type next memory command or <span class="command">personality</span> to continue.',
        "color2 margin",
        80
    );
    setTimeout(() => textarea.focus(), 100);
}


function displayPersonalityResults() {
    const results = Object
        .entries(personalityScores)
        .map(([cat, score]) => `${cat}: ${score}`)
        .concat("— End —");
    loopLines(results, "color2 margin", 80);
}

function displayPersonalityResults() {
    const results = Object
        .entries(personalityScores)
        .map(([cat, score]) => `${cat}: ${score}`)
        .concat("— End —");
    loopLines(results, "color2 margin", 80);

    setTimeout(displayFinalProfile, results.length * 80 + 500);
}

function displayFinalProfile() {
    const personalityTotal = Object.values(personalityScores)
        .reduce((a, b) => a + b, 0);

    const totalScore = memoryScore + personalityTotal;

    let endingText, imgSrc;
    if (totalScore >= 5) {
        endingText = ending1;
        imgSrc = profileImages[2];
    } else if (totalScore >= 3) {
        endingText = ending2;
        imgSrc = profileImages[1];
    } else {
        endingText = ending3;
        imgSrc = profileImages[0];
    }

    const lines = [
        "<br>",
        `<img src="${imgSrc}" alt="Your Profile" class="profile-image"/>`,
        `<span class="color2">Total Score: ${totalScore}</span>`,
        `<span class="color2">${endingText}</span>`
    ];
    loopLines(lines, "color2 margin", 80);
    // Ask the Easter egg question after the ending
    setTimeout(askEasterEgg, lines.length * 80 + 500);
}

// New Easter egg functions
function askEasterEgg() {
    inEasterEgg = true;
    loopLines([
        "<br>",
        "Easter Egg: What is the name of the scientist who created you? (please type his name)"
    ], "index margin", 80);
}

function handleEasterEgg(input) {
    const ans = input.trim().toLowerCase();
    if (ans === "roy") {
        addLine("✔ Correct! Congratulations!", "color2 margin", 0);
        const confettiAudio = new Audio("audio/confetti.mp3");
        confettiAudio.play().catch(console.error);
    } else {
        addLine("Too bad, the correct answer is Roy!", "color2 margin", 0);
        const loseAudio = new Audio("audio/lose.mp3");
        loseAudio.play().catch(console.error);
    }
    inEasterEgg = false;
}

