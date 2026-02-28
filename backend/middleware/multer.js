import multer from 'multer'
import path from "path"
import fs from "fs"

const uploadDir = "./public"

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, uploadDir)
    },
    filename:(req,file,cb)=>{
        const safeName = file.originalname.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "")
        const ext = path.extname(safeName) || ".jpg"
        const baseName = path.basename(safeName, ext) || "upload"
        cb(null, `${baseName}-${Date.now()}${ext}`)
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image uploads are allowed"))
    }
    cb(null, true)
}

 let upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

 export default upload
