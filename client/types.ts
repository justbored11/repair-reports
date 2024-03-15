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
  newImageIndex?: number;
  newImageObj?: ImageObjT;
  allProcedures?: ProcedureT[];
  formField?: Record<string, string>;
  searchTags?: string[];
};

export type RepairFormDispatchType =
  | "UPDATE_IMAGES"
  | "ADD_IMAGE"
  | "UPDATE_INTRUC"
  | "ADD_PROCEDURE"
  | "REMOVE_PROCEDURE"
  | "UPDATE_PROCEDURES"
  | "UPDATE_FIELD"
  | "UPDATE_SEARCH_TAGS";

export type RepairFormDispatchT = React.Dispatch<RepairFormStateDispatchT>;

// export type RepairFormDispatchT = React.Dispatch<{
//   type: RepairFormDispatchType;
//   payload: ChangeFormPayloadT;
// }>;

export type RepairFormStateDispatchT =
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
        newImageIndex: number;
        newImageObj: ImageObjT;
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
