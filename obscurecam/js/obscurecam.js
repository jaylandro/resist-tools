const video = document.querySelector('video');
const loadedimg = document.getElementById('img');
const canvas = document.getElementById('pixelcanvas');

function pixelateFaces(img) {
  const context = canvas.getContext('2d');
  const scale = 0.7 / 10;
  canvas.width = img.width;
  canvas.height = img.height;
  const scw = canvas.width * scale;
  const sch = canvas.height * scale;
  context.drawImage(img, 0, 0);
  context.imageSmoothingEnabled = false;
  context.drawImage(img, 0, 0, scw, sch);

  const tracker = new tracking.ObjectTracker(['face']);
  tracker.setStepSize(1.7);
  tracking.track('#img', tracker);

  tracker.on('track', (event) => {
    if (!event.data) return;

    event.data.forEach((rect) => {
      window.plot(rect.x, rect.y, rect.width, rect.height);
    });

    context.drawImage(img, 0, 0, scw, sch, 0, 0, scw, sch);
  });

  window.plot = (x, y, w, h) => {
    context.drawImage(canvas, (x * scale), (y * scale), (w * scale), (h * scale), x, y, w, h + 10);
  };

  window.downloadImg = (el) => {
    const image = canvas.toDataURL("image/jpg");
    el.href = image;
  };
};

const constraints = {
  audio: false,
  video: {
    width: { ideal: 4096 },
    height: { ideal: 2160 } 
  }
};

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);

const button = document.querySelector('.take-picture');

button.onclick = function() {
  // canvas.width = video.videoWidth;
  // canvas.height = video.videoHeight;
  // canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  // pixelateFaces(video)
};

document.addEventListener('DOMContentLoaded', () => {
  pixelateFaces(loadedimg);
})