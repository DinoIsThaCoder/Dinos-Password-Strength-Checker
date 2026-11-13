const CRITERIA = [
    {
        label: "At least 8 Characters",
        test: (password) => password.length >= 8
    },
    {
        label: "Uppercase letter (A-Z)",
        test: (password) => /[A-Z]/.test(password)
    },
    {
        label: "Lowercase letter (a-z)",
        test: (password) => /[a-z]/.test(password)
    },
    {
        label: "Number (0-9)",
        test: (password) => /[0-9]/.test(password)
    },
    {
        label: "Special Characters like (!@#$%...)",
        test: (password) => /[^A-Za-z0-9]/.test(password)
    }
];

const LEVELS = [
    null,
    { segs: 1, color: "#fc0c18", label: "Too weak." },
    { segs: 2, color: "#fc0c18", label: "Weak." },
    { segs: 3, color: "#f35e08", label: "You're Getting there." },
    { segs: 4, color: "#0779fa", label: "MORE STRENGTH!!!" },
    { segs: 4, color: "#2ffa07", label: "Ahhh Nice and Strong." }
];

function checkPassword(password) {
    const score = password.length === 0
        ? 0
        : CRITERIA.filter((c) => c.test(password)).length;
    const level = LEVELS[score];

    for (let i = 1; i <= 4; i++) {
        const segment = document.getElementById("seg" + i);
        if (level && i <= level.segs) {
            segment.style.background = level.color;
        } else {
            segment.style.background = "#e0e0e0";
        }
    }

    const label = document.getElementById("strengthLabel");
    const display = document.getElementById("scoreDisplay");

    if (level) {
        label.textContent = level.label;
        label.style.color = level.color;
        display.textContent = score + " / 5 criteria met";
    } else {
        label.textContent = "Enter a password to begin this test";
        label.style.color = "#aaa";
        display.textContent = "";
    }

    renderCriteria(password);
}

function renderCriteria(password) {
    const container = document.getElementById("criteriaList");

    container.innerHTML = CRITERIA.map((c) => {
        const met = password.length > 0 && c.test(password);
        return `
        <div class="criterion">
            <span class="icon ${met ? "met" : "unmet"}">${met ? "😝✔️" : "😞❌"}</span>
            <span class="label ${met ? "met" : "unmet"}">${c.label}</span>
        </div>
        `;
    }).join("");
}

function toggleVisibility() {
    const input = document.getElementById("passwordInput");
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

renderCriteria("");


//THIS WAS HARD BRO