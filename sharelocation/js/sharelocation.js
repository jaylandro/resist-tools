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

    status.textContent = "your current 📍 location is";

    window.currentLocation = mapLink;
  }

  function error() {
    status.textContent = "unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "geolocation is not supported by your browser";
  } else {
    status.textContent = "browser getting gps…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

geoFindMe();

/**
* Copy to cliboard
*/
const copyToClipboardBtn = document.querySelector('.copy-to-clipboard');

copyToClipboardBtn.addEventListener('click', () => {
  var mapLink = document.querySelector('#map-link');
  var triggerCopyBtn = document.querySelector('.copy-to-clipboard');

  try {
    var successful = navigator.clipboard.writeText(mapLink.getAttribute('href'));

    triggerCopyBtn.innerHTML = "link copied!"
    console.log('Copy email command was ' + (successful ? 'successful' : 'unsuccessful'));
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});

document.querySelector('.dm-share').addEventListener('click', () => {
  webShare({
    title: `my current location is ${currentLocation.textContent}`,
    text: `my current location is ${currentLocation.textContent}`,
    url: currentLocation.href,
  });
})