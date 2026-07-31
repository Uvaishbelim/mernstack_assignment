const multer = require("multer");

const storage = multer.diskStorage({

    destination: "uploads/",

    filename(req, file, cb) {

        cb(
            null,
            Date.now() + "-" + file.originalname
        );

    }

});

module.exports = multer({

    storage,

    limits: {
        fileSize: 1024 * 1024
    },

    fileFilter(req, file, cb) {

        if (
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/png"
        ) {

            cb(null, true);

        } else {

            cb(
                new Error(
                    "Only JPG and PNG Allowed"
                )
            );

        }

    }

});