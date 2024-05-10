const form = document.querySelector("#repair-form");
//main repair object sent to server
class Repair {
  constructor(
    procedures = [],
    searchtags = "blank tags",
    title = "blank title",
    board = "no board type",
    engine = "no engine make",
    id = "no id"
  ) {
    this.procedureArr = procedures;
    this.searchtags = searchtags;
    this.title = title;
    this.boardType = board;
    this.engineMake = engine;
    this.removed = false;
    this.group = "public";
    this.id = id;
  }

  buildRepair(procArr) {
    this.procedureArr = procArr;
    this.boardType = document.querySelector("#board-type").value;
    // this.searchtags = document.querySelector("#search-tags").value;
    this.id = document.querySelector("#id").value;
    this.title = document.querySelector("#title").value;
    this.engineMake = document.querySelector("select[name=engineMake]").value; //!change this to select
    this.group = document.querySelector('select[name="groupId"]').value;

    return this;
  }
}

// sub class inside Repair
class Procedure {
  constructor(
    thumbs = [],
    imagesArr = [],
    procedureNum = 1,
    instructions = "default instructions",
    imagesIdArr = []
  ) {
    this.images = imagesArr;
    this.procedureNum = procedureNum;
    this.instructions = instructions;
    this.thumbs = thumbs;
    this.imagesIdArr = imagesIdArr;
  }
}

// =================================================
// EVENT LISTENERS
// =================================================

// document.addEventListener("DOMContentLoaded", async () => {
const instructions = form.querySelector("#instructions");

instructions.addEventListener("click", (event) => {
  const action = event.target.dataset.action;

  //parent of procedure of target
  const procedure = event.target.closest(".procedure");

  switch (action) {
    case "add-image":
      addImageToProcedure(event);
      break;

    case "remove-image":
      removeImage(event);
      break;

    case "remove-procedure":
      removeProcedure(event);
      break;

    case "add-procedure":
      addProcedureToInstructions(event);
      break;

    default:
      break;
  }
});
// });

///SUBMIT FORM EVENT
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  //status message overlay
  const statusIcons = document.querySelector(".status-icons");
  const progress = statusIcons.querySelector(".progress");
  const form = document.querySelector("#repair-form"); //get repair form
  let procArr = [];
  const repair = new Repair(); // actual object to submit to server

  statusIcons.classList.toggle("invisible"); //show loading message

  form.classList.toggle("invisible"); //hide form

  ///submiting to server
  try {
    //build array of procedure to put inside repair
    statusMessage("<br>Uploading images...");
    progress.value += 10;
    procArr = await createProcedureArr();
    statusMessage("Done");
    progress.value = 50;

    // build repair using procedure array
    repair.buildRepair(procArr);
    statusMessage("<br>Saving Report...");
    progress.value += 75;

    const serverResponse = await putRepair(repair);
    statusMessage("Done");
    progress.value += 100;

    // redirect to link server provides
    location.assign(serverResponse.repairLink);
  } catch (error) {
    statusIcons.classList.toggle("invisible"); //hide loading message
    form.classList.toggle("invisible"); //show form
    console.error(`Update error`, error);
    window.confirm("Update error");
  }
});

