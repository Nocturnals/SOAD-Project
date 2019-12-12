const { Storage } = require("@google-cloud/storage");

var P_ID = process.env.PROJECT_ID;
var BUCKET = process.env.BUCKET;

const storage = new Storage({
    projectId: P_ID,
    keyFilename: __dirname + "/../artist-colab-firebase.json"
});

const bucket = storage.bucket(BUCKET);

/**
 * Adding new file to the storage
 */
exports.uploadFile = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: "file is required" });
    } else {
        const newFileName = `${Date.now()}-${req.file.originalname}`;

        // Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(newFileName);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        blobStream.on("error", err => {
            console.log(err);
            return res.status(500).json({
                message: "Failed to upload due to internal server error"
            });
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

            let pair = {
                url: url,
                name: newFileName
            };

            req.fileURL = pair;
            next();
        });

        blobStream.end(req.file.buffer);
    }
};
