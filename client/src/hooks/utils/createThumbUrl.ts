const addText = "/upload" + "/c_thumb,w_200,g_face/";
export default function createThumbUrl(text: string) {
  if (typeof text != "string") {
    throw new Error("argument invalid");
  }

  const parts = text.split("/upload/");
  const newUrl = parts[0].concat(addText).concat(parts[1]);
  return newUrl;
}
