// 🔥 Replace with your Azure Blob Storage URL (no trailing slash, no filename)
const storageUrl = "https://securefilestorage1234.blob.core.windows.net/files";

// 🔥 Replace with your SAS token (starts with ?sv=...)
const sasToken = "?sv=2024-11-04&ss=b&srt=co&sp=rwctfx&se=2026-03-29T10:07:00Z&st=2026-03-29T08:07:00Z&spr=https&sig=gdzd7z1NUYejSyU%2FmEvWA6I%2B3C0zuZSwLLAwzSlIKN4%3D";

let selectedFile = null;
let secureLink = "";

/* ── Drag & Drop ── */
const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragover");
  const files = e.dataTransfer.files;
  if (files.length > 0) handleFileSelect(files[0]);
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) handleFileSelect(fileInput.files[0]);
});

/* ── Step 1: Select File ── */
function handleFileSelect(file) {
  selectedFile = file;
  document.getElementById("fileInfo").classList.add("show");
  document.getElementById("fileName").textContent =
    `${file.name} · ${formatSize(file.size)}`;
}

/* ── Step 1: Upload to Azure ── */
async function uploadFile() {
  if (!selectedFile) {
    showToast("Please select a file first", "error");
    return;
  }

  const btn = document.getElementById("uploadBtn");
  btn.disabled = true;
  btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 2v20M2 12l10-10 10 10"/></svg> Uploading…`;

  const uploadUrl = `${storageUrl}/${selectedFile.name}${sasToken}`;

  try {
    const res = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "x-ms-blob-type": "BlockBlob" },
      body: selectedFile,
    });

    if (res.ok) {
      secureLink = uploadUrl;
      btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg> Uploaded!`;
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-success");
      document.getElementById("step1").classList.add("done", "active");
      showToast("File uploaded successfully");
    } else {
      throw new Error(`Azure returned ${res.status}`);
    }
  } catch (err) {
    console.error(err);
    showToast("Upload failed — check your SAS token", "error");
    btn.disabled = false;
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Retry Upload`;
    btn.classList.add("btn-primary");
  }
}

/* ── Step 2: Generate Link ── */
function generateLink() {
  if (!secureLink) {
    showToast("Upload a file first", "error");
    return;
  }

  const linkText = document.getElementById("linkText");
  const linkBox = document.getElementById("linkBox");

  linkText.textContent = secureLink;
  linkBox.classList.add("has-link");
  document.getElementById("step2").classList.add("done", "active");
  showToast("Secure link generated");
}

/* ── Step 3: Open File ── */
function openFile() {
  if (!secureLink) {
    showToast("Generate a link first", "error");
    return;
  }
  window.open(secureLink, "_blank");
}

/* ── Copy to Clipboard ── */
function copyLink() {
  if (!secureLink) {
    showToast("No link to copy", "error");
    return;
  }
  navigator.clipboard.writeText(secureLink).then(() => {
    showToast("Link copied to clipboard");
  });
}

/* ── Helpers ── */
function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

let toastTimer;
function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  toast.querySelector("span").textContent = msg;
  toast.className = `toast ${type} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
