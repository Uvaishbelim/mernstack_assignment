const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();


// =========================================
// Avatar Storage
// =========================================

const avatarStorage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "avatars");

    },

    filename: (req, file, cb) => {

        const uniqueName = Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);

    }

});


// =========================================
// Avatar Upload
// Only JPG & PNG
// Max Size = 1MB
// =========================================

const avatarUpload = multer({

    storage: avatarStorage,

    limits: {

        fileSize: 1024 * 1024

    },

    fileFilter: (req, file, cb) => {

        const allowed = /jpg|jpeg|png/;

        const ext = allowed.test(
            path.extname(file.originalname).toLowerCase()
        );

        const mime = allowed.test(file.mimetype);

        if (ext && mime) {

            cb(null, true);

        }

        else {

            cb(new Error("Only JPG, JPEG and PNG files are allowed"));

        }

    }

});


// =========================================
// Task 1 & 2
// Upload Avatar
// =========================================

app.post(
    "/upload-avatar",
    avatarUpload.single("avatar"),
    (req, res) => {

        res.status(200).json({

            message: "Avatar Uploaded Successfully",

            filename: req.file.filename,

            size: req.file.size

        });

    }
);


// =========================================
// Storage for Post Images
// =========================================

const postStorage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "post-images");

    },

    filename: (req, file, cb) => {

        cb(

            null,

            Date.now() + path.extname(file.originalname)

        );

    }

});


// =========================================
// Task 5
// AI Generated Extension Validation
// =========================================

const postUpload = multer({

    storage: postStorage,

    fileFilter: (req, file, cb) => {

        const allowedExtensions =

            /jpg|jpeg|png|gif/;

        const extension = path
            .extname(file.originalname)
            .toLowerCase();

        if (!allowedExtensions.test(extension)) {

            return cb(
                new Error(
                    "Only jpg, jpeg, png and gif files are allowed."
                )
            );

        }

        cb(null, true);

    }

});


// =========================================
// Task 3
// Upload Post Image
// =========================================

app.post(

    "/upload-post-image",

    postUpload.single("image"),

    (req, res) => {

        res.json({

            message: "Image Uploaded Successfully",

            filename: req.file.filename,

            fileSize: req.file.size

        });

    }

);


// =========================================
// Task 4
// Multer Error Handler
// =========================================

app.use((err, req, res, next) => {

    if (err instanceof multer.MulterError) {

        if (err.code === "LIMIT_FILE_SIZE") {

            return res.status(400).json({

                success: false,

                message: "File is too large. Maximum size is 1MB."

            });

        }

        return res.status(400).json({

            success: false,

            message: err.message

        });

    }

    if (err) {

        return res.status(400).json({

            success: false,

            message: err.message

        });

    }

    next();

});


app.listen(3000, () => {

    console.log("Server Running On Port 3000");

});