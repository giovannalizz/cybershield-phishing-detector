function analyzeMessage() {
    const input = document.getElementById("userInput").value.toLowerCase();

    const riskLevel = document.getElementById("riskLevel");
    const warningSigns = document.getElementById("warningSigns");
    const recommendation = document.getElementById("recommendation");

    let score = 0;
    let warnings = [];

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
        "prize"
    ];

    suspiciousWords.forEach(function(word) {
        if (input.includes(word)) {
            score += 10;
            warnings.push("Suspicious phrase detected: " + word);
        }
    });

    if (input.includes("http://")) {
        score += 20;
        warnings.push("Unsafe link detected: URL does not use HTTPS.");
    }

    if (input.includes("bit.ly") || input.includes("tinyurl") || input.includes("t.co")) {
        score += 20;
        warnings.push("Shortened URL detected.");
    }

    if (input.length > 200) {
        score += 10;
        warnings.push("Message is unusually long.");
    }

    if (input.includes("!")) {
        score += 5;
        warnings.push("Message uses urgent punctuation.");
    }

    if (input.trim() === "") {
        riskLevel.textContent = "Risk Level: No input provided.";
        warningSigns.textContent = "Warning Signs: Please paste a message or link.";
        recommendation.textContent = "Recommendation: Enter text before analyzing.";
        return;
    }

    if (score >= 50) {
        riskLevel.textContent = "Risk Level: High Risk";
        recommendation.textContent = "Recommendation: Do not click links, do not enter personal information, and report the message.";
    } else if (score >= 20) {
        riskLevel.textContent = "Risk Level: Medium Risk";
        recommendation.textContent = "Recommendation: Be careful. Verify the sender before taking action.";
    } else {
        riskLevel.textContent = "Risk Level: Low Risk";
        recommendation.textContent = "Recommendation: No major phishing indicators were found, but always stay cautious.";
    }

    if (warnings.length > 0) {
        warningSigns.textContent = "Warning Signs: " + warnings.join(" | ");
    } else {
        warningSigns.textContent = "Warning Signs: No obvious warning signs found.";
    }
}

function clearResults() {
    document.getElementById("userInput").value = "";
    document.getElementById("riskLevel").textContent = "Risk Level:";
    document.getElementById("warningSigns").textContent = "Warning Signs:";
    document.getElementById("recommendation").textContent = "Recommendation:";
}