// ==========================================================================
// FUNCTIONS
// ==========================================================================
///PUT TO SERVER
async function putRepair(repairObj) {
  try {
    const response = await fetch(`/repair/edit/${repairObj.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(repairObj),
    }).then((data) => data.json());
    return response;
  } catch (error) {
    console.error(`PUT error`);
  }
}

///GET SIGNATURE
async function getSignature() {
  const signResponse = await fetch("/repairform/sign"); //fetch signature from server
  const signData = await signResponse.json(); //convert to json
  return signData;
}
///create Procedure Array
async function createProcedureArr() {
  const allProcedureElements = Array.from(
    document.querySelectorAll("#instructions .procedure")
  );

  const signData = await getSignature();

  //start uploading each procedures respective images
  const procedurePromises = allProcedureElements.map(async (proc, index) => {
    let images = await uploadImages(proc, signData); //todo so far so good uploading new images and return urls of old ones
    const procedure = new Procedure(
      images.thumbs,
      images.links,
      index,
      proc.querySelector(".instructions").value,
      images.imagesIdArr
    );

    return procedure;
  });

  const procArr = await Promise.all(procedurePromises);

  return procArr;
}

function removeProcedure(event) {
  const procedure = event.target.closest(".procedure");
  procedure.remove();
}

/// CHANGE STATUS MESSAGE
function statusMessage(text) {
  const statusMessage = document.querySelector(".loading-text");

  statusMessage.innerHTML += `${text}`;
}

/// ADD ANOTHER PROCEDURE ELEMENT
function addProcedureToInstructions(event) {
  // const procedure = new Procedure();
  const instructions = event.target.closest("#instructions");
  // instructions.dataset.currentprocid++;

  const parentProcedure = event.target.closest(".procedure"); //new

  const procedureTemplate = document
    .querySelector("#procedure-template")
    .cloneNode(true);

  procedureTemplate.id = null;
  // parentProcedure.insertAdjacentElement("afterend", li);//! original
  parentProcedure.insertAdjacentElement("afterend", procedureTemplate); //! new
}

///GET ANY IMAGES THAT REQUIRE UPLOAD from procedure :
function getImages(element) {
  let files = [];
  class imgObj {
    constructor(imageBuffer = null, isNew = false, url = null) {
      this.imageBuffer = imageBuffer; //buffer of image if any
      this.isNew = isNew; //does it need to upload
      this.url = url; // url if does not need upload
    }
  }

  //all inputs with images even ones that dont need upload
  const images = element.querySelectorAll("#instructions [type=file]");

  images.forEach((image) => {
    //if a file is attached it is new image
    if (image.files.length > 0) {
      // files.push(image.files);
      files.push(new imgObj(image.files, true, null));
    }
    //no image attached but does have orig url then its existing image
    else if (image.files.length === 0 && image.dataset.origurl) {
      files.push(new imgObj(null, false, image.dataset.origurl));
    }
  });

  return files; //return array of image objects
}

///UPLOAD AND RETURN ARRAY OF LINKS for one procedure
///return image links after uploading from an element
// THIS RECIEVES PROCEDURE and should return links of new images uploded along with
// old image links of one procedure
async function uploadImages(element, signData) {
  const url =
    "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
  const formData = new FormData();

  //get images from procedure element
  const imagesToUpload = getImages(element);
  let response = null;

  //upload all images that need it
  let uploadPromisesArr = imagesToUpload.map(async (image) => {
    ///new image requires upload
    if (image.isNew) {
      let file = image.imageBuffer[0];

      formData.append("file", file);
      formData.append("api_key", signData.apikey);
      formData.append("timestamp", signData.timestamp);
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder); //put this file in folder named cata

      response = await fetch(url, {
        method: "POST",
        body: formData,
      }).then((data) => data.json());
    }
    //image is not new use url
    else if (!image.isNew) {
      response = {
        url: image.url,
        public_id: null,
      };
    }

    return response; // response as whole returned
    // }
  });

  //array of responses after upload
  let uploadResponses = await Promise.all(uploadPromisesArr);

  const imageurls = uploadResponses.map((response) => {
    return response.url;
  });

  const thumbsLinks = uploadResponses.map((response) => {
    return response.url.replace("/upload/", "/upload/c_scale,w_400/");
  });

  //getting images public id for cloudinary actions
  const idList = uploadResponses.map((response) => {
    return response.public_id;
  });

  return {
    links: imageurls, //! array of url links to images
    thumbs: thumbsLinks, //! array of url links to thumbs
    imagesIdArr: idList, //!array of image ids from cloudinary
  };
}

///REMOVE IMAGE FROM A PROCEDURE
function removeImage(event) {
  const procedure = event.target.closest(".procedure");
  //   const uploadList = procedure.querySelector(".uploads");
  //   uploadList.dataset.totalfiles--;
  //li the image input is in
  const imageListItem = event.target.closest("li");
  imageListItem.remove();
}

//preview image on page locally when input for image is changed
function previewImage(event) {
  const currentUpload = event.target.closest(".imageuploaded");
  const image = currentUpload.querySelector("img");
  image.src = URL.createObjectURL(event.target.files[0]);
  image.alt = "image preview";
  image.classList.add("img-mini");
}

// add extra image input to DOM
function addImageToProcedure(event) {
  //parent line item
  const procedure = event.target.closest(".procedure");
  const uploadList = procedure.querySelector(".uploads");
  const imageLiTemplate = document
    .querySelector("#image-template")
    .cloneNode(true);
  imageLiTemplate.id = null;
  uploadList.appendChild(imageLiTemplate);
}
