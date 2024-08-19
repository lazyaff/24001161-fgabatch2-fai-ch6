const prisma = require("../libs/prisma");

// get all images
async function getImages(req, res) {
    try {
        // get all data from database
        const data = await prisma.images.findMany({
            select: {
                id: true,
                title: true,
                url: true,
            },
        });

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Images fetched successfully",
            data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong",
        });
    }
}

// get image details
async function getImageDetails(req, res) {
    try {
        const id = req.params.id;

        // validate id must be a number
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid image id",
            });
        }

        // get data from database
        const data = await prisma.images.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!data) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Image not found",
            });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Image fetched successfully",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong",
        });
    }
}

// update image details
async function updateImageDetails(req, res) {
    try {
        const id = req.params.id;
        const { title, description } = req.body;

        // validate id must be a number
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid image id",
            });
        }

        // validate title and description must not be empty
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Title and description are required",
            });
        }

        // title and description must be a string
        if (typeof title !== "string" || typeof description !== "string") {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Title and description must be a string",
            });
        }

        // check if image exists
        const image = await prisma.images.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!image) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Image not found",
            });
        }

        // update data
        const data = await prisma.images.update({
            where: {
                id: Number(id),
            },
            data: {
                title,
                description,
            },
        });

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Image updated successfully",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong",
        });
    }
}

// delete image
async function deleteImage(req, res) {
    try {
        const id = req.params.id;

        // validate id must be a number
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid image id",
            });
        }

        // check if image exists
        const image = await prisma.images.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!image) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Image not found",
            });
        }

        // delete data
        await prisma.images.delete({
            where: {
                id: Number(id),
            },
        });

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Image deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong",
        });
    }
}

module.exports = {
    getImages,
    getImageDetails,
    updateImageDetails,
    deleteImage,
};
