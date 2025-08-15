&nbsp;🔐 **Encryptify - Secure Browser Encryption**



!\[Extension Screenshot](screenshots/preview.png)  

\*A client-side AES-256 encryption tool for Chrome and Firefox.\*



&nbsp;**Features**


\- \*\*Military-grade encryption\*\* (AES-256 with PBKDF2 key derivation)

\- \*\*Zero data collection\*\* - Everything happens in your browser

\- \*\*Password verification\*\* - Prevent encryption mistakes

\- \*\*Secure password generator\*\* - Create strong passwords instantly

\- \*\*Clipboard integration\*\* - Copy encrypted/decrypted text easily

\- \*\*Modern UI\*\* - Clean, intuitive interface



&nbsp; **Installation**



 **Chrome/Edge/Brave**



1\. Download this repo as ZIP

2\. Unzip the files

3\. Go to `chrome://extensions`

4\. Enable "Developer mode" (toggle top-right)

5\. Click "Load unpacked" and select the unzipped folder



&nbsp;**Firefox**



1\. Install \[web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/)

2\. Run `web-ext run` in the project directory



&nbsp;🛠️ **How It Works**



1\. \*\*Encrypt\*\*: Enter text → Set password → Get encrypted output

2\. \*\*Share\*\*: Send the encrypted text to anyone

3\. \*\*Decrypt\*\*: Paste encrypted text + password → Get original text



All processing happens \*\*locally\*\* - no servers, no tracking.


 📦 Files Structure

encryptify/
├── icons/ # Extension icons
├── screenshots/ # Store promo images here
├── background.js # Background service worker
├── popup.html # Main interface
├── popup.js # Core encryption logic
├── manifest.json # Extension configuration
└── README.md # This file

 🔒 Privacy Guarantee
- No analytics or tracking
- No data leaves your browser
- Open-source and auditable

 🤝 Contributing
Found a bug? Want to improve Encryptify?  
1. Fork the repo  
2. Create a branch (`git checkout -b feature/improvement`)  
3. Commit changes (`git commit -m 'Add new feature'`)  
4. Push to branch (`git push origin feature/improvement`)  
5. Open a Pull Request  




💡 **Pro Tip**: Use generated passwords with at least 12 characters for maximum security.
