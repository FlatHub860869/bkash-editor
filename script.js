/**
 * bKash Mobile Screenshot Generator & Pixel-Perfect Layer Editor
 * 
 * Coordinates are defined in percentage (%) relative to the screenshot image container,
 * ensuring automatic scaling whether viewed on mobile, 4K monitor, or high-DPI export.
 */

// -----------------------------------------------------------------------------
// 1. COORDINATE-BASED EDITING CONFIGURATION
// -----------------------------------------------------------------------------
const editableLayers = {
  // Status Bar Clock (Replaces '5:15')
  time: {
    x: 5.3,       // % from left
    y: 0.9,       // % from top
    width: 12.0,   // % width mask
    height: 2.2,  // % height mask
    fontSize: 12.5 // base font size in px
  },

  // Circular Profile Photo
  profile: {
    x: 4.4,       // % from left
    y: 5.8,       // % from top
    size: 12.8    // % width & height (circular 1:1)
  },

  // Account Username (Replaces 'Atikur Rahman')
  username: {
    x: 19.3,      // % from left
    y: 6.2,       // % from top
    width: 46.0,  // % width mask
    height: 2.3,  // % height mask
    fontSize: 13.5
  },

  // Account Balance (Replaces '৳756.08' inside white capsule)
  balance: {
    x: 20.0,      // % from left
    y: 8.9,       // % from top
    width: 27.5,  // % width mask
    height: 3.2,  // % height mask
    fontSize: 13.5
  }
};

// Default Avatar Placeholder (Minimalist Vector SVG as Data URL)
const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%232a4365'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%23e2e8f0'/%3E%3Cpath d='M20,88 C20,68 34,58 50,58 C66,58 80,68 80,88 Z' fill='%23e2e8f0'/%3E%3C/svg%3E";

// -----------------------------------------------------------------------------
// 2. DOM ELEMENT REFERENCES
// -----------------------------------------------------------------------------
const phoneScreen = document.getElementById('phone-screen');
const screenshotBg = document.getElementById('screenshot-bg');

// Overlays
const layerTime = document.getElementById('layer-time');
const layerProfile = document.getElementById('layer-profile');
const layerUsername = document.getElementById('layer-username');
const layerBalance = document.getElementById('layer-balance');

// Displays
const displayTime = document.getElementById('display-time');
const displayAvatar = document.getElementById('display-avatar');
const displayUsername = document.getElementById('display-username');
const displayBalance = document.getElementById('display-balance');
const avatarPreviewThumb = document.getElementById('avatar-preview-thumb');

// Inputs
const bgUploadInput = document.getElementById('bg-upload');
const profileUploadInput = document.getElementById('profile-upload');
const inputUsername = document.getElementById('input-username');
const inputBalance = document.getElementById('input-balance');
const autoTimeToggle = document.getElementById('auto-time-toggle');
const inputCustomTime = document.getElementById('input-custom-time');
const btnDownload = document.getElementById('btn-download');

// Tuning Inputs
const tuneTimeX = document.getElementById('tune-time-x');
const tuneTimeY = document.getElementById('tune-time-y');
const tuneProfileX = document.getElementById('tune-profile-x');
const tuneProfileY = document.getElementById('tune-profile-y');
const tuneNameX = document.getElementById('tune-name-x');
const tuneNameY = document.getElementById('tune-name-y');
const tuneBalanceX = document.getElementById('tune-balance-x');
const tuneBalanceY = document.getElementById('tune-balance-y');
const btnResetCoords = document.getElementById('btn-reset-coords');

// -----------------------------------------------------------------------------
// 3. LAYER POSITIONING ENGINE
// -----------------------------------------------------------------------------
function applyLayerPositions() {
  // Status Bar Time
  layerTime.style.left = `${editableLayers.time.x}%`;
  layerTime.style.top = `${editableLayers.time.y}%`;
  layerTime.style.width = `${editableLayers.time.width}%`;
  layerTime.style.height = `${editableLayers.time.height}%`;

  // Profile Photo
  layerProfile.style.left = `${editableLayers.profile.x}%`;
  layerProfile.style.top = `${editableLayers.profile.y}%`;
  layerProfile.style.width = `${editableLayers.profile.size}%`;
  layerProfile.style.height = `${editableLayers.profile.size * (phoneScreen.clientWidth / phoneScreen.clientHeight)}%`; // Keep 1:1 circle

  // Username
  layerUsername.style.left = `${editableLayers.username.x}%`;
  layerUsername.style.top = `${editableLayers.username.y}%`;
  layerUsername.style.width = `${editableLayers.username.width}%`;
  layerUsername.style.height = `${editableLayers.username.height}%`;

  // Balance
  layerBalance.style.left = `${editableLayers.balance.x}%`;
  layerBalance.style.top = `${editableLayers.balance.y}%`;
  layerBalance.style.width = `${editableLayers.balance.width}%`;
  layerBalance.style.height = `${editableLayers.balance.height}%`;

  syncTunerInputs();
}

function syncTunerInputs() {
  tuneTimeX.value = editableLayers.time.x;
  tuneTimeY.value = editableLayers.time.y;
  tuneProfileX.value = editableLayers.profile.x;
  tuneProfileY.value = editableLayers.profile.y;
  tuneNameX.value = editableLayers.username.x;
  tuneNameY.value = editableLayers.username.y;
  tuneBalanceX.value = editableLayers.balance.x;
  tuneBalanceY.value = editableLayers.balance.y;
}

