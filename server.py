from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows cross-origin requests

API_KEY = "USE_YOUR_API_HERE"
API_URL = f"https://safebrowsing.googleapis.com/v4/threatMatches:find?key={API_KEY}"

def check_url_safety(url):
    payload = {
        "client": {"clientId": "cyber-sec-tool", "clientVersion": "1.0"},
        "threatInfo": {
            "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [{"url": url}]
        }
    }

    response = requests.post(API_URL, json=payload)
    result = response.json()

    print("API Response:", result)  # Debugging

    return "matches" in result  # True if URL is malicious

@app.route("/check", methods=["POST"])
def check():
    data = request.json
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    is_malicious = check_url_safety(url)
    return jsonify({"isMalicious": is_malicious})

if __name__ == "__main__":
    app.run(debug=True)
