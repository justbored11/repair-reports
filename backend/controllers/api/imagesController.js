const { cloudinary } = require("../../config/cloudinarySdk");
const signatureUtility = require("../../utilities/signuploadform");

const deleteImage = async (req, res) => {
  const { imageId } = req.body;

  // const { signature, timestamp } = signatureUtility.signuploadform();

  try {
    const response = await cloudinary.uploader.destroy(imageId, {
      resource_type: "image",
      // timestamp,
    });

    if (response.result != "ok") {
      throw Error("not found");
    }

    res.status(200).send({
      result: "delete",
      asset: imageId,
    });
  } catch (error) {
    console.log("error", error);

    if (error?.message == "not found") {
      res.status(404).send({
        error: "not found",
        asset: imageId,
      });
      return;
    }

    res.send({
      error,
    });
  }
};

module.exports = { deleteImage };
