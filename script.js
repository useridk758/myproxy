const SCRAMJET_PREFIX = "/scramjet/";

// Real-time Clock
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  document.getElementById('time').textContent = 
    `${hours}:${minutes.toString().padStart(2, '0')}`;

  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  document.getElementById('date').textContent = 
    now.toLocaleDateString('en-US', options);
}

// Improved navigation
function navigate() {
  let input = document.getElementById("urlInput").value.trim();
  if (!input) return;

  // If it looks like a search query (no domain)
  if (!input.includes('.') && !input.includes('://')) {
    input = `https://www.google.com/search?q=${encodeURIComponent(input)}`;
  } 
  else if (!input.startsWith('http')) {
    input = 'https://' + input;
  }

  window.location.href = SCRAMJET_PREFIX + input;
}

function quickGo(url) {
  window.location.href = SCRAMJET_PREFIX + url;
}

// Event listeners
document.getElementById("urlInput").addEventListener("keypress", e => {
  if (e.key === "Enter") navigate();
});

window.addEventListener("load", () => {
  updateClock();
  setInterval(updateClock, 30000); // update every 30 seconds
});
