🚀 CloudVault — Secure File Storage

CloudVault is a modern, minimal, and secure file upload web application that allows users to upload files to Azure Blob Storage and generate a secure access link instantly.

📌 Features
📂 Drag & Drop file upload
☁️ Upload files directly to Azure Blob Storage
🔗 Generate secure shareable link
📋 One-click copy to clipboard
🚀 Open file in a new tab
🎨 Modern UI with animations and glassmorphism design
🔐 Secure upload using SAS Token
🛠️ Tech Stack
Frontend: HTML, CSS, JavaScript
Cloud Storage: Azure Blob Storage
API Method: REST (PUT request using Fetch API)
📁 Project Structure
CloudVault/
│── index.html     # Main UI structure
│── style.css      # Styling and animations
│── script.js      # Core functionality (upload, link generation)
⚙️ Setup Instructions
1. Clone or Download Project
git clone https://github.com/your-username/cloudvault.git
cd cloudvault
2. Configure Azure Blob Storage

Open script.js and replace:

const storageUrl = "YOUR_AZURE_BLOB_URL";
const sasToken = "YOUR_SAS_TOKEN";
🔥 Important:
storageUrl → Your Azure container URL
sasToken → Must have permissions: read, write, create
3. Run the Project

Simply open:

index.html

in your browser (no server required).

🧠 How It Works
User selects or drags a file
File is uploaded to Azure Blob Storage using PUT request
A secure URL is generated using SAS token
User can:
Copy link
Open file
🔐 Security Note
SAS Token provides temporary access
Avoid exposing long-term tokens publicly
Always set expiration time for tokens
🚧 Limitations
No backend (pure frontend project)
File overwrite possible if same filename is used
No authentication system
💡 Future Improvements
Add backend (Node.js / Firebase)
User authentication system
File renaming before upload
Upload progress bar
Expiry-based secure links
📸 UI Highlights
Glassmorphism card design
Animated background orbs
Step-based upload process
Toast notifications for user feedback
👨‍💻 Author

Ayush Yadav
Aryan Yadav
Computer Engineering Student

⭐ Support

If you like this project, give it a ⭐ on GitHub!
