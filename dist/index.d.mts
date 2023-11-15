declare class CropImageHelper {
    private data;
    private imageUrl;
    private image;
    constructor(imageUrl: string);
    cropImage(): Promise<string>;
    private fillCanvas;
    private scanX;
    private scanY;
    private isEmpty;
    private getRGBA;
}

export { CropImageHelper };
