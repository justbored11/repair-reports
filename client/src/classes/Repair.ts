import { ProcedureT, RepairDataT } from "../../types";
import { Procedure } from "./Procedure";
import { v4 as uuidv4 } from "uuid";

export class Repair {
  public searchTags: string[] = [];
  public boardType = "other";
  public engineMake = "other";
  public group = "public";
  public procedureArr: Procedure[] = [];
  public title = "New Repair";
  public _id = uuidv4();

  constructor(repair: RepairDataT);
  constructor();
  constructor(repair?: RepairDataT) {
    if (repair) {
      this.searchTags = repair?.searchTags
        ? repair.searchTags
        : this.searchTags;
      this.boardType = repair?.boardType ? repair.boardType : this.boardType;
      this.engineMake = repair?.engineMake
        ? repair.engineMake
        : this.engineMake;
      this.group = repair?.group ? repair.group : this.group;

      //if procedures passed initialize them else the default
      this.procedureArr = repair?.procedureArr
        ? this.intializeProcedures(repair.procedureArr)
        : this.procedureArr;
      this.title = repair?.title ? repair.title : this.title;
      this._id = repair?._id ? repair._id : this._id;
    }
  }

  intializeProcedures(procedures: ProcedureT[]): Procedure[] {
    return procedures.map((proc) => {
      return new Procedure(proc);
    });
  }
}
