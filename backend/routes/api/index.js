const router = require("express").Router();
const apiAuthController = require("../../controllers/api/apiAuth");
const { ensureAuthApi } = require("../../middleware/auth");
const repairRouter = require("./repairs");
const signatureRouter = require("./signature.js");

router.post("/login", apiAuthController.apiLogin);
router.get("/logout", apiAuthController.apiLogout);
router.post("/signup", apiAuthController.apiSignup);

router.use("/repairs", ensureAuthApi, repairRouter);
router.use("/signform", ensureAuthApi, signatureRouter);

module.exports = router;
