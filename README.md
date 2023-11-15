# Image Cropping Utility with TypeScript

This TypeScript project contains a function that crops the edges of images with transparent backgrounds by detecting the edge colors.

## Usage

The project includes a class named `CropImageHelper`, which contains a function named `cropImage` that can be used as shown below:

```typescript
import { CropImageHelper } from "crop-background-image";

async function cropExample() {
  try {
    const imageUrl = "Here comes the image URL.";
    const croppedImage = await new CropImageHelper(imageUrl).cropImage();
    // croppedImage contains the base64 encoded data of the cropped image
    console.log("Cropped Image:", croppedImage);
  } catch (error) {
    console.error("Error:", error);
  }
}

cropExample();
```

| Before                                                                      | After                                                                                                |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| ![Before Image](https://models.readyplayer.me/64e3055495439dfcf3f0b665.png) | ![After Image](https://res.cloudinary.com/dmy8fxyel/image/upload/v1700043586/crop-image_k0kdbm.webp) |

| Before                                                                                     | After                                                                                                  |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| ![Before Image](https://models.readyplayer.me/64e3055495439dfcf3f0b665.png?pose=thumbs-up) | ![After Image](https://res.cloudinary.com/dmy8fxyel/image/upload/v1700043615/crop-image-2_d3t41c.webp) |
