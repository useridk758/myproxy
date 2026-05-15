const SCRAMJET_PREFIX = "/scramjet/";

async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      console.log("✅ Scramjet registered");
    } catch (e) {
      console.error("SW failed", e);
    }
  }
}

function navigate() {
  let input = document.getElementById("urlInput").value.trim();
  if (!input) return;

  if (!input.startsWith("http")) {
    if (!input.includes('.') && !input.includes(' ')) {
      // Treat as search
      input = `https://www.google.com/search?q=${encodeURIComponent(input)}`;
    } else {
      input = "https://" + input;
    }
  }

  // This is the important part — opens inside the proxy without full redirect mess
  window.location.href = SCRAMJET_PREFIX + input;
}

function quickGo(url) {
  window.location.href = SCRAMJET_PREFIX + url;
}

document.getElementById("urlInput").addEventListener("keypress", e => {
  if (e.key === "Enter") navigate();
});

window.addEventListener("load", () => {
  updateClock();
  setInterval(updateClock, 30000);
  registerSW();
});

// Clock
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  hours = hours % 12 || 12;
  document.getElementById('time').textContent = `${hours}:${minutes}`;
  
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);
}
