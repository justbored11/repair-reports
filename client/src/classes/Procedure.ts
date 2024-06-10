import { v4 as uuid4 } from "uuid";
import { ImageObjT, ProcedureT } from "../../types";
import { ImageObj } from "./ImageObj";

export class Procedure implements ProcedureT {
  public images: string[] = [];
  public imageObjs: ImageObj[] = [];
  public imagesIdArr: string[] = [];
  public instructions = "";
  public procedureNum = 0;
  public thumbs: string[] = [];
  public _id = uuid4();

  constructor();
  constructor(procedure: ProcedureT);
  constructor(procedure?: ProcedureT) {
    if (procedure) {
      this.images = procedure?.images ? procedure.images : this.images;
      this.imageObjs = procedure?.imageObjs
        ? this.intializeImageObjs(procedure.imageObjs)
        : this.imageObjs;
      this.imagesIdArr = procedure?.imagesIdArr
        ? procedure.imagesIdArr
        : this.imagesIdArr;
      this.instructions = procedure?.instructions
        ? procedure.instructions
        : this.instructions;
      this.procedureNum = procedure?.procedureNum
        ? procedure.procedureNum
        : this.procedureNum;
      this.thumbs = procedure?.thumbs ? procedure.thumbs : this.thumbs;
      this._id = procedure?._id ? procedure._id : this._id;
    }
  }

  //accept ImageObjT type and create ImageObj instances
  intializeImageObjs(imageData: ImageObjT[]): ImageObj[] {
    return imageData.map((data) => {
      return new ImageObj(data);
    });
  }
}
