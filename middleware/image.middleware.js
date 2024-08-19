const { cloud } = require("../libs/multer");

const imageUpload = function (req, res, next) {
    const upload = cloud(["image/jpeg", "image/png"]).single("image");

    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: err.message,
            });
        }
        next();
    });
};

module.exports = imageUpload;
