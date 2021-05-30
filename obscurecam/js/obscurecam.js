const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const tempImage = document.getElementById("temp-image");
const imgInput = document.getElementById("image-input");
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

imgInput.addEventListener("change", function (e) {
  if (e.target.files.length) {
    const imageFile = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(imageFile);

    reader.onloadend = (e) => {
      tempImage.src = e.target.result;
    };
  }
});

tempImage.onload = () => pixelateFaces();

window.downloadImg = (el) => {
  const image = canvas.toDataURL('image/jpeg', 1.0);
  el.href = image;
};
