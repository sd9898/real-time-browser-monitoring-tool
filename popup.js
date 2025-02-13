document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.local.get(["safeCount", "maliciousCount"], (result) => {
        document.getElementById("safeCount").textContent = result.safeCount || 0;
        document.getElementById("maliciousCount").textContent = result.maliciousCount || 0;
    });
});
