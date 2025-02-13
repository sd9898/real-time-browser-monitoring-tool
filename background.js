const SERVER_URL = "http://127.0.0.1:5000/check"; // Flask API for checking URLs

chrome.webNavigation.onCompleted.addListener((details) => {
    let url = details.url;
    if (!url.startsWith("http")) return; // Ignore internal Chrome pages

    console.log("🔍 Checking site:", url);

    fetch(SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
        console.log("API Response:", data);
        let isMalicious = data.isMalicious;

        if (isMalicious) {
            console.log("🚨 Malicious site detected:", url);
            notifyUser(url);
        } else {
            console.log("✅ Safe site:", url);
        }

        // Update storage counts
        chrome.storage.local.get(["safeCount", "maliciousCount"], (result) => {
            let safeCount = result.safeCount || 0;
            let maliciousCount = result.maliciousCount || 0;

            if (isMalicious) {
                maliciousCount++;
            } else {
                safeCount++;
            }

            chrome.storage.local.set({ safeCount: safeCount, maliciousCount: maliciousCount });
        });
    })
    .catch(error => console.error("❌ Error checking URL:", error));
}, { url: [{ schemes: ["http", "https"] }] });

function notifyUser(url) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "⚠️ Malicious Site Detected!",
        message: `The site ${url} is flagged as dangerous.`,
        priority: 2
    });
}