// -----------------------------------------------------------------------------
// 4. REAL-TIME DEVICE CLOCK
// -----------------------------------------------------------------------------
function getDeviceTimeFormatted() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // 12-hour format without leading zero for hours (e.g. "5:15")
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutes}`;
}

function updateClock() {
  if (autoTimeToggle.checked) {
    const formatted = getDeviceTimeFormatted();
    displayTime.textContent = formatted;
    inputCustomTime.value = formatted;
  }
}

// Start auto-clock tick
setInterval(updateClock, 1000);
updateClock();

// -----------------------------------------------------------------------------
// 5. EVENT LISTENERS & LIVE BINDING
// -----------------------------------------------------------------------------

// Live Username Binding
inputUsername.addEventListener('input', (e) => {
  displayUsername.textContent = e.target.value.trim() || 'Atikur Rahman';
});

// Live Balance Binding
inputBalance.addEventListener('input', (e) => {
  displayBalance.textContent = e.target.value.trim() || '0.00';
});

// Clock Toggle & Custom Time
autoTimeToggle.addEventListener('change', (e) => {
  inputCustomTime.disabled = e.target.checked;
  if (e.target.checked) {
    updateClock();
  } else {
    displayTime.textContent = inputCustomTime.value;
  }
});

inputCustomTime.addEventListener('input', (e) => {
  if (!autoTimeToggle.checked) {
    displayTime.textContent = e.target.value;
  }
});

// Profile Photo Upload Handler
profileUploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      displayAvatar.src = event.target.result;
      avatarPreviewThumb.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Base Screenshot Replacement Handler
bgUploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    loadScreenshotFile(file);
  }
});

function loadScreenshotFile(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    screenshotBg.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

// Auto-adjust container aspect ratio when background image loads
screenshotBg.addEventListener('load', () => {
  if (screenshotBg.naturalWidth && screenshotBg.naturalHeight) {
    const aspect = screenshotBg.naturalHeight / screenshotBg.naturalWidth;
    phoneScreen.style.height = `${phoneScreen.clientWidth * aspect}px`;
    applyLayerPositions();
  }
});

// Clipboard Paste Support (Ctrl + V anywhere to paste new screenshot or avatar)
window.addEventListener('paste', (e) => {
  const items = e.clipboardData?.items;
  if (!items) return;

  for (let item of items) {
    if (item.type.indexOf('image') !== -1) {
      const file = item.getAsFile();
      // Ask or automatically set as background screenshot
      const isBg = confirm('You pasted an image! Press OK to set as Background Screenshot, or Cancel to set as Profile Avatar.');
      if (isBg) {
        loadScreenshotFile(file);
      } else {
        const reader = new FileReader();
        reader.onload = (ev) => {
          displayAvatar.src = ev.target.result;
          avatarPreviewThumb.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
      break;
    }
  }
});

// Tuner Inputs Live Update
[tuneTimeX, tuneTimeY].forEach(el => el.addEventListener('input', () => {
  editableLayers.time.x = parseFloat(tuneTimeX.value) || 0;
  editableLayers.time.y = parseFloat(tuneTimeY.value) || 0;
  applyLayerPositions();
}));

[tuneProfileX, tuneProfileY].forEach(el => el.addEventListener('input', () => {
  editableLayers.profile.x = parseFloat(tuneProfileX.value) || 0;
  editableLayers.profile.y = parseFloat(tuneProfileY.value) || 0;
  applyLayerPositions();
}));

[tuneNameX, tuneNameY].forEach(el => el.addEventListener('input', () => {
  editableLayers.username.x = parseFloat(tuneNameX.value) || 0;
  editableLayers.username.y = parseFloat(tuneNameY.value) || 0;
  applyLayerPositions();
}));

[tuneBalanceX, tuneBalanceY].forEach(el => el.addEventListener('input', () => {
  editableLayers.balance.x = parseFloat(tuneBalanceX.value) || 0;
  editableLayers.balance.y = parseFloat(tuneBalanceY.value) || 0;
  applyLayerPositions();
}));

btnResetCoords.addEventListener('click', () => {
  editableLayers.time.x = 5.3;
  editableLayers.time.y = 0.9;
  editableLayers.profile.x = 4.4;
  editableLayers.profile.y = 5.8;
  editableLayers.username.x = 19.3;
  editableLayers.username.y = 6.2;
  editableLayers.balance.x = 20.0;
  editableLayers.balance.y = 8.9;
  applyLayerPositions();
});

// -----------------------------------------------------------------------------
// 6. SCREENSHOT EXPORT (html2canvas)
// -----------------------------------------------------------------------------
btnDownload.addEventListener('click', async () => {
  btnDownload.disabled = true;
  const originalText = btnDownload.innerHTML;
  btnDownload.innerHTML = `<span>Exporting high-res PNG...</span>`;

  try {
    // Wait for images to be decoded & loaded
    if (screenshotBg.complete === false) {
      await new Promise(res => screenshotBg.onload = res);
    }
    if (displayAvatar.complete === false && displayAvatar.src) {
      await new Promise(res => displayAvatar.onload = res);
    }

    // Capture ONLY the phone-screen preview element
    const canvas = await html2canvas(phoneScreen, {
      scale: 2.5, // 2.5x retina quality preservation
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      scrollX: 0,
      scrollY: 0
    });

    // Create Download Link
    const link = document.createElement('a');
    link.download = 'mobile-screenshot.png';
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Screenshot generation failed:', err);
    alert('Failed to generate screenshot. Please check image permissions.');
  } finally {
    btnDownload.disabled = false;
    btnDownload.innerHTML = originalText;
  }
});

// -----------------------------------------------------------------------------
// 7. INITIALIZATION
// -----------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  displayAvatar.src = DEFAULT_AVATAR;
  avatarPreviewThumb.src = DEFAULT_AVATAR;
  applyLayerPositions();
});

window.addEventListener('resize', () => {
  applyLayerPositions();
});
