import { ImageObjT } from "../../types";
import { v4 as uuidv4 } from "uuid";

// export type UploadStatus =
//   | "SUCCESS"
//   | "UPLOADING"
//   | "ERROR"
//   | "IDLE"
//   | "DELETING"
//   | "NEEDUPLOAD";

export class ImageObj implements ImageObjT {
  public imageUrl = "";
  public imageThumb = "";
  public caption = "";
  public imageId = "";
  public folder = "testFolder";
  // public uploadStatus: UploadStatus = "IDLE";
  public _id: string = uuidv4();

  constructor();
  constructor(image: ImageObjT);
  constructor(image?: ImageObjT) {
    if (image) {
      this.imageUrl = image?.imageUrl ? image.imageUrl : this.imageUrl;
      this.imageThumb = image?.imageThumb ? image.imageThumb : this.imageThumb;
      this.caption = image?.caption ? image.caption : this.caption;
      this.imageId = image?.imageId ? image.imageId : this.imageId;
      this.folder = image?.folder ? image.folder : this.folder;

      this._id = image?._id ? image._id : this._id;
    }
  }
}
