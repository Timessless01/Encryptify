// DOM Elements
const encryptTabBtn = document.getElementById("encryptTabBtn");
const decryptTabBtn = document.getElementById("decryptTabBtn");
const passwordTabBtn = document.getElementById("passwordTabBtn");

const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");
const generatePasswordBtn = document.getElementById("generatePasswordBtn");

const copyEncryptedBtn = document.getElementById("copyEncryptedBtn");
const copyDecryptedBtn = document.getElementById("copyDecryptedBtn");
const copyPasswordBtn = document.getElementById("copyPasswordBtn");

const encryptKey = document.getElementById("encryptKey");
const encryptKeyVerify = document.getElementById("encryptKeyVerify");
const encryptVerifyStatus = document.getElementById("encryptVerifyStatus");
const passwordStrengthBar = document.getElementById("passwordStrengthBar");

// Tab switching
function switchTab(tabName) {
  // Update active tab button
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  
  document.getElementById(`${tabName}TabBtn`).classList.add('active');
  document.getElementById(tabName).classList.add('active');
}

// Password verification
function checkPasswordMatch() {
  const password = encryptKey.value;
  const verifyPassword = encryptKeyVerify.value;
  const statusIcon = encryptVerifyStatus.querySelector('.status-icon');
  const statusText = encryptVerifyStatus.querySelector('span:last-child');

  // Update password strength
  updatePasswordStrength(password);

  if (!password && !verifyPassword) {
    statusIcon.textContent = '🔒';
    statusIcon.className = 'status-icon';
    statusText.textContent = 'Create a strong password';
    return false;
  }

  if (password && verifyPassword) {
    if (password === verifyPassword) {
      statusIcon.textContent = '✓';
      statusIcon.className = 'status-icon success';
      statusText.textContent = 'Passwords match!';
      statusText.className = 'success';
      return true;
    } else {
      statusIcon.textContent = '✗';
      statusIcon.className = 'status-icon error';
      statusText.textContent = 'Passwords do not match!';
      statusText.className = 'error';
      return false;
    }
  }

  return false;
}

// Password strength meter
function updatePasswordStrength(password) {
  if (!password) {
    passwordStrengthBar.style.width = '0%';
    passwordStrengthBar.style.backgroundColor = '';
    return;
  }

  // Strength calculation
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  // Update UI
  const width = (strength / 5) * 100;
  passwordStrengthBar.style.width = `${width}%`;

  // Color coding
  if (width < 40) {
    passwordStrengthBar.style.backgroundColor = '#dc3545'; // Weak
  } else if (width < 70) {
    passwordStrengthBar.style.backgroundColor = '#fd7e14'; // Moderate
  } else {
    passwordStrengthBar.style.backgroundColor = '#28a745'; // Strong
  }
}

// Generate password
function generatePassword() {
  const length = parseInt(document.getElementById("passwordLength").value) || 16;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let password = "";
  
  // Ensure at least one of each character type
  password += chars.charAt(Math.floor(Math.random() * 26)); // Uppercase
  password += chars.charAt(26 + Math.floor(Math.random() * 26)); // Lowercase
  password += chars.charAt(52 + Math.floor(Math.random() * 10)); // Number
  password += chars.charAt(62 + Math.floor(Math.random() * 24)); // Symbol

  // Fill the rest
  for (let i = 4; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Shuffle the password
  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  document.getElementById("generatedPassword").value = password;
  updateGeneratedPasswordStrength(password);
}

function updateGeneratedPasswordStrength(password) {
  const bar = document.getElementById("generatedPasswordStrength");
  if (!password) {
    bar.style.width = '0%';
    bar.style.backgroundColor = '';
    return;
  }

  const strength = Math.min(100, (password.length / 16) * 100);
  bar.style.width = `${strength}%`;
  bar.style.backgroundColor = strength < 70 ? '#fd7e14' : '#28a745';
}

// Copy to clipboard
async function copyToClipboard(elementId) {
  try {
    const element = document.getElementById(elementId);
    if (!element || !element.value) {
      alert("Nothing to copy!");
      return;
    }

    const text = element.value;
    await navigator.clipboard.writeText(text);
    
    // Find the corresponding button
    let button;
    if (elementId === 'encryptedOutput') {
      button = document.getElementById('copyEncryptedBtn');
    } else if (elementId === 'decryptedOutput') {
      button = document.getElementById('copyDecryptedBtn');
    } else if (elementId === 'generatedPassword') {
      button = document.getElementById('copyPasswordBtn');
    }

    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.style.backgroundColor = '#28a745';
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
      }, 2000);
    }
  } catch (err) {
    console.error('Failed to copy:', err);
    
    // Fallback method
    const textArea = document.createElement('textarea');
    textArea.value = document.getElementById(elementId).value;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert("Text copied to clipboard!");
    } catch (err) {
      alert("Failed to copy text. Please copy manually.");
    }
    document.body.removeChild(textArea);
  }
}

