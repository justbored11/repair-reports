import { ImageObjT } from "../../types";
import { v4 as uuidv4 } from "uuid";

export class ImageObj implements ImageObjT {
  public imageUrl = "";
  public imageThumb = "";
  public caption = "";
  public imageId = "";
  public folder = "testFolder";
  constructor() {
    this.imageId = uuidv4();
  }
}
