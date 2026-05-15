const SCRAMJET_PREFIX = "/scramjet/";

async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      console.log("✅ Scramjet Service Worker registered");
    } catch (e) {
      console.error("❌ SW registration failed", e);
    }
  }
}

function navigate() {
  let input = document.getElementById("urlInput").value.trim();
  if (!input) return;

  if (!input.startsWith("http")) input = "https://" + input;

  window.location.href = SCRAMJET_PREFIX + input;
}

function quickGo(url) {
  window.location.href = SCRAMJET_PREFIX + url;
}

document.getElementById("urlInput").addEventListener("keypress", e => {
  if (e.key === "Enter") navigate();
});

window.addEventListener("load", registerSW);
