const { Storage } = require("@google-cloud/storage");
const dotenv = require("dotenv");
const util = require("util");
const Multer = require("multer");

const Image = require("../../models/Image");

dotenv.config();
var P_ID = process.env.PROJECT_ID;
var BUCKET = process.env.BUCKET;

const storage = new Storage({
    projectId: P_ID,
    keyFilename: __dirname + "/../../artist-colab-firebase.json"
});

const bucket = storage.bucket(BUCKET);

/**
 * Adding new file to the storage
 */
exports.upload = async (req, res, next) => {
    console.log("Upload Image");
    console.log(req.body);
    switch (req.body.category) {
        case "story writer":
            next();
            break;
        default:
            if (!req.file) {
                next();
            }
            else {
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

                let pair = {
                    url: url,
                    name: newFileName
                };
                let images = [];
                images = [...images, pair];

                console.log(images);
                req.imageurls = images;
                next();
            });

            blobStream.end(req.file.buffer);
          }

            break;
    }
};

/*
exports.uploadMultiple = (req, res,next) => {

  const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 50 * 1024 * 1024 // no larger than 50mb, you can change as needed.
    }
  });

  let upload = multer.array('multiple_images', 10);
  
  upload(req, res, function(err) {
    const files = req.file;
    let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            console.log($files[index]);
        }
  });

  console.log('Upload Multiple Images');
  console.log(files);
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
   }
   const newFileName = `${Date.now()}-${req.file.originalname}`;
  
   // Create a new blob in the bucket and upload the file data.
   const blob = bucket.file(newFileName);
   const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
   });
  
   blobStream.on('error', err => {
    next(err);
   });
  
   blobStream.on('finish', async () => {
     // These options will allow temporary read access to the file
    const options = {
//      version: 'v4',
      action: 'read',
      expires: '03-18-2024',//Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    // Get a v4 signed URL for reading the file
    const [url] = await storage
      .bucket(bucket.name)
      .file(newFileName)
      .getSignedUrl(options);

    res.status(200).send(url);
   });
  
   blobStream.end(req.file.buffer);
  
  
};

*/
