// types/index.d.ts

declare module "crop-background-image" {
  export interface IRGBA {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }

  export class CropImageHelper {
    constructor(imageUrl: string);
    cropImage(): Promise<string>;
  }
}
