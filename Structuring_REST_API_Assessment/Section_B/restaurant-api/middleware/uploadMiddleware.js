const multer = require("multer");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    }

});

const fileFilter = (req, file, cb) => {

    const allowed = [
        "image/jpeg",
        "image/png"
    ];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only JPG and PNG files are allowed."
            )
        );
    }

};

const upload = multer({

    storage,

    limits: {
        fileSize: 2 * 1024 * 1024
    },

    fileFilter

});

module.exports = upload;