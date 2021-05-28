/**
 * Register our service worker
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#enter_service_workers
 */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((serviceWorker) => {
      // console.log("Service Worker registered: ", serviceWorker);
    })
    .catch((error) => {
      console.error("Error registering the Service Worker: ", error);
    });
}

/**
 * Generic webshare (triggers sharing options on mobile)
 * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
 *
 */
function webShare(content) {
  if (navigator.share) {
    navigator
      .share(content)
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch(console.error);
  }
}

/**
 * Generate random IDs for jitsi meet urls
 */

const randoString = () => Math.random().toString(36).substr(2, 9);

window.document.randomId = randoString;

/**
 * Handle deferrering PWA install until user clicks install
 * https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen#javascript_for_handling_the_install
 */

const addBtn = document.querySelector(".add-button");
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  addBtn.style.display = "block";

  addBtn.addEventListener("click", () => {
    addBtn.style.display = "none";
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      deferredPrompt = null;
    });
  });
});
