const express = require("express");
const router = express.Router();
const imageUpload = require("../../../middleware/image.middleware");
const controller = require("../../../controllers/image.controller");

router.get("/", controller.getImages);
router.get("/:id", controller.getImageDetails);
router.post("/", imageUpload, controller.uploadImage);
router.put("/:id", controller.updateImageDetails);
router.delete("/:id", controller.deleteImage);

module.exports = router;
