interface IRGBA {
  red: number;
  green: number;
  blue: number;
  alfa: number;
}

export class CropImageHelper {
  private data: any = {};
  private imageUrl: string | undefined;
  private image: HTMLImageElement = new Image();

  constructor(imageUrl: string) {
    this.imageUrl = imageUrl;
 
  }

  cropImage(): Promise<string> {
    var image: HTMLImageElement = new Image();
    var fillCanvas = this.fillCanvas.bind(this);

    var canvas = document.createElement("canvas") as HTMLCanvasElement;
    var context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    document.body.appendChild(canvas);
    canvas.style.display = "none";

    this.image = image;
    image.crossOrigin = "Anonymous";
    image.src = this.imageUrl as string;
    this.image = image;

    return new Promise((resolve, reject) => {
      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;

        context.drawImage(image, 0, 0, image.width, image.height);
        const response = fillCanvas(context, image, canvas);

        // Eğer fillCanvas bir değer dönüyorsa, onu resolve ile döndürün
        if (response) {
          resolve(response);
        } else {
          reject("fillCanvas did not return a value.");
        }
      };
    });
  }

  private fillCanvas(context: CanvasRenderingContext2D, image: HTMLImageElement, canvas: HTMLCanvasElement) {
    this.data = context?.getImageData(0, 0, image.width, image.height).data;

    var top: number = this.scanY(image, true) as number;
    var bottom: number = this.scanY(image, false) as number;
    var left: number = this.scanX(image, true) as number;
    var right: number = this.scanX(image, false) as number;

    var new_width = right - left;
    var new_height = bottom - top;

    canvas.width = new_width;
    canvas.height = new_height;

    context.drawImage(image, left, top, new_width, new_height, 0, 0, new_width, new_height);

    const canvasURL = canvas.toDataURL("image/webp", 1);
    return canvasURL;
  }

  private scanX(image: HTMLImageElement, left: boolean) {
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

  private scanY(image: HTMLImageElement, top: boolean) {
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

  private isEmpty(rgba: IRGBA) {
    return rgba.alfa == 0 || (rgba.red == 255 && rgba.green == 255 && rgba.blue == 255);
  }

  private getRGBA(x: number, y: number, image: HTMLImageElement) {
    return {
      red: this.data[(image.width * y + x) * 4],
      green: this.data[(image.width * y + x) * 4 + 1],
      blue: this.data[(image.width * y + x) * 4 + 2],
      alfa: this.data[(image.width * y + x) * 4 + 3],
    };
  }
}
