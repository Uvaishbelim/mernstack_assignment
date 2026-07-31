module.exports = (err, req, res, next) => {

    console.error(err.message);

    if (err.code === "LIMIT_FILE_SIZE") {

        return res.status(400).json({

            error: true,

            message: "Maximum Upload Size is 1 MB"

        });

    }

    res.status(400).json({

        error: true,

        message: err.message

    });

};