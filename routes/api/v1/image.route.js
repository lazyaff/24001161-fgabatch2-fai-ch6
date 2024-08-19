const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/image.controller");

router.get("/", controller.getImages);
router.get("/:id", controller.getImageDetails);
router.put("/:id", controller.updateImageDetails);
router.delete("/:id", controller.deleteImage);

module.exports = router;
