const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const tempImage = document.getElementById("temp-image");
const imgInput = document.getElementById("image-input");
const scale = 0.07;

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
    if (event.data === undefined) return;

    console.log('tracked', event.data)
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(tempImage, 0, 0);
    context.imageSmoothingEnabled = false;
    context.drawImage(tempImage, 0, 0, scaledW, scaledH);

    event.data.forEach(function (rect) {
      context.drawImage(canvas, (rect.x * scale), (rect.y * scale), (rect.width * scale), (rect.height * scale), rect.x, rect.y, rect.width, rect.height + 25);
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
      tempImage.onload = () => pixelateFaces();
      tempImage.src = e.target.result;
    };
  }
});

window.downloadImg = (el) => {
  const image = canvas.toDataURL('image/jpeg', 1.0);
  el.href = image;
};

// document.querySelector('.dm-share').addEventListener('click', () => {
//   const file = new File([canvas.toBlob(() => console.log('done blobbing'))], "safetyfirst.jpg", {type: 'image/jpeg'});

//   webShare({
//     title: `Privacy pix - resist.tools`,
//     text: `Safely sharing a photo`,
//     files: [file]
//   });
// })
