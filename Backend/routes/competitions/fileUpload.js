const { Storage } = require("@google-cloud/storage");
const dotenv = require("dotenv");
const util = require("util");
const Multer = require("multer");

const Image = require("../../models/Image");

dotenv.config();
var serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;
var P_ID = process.env.PROJECT_ID;
var BUCKET = process.env.BUCKET;

const storage = new Storage({
    projectId: P_ID,
    keyFilename: serviceAccount
});

const bucket = storage.bucket(BUCKET);
exports.upload = async (req, res, next) => {
    try {
        console.log("Upload Image");
        console.log(req.body);

        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }
        const newFileName = `${Date.now()}-${req.file.originalname}`;

        // Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(newFileName);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        blobStream.on("error", err => {
            next(err);
        });

        blobStream.on("finish", async () => {
            // These options will allow temporary read access to the file
            const options = {
                //      version: 'v4',
                action: "read",
                expires: "03-18-2024" //Date.now() + 15 * 60 * 1000, // 15 minutes
            };

            // Get a v4 signed URL for reading the file
            const [url] = await storage
                .bucket(bucket.name)
                .file(newFileName)
                .getSignedUrl(options);
            return res.json(url);
        });

        blobStream.end(req.file.buffer);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Competition not found" });
    }
};