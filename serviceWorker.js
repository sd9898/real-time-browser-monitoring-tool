self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                if (!response.ok) {
                    console.error("🚨 Fetch failed:", response.status, response.statusText);
                    return new Response("Network error: " + response.statusText, {
                        status: response.status,
                        statusText: response.statusText
                    });
                }
                return response;
            })
            .catch(error => {
                console.error("❌ Fetch error:", error);
                return new Response("Network request failed", { status: 500 });
            })
    );
});
