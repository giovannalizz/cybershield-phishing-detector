// CyberShield Phishing Detector
// This program checks a message for common phishing warning signs.

function analyzeMessage() {
    const input = document.getElementById("userInput").value.toLowerCase().trim();

    const riskLevel = document.getElementById("riskLevel");
    const warningSigns = document.getElementById("warningSigns");
    const recommendation = document.getElementById("recommendation");

    let score = 0;
    let warnings = [];

    warningSigns.innerHTML = "";
    recommendation.textContent = "";
    riskLevel.textContent = "";
    riskLevel.className = "";

    if (input === "") {
        alert("Please enter a message, email, or URL to analyze.");
        return;
    }

    const suspiciousWords = [
        "urgent",
        "verify",
        "password",
        "account suspended",
        "click here",
        "login",
        "bank",
        "limited time",
        "confirm",
        "security alert",
        "reset",
        "payment",
        "invoice",
        "winner",
        "prize",
        "gift card",
        "act now",
        "immediately",
        "unusual activity",
        "locked account"
    ];

    suspiciousWords.forEach(function(word) {
        if (input.includes(word)) {
            score += 1;
            warnings.push("Suspicious phrase found: " + word);
        }
    });

    if (input.includes("http://")) {
        score += 2;
        warnings.push("The message contains an unsecured HTTP link.");
    }

    if (
        input.includes("bit.ly") ||
        input.includes("tinyurl") ||
        input.includes("t.co")
    ) {
        score += 2;
        warnings.push("The message contains a shortened link.");
    }

    if (input.includes("@") && input.includes("password")) {
        score += 1;
        warnings.push("The message may be asking for account or password information.");
    }

    if (
        input.includes("congratulations") ||
        input.includes("you have won")
    ) {
        score += 1;
        warnings.push("The message may be using a fake prize or reward.");
    }

    if (
        input.includes("ssn") ||
        input.includes("social security") ||
        input.includes("credit card")
    ) {
        score += 2;
        warnings.push("The message asks for sensitive personal or financial information.");
    }

    if (warnings.length === 0) {
        warnings.push("No major phishing warning signs were found.");
    }

    warnings.forEach(function(warning) {
        const listItem = document.createElement("li");
        listItem.textContent = warning;
        warningSigns.appendChild(listItem);
    });

    if (score >= 5) {
        riskLevel.textContent = "High Risk";
        riskLevel.className = "high";
        recommendation.textContent =
            "Do not click any links or reply to this message. Verify the sender using an official website or trusted contact method.";
    } else if (score >= 2) {
        riskLevel.textContent = "Medium Risk";
        riskLevel.className = "medium";
        recommendation.textContent =
            "Be careful. Check the sender, avoid clicking links, and verify the message before taking action.";
    } else {
        riskLevel.textContent = "Low Risk";
        riskLevel.className = "low";
        recommendation.textContent =
            "This message does not show many common phishing signs, but you should still be cautious with links and personal information.";
    }
}

function clearResults() {
    document.getElementById("userInput").value = "";
    document.getElementById("riskLevel").textContent = "";
    document.getElementById("riskLevel").className = "";
    document.getElementById("warningSigns").innerHTML = "";
    document.getElementById("recommendation").textContent = "";
}