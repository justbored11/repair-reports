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
  searchTags?: string[];
  _id: string;
};

export type ChangeFormPayloadT = {
  procIndex?: number;
  instructions?: string;
  newImageUrl?: string;
  imageIndex?: number;
  newImageObj?: ImageObjT;
  allProcedures?: ProcedureT[];
  formField?: Record<string, string>;
  searchTags?: string[];
  imageId?: string;
};

// export type RepairFormDispatchType =
//   | "ADD_IMAGE"
//   | "ADD_PROCEDURE"
//   | "REMOVE_PROCEDURE"
//   | "REMOVE_IMAGE"
//   | "UPDATE_IMAGES"
//   | "UPDATE_INTRUC"
//   | "UPDATE_PROCEDURES"
//   | "UPDATE_FIELD"
//   | "UPDATE_SEARCH_TAGS";

export type RepairFormDispatchT = React.Dispatch<RepairFormStateActionT>;

// export type RepairFormDispatchT = React.Dispatch<{
//   type: RepairFormDispatchType;
//   payload: ChangeFormPayloadT;
// }>;

export type RepairFormStateActionT =
  | {
      type: "UPDATE_SEARCH_TAGS";
      payload: { searchTags: string[] };
    }
  | {
      type: "ADD_IMAGE";
      payload: { procIndex: number };
    }
  | {
      type: "UPDATE_FIELD";
      payload: { formField: Record<string, string> };
    }
  | {
      type: "ADD_PROCEDURE";
      payload: { procIndex: number };
    }
  | {
      type: "UPDATE_PROCEDURES";
      payload: { allProcedures: ProcedureT[] };
    }
  | {
      type: "UPDATE_IMAGES";
      payload: {
        procIndex: number;
        imageIndex: number;
        newImageObj: ImageObjT;
      };
    }
  | {
      type: "REMOVE_IMAGE";
      payload: {
        procIndex: number;
        imageId: string;
      };
    }
  | {
      type: "UPDATE_INTRUC";
      payload: { procIndex: number; instructions: string };
    };

export type repairDataT = {
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

export type signatureT = {
  apikey: string;
  cloudname: string;
  signature: string;
  timestamp: number;
  folder: string;
};

// export type imageObjT = {
//   imageUrl: string;
//   imageThumb: string;
//   caption: string;
//   imageId: string;
//   folder: string;
// };

// export type ProcedureT = {
//   images: string[];
//   imageObjs?: imageObjT[];
//   imagesIdArr: string[];
//   instructions: string;
//   procedureNum: number;
//   thumbs: string[];
// };
// export type repairDataT = Record<string, string>;
// export type repairDataT = {
//   boardType: string;
//   createdBy: string;
//   engineMake: string;
//   group: string;
//   procedureArr: ProcedureT[];
//   removed: boolean;
//   title: string;
//   visibility: string;
//   _id: string;

// };
