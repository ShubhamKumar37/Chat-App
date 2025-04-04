import multer from "multer";

export const storage = multer.diskStorage({
    dest: function (req, res, cb) {
        cb(null, "./public/temp");
    },
    fileName: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.filedName + uniqueSuffix);
    }
});

export const upload = multer({ storage });