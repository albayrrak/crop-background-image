// src/index.ts
var CropImageHelper = class {
  constructor(imageUrl) {
    this.data = {};
    this.imageUrl = imageUrl;
    this.image = new Image();
  }
  cropImage() {
    var image = new Image();
    var fillCanvas = this.fillCanvas.bind(this);
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    document.body.appendChild(canvas);
    canvas.style.display = "none";
    this.image = image;
    image.crossOrigin = "Anonymous";
    image.src = this.imageUrl;
    this.image = image;
    return new Promise((resolve, reject) => {
      image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
        const response = fillCanvas(context, image, canvas);
        if (response) {
          resolve(response);
        } else {
          reject("fillCanvas did not return a value.");
        }
      };
    });
  }
  fillCanvas(context, image, canvas) {
    this.data = context == null ? void 0 : context.getImageData(0, 0, image.width, image.height).data;
    var top = this.scanY(image, true);
    var bottom = this.scanY(image, false);
    var left = this.scanX(image, true);
    var right = this.scanX(image, false);
    var new_width = right - left;
    var new_height = bottom - top;
    canvas.width = new_width;
    canvas.height = new_height;
    context.drawImage(image, left, top, new_width, new_height, 0, 0, new_width, new_height);
    const canvasURL = canvas.toDataURL("image/webp", 1);
    return canvasURL;
  }
  scanX(image, left) {
    var offset = left ? 1 : -1;
    for (var x = left ? 0 : image.width - 1; left ? x < image.width : x > -1; x += offset) {
      for (var y = 0; y < image.height; y++) {
        if (!this.isEmpty(this.getRGBA(x, y, image))) {
          return x;
        }
      }
    }
    return null;
  }
  scanY(image, top) {
    var offset = top ? 1 : -1;
    console.log("scany", top);
    for (var y = top === true ? 0 : image.height - 1; top ? y < image.height : y > -1; y += offset) {
      for (var x = 0; x < image.width; x++) {
        if (!this.isEmpty(this.getRGBA(x, y, image))) {
          return y;
        }
      }
    }
    return null;
  }
  isEmpty(rgba) {
    return rgba.alfa == 0 || rgba.red == 255 && rgba.green == 255 && rgba.blue == 255;
  }
  getRGBA(x, y, image) {
    return {
      red: this.data[(image.width * y + x) * 4],
      green: this.data[(image.width * y + x) * 4 + 1],
      blue: this.data[(image.width * y + x) * 4 + 2],
      alfa: this.data[(image.width * y + x) * 4 + 3]
    };
  }
};
export {
  CropImageHelper
};
//# sourceMappingURL=index.mjs.map