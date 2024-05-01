import { ImageObjT } from "../../types";
import { v4 as uuidv4 } from "uuid";

export type UploadStatus =
  | "SUCCESS"
  | "UPLOADING"
  | "ERROR"
  | "IDLE"
  | "DELETING"
  | "NEEDUPLOAD";

export class ImageObj implements ImageObjT {
  public imageUrl = "";
  public imageThumb = "";
  public caption = "";
  public imageId = "";
  public folder = "testFolder";
  public uploadStatus: UploadStatus = "IDLE";
  constructor() {
    this.imageId = uuidv4();
  }
}
