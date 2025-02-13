
## Overview
This project is designed to interact with Google’s Safe Browsing API to check URLs for potential threats such as malware, phishing, and harmful content. The application sends requests to the API and analyzes the response to determine if a given URL is considered unsafe.

## Features
- Uses Google Safe Browsing API for URL security checks.
- Supports POST requests for checking URLs.
- Provides detailed error handling for API permissions and service issues.
- Can be deployed locally or on a server.

## Prerequisites
Before running the project, ensure you have:
- Python 3.7+ installed.
- A Google Cloud Project with Safe Browsing API enabled.
- A valid API Key for Safe Browsing API.
- `requests` and `flask` Python packages installed (if using a Flask backend).

## Installation
1. Clone the Repository
   ```bash
   git clone https://github.com/your-repository/safe-browsing-check.git
   cd safe-browsing-check
   ```
2. Install Dependencies
   ```bash
   pip install -r requirements.txt
   ```
3. Set Up API Key
   Create a `.env` file or set an environment variable with your Google Safe Browsing API Key:
   ```bash
   export GOOGLE_API_KEY="your_api_key_here"
   ```
4. Enable Google Safe Browsing API
   Ensure that the Google Safe Browsing API is enabled in your Google Cloud project. You can enable it by visiting:
   [Google Cloud Console – Safe Browsing API](https://console.cloud.google.com/apis/library/safebrowsing.googleapis.com)

## Running the Application
Start the Server (if using Flask)
```bash
python app.py
```

## Sending a URL Check Request
You can use cURL or Postman to send a POST request:
```bash
curl -X POST http://127.0.0.1:5000/check -H "Content-Type: application/json" -d '{"url": "http://example.com"}'
```

## Expected API Responses
- **200 OK** – URL is safe.
- **403 PERMISSION_DENIED** – Safe Browsing API is disabled or API Key is invalid.
- **400 BAD_REQUEST** – Invalid request format.

## Troubleshooting
1. **Safe Browsing API Not Enabled**
   - **Error Message**:
   ```json
   {
       "error": {
           "code": 403,
           "message": "Safe Browsing API has not been used in project before or it is disabled."
       }
   }
   ```
   - **Solution**: Go to Google API Console. Enable the Safe Browsing API. Wait a few minutes for changes to take effect.

2. **Invalid API Key**
   - **Error Message**:
   ```json
   {
       "error": {
           "code": 400,
           "message": "API key not valid. Please pass a valid API key."
       }
   }
   ```
   - **Solution**: Check if your API key is set correctly in the environment variables. Ensure you copied the API key correctly from Google Cloud.

## Contributing
Feel free to submit issues or pull requests to improve this project.

## License
This project is licensed under the MIT License.
