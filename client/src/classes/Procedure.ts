import { v4 as uuid4 } from "uuid";
import { ProcedureT } from "../../types";
import { ImageObj } from "./ImageObj";

export class Procedure implements ProcedureT {
  public images = [""];
  public imageObjs: ImageObj[] = [new ImageObj()];
  public imagesIdArr = [];
  public instructions = "";
  public procedureNum = 0;
  public thumbs = [];
  public id = uuid4();

  constructor() {}
}
