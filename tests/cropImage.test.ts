import { CropImageHelper } from "../src";

test("adds two numbers correctly", async () => {
  const imageUrl = "https://models.readyplayer.me/64e3055495439dfcf3f0b665.png";
  const cropImageHelper = new CropImageHelper(imageUrl);
  const result = await cropImageHelper.cropImage();

  expect(result.startsWith("data:image/webp;base64,")).toBe(true);
});
