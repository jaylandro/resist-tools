const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const tempImage = document.getElementById("temp-image");
const video = document.querySelector('video');
const scale = 0.07;
const constraints = {
  audio: false,
  video: true
};

function pixelateFaces() {
  const tracker = new tracking.ObjectTracker('face');

  canvas.width = tempImage.width;
  canvas.height = tempImage.height;

  const scaledW = canvas.width * scale;
  const scaledH = canvas.height * scale;

  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);

  tracking.track('#temp-image', tracker);

  tracker.on('track', function (event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(tempImage, 0, 0);
    context.imageSmoothingEnabled = false;
    context.drawImage(tempImage, 0, 0, scaledW, scaledH);

    event.data.forEach(function (rect) {
      context.drawImage(canvas, (rect.x * scale), (rect.y * scale), (rect.width * scale), (rect.height * scale), rect.x, rect.y, rect.width, rect.height + 10);
    });

    context.drawImage(tempImage, 0, 0, scaledW, scaledH, 0, 0, scaledW, scaledH);
  });
};

const imgInput = document.getElementById("image-input");

imgInput.addEventListener("change", function (e) {
  if (e.target.files) {
    const imageFile = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(imageFile);

    reader.onloadend = function (e) {
      tempImage.src = e.target.result;

      tempImage.onload = function (ev) {
        pixelateFaces();
      };
    };
  }
});

function takePhoto(video) {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.drawImage(video, 0, 0);
  const dataURL = canvas.toDataURL('image/jpeg', 1.0);
  tempImage.src = dataURL;
}

navigator.mediaDevices.getUserMedia(constraints)
  .then(stream => {
    window.stream = stream;
    video.srcObject = stream;
  }).catch(error => {
    console.error('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
  });

document.querySelector('.take-picture').onclick = () => takePhoto(video);

window.downloadImg = (el) => {
  const image = canvas.toDataURL('image/jpeg', 1.0);
  el.href = image;
};
