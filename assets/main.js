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
  const dialogElement = document.querySelector("dialog");
  const cancelButton = document.getElementById("close");

  cancelButton.addEventListener("click", function () {
    dialogElement.style.display = "none";
  });

  dialogElement.style.display = "block";

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
 * Check if browser supports native geo-location and construct share link if it does
 * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#getting_the_current_position
 *
 */
function geoFindMe() {
  const status = document.querySelector(".status-title");
  const mapLink = document.querySelector("#map-link");

  mapLink.href = "";
  mapLink.textContent = "";

  function success(position) {
    console.log("success", position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = "";
    mapLink.href = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=17`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

    status.textContent = "private share location";

    webShare({
      title: `my current location is ${mapLink.textContent}`,
      text: `my current location is ${mapLink.textContent}`,
      url: mapLink.href,
    });
  }

  function error() {
    status.textContent = "unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "geolocation is not supported by your browser";
  } else {
    status.textContent = "locating (no server)…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

document.querySelector("#location-share").addEventListener("click", geoFindMe);

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
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = "block";

  addBtn.addEventListener("click", () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = "none";
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
});