// Encryption/Decryption Functions
async function encryptText() {
  if (!checkPasswordMatch()) {
    alert("Please make sure passwords match and are strong enough!");
    return;
  }

  const plaintext = document.getElementById("plaintext").value;
  const password = encryptKey.value;
  
  if (!plaintext) {
    alert("Please enter text to encrypt!");
    return;
  }

  try {
    document.getElementById("encryptBtn").textContent = "Encrypting...";
    document.getElementById("encryptBtn").disabled = true;
    
    const encrypted = await encryptAES(plaintext, password);
    document.getElementById("encryptedOutput").value = encrypted;
    
    document.getElementById("encryptBtn").textContent = "Encrypt";
    document.getElementById("encryptBtn").disabled = false;
  } catch (error) {
    alert("Encryption failed: " + error.message);
    document.getElementById("encryptBtn").textContent = "Encrypt";
    document.getElementById("encryptBtn").disabled = false;
  }
}

async function decryptText() {
  const ciphertext = document.getElementById("ciphertext").value;
  const password = document.getElementById("decryptKey").value;
  
  if (!ciphertext || !password) {
    alert("Please enter encrypted text and password!");
    return;
  }

  try {
    document.getElementById("decryptBtn").textContent = "Decrypting...";
    document.getElementById("decryptBtn").disabled = true;
    
    const decrypted = await decryptAES(ciphertext, password);
    document.getElementById("decryptedOutput").value = decrypted;
    
    document.getElementById("decryptBtn").textContent = "Decrypt";
    document.getElementById("decryptBtn").disabled = false;
  } catch (error) {
    alert("Decryption failed. Wrong password or invalid data.");
    document.getElementById("decryptBtn").textContent = "Decrypt";
    document.getElementById("decryptBtn").disabled = false;
  }
}

// AES Encryption (Web Crypto API)
async function encryptAES(text, password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  // Derive key from password
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("EncryptifySalt123"), // Fixed salt
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
  
  // Generate IV (Initialization Vector)
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  // Encrypt the data
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );
  
  // Combine IV and encrypted data for storage
  return JSON.stringify({
    iv: Array.from(iv),
    ciphertext: Array.from(new Uint8Array(encrypted))
  });
}

// AES Decryption (Web Crypto API)
async function decryptAES(encryptedData, password) {
  // Parse the stored data
  let parsedData;
  try {
    parsedData = JSON.parse(encryptedData);
  } catch (e) {
    throw new Error("Invalid encrypted data format");
  }
  
  const encoder = new TextEncoder();
  
  // Derive key from password
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("EncryptifySalt123"), // Must match encryption salt
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
  
  // Decrypt the data
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: new Uint8Array(parsedData.iv)
    },
    key,
    new Uint8Array(parsedData.ciphertext)
  );
  
  return new TextDecoder().decode(decrypted);
}

// Event Listeners
encryptTabBtn.addEventListener("click", () => switchTab('encrypt'));
decryptTabBtn.addEventListener("click", () => switchTab('decrypt'));
passwordTabBtn.addEventListener("click", () => switchTab('password'));

encryptKey.addEventListener("input", checkPasswordMatch);
encryptKeyVerify.addEventListener("input", checkPasswordMatch);

copyEncryptedBtn.addEventListener("click", () => copyToClipboard('encryptedOutput'));
copyDecryptedBtn.addEventListener("click", () => copyToClipboard('decryptedOutput'));
copyPasswordBtn.addEventListener("click", () => copyToClipboard('generatedPassword'));

encryptBtn.addEventListener("click", encryptText);
decryptBtn.addEventListener("click", decryptText);
generatePasswordBtn.addEventListener("click", generatePassword);

// Initialize
generatePassword();