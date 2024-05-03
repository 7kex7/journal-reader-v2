import fileUpload from "express-fileupload"

export type CustomFileType = fileUpload.UploadedFile | fileUpload.UploadedFile[] | undefined