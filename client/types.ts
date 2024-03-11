export interface ImageObjT {
  imageUrl: string;
  imageThumb?: string;
  caption?: string;
  imageId: string;
  folder: string;
}

export interface ProcedureT {
  images: string[];
  imageObjs: ImageObjT[];
  imagesIdArr: string[];
  instructions: string;
  procedureNum: number;
  thumbs: string[];
}

export type RepairDataT = {
  boardType: string;
  createdBy: string;
  engineMake: string;
  group: string;
  procedureArr: ProcedureT[];
  removed: boolean;
  title: string;
  visibility: string;
  _id: string;
};

export type ChangeFormPayloadT = {
  procIndex?: number;
  instructions?: string;
  newImageUrl?: string;
  newImageIndex?: number;
  newImageObj?: ImageObjT;
  allProcedures?: ProcedureT[];

  formField?: Record<string, string>;
};

// export enum RepairFormDispatchType {
//   UPDATE_IMAGES,
//   ADD_IMAGE,
//   UPDATE_INTRUC,
//   ADD_PROCEDURE,
//   REMOVE_PROCEDURE,
//   UPDATE_PROCEDURES,
//   UPDATE_FIELD,
// }
export type RepairFormDispatchType =
  | "UPDATE_IMAGES"
  | "ADD_IMAGE"
  | "UPDATE_INTRUC"
  | "ADD_PROCEDURE"
  | "REMOVE_PROCEDURE"
  | "UPDATE_PROCEDURES"
  | "UPDATE_FIELD";

export type RepairFormDispatchT = React.Dispatch<{
  type: RepairFormDispatchType;
  payload: ChangeFormPayloadT;
}>;
