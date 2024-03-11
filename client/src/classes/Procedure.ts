import { ProcedureT, ImageObjT } from "../../types";
import { ImageObj } from "./ImageObj";

export class Procedure implements ProcedureT {
  public images = [""];
  public imageObjs: ImageObjT[] = [new ImageObj()];
  public imagesIdArr = [];
  public instructions = "";
  public procedureNum = 0;
  public thumbs = [];

  constructor() {}
}
