export default function categoryProperties(category) {
    switch (category.replace(/\s/g, "").toLowerCase()) {
        case "photographer":
        case "painter":
            return {
                fileType: "image",
                fileTypeExt: "*",
                fileName: "Images"
            };

        case "singer":
            return {
                fileType: "audio",
                fileTypeExt: "*",
                fileName: "Audio"
            };

        case "vfxartist":
        case "dancer":
        case "comedian":
            return {
                fileType: "video",
                fileTypeExt: "*",
                fileName: "Videos"
            };

        case "storywriter":
            return {
                fileType: "application",
                fileTypeExt: "pdf",
                fileName: "Document"
            };

        default:
            return "";
    }
}